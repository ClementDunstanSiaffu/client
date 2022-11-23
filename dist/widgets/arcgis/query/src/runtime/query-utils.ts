import {
  FeatureLayerDataSource,
  ImmutableObject,
  IMSqlExpression,
  FeatureLayerQueryParams,
  MessageManager,
  QueryParams,
  DataRecord,
  DataRecordSetChangeMessage,
  RecordSetChangeType,
  ImmutableArray,
  dataSourceUtils
} from 'jimu-core'
import { IFieldInfo } from '@esri/arcgis-rest-types'
import { QueryItemType, SpatialRelation, SpatialFilterObj, FieldsType, mapJSAPIUnitToDsUnit, mapJSAPISpatialRelToDsSpatialRel } from '../config'

function combineFields (resultDisplayFields: ImmutableArray<string>, resultTitleExpression: string, idField?: string): string[] {
  const fields = new Set<string>()
  resultDisplayFields?.forEach(item => fields.add(item))
  if (resultTitleExpression) {
    const templates = resultTitleExpression.match(/\{\w*\}/g)
    if (templates?.length > 0) {
      templates.forEach(item => fields.add(item.substring(1, item.length - 1)))
    }
  }
  if (idField) {
    fields.add(idField)
  }
  return Array.from(fields)
}

export async function getPopupTemplate (outputDS: FeatureLayerDataSource, queryItem: ImmutableObject<QueryItemType>) {
  const { resultFieldsType, resultDisplayFields, resultTitleExpression = '' } = queryItem
  const currentOriginDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const popupInfo = currentOriginDs.getPopupInfo()

  if (resultFieldsType === FieldsType.SelectAttributes) {
    let fields: string[] | ImmutableArray<string> = resultDisplayFields
    if (resultDisplayFields == null) {
      // return all fields by default
      const allFieldsSchema = outputDS.getSchema()
      fields = allFieldsSchema?.fields ? Object.values(allFieldsSchema.fields).map(field => field.jimuName) : []
    }
    if (popupInfo) {
      const fieldInfos = []
      fields.forEach(field => {
        const fieldInfo = popupInfo.fieldInfos.find(fieldInfo => fieldInfo.fieldName === field)
        if (fieldInfo) {
          fieldInfos.push(fieldInfo)
        } else {
          fieldInfos.push({
            fieldName: field,
            label: field
          })
        }
      })
      return {
        fieldInfos,
        content: [{
          type: 'fields'
        }],
        title: resultTitleExpression,
        outFields: ['*']
      }
    }
    return {
      fieldInfos: fields.map(field => ({
        fieldName: field,
        label: field
      })),
      content: [{
        type: 'fields'
      }],
      title: resultTitleExpression,
      outFields: ['*']
    }
  } else {
    // the source layer will provide popup info
    return null
  }
}

export async function generateQueryParams (
  outputDS: FeatureLayerDataSource,
  sqlExpr: IMSqlExpression,
  spatialFilter: SpatialFilterObj,
  queryItem: ImmutableObject<QueryItemType>,
  page: number,
  pageSize: number
): Promise<QueryParams> {
  const currentQueryDsJson = outputDS.getDataSourceJson()
  const currentOriginDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const isLocalDs = currentQueryDsJson?.isDataInDataSourceInstance
  if (isLocalDs) {
    outputDS.setSourceRecords(currentOriginDs.getSourceRecords())
  }

  const { useAttributeFilter, useSpatialFilter, sortOptions, resultFieldsType, resultDisplayFields, resultTitleExpression } = queryItem
  let outputFields: string[] | ImmutableArray<string> = resultDisplayFields
  if (resultDisplayFields == null) {
    // return all fields by default
    const allFieldsSchema = outputDS.getSchema()
    outputFields = allFieldsSchema?.fields ? Object.values(allFieldsSchema.fields).map(field => field.jimuName) : []
  }
  const mergedQueryParams = outputDS.mergeQueryParams(currentOriginDs.getCurrentQueryParams() ?? {}, {
    where: (useAttributeFilter && sqlExpr?.sql) ? sqlExpr.sql : '1=1'
  } as any)
  // compose query params for query
  const queryParams: FeatureLayerQueryParams = {
    // url: ds.url,
    returnGeometry: true,
    page,
    pageSize,
    ...mergedQueryParams
  }
  if (useSpatialFilter && spatialFilter?.geometry) {
    const { geometry, relation = SpatialRelation.Intersect, buffer } = spatialFilter

    const spatialQueryParams: FeatureLayerQueryParams = {
      geometryType: dataSourceUtils.changeJSAPIGeometryTypeToRestAPIGeometryType(geometry.type),
      geometry: geometry.toJSON(),
      spatialRel: mapJSAPISpatialRelToDsSpatialRel[relation],
      distance: buffer?.distance,
      units: buffer?.unit ? mapJSAPIUnitToDsUnit[buffer.unit] : undefined
    }
    Object.assign(queryParams, spatialQueryParams)
  }

  if (sortOptions?.length > 0) {
    Object.assign(queryParams, {
      orderByFields: sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
    })
  }

  if (resultFieldsType === FieldsType.SelectAttributes) {
    const fields = combineFields(outputFields as any, resultTitleExpression, outputDS.getIdField())
    Object.assign(queryParams, {
      outFields: fields
    })
  } else {
    // use popup setting
    const popupInfo = currentOriginDs.getPopupInfo()
    // popupInfo may have expressions in its fieldInfos
    const fieldNames = Object.values(currentOriginDs.getSchema().fields ?? {}).map(f => f.name)
    const validFieldInfos = popupInfo?.fieldInfos?.filter(fieldInfo => fieldNames.includes(fieldInfo.fieldName))
    Object.assign(queryParams, {
      outFields: validFieldInfos?.map(fieldInfo => fieldInfo.fieldName)
    })
  }
  return queryParams
}

export async function executeCountQuery (
  widgetId: string,
  outputDS: FeatureLayerDataSource,
  queryParams: QueryParams
): Promise<number> {
  return outputDS.loadCount(queryParams, { widgetId, refresh: true })
}

export async function executeQuery (
  widgetId: string,
  outputDS: FeatureLayerDataSource,
  queryParams: QueryParams
): Promise<{ records?: DataRecord[], fields?: string[] }> {
  const popupInfo = outputDS.getPopupInfo()

  const layerDefinition = outputDS.getLayerDefinition()
  const getDefaultFieldInfos = () =>
    [
      { fieldName: layerDefinition?.objectIdField ?? 'objectid', label: 'OBJECTID', tooltip: '', visible: true }
    ] as IFieldInfo[]
  const fieldInfos = ((fieldInfos) => (fieldInfos.length ? fieldInfos : getDefaultFieldInfos()))(
    (popupInfo?.fieldInfos || []).filter((i) => i.visible)
  )
  const fields = outputDS.getSchema()?.fields
  const selectedFieldNames = fieldInfos.map((fieldInfo) => fieldInfo.fieldName)
  const selectedFieldJimuNames = fields
    ? Object.keys(fields).filter((jimuName) => selectedFieldNames.includes(fields[jimuName].name))
    : []
  outputDS.setSelectedFields(selectedFieldJimuNames)
  const records = await outputDS.load(queryParams, { widgetId })
  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  if (!originDs?.layer || (originDs as any).isSelectionView()) {
    const layerObject = await getLayerObject(originDs)
    records.forEach((record) => {
      const feature = (record as any).feature
      feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
      feature.layer = feature.sourceLayer
    })
  }
  const queryResult = {
    records,
    fields: fieldInfos.map((fieldInfo) => fieldInfo.fieldName)
  }

  // publish message
  const dataRecordSetChangeMessage = new DataRecordSetChangeMessage(widgetId, outputDS.id, RecordSetChangeType.Update, {
    records: queryResult.records,
    fields: queryResult.fields,
    dataSource: outputDS
  })
  MessageManager.getInstance().publishMessage(dataRecordSetChangeMessage)

  return queryResult
}

async function getLayerObject (dataSource: FeatureLayerDataSource) {
  if ((dataSource as any).isSelectionView()) {
    const mainDataSource = dataSource.getMainDataSource() as FeatureLayerDataSource
    if (mainDataSource.layer) {
      await mainDataSource.layer.load()
      return mainDataSource.layer
    } else {
      const layerObject = await mainDataSource.createJSAPILayerByDataSource()
      await layerObject.load()
      return layerObject
    }
  } else if (dataSource.layer) {
    await dataSource.layer.load()
    return dataSource.layer
  } else {
    const layerObject = await dataSource.createJSAPILayerByDataSource()
    await layerObject.load()
    return layerObject
  }
}
