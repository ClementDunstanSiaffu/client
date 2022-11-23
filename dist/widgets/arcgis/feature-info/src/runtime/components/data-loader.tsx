import {
  React, DataSource, FeatureLayerQueryParams, DataSourceComponent, IMUseDataSource, QueriableDataSource, IMDataSourceInfo, DataSourceStatus, DataRecord,
  DataSourceTypes, QueryParams
} from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'

type OnDataSourceStatusChangedFunc = (status: DataSourceStatus, dataSourceLabel?: string) => void

type OnDataChangedFunc = (dataSource: DataSource, currentData: CurrentData, isFirstLoad?: boolean) => void

type OnSelectedRecordIdChanged = (index: number, dataSourceId: string) => void
type OnunselectedRecordIdChanged = (dataSourceId: string) => void

interface Props {
  widgetId: string
  useDataSource: IMUseDataSource
  index: number
  limitGraphics: boolean
  maxGraphics: number
  onDataSourceStatusChanged: OnDataSourceStatusChangedFunc
  onDataChanged: OnDataChangedFunc
  onSelectedRecordIdChanged: OnSelectedRecordIdChanged
  onUnselectedRecordIdChanged: OnunselectedRecordIdChanged
}

interface State{
  dataSourceId: string
  dataSourceStatus: DataSourceStatus
  dataSourceWidgetQueries: any
  dataSourceVersion: number
}

export interface CurrentData {
  id: string
  count: number
  index: number
  graphic: __esri.Graphic
  record: DataRecord
  dataSourceId: string
  dataSourceVersion: number
}

interface DataBuffer {
  count: number
  dataMap: Record<number, CurrentData>
  pagingNum: number
  // dataObjectIds: string[];
}

export class DataLoader extends React.PureComponent<Props, State> {
  private previousIndex: number
  private dataSource: QueriableDataSource
  private dataBuffer: DataBuffer
  private previousData: CurrentData
  private isFirstLoad: boolean
  private previousSelectedId: string

  constructor (props) {
    super(props)
    this.state = {
      dataSourceId: null,
      dataSourceStatus: DataSourceStatus.Loaded,
      dataSourceVersion: undefined,
      dataSourceWidgetQueries: undefined
    }

    this.previousIndex = 0
    this.previousData = {
      id: null,
      count: null,
      index: null,
      graphic: null,
      record: null,
      dataSourceVersion: undefined,
      dataSourceId: null
    }
    this.dataBuffer = {
      count: null,
      dataMap: {},
      pagingNum: 30
      // dataObjectIds: []
    }
    this.isFirstLoad = false
    this.previousSelectedId = null
  }

  componentDidMount () {
    // if(this.dataSource) {
    //  this.dataSource.startAutoRefresh();
    // }
  }

  async componentDidUpdate () {
    // const sqlExprObj = this.props.useDataSource && this.props.useDataSource.query;
    const sqlExprObj = null
    if (this.props.useDataSource &&
        this.state.dataSourceId === this.props.useDataSource.dataSourceId &&
        this.state.dataSourceStatus === DataSourceStatus.Loaded) {
      let index
      if (this.props.index === this.previousIndex) {
        this.clearData()
        // this.previousIndex = null;
        // index = 0;
        index = this.props.index
      } else {
        this.previousIndex = this.props.index
        index = this.props.index
      }

      let currentData = this.getData(index)
      if (currentData) {
        this.onDataChanged(this.dataSource, currentData)
      } else {
        return await this.dataSource.queryCount({}).then(result => {
          const realCount = result.count
          if (index >= realCount) {
            index = 0
          }
          // const start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum;
          this.queryGraphics(this.dataSource, sqlExprObj, index, this.dataBuffer.pagingNum, realCount).then((results) => {
            if (results.graphics.length === 0) {
              currentData = null
            } else {
              this.addData(results, this.dataSource.id)
              currentData = this.getData(results.index)
            }
            this.onDataChanged(this.dataSource, currentData)
            this.isFirstLoad = false
          })
        })
      }
    }
  }

  onDataChanged (dataSource, currentData) {
    if (!currentData) {
      this.props.onDataChanged(this.dataSource, currentData)
    } else if (this.previousData?.dataSourceId !== currentData?.dataSourceId ||
              this.previousData?.id !== currentData?.id ||
              this.previousData?.count !== currentData?.count ||
              this.previousData?.index !== currentData?.index ||
              this.previousData?.dataSourceVersion !== currentData?.dataSourceVersion) {
      // previousData is null.
      // previousData is not null.
      // currentData is not null.
      // previousData !== currentData
      this.props.onDataChanged(this.dataSource, currentData, this.isFirstLoad)
    } else {
      // previousData is not null.
      // currentData is not null.
      // previousData === currentData
      this.props.onDataSourceStatusChanged(DataSourceStatus.Loaded, this.dataSource?.getLabel())
    }
    this.previousData = currentData
  }

  addData (queryResult, dataSourceId) {
    queryResult.records.forEach((record, i) => {
      const index = queryResult.start + i
      this.dataBuffer.dataMap[index] = {
        id: record.getId(),
        count: this.dataBuffer.count,
        index: index,
        graphic: queryResult.graphics[i],
        record: record,
        dataSourceId: dataSourceId,
        dataSourceVersion: this.state.dataSourceVersion
      }
    })
  }

  initData (count) {
    // const maxCount = this.props.limitGraphics ? this.props.maxGraphics : Infinity;
    // this.dataBuffer.count = count < maxCount ? count : maxCount;
    this.dataBuffer.count = count
    // this.dataBuffer.dataObjectIds = objectIds;
  }

  getData (index) {
    return this.dataBuffer.dataMap[index]
  }

  // getDataIndexByObjectId(objectId) {
  //  let index = -1;
  //  this.dataBuffer.dataObjectIds.some((oId, i) => {
  //    if(oId.toString() === objectId.toString()) {
  //      index = i;
  //      return true;
  //    } else {
  //      return false;
  //    }
  //  });
  //  return index;
  // }

  async getDataIndexByObjectId (objectId): Promise<number> {
    let index = -1
    const dataEntries = Object.entries(this.dataBuffer.dataMap)
    dataEntries.some(entry => {
      if (objectId === entry[1]?.id) {
        index = Number(entry[0])
        return true
      } else {
        return false
      }
    })
    if (index < 0 && this.dataSource) {
      const idField = this.dataSource.getIdField()
      return this.dataSource.queryCount({ where: `${idField}<=${objectId}` } as QueryParams).then(result => {
        index = result.count - 1
        return index
      })
    } else {
      return Promise.resolve(index)
    }
  }

  clearData () {
    this.dataBuffer.count = null
    this.dataBuffer.dataMap = {}
    // this.dataBuffer.dataObjectIds = [];
  }

  isEmptyData () {
    return this.dataBuffer.count === null
  }

  getLayerObject (dataSource) {
    if (dataSource.isSelectionView()) {
      const mainDataSource = dataSource.getMainDataSource()
      if (mainDataSource.layer) {
        return mainDataSource.layer.load().then(async () => {
          return await Promise.resolve(mainDataSource.layer)
        })
      } else {
        return mainDataSource.createJSAPILayerByDataSource().then((layerObject) => {
          return layerObject.load().then(async () => {
            return await Promise.resolve(layerObject)
          })
        })
      }
    } else if (dataSource.layer) {
      return dataSource.layer.load().then(async () => {
        return await Promise.resolve(dataSource.layer)
      })
    } else {
      return dataSource.createJSAPILayerByDataSource().then((layerObject) => {
        return layerObject.load().then(async () => {
          return await Promise.resolve(layerObject)
        })
      })
    }
  }

  async queryGraphics (dataSource, sqlExprObj, indexParam, num, realCount) {
    let index = indexParam
    let start
    this.props.onDataSourceStatusChanged(DataSourceStatus.Loading, this.dataSource?.getLabel())
    let layerObject
    return this.getLayerObject(dataSource).then(async layer => {
      layerObject = layer
      if (this.isEmptyData()) {
        this.initData(realCount)
      }
      if (this.isFirstLoad) {
        const selectedRecordId = dataSource.getSelectedRecordIds()[0]
        if (selectedRecordId !== undefined) {
          return await this.getDataIndexByObjectId(selectedRecordId).then((_index) => {
            index = (_index === -1) ? 0 : _index
          })
        }
      }
    }).then(() => {
      start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum
      const query = {
        // where: where,
        outFields: ['*'],
        returnGeometry: true,
        // orderByFields: orderBy,
        page: Math.floor(start / num) + 1,
        pageSize: num
        // resultOffset: start,
        // resultRecordCount: num,
        // start: start,
        // num: num
      }

      return dataSource.query(query)
    }).then((queryResults) => {
      const records = queryResults.records
      let graphics
      //if (dataSource.layer) {
      //  graphics = records.map(record => record.feature)
      //} else {
      //  graphics = records.map(record => {
      //    record.feature.sourceLayer = layerObject.associatedLayer || layerObject
      //    return record.feature
      //  })
      //}
      if (!dataSource.layer) {
        graphics = records.map(record => {
          record.feature.sourceLayer = layerObject.associatedLayer || layerObject
          return record.feature
        })
      } else if (dataSource.isSelectionView() || dataSource.getDataSourceJson().isOutputFromWidget) {
        // use layer object of main data source
        graphics = records.map(record => {
          record.feature.sourceLayer = layerObject.associatedLayer || layerObject
          record.feature.layer = layerObject.associatedLayer || layerObject
          return record.feature
        })
      } else {
        graphics = records.map(record => record.feature)
      }
      return {
        index: index,
        start: start,
        num: num,
        graphics: graphics,
        records: records
      }
    }).catch((e) => {
      console.warn(e)
      return {
        graphics: [],
        records: []
      }
    })
  }

  getOrderBy (dataSource, sqlExprObj) {
    const orderBy = []
    let result
    if (sqlExprObj && sqlExprObj.orderBy && sqlExprObj.orderBy.length > 0) {
      sqlExprObj.orderBy.forEach(sortData => {
        if (sortData.jimuFieldName) {
          orderBy.push(`${sortData.jimuFieldName} ${sortData.order}`)
        }
      })
      if (dataSource.type === DataSourceTypes.FeatureLayer) {
        result = orderBy.join(',')
      } else {
        result = orderBy
      }
    }
    return result
  }

  getQueryParamsFromDataSource (dataSource: QueriableDataSource): FeatureLayerQueryParams {
    return dataSource.getRealQueryParams({}, 'query')
  }

  async loadGraphics (dataSource, sqlExprObj) {
    this.props.onDataSourceStatusChanged(DataSourceStatus.Loading)
    return await loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer',
      'esri/rest/support/Query'
    ]).then(modules => {
      const [FeatureLayer, Query] = modules
      const query = new Query()
      let featureLayer = dataSource.layer
      const sqlExpr = sqlExprObj && sqlExprObj.where.sql
      let num
      query.where = sqlExpr || '1=1'
      // query.outSpatialReference = view.spatialReference;
      query.returnGeometry = false
      query.outFields = ['*']
      this.props.maxGraphics === 0 ? num = null : num = this.props.maxGraphics
      query.num = this.props.limitGraphics ? num : null

      if (!featureLayer && dataSource.url) {
        featureLayer = new FeatureLayer({
          url: dataSource.url
        })
      }
      if (featureLayer) {
        return featureLayer.queryFeatures(query).then((featureSet) => {
          return featureSet.features
        })
      } else {
        return []
      }
    }).catch((e) => {
      console.warn(e)
      return []
    })
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.dataSource = dataSource
    this.previousIndex = this.props.index
    this.isFirstLoad = true
    this.setState({
      dataSourceId: this.dataSource.id
    })
  }

  // onQueryStatusChange = (status: DataSourceStatus): void => {
  // }

  // eslint-disable-next-line
  onCreateDataSourceFailed = (error): void => {
  }

  onDataSourceInfoChange = (info: IMDataSourceInfo) => {
    if (!info) {
      return
    }

    if (info.status === DataSourceStatus.NotReady) {
      this.props.onDataSourceStatusChanged(DataSourceStatus.NotReady, this.dataSource?.getLabel())
    }

    // handle filter change
    this.setState({
      dataSourceStatus: info.status,
      dataSourceWidgetQueries: info.widgetQueries,
      dataSourceVersion: info.version
    })

    // handle selection change
    const selectedId = info.selectedIds && info.selectedIds[0]
    if (selectedId) {
      this.previousSelectedId = selectedId
      this.getDataIndexByObjectId(selectedId).then(index => {
        if (index > -1 && index < this.dataBuffer.count) {
          this.props.onSelectedRecordIdChanged(index, this.dataSource.id)
        }
      })
    } else if (this.previousSelectedId) {
      this.previousSelectedId = null
      this.props.onUnselectedRecordIdChanged(this.dataSource.id)
    }
  }

  render () {
    return (
      <DataSourceComponent
        useDataSource={this.props.useDataSource}
        query={{}}
        widgetId={this.props.widgetId}
        onDataSourceCreated={this.onDataSourceCreated}
        // onQueryStatusChange={this.onQueryStatusChange}
        onDataSourceInfoChange={this.onDataSourceInfoChange}
        onCreateDataSourceFailed={this.onCreateDataSourceFailed}
      />
      // <DataQueryComponent useDataSource={this.props.useDataSource}
      //  query={null}
      //  onDataSourceCreated={this.onDataSourceCreated}
      //  //onQueryStatusChange={this.onQueryStatusChange}
      //  onDataSourceInfoChange={this.onDataSourceInfoChange}
      //  onCreateDataSourceFailed={this.onCreateDataSourceFailed}/>
    )
  }
}
