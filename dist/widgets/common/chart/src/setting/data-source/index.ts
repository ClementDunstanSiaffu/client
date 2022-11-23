import { DataSourceJson, DataSourceSchema, DataSourceTypes, FieldSchema, getAppStore, IMFeatureLayerQueryParams, IMFieldSchema, Immutable, ImmutableArray, ImmutableObject, JimuFieldType, StatisticType, UseDataSource } from 'jimu-core'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import { ObjectIdField } from '../../constants'
import { getFieldSchema } from '../../utils/common'
import { isSerialSeries } from '../../utils/default'

const ObjectIdSchema = {
  jimuName: ObjectIdField,
  alias: 'OBJECTID',
  type: JimuFieldType.Number,
  name: ObjectIdField
}

/**
 * Get the initial data source schema.
 * @param label
 */
const getInitSchema = (label: string = ''): DataSourceSchema => {
  return {
    label,
    idField: ObjectIdField,
    fields: {
      [ObjectIdField]: ObjectIdSchema
    }
  } as DataSourceSchema
}

/**
 * Get original fields from output ds schema (without objectid field)
 * @param schema
 */
const getSchemaOriginFields = (schema: DataSourceSchema): string[] => {
  if (!schema?.fields) return
  const fields = Object.entries(schema.fields)?.map(([fieldName, fieldSchema]) => {
    //The objectid field is required in the schema, but it may not be used.
    if (fieldName === ObjectIdField && fieldSchema.jimuName === ObjectIdField) {
      return null
    }
    return fieldSchema.originFields?.[0]
  })?.filter(field => !!field)
  return Array.from(new Set(fields))
}

const getJimuFieldSchema = (field: string, dataSourceId: string, jimuName?: string): IMFieldSchema => {
  let schema = getFieldSchema(field, dataSourceId)
  jimuName = jimuName || field
  schema = schema.set('jimuName', jimuName).set('name', jimuName)
  schema = schema.set('originFields', [field])
  return schema
}

const getHistogramFields = (schema: ImmutableObject<{ [jimuName: string]: FieldSchema }>, originField: string, dataSourceId: string): ImmutableObject<{ [jimuName: string]: FieldSchema }> => {
  const fields = ['minValue', 'maxValue', 'count']
  fields.forEach((field) => {
    const jimuName = field
    const name = field
    const alias = field
    const originFields = [originField]

    const originFieldSchema = getFieldSchema(originField, dataSourceId)
    const digitSeparator = originFieldSchema?.format?.digitSeparator ?? true
    const places = field === 'count' ? 0 : 3
    const format = { ...originFieldSchema?.format, digitSeparator, places }
    schema = schema.set(field, { jimuName, name, alias, originFields, format })
  })
  return schema
}

/**
 * Get schema for chart data soaurce.
 * @param datasource
 * @param dataSourceId
 */
const getDataSourceSchema = (query: IMFeatureLayerQueryParams, dataSourceId: string, seriesType: ChartTypes): DataSourceSchema => {
  let fields = Immutable({
    [ObjectIdField]: ObjectIdSchema
  }) as unknown as ImmutableObject<{ [jimuName: string]: FieldSchema }>

  const groupByFieldsForStatistics = query?.groupByFieldsForStatistics
  const outFields = query?.outFields
  const outStatistics = query?.outStatistics

  if (seriesType === 'histogramSeries') {
    if (outFields?.[0]) {
      fields = getHistogramFields(fields, outFields[0], dataSourceId)
    }
  } else if (isSerialSeries(seriesType) || seriesType === 'pieSeries') {
    if (groupByFieldsForStatistics && outFields) { //by feature
      groupByFieldsForStatistics.concat(outFields).forEach((outField) => {
        const schema = getJimuFieldSchema(outField, dataSourceId)
        fields = fields.set(outField, schema)
      })
    } else if (groupByFieldsForStatistics && outStatistics) {
      const categoryField = groupByFieldsForStatistics[0]
      if (categoryField) {
        const schema = getJimuFieldSchema(categoryField, dataSourceId)
        fields = fields.set(categoryField, schema)
      }
      outStatistics.forEach((statistic) => {
        const originField = statistic.onStatisticField
        if (originField) {
          const jimuName = statistic.outStatisticFieldName
          let schema = getJimuFieldSchema(originField, dataSourceId, jimuName)
          schema = schema.set('alias', jimuName)
          const statisticType = statistic.statisticType
          // defining formats for the schema of output data source https://devtopia.esri.com/Beijing-R-D-Center/ExperienceBuilder/issues/8902
          let format = schema.format
          if (statisticType === StatisticType.Count) {
            format = format || Immutable({})
            format = format.set('places', 0)
          } else if (statisticType === StatisticType.Avg) {
            if (typeof schema.format?.places === 'undefined') {
              format = format || Immutable({})
              format = format.set('places', 3)
            }
          }
          if (format) {
            schema = schema.set('format', format)
          }
          fields = fields.set(jimuName, schema)
        }
      })
    } else if (!groupByFieldsForStatistics && outStatistics) {
      outStatistics.forEach((outStatistic) => {
        const originField = outStatistic.onStatisticField
        if (!originField) return
        const jimuName = outStatistic.outStatisticFieldName
        const schema = getJimuFieldSchema(originField, dataSourceId, jimuName)
        //Fix issue https://devtopia.esri.com/Beijing-R-D-Center/ExperienceBuilder-Web-Extensions/issues/6422
        // schema = schema.set('alias', jimuName)
        fields = fields.set(jimuName, schema)
      })
    }
  } else if (seriesType === 'scatterSeries') {
    if (outFields) {
      outFields.forEach((outField) => {
        const schema = getJimuFieldSchema(outField, dataSourceId)
        fields = fields.set(outField, schema)
      })
    }
  }

  const schema = {
    idField: ObjectIdSchema.jimuName,
    fields: fields.asMutable({ deep: true })
  } as unknown as DataSourceSchema

  return schema
}

/**
 * Set the fields from output data source to useDataSources.
 * @param useDataSources
 * @param outputDataSource
 */
const getUseDataSources = (useDataSources: ImmutableArray<UseDataSource>, outputDataSource: DataSourceJson): UseDataSource[] => {
  const schema = outputDataSource.schema
  const fields = getSchemaOriginFields(schema)
  const withFields = Immutable.setIn(useDataSources, ['0', 'fields'], fields).asMutable({ deep: true })
  return withFields
}

/**
 * Set the schema from chart data source to output data source.
 * @param chartDataSource
 * @param dataSourceId
 * @param outputDataSourceId
 */
const getOutputDataSource = (query: IMFeatureLayerQueryParams, dataSourceId: string, outputDataSourceId: string, seriesType: ChartTypes): DataSourceJson => {
  if (!outputDataSourceId) return null
  let outputDataSource = getAppStore().getState()?.appStateInBuilder?.appConfig.dataSources?.[outputDataSourceId]
  if (!outputDataSource) {
    console.error(`The output data source of ${outputDataSourceId} does not exist`)
    return null
  }
  const schema = getDataSourceSchema(query, dataSourceId, seriesType)
  outputDataSource = outputDataSource.set('schema', schema)
  return outputDataSource.asMutable({ deep: true })
}

/**
 * Create the initial output data source.
 * @param originalId
 * @param label
 * @param useDataSource
 */
export const createInitOutputDataSource = (id: string, label: string, useDataSource: UseDataSource) => {
  const schema = getInitSchema(label)

  const outputDsJson: DataSourceJson = {
    id,
    type: DataSourceTypes.FeatureLayer,
    label,
    originDataSources: [useDataSource],
    isOutputFromWidget: true,
    isDataInDataSourceInstance: true,
    schema
  }

  return outputDsJson
}
/**
 * Update the the `useDataSources  and `outputDataSource` by the new query configurated.
 * @param propUseDataSources
 * @param outputDataSourceId
 * @param query
 */
export const updateDataSources = (propUseDataSources: ImmutableArray<UseDataSource>, outputDataSourceId: string, query: IMFeatureLayerQueryParams, seriesType: ChartTypes): [UseDataSource[], DataSourceJson] => {
  const dataSourceId = propUseDataSources?.[0]?.dataSourceId ?? ''
  const outputDataSource = getOutputDataSource(query, dataSourceId, outputDataSourceId, seriesType)
  const useDataSources = getUseDataSources(propUseDataSources, outputDataSource)
  return [useDataSources, outputDataSource]
}
