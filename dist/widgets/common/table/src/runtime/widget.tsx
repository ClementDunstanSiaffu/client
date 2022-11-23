/** @jsx jsx */
import {
  React,
  jsx,
  AllWidgetProps,
  classNames,
  DataSourceComponent,
  QueriableDataSource,
  Immutable,
  appActions,
  lodash,
  QueryParams,
  MessageManager,
  DataRecordsSelectionChangeMessage,
  ClauseValuePair,
  ReactResizeDetector,
  DataSourceInfo,
  IMDataSourceInfo,
  getAppStore,
  CONSTANTS,
  DataSourceStatus,
  IMState,
  dataSourceUtils,
  MutableStoreManager,
  DataSourceManager,
  DataRecord,
  appConfigUtils,
  WidgetState,
  privilegeUtils,
  AppMode,
  esri,
  ImmutableArray,
  QueryRequiredInfo,
  DataSource,
  cancelablePromise,
  SceneLayerDataSource
} from 'jimu-core'
import { Global } from 'jimu-theme'
import {
  IMConfig,
  LayersConfig,
  SelectionModeType,
  TableArrangeType,
  Suggestion
} from '../config'
import {
  loadArcGISJSAPIModules,
  FeatureDataRecord,
  FeatureLayerDataSource
} from 'jimu-arcgis'
import defaultMessages from './translations/default'
import {
  WidgetPlaceholder,
  defaultMessages as jimuUIDefaultMessages,
  Button,
  TextInput,
  Tabs,
  Tab,
  Select,
  AdvancedSelect,
  Popper,
  DataActionDropDown,
  Alert
} from 'jimu-ui'
import { versionManager } from '../version-manager'
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime'
import { getStyle, getSuggestionStyle } from './style'
import { fetchSuggestionRecords, minusArray, getGlobalTableTools, getQuerySQL } from './utils'
import { AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'
import { SearchOutlined } from 'jimu-icons/outlined/editor/search'
import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { MenuOutlined } from 'jimu-icons/outlined/editor/menu'
import { TrashCheckOutlined } from 'jimu-icons/outlined/editor/trash-check'
import { RefreshOutlined } from 'jimu-icons/outlined/editor/refresh'
import { ListVisibleOutlined } from 'jimu-icons/outlined/editor/list-visible'
import { ShowSelectionOutlined } from 'jimu-icons/outlined/editor/show-selection'
import { ShowSelectionRtlOutlined } from 'jimu-icons/outlined/editor/show-selection--rtl'
import { AbstractQueriableDataSource, FeatureLayerQueryParams } from 'jimu-core/data-source'
import { IFeature } from '@esri/arcgis-rest-types'
// import warningIcon from 'jimu-icons/svg/outlined/suggested/warning.svg'
const { BREAK_POINTS, SELECTION_DATA_VIEW_ID, DATA_VIEW_ID_FOR_NO_SELECTION } = CONSTANTS
const tablePlaceholderIcon = require('./assets/icons/placeholder-table.svg')
const SEARCH_TOOL_MIN_SIZE = 300
const notLoad = [DataSourceStatus.NotReady, DataSourceStatus.LoadError]
const Sanitizer = esri.Sanitizer
const sanitizer = new Sanitizer()

export interface Props {
  appMode: AppMode
  dataSourcesInfo?: { [dsId: string]: DataSourceInfo }
  isRTL: boolean
  stateShowLoading: boolean
  currentPageId: string
  viewInTableObj: { [id: string]: { daLayerItem: LayersConfig, records: DataRecord[] } }
  enableDataAction: boolean
  belongToDataSourceInfos: any
  isWidthAuto: boolean
  isHeightAuto: boolean
}

export interface State {
  apiLoaded: boolean
  dataSource: QueriableDataSource
  activeTabId: string
  downloadOpen: boolean
  searchText: string
  selectQueryFlag: boolean
  mobileFlag: boolean
  searchToolFlag: boolean
  tableShowColumns: ClauseValuePair[]
  isOpenSearchPopper: boolean
  emptyTable: boolean
  emptyData: boolean
  selectRecords: DataRecord[]
  notReady: boolean
  selfDsChange: boolean
  advancedTableField: Array<{
    value: string
    label: string
  }>
  showLoading: boolean
  interval: number
  autoRefreshLoadingString: string
  isShowSuggestion: boolean
  searchSuggestion: Suggestion[]
}

export interface tableSelectedItem {
  objectId: number
  feature: IFeature | __esri.Graphic
}

export default class Widget extends React.PureComponent<
AllWidgetProps<IMConfig> & Props,
State
> {
  static versionManager = versionManager
  table: __esri.FeatureTable
  dataSourceChange: boolean
  dataActionCanLoad: boolean
  dataActionTableRecords: { [configId: string]: DataRecord[] }
  dropdownCsv: any
  refs: {
    tableContainer: HTMLInputElement
    advancedSelect: HTMLElement
    searchPopup: HTMLDivElement
    currentEl: HTMLElement
    suggestPopup: HTMLDivElement
  }

  updatingTable: boolean
  removeConfig: boolean
  debounceOnResize: (width, height) => void
  dsManager: DataSourceManager
  autoRefreshLoadingTime: any
  resetAutoRefreshTime: any
  suggestionsQueryTimeout: any
  currentRequestId: number
  timerFn: any
  promises: Array<cancelablePromise.CancelablePromise<any>> = []
  FeatureTable: typeof __esri.FeatureTable = null
  FeatureLayer: typeof __esri.FeatureLayer = null

  static mapExtraStateProps = (
    state: IMState,
    props: AllWidgetProps<IMConfig>
  ): Props => {
    const { layoutId, layoutItemId, id } = props
    const currentWidget = state?.appConfig?.widgets?.[id]
    const enableDataAction = currentWidget?.enableDataAction
    const dsIds = currentWidget?.useDataSources?.map(dsJson => {
      return dsJson.dataSourceId
    })
    const dataInstance = DataSourceManager.getInstance()
    const belongToDataSourceInfos = {}
    dsIds?.forEach(dsId => {
      const belongToDs = dataInstance.getDataSource(dsId)?.belongToDataSource
      belongToDataSourceInfos[dsId] = state?.dataSourcesInfo?.[belongToDs?.id]
    })

    const appConfig = state && state.appConfig
    const layout = appConfig.layouts?.[layoutId]
    const layoutSetting = layout?.content?.[layoutItemId]?.setting
    const isHeightAuto =
      layoutSetting?.autoProps?.height === LayoutItemSizeModes.Auto ||
      layoutSetting?.autoProps?.height === true
    const isWidthAuto =
      layoutSetting?.autoProps?.width === LayoutItemSizeModes.Auto ||
      layoutSetting?.autoProps?.width === true
    return {
      appMode: state?.appRuntimeInfo?.appMode,
      isRTL: state?.appContext?.isRTL,
      stateShowLoading: state?.widgetsState?.[props.id]?.showLoading,
      currentPageId: state?.appRuntimeInfo?.currentPageId,
      viewInTableObj: props?.mutableStateProps?.viewInTableObj,
      enableDataAction: enableDataAction === undefined ? true : enableDataAction,
      belongToDataSourceInfos,
      isHeightAuto,
      isWidthAuto
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false,
      dataSource: undefined,
      activeTabId: undefined,
      downloadOpen: false,
      searchText: '',
      selectQueryFlag: false,
      mobileFlag: false,
      searchToolFlag: false,
      tableShowColumns: undefined,
      isOpenSearchPopper: false,
      emptyTable: false,
      emptyData: false,
      selectRecords: [],
      notReady: false,
      selfDsChange: false,
      advancedTableField: [],
      showLoading: false,
      interval: 0,
      autoRefreshLoadingString: '',
      isShowSuggestion: false,
      searchSuggestion: []
    }
    this.dataSourceChange = false
    this.dataActionCanLoad = true
    this.dataActionTableRecords = {}
    this.updatingTable = false
    this.removeConfig = false
    this.currentRequestId = 0
    this.timerFn = null
    this.debounceOnResize = lodash.debounce(
      (width, height) => this.onToolStyleChange(width, height),
      200
    )
    this.dsManager = DataSourceManager.getInstance()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { config } = nextProps
    const { layersConfig } = config
    const { activeTabId } = prevState
    // data-action Table
    const daLayersConfig = new Widget(nextProps).getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    if ((!activeTabId || allLayersConfig.findIndex(x => x.id === activeTabId) < 0) && allLayersConfig.length > 0) {
      const curConfig = allLayersConfig.find(
        item => item.id === allLayersConfig[0]?.id
      )
      const newAdvancedTableField = curConfig && curConfig.tableFields.map(item => {
        return { value: item.name, label: item.alias }
      })
      return {
        activeTabId: allLayersConfig[0]?.id,
        advancedTableField: newAdvancedTableField
      }
    }
    return null
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules([
        'esri/widgets/FeatureTable',
        'esri/layers/FeatureLayer'
      ]).then(modules => {
        ;[this.FeatureTable, this.FeatureLayer] = modules
        this.setState({
          apiLoaded: true
        })
        this.destoryTable().then(() => {
          this.createTable()
        })
      })
    }
  }

  componentWillUnmount () {
    const { id } = this.props
    this.promises.forEach(p => p.cancel())
    this.destoryTable()
    clearTimeout(this.suggestionsQueryTimeout)
    clearInterval(this.autoRefreshLoadingTime)
    MutableStoreManager.getInstance().updateStateValue(id, 'viewInTableObj', {})
  }

  componentDidUpdate (prevProps: AllWidgetProps<IMConfig> & Props, prevState: State) {
    const { activeTabId, dataSource, advancedTableField } = this.state
    const { id, config, currentPageId, state, belongToDataSourceInfos, appMode } = this.props
    const { layersConfig } = config
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    const removeLayerFlag = this.props?.stateProps?.removeLayerFlag || false
    const dataActionActiveObj = this.props?.stateProps?.dataActionActiveObj
    const newActiveTabId = dataActionActiveObj?.dataActionTable ? dataActionActiveObj?.activeTabId : activeTabId
    const optionChangeSuggestion = this.props?.stateProps?.optionChangeSuggestion || false
    if (optionChangeSuggestion) {
      this.setState({ isShowSuggestion: false })
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'optionChangeSuggestion', false)
      )
    }

    if (removeLayerFlag) {
      const popover = document.getElementsByClassName(
        'esri-popover esri-popover--open'
      )
      if (popover && popover.length > 0) popover[0].remove()
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'removeLayerFlag', false)
      )
    }
    // close table menu
    const controllerClose = state === WidgetState.Closed
    const pageClose = prevProps.currentPageId !== currentPageId
    const liveClose = prevProps.appMode === AppMode.Run && appMode === AppMode.Design
    if ((controllerClose || pageClose || liveClose) && this.table) {
      (this.table as any).menu.open = false
      this.setState({ searchText: '', isShowSuggestion: false })
    }
    const prevCurConfig = prevProps.config.layersConfig.concat(daLayersConfig).find(
      item => item.id === prevState.activeTabId
    )
    const newCurConfig = allLayersConfig.find(
      item => item.id === newActiveTabId
    )
    if (this.removeConfig) {
      this.removeConfig = false
      if (!newCurConfig) return
    } else {
      if (!prevCurConfig || !newCurConfig) return
    }
    // table advanced selector
    const newAdvancedTableField = newCurConfig.tableFields?.map(item => {
      return { value: item.name, label: item.alias }
    })
    if (!lodash.isDeepEqual(newAdvancedTableField, advancedTableField) || newActiveTabId !== prevState.activeTabId) {
      this.setState({
        advancedTableField: newAdvancedTableField
      })
    }
    const optionKeys = [
      'enableAttachements',
      'enableEdit',
      'allowCsv',
      'enableSelect',
      'selectMode',
      'tableFields'
    ]
    let optionChangeFlag = false
    for (const item of optionKeys) {
      const changeFlag = item !== 'tableFields' ? (prevCurConfig?.[item] !== newCurConfig?.[item]) : !lodash.isDeepEqual(prevCurConfig?.[item], newCurConfig?.[item])
      if (changeFlag) {
        optionChangeFlag = true
        break
      }
    }
    if (optionChangeFlag) {
      this.setState({ searchText: '', isShowSuggestion: false })
    }
    // belongToDataSource info change (update geometry and sql)
    const preDsId = prevCurConfig?.useDataSource?.dataSourceId
    const curDsId = newCurConfig?.useDataSource?.dataSourceId
    const preBelongToWidgetQuery = prevProps?.belongToDataSourceInfos?.[preDsId]?.widgetQueries
    const curBelongToWidgetQuery = belongToDataSourceInfos?.[curDsId]?.widgetQueries
    const preBelongToSourceVersion = prevProps?.belongToDataSourceInfos?.[preDsId]?.sourceVersion
    const curBelongToSourceVersion = belongToDataSourceInfos?.[curDsId]?.sourceVersion
    const curBelongToDsStatus = belongToDataSourceInfos?.[curDsId]?.status
    // changes are only caused by belongtoDataSource
    if (!newCurConfig.dataActionObject && preDsId === curDsId && preBelongToWidgetQuery !== curBelongToWidgetQuery) {
      this.updateGeometryAndSql(dataSource)
    }
    const needUpdateTable = () => {
      const dsReady = !notLoad.includes(curBelongToDsStatus)
      // const tabChange = dsReady && newCurConfig?.useDataSource?.dataSourceId === dataSource?.id && prevCurConfig?.id !== newCurConfig?.id
      const tabChange = prevCurConfig?.id !== newCurConfig?.id
      const tableOptionChange = prevCurConfig?.id === newCurConfig?.id && optionChangeFlag
      const belongToSourceVersionChange = dataSource && curBelongToSourceVersion && preBelongToSourceVersion !== curBelongToSourceVersion && !newCurConfig?.dataActionObject
      return dsReady && (tabChange || tableOptionChange || belongToSourceVersionChange)
    }
    if (dataActionActiveObj?.dataActionTable && this.dataActionCanLoad && !this.updatingTable) {
      this.dataActionCanLoad = false
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'dataActionActiveObj', { activeTabId: newActiveTabId, dataActionTable: false })
      )
      this.updatingTable = true
      this.setState(
        {
          activeTabId: newActiveTabId,
          searchText: '',
          tableShowColumns: undefined
        },
        () => {
          this.destoryTable().then(() => {
            this.createTable()
          })
        }
      )
      return
    }
    if (needUpdateTable()) {
      this.updatingTable = true
      this.setState(
        {
          searchText: '',
          tableShowColumns: undefined
        },
        () => {
          // reset ds query
          dataSource?.updateQueryParams({ where: '1=1' } as QueryParams, id)
          this.destoryTable().then(() => {
            this.createTable()
          })
        }
      )
    }
  }

  getFieldsFromDatasource = () => {
    const { config } = this.props
    const { layersConfig } = config
    const { activeTabId } = this.state
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    const curLayer = allLayersConfig
      .find(item => item.id === activeTabId)
    // allFields need recalculate(chart output ds)
    const selectedDs = this.dsManager.getDataSource(curLayer.useDataSource?.dataSourceId)
    const allFieldsSchema = selectedDs?.getSchema()
    const allFields = allFieldsSchema?.fields ? Object.values(allFieldsSchema?.fields) : []
    const defaultInvisible = [
      'CreationDate',
      'Creator',
      'EditDate',
      'Editor',
      'GlobalID'
    ]
    let tableFields = allFields.filter(
      item => !defaultInvisible.includes(item.jimuName)
    )
    // If there are too many columns, only the first 50 columns will be displayed by default
    if (tableFields?.length > 50) {
      tableFields = tableFields.slice(0, 50)
    }
    return { allFields, tableFields }
  }

  onToolStyleChange = (width: number, height: number) => {
    width < BREAK_POINTS[0]
      ? this.setState({ mobileFlag: true })
      : this.setState({ mobileFlag: false })
    width < SEARCH_TOOL_MIN_SIZE
      ? this.setState({ searchToolFlag: true })
      : this.setState({ searchToolFlag: false })
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.setState({ dataSource })
    const isSelectionView = dataSource?.dataViewId === SELECTION_DATA_VIEW_ID
    // The first time you switch a TAB and the target TAB is using dataView, the ds changes after the update
    const isDataView = dataSource?.dataViewId && dataSource?.dataViewId !== 'output' && !isSelectionView
    const hasNoSelectionView = !!dataSource.getMainDataSource().getDataView(DATA_VIEW_ID_FOR_NO_SELECTION)
    const dsChangeCreateTable = !this.updatingTable && ((isSelectionView && hasNoSelectionView) || isDataView)
    if (dsChangeCreateTable) {
      this.updatingTable = true
      this.destoryTable().then(() => {
        this.createTable(dataSource)
      })
    }
  }

  updateGeometryAndSql = (dataSource: QueriableDataSource) => {
    if (!this.table?.layer) return
    const dsParam: any = dataSource?.getCurrentQueryParams()
    const orgExpression = this.table.layer.definitionExpression
    if (orgExpression !== dsParam?.where) {
      this.table.layer.definitionExpression = dsParam?.where
    }
    dataSourceUtils.changeJimuFeatureLayerQueryToJSAPILayerQuery(dataSource as FeatureLayerDataSource, Immutable(dsParam)).then(res => {
      if (!res?.geometry) return
      const newGeometry = res.geometry
      const newGeometryJson = (newGeometry as any)?.toJSON()
      const orgGeometryJson = (this.table?.filterGeometry as any)?.toJSON()
      if (!lodash.isDeepEqual(orgGeometryJson, newGeometryJson)) {
        (this.table.filterGeometry as any) = newGeometry
      }
    })
    setTimeout(() => {
      this.asyncSelectedRebuild(dataSource)
    }, 500)
  }

  onDataSourceInfoChange = (
    info: IMDataSourceInfo,
    preInfo?: IMDataSourceInfo
  ) => {
    if (!info) {
      this.destoryTable().then(() => {
        this.setState({ emptyTable: true })
      })
      return
    }
    this.dataSourceChange = true
    if (info?.status === DataSourceStatus.Loaded && preInfo?.status === DataSourceStatus.Loaded) {
      this.dataSourceChange = false
    }
    let { dataSource } = this.state
    const { selectQueryFlag, activeTabId, selfDsChange } = this.state
    const { config } = this.props
    const { layersConfig } = config
    // config info
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    const curLayer = allLayersConfig
      .find(item => item.id === activeTabId)
    const useDS = curLayer?.useDataSource
    // If other widgets load data, status will be loaded at the first time
    // This time state.dataSource is undefined
    if ((!dataSource && useDS) || (dataSource?.id !== useDS?.dataSourceId)) {
      dataSource = this.dsManager.getDataSource(useDS?.dataSourceId) as QueriableDataSource
      if (!dataSource) {
        this.setState({ emptyTable: true })
        return
      }
    } else if (!dataSource && !useDS) {
      return
    }
    if (!info?.status || info?.status === DataSourceStatus.NotReady) {
      this.destoryTable().then(() => {
        this.setState({
          notReady: true,
          emptyTable: true
        })
      })
      return
    } else {
      this.setState({
        notReady: false,
        emptyTable: false
      })
    }
    // loading status
    const showLoading = this.getLoadingStatus(dataSource, info?.status)
    const interval = dataSource?.getAutoRefreshInterval() || 0
    // toggle auto refresh loading status
    this.toggleAutoRefreshLoading(dataSource, showLoading, interval)
    this.setState({
      showLoading,
      interval
    })
    // widgetQuery change (update geometry and sql)
    const dsParam: any = dataSource && dataSource.getCurrentQueryParams()
    const widgetQueryChange = !curLayer.dataActionObject && info?.widgetQueries !== preInfo?.widgetQueries
    if (widgetQueryChange) {
      this.updateGeometryAndSql(dataSource)
    }
    // shielding info change
    const preSelectedIds = preInfo?.selectedIds
    const newSelectedIds = info?.selectedIds
    const preSourceVersion = preInfo?.sourceVersion
    const newSourceVersion = info?.sourceVersion
    const newVersion = info?.gdbVersion
    const preVersion = preInfo?.gdbVersion
    const infoStatusNotChange =
      curLayer?.useDataSource?.dataSourceId === dataSource?.id &&
      preInfo?.status === info?.status &&
      preInfo?.instanceStatus === info?.instanceStatus &&
      info?.widgetQueries === preInfo?.widgetQueries &&
      preSelectedIds === newSelectedIds &&
      preSourceVersion === newSourceVersion &&
      newVersion === preVersion
    if (
      notLoad.includes(info?.status) ||
      this.updatingTable ||
      infoStatusNotChange
    ) { return }
    // data-action
    this.setState({ selectRecords: dataSource?.getSelectedRecords() })
    // version manager
    if (preVersion && newVersion && newVersion !== preVersion && this.table) {
      this.updatingTable = true
      this.destoryTable().then(() => {
        this.createTable(dataSource, true)
      })
      return
    }
    // ds ready create table and selected features change
    const tabChange = curLayer?.useDataSource?.dataSourceId !== dataSource?.id
    const outputReapply = (!preInfo?.status || notLoad.includes(preInfo?.status)) && info && !notLoad.includes(info?.status) && info?.instanceStatus !== DataSourceStatus.NotCreated
    const selectedChange = preSelectedIds !== newSelectedIds && (preSelectedIds?.length !== 0 || newSelectedIds?.length !== 0)
    const infoNotChange = info?.status === preInfo?.status && info?.instanceStatus === preInfo?.instanceStatus
    const isOutputDs = dataSource?.getDataSourceJson()?.isOutputFromWidget
    const dsCreated = !curLayer.dataActionObject && info?.status === DataSourceStatus.Unloaded && info?.instanceStatus === DataSourceStatus.Created &&
      !selectedChange && !infoNotChange && !isOutputDs
    const sourceVerChange = preSourceVersion !== newSourceVersion
    if (outputReapply || tabChange || dsCreated || sourceVerChange) {
      if (curLayer?.dataActionObject) return
      if (!this.dataActionCanLoad) return
      this.updatingTable = true
      this.destoryTable().then(() => {
        this.createTable(dataSource)
      })
      return
    }
    // async click selected
    // Action table does not need to be selected synchronously
    if (!curLayer.dataActionObject && preSelectedIds !== newSelectedIds) {
      if (selectQueryFlag) {
        this.asyncSelectedWhenSelection(newSelectedIds || Immutable([]))
        setTimeout(() => {
          this.asyncSelectedRebuild(dataSource)
        }, 500)
      } else {
        if (selfDsChange) {
          this.setState({ selfDsChange: false })
        } else {
          setTimeout(() => {
            this.asyncSelectedRebuild(dataSource)
          }, 500)
        }
      }
    }
    // update table (exclude view in table)
    if (!curLayer.dataActionObject && this.table?.layer && preSelectedIds === newSelectedIds) {
      this.table.layer.definitionExpression = dsParam.where
    }
  }

  onQueryRequired = (queryRequiredInfo: QueryRequiredInfo) => {
    const { dataSource } = this.state
    const dataSourceId = dataSource?.id
    const needRefresh = queryRequiredInfo?.[dataSourceId]?.needRefresh
    if (needRefresh) {
      this.updatingTable = true
      this.destoryTable().then(() => {
        this.createTable(dataSource)
      })
    }
  }

  getLayerObjectIdField = () => {
    const { dataSource } = this.state
    const objectIdField =
      this.table?.layer?.objectIdField ||
      (dataSource as FeatureLayerDataSource)?.layer?.objectIdField ||
      'OBJECTID'
    return objectIdField
  }

  asyncSelectedWhenSelection = (newSelectedIds: ImmutableArray<string>) => {
    const { dataSource } = this.state
    const objectIdField = this.getLayerObjectIdField()
    const curQuery: any = dataSource && dataSource.getCurrentQueryParams()
    let legal = true
    newSelectedIds.forEach(id => {
      if (!id) legal = false
    })
    const selectedQuery = (newSelectedIds.length > 0 && legal)
      ? `${objectIdField} IN (${newSelectedIds
      .map(id => {
        return id
      })
      .join()})`
      : curQuery.where
    if (this.table && this.table.layer) this.table.layer.definitionExpression = selectedQuery
  }

  getFeatureLayer = (dataSource: QueriableDataSource, dataRecords?: DataRecord[]) => {
    const ds = dataSource as FeatureLayerDataSource
    const notToLoad = dataSource?.getDataSourceJson()?.isDataInDataSourceInstance
    let featureLayer
    if (dataRecords?.length > 0) {
      return dataSourceUtils.createFeatureLayerByRecords(ds, dataRecords as FeatureDataRecord[])
    } else {
      const curQuery: any = dataSource && dataSource.getCurrentQueryParams()
      if (notToLoad) {
        const q: FeatureLayerQueryParams = { returnGeometry: true }
        /**
         * Current data source is selection view and selection view is empty indicate that widget is actually using no_selection now.
         */
        const usingNoSelectionView = ds.dataViewId === CONSTANTS.SELECTION_DATA_VIEW_ID && (!(ds as any).sourceRecords || (ds as any).sourceRecords.length === 0)
        /**
         * If widget is using no_selection view, should use pageSize of the no_selection view to load records.
         */
        if (usingNoSelectionView) {
          const noSelectionView = ds.getMainDataSource().getDataView(CONSTANTS.DATA_VIEW_ID_FOR_NO_SELECTION) as AbstractQueriableDataSource
          if (noSelectionView) {
            q.pageSize = ds.getMainDataSource().getDataSourceJson()?.dataViews?.[CONSTANTS.DATA_VIEW_ID_FOR_NO_SELECTION]?.pageSize
          }
        }
        // chart output and selected features need load
        return ds.query(q).then(async ({ records }) => {
          const dataRecords = await Promise.resolve(records) as FeatureDataRecord[]
          return dataSourceUtils.createFeatureLayerByRecords(ds, dataRecords)
        })
      }
      // Adjust the order, because ds.layer is a reference type that changes the original data
      // csv upload type ds: only have layer, but not itemId and url
      if (!this.FeatureLayer) return Promise.resolve(featureLayer)
      if (ds.itemId) {
        const layerId = parseInt(ds.layerId)
        const layerConfig = {
          portalItem: {
            id: ds.itemId,
            portal: {
              url: ds.portalUrl
            }
          },
          definitionExpression: curQuery.where,
          layerId: layerId || undefined
        }
        if (ds.url) (layerConfig as any).url = ds.url
        featureLayer = new this.FeatureLayer(layerConfig)
      } else if (ds.url) {
        featureLayer = new this.FeatureLayer({
          definitionExpression: curQuery.where,
          url: ds.url
        })
      } else if (ds.layer) {
        return ds.query({ returnGeometry: true }).then(async ({ records }) => {
          const dataRecords = await Promise.resolve(records) as FeatureDataRecord[]
          return dataSourceUtils.createFeatureLayerByRecords(ds, dataRecords)
        })
      } else {
        return Promise.resolve(featureLayer)
      }
    }
    if (notToLoad) { // output ds (dynamic layer, load will rise bug)
      return Promise.resolve(featureLayer)
    } else { // need load to get layer.capabilities
      return featureLayer.load().then(async () => {
        return await Promise.resolve(featureLayer)
      })
    }
  }

  getDsAccessibleInfo (url: string) {
    if (!url) return Promise.resolve(false)
    return fetch(`${url}?f=pjson`).then(async res => await res.json()).then(info => {
      if (Object.keys(info).includes('error')) {
        return false
      } else {
        return true
      }
    })
  }

  getFieldEditable = (layerDefinition, jimuName: string) => {
    const fieldsConfig = layerDefinition?.fields || []
    const orgField = fieldsConfig.find(config => config.name === jimuName)
    const fieldEditable = orgField ? orgField?.editable : true
    return fieldEditable
  }

  dsAsyncSelectTable = (dataSource, selectedItems: DataRecord[] | tableSelectedItem[], rowClick: boolean, versionChangeClear?: boolean) => {
    const { id } = this.props
    const tableInstant = this.table as any
    const objectIdField = this.getLayerObjectIdField()
    const selectedQuery =
      selectedItems && selectedItems.length > 0
        ? `${objectIdField} IN (${selectedItems
            .map(item => {
              if (item.dataSource) {
                return item.getId()
              } else {
                return item.objectId
              }
            })
            .join()})`
        : '1=2'
    if (versionChangeClear) dataSource.clearSelection()
    dataSource
      .query({
        where: selectedQuery,
        returnGeometry: true
      } as QueryParams)
      .then(result => {
        const records = result?.records
        if (records) {
          MessageManager.getInstance().publishMessage(
            new DataRecordsSelectionChangeMessage(id, result.records)
          )
          tableInstant.layer.queryFeatureCount().then(count => {
            count === 0 ? this.setState({ emptyData: true }) : this.setState({ emptyData: false })
          })
          if (records.length > 0) {
            dataSource.selectRecordsByIds(
              records.map(record => record.getId()),
              records
            )
          } else {
            dataSource.clearSelection()
          }
          if (!rowClick) {
            setTimeout(() => {
              this.asyncSelectedRebuild(dataSource)
            }, 500)
          }
        }
      })
  }

  getTableMenuItem = (curLayer: LayersConfig) => {
    let tableMenuItem = []
    if (curLayer.enableSelect) {
      tableMenuItem = tableMenuItem.concat([
        {
          label: this.formatMessage('showSelection'),
          iconClass: 'widget-table-tool-icon-show-selection',
          clickFunction: () => {
            this.onShowSelection()
          }
        },
        {
          label: this.formatMessage('clearSelection'),
          iconClass: 'widget-table-tool-icon-selection-clear',
          clickFunction: () => {
            this.onSelectionClear()
          }
        }
      ])
    }
    if (curLayer.enableRefresh) {
      tableMenuItem.push({
        label: this.formatMessage('refresh'),
        iconClass: 'widget-table-tool-icon-refresh',
        clickFunction: () => {
          this.onTableRefresh()
        }
      })
    }
    tableMenuItem.push({
      label: this.formatMessage('showHideCols'),
      iconClass: 'widget-table-tool-icon-show-hide-cols',
      clickFunction: () => {
        this.popupShowHideCols()
      }
    })
    return tableMenuItem
  }

  isDataSourceAccessible = (dataSourceId: string, isDataAction?: boolean) => {
    const hasInstance = this.dsManager.getDataSource(dataSourceId)
    const dataSourceIsInProps = isDataAction ? hasInstance : (this.props.useDataSources?.filter(useDs => dataSourceId === useDs.dataSourceId).length > 0)
    return dataSourceIsInProps
  }

  createTable = (newDataSource?, versionChange?: boolean) => {
    const { config, id } = this.props
    const { layersConfig } = config
    const { activeTabId, tableShowColumns, selectQueryFlag } = this.state
    let { dataSource } = this.state
    if (!dataSource && newDataSource) dataSource = newDataSource
    if (!dataSource) {
      this.updatingTable = false
      return
    }
    const layerDefinition = (dataSource as FeatureLayerDataSource)?.getLayerDefinition()
    // ds judgment
    if (dataSource?.dataViewId === SELECTION_DATA_VIEW_ID) {
      if (!dataSource?.getDataSourceJson()?.isDataInDataSourceInstance ||
        dataSource?.getSourceRecords().length === 0
      ) {
        this.setState({ emptyTable: true })
        this.dataSourceChange = false
        this.dataActionCanLoad = true
        this.updatingTable = false
        return
      } else {
        this.setState({ emptyTable: false })
      }
    }
    // data-action Table
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    const curLayer = allLayersConfig
      .find(item => item.id === activeTabId)
    if (!curLayer) {
      this.updatingTable = false
      return
    }
    // Determine whether the ds has change to curLayer's ds
    const curDsId = curLayer?.useDataSource?.dataSourceId
    const isCurDs = curDsId === dataSource?.id
    if (!isCurDs) {
      this.updatingTable = false
      return
    }
    const dsId = curLayer.useDataSource?.dataSourceId
    const dataActionObject = curLayer.dataActionObject
    // Check whether ds is available
    if (!this.isDataSourceAccessible(dsId, dataActionObject)) {
      this.setState({ emptyTable: true })
      this.dataSourceChange = false
      this.dataActionCanLoad = true
      this.updatingTable = false
      return
    }
    let container
    if (document.getElementsByClassName(`table-container-${id}`).length === 0) {
      container = document && document.createElement('div')
      container.className = `table-container-${id}`
      this.refs.tableContainer &&
        this.refs.tableContainer.appendChild(container)
    } else {
      container = document.getElementsByClassName(`table-container-${id}`)[0]
    }
    const { allFields } = this.getFieldsFromDatasource()
    const curColumns = tableShowColumns ? tableShowColumns.map(col => { return { jimuName: col.value } }) : curLayer.tableFields
    const invisibleColumns = minusArray(
      allFields,
      curColumns
    ).map(item => {
      return item.jimuName
    })

    const dataRecords = this.dataActionTableRecords[curLayer.id]
    if (dataActionObject) {
      if (dsId) {
        dataSource = this.dsManager.getDataSource(dsId) as QueriableDataSource
      }
    }
    const getPrivilege = () => {
      return privilegeUtils.checkExbAccess(privilegeUtils.CheckTarget.Experience).then(exbAccess => {
        return curLayer.enableEdit && exbAccess?.capabilities?.canEditFeature
      })
    }
    const getLayerAndNewTable = () => {
      const newId = this.currentRequestId + 1
      this.currentRequestId++
      const isSceneLayer = dataSource?.type === AllDataSourceTypes.SceneLayer
      const dataSourceUsed = isSceneLayer ? (dataSource as SceneLayerDataSource).getAssociatedDataSource() : dataSource
      if (dataSourceUsed) {
        const tablePromise = cancelablePromise.cancelable(this.getFeatureLayer(dataSourceUsed, dataRecords).then(async layer => {
          if (newId !== this.currentRequestId || !layer || !this.FeatureTable || !this.refs.currentEl) {
            this.updatingTable = false
            return
          }
          let featureLayer
          if (layer.layer) {
            featureLayer = layer.layer
          } else {
            featureLayer = layer
          }
          // fetch to confirm whether it's a public source
          const accessible = await this.getDsAccessibleInfo(layer?.url)
          // use exb privilege instead of api's supportsUpdateByOthers
          const privilegeEditable = await getPrivilege()
          // if it's not public, use 'privilegeEditable'
          const editable = curLayer.enableEdit && (accessible || privilegeEditable)
          // fieldConfigs: Priority needs to be considered for 'editable'
          const allFieldsSchema = (dataSourceUsed as DataSource)?.getSchema()
          // sort fields
          const queryParams = dataSource?.getCurrentQueryParams()
          const sortFieldsArray = (queryParams as any)?.orderByFields || []
          const sortFields = {}
          sortFieldsArray.forEach((item, index) => {
            const fieldSort = item.split(' ')
            sortFields[fieldSort[0]] = { direction: fieldSort[1]?.toLowerCase(), initialSortOrder: index }
          })

          const fieldConfigs = curLayer.tableFields.map(item => {
            const newItem = allFieldsSchema?.fields?.[item.jimuName]
            return {
              name: item.jimuName,
              label: newItem?.alias,
              ...(editable ? { editable: this.getFieldEditable(layerDefinition, item.jimuName) && item?.editAuthority } : {}),
              visible: invisibleColumns.indexOf(item.jimuName) < 0,
              ...(sortFields[item.jimuName] ? sortFields[item.jimuName] : {})
            }
          })
          // when unselect all fields, do not render table
          if (fieldConfigs?.length === 0) {
            this.dataSourceChange = false
            this.dataActionCanLoad = true
            this.updatingTable = false
            this.setState({ emptyTable: false })
            return
          }
          if (editable) {
            featureLayer.on('edits', function (event) {
              const { addedFeatures, updatedFeatures, deletedFeatures } = event
              // There are no add and delete for now
              const adds = addedFeatures && addedFeatures.length > 0
              const updates = updatedFeatures && updatedFeatures.length > 0
              const deletes = deletedFeatures && deletedFeatures.length > 0
              if (adds || updates || deletes) {
                const updateFeature = event?.edits?.updateFeatures?.[0]
                if (updateFeature) {
                  const record = dataSource.buildRecord(updateFeature)
                  dataSource.afterUpdateRecord(record)
                }
              }
            })
          }
          const dsGdbVersion = (dataSource as FeatureLayerDataSource).getGDBVersion()
          if (dsGdbVersion) featureLayer.gdbVersion = dsGdbVersion
          this.table = new this.FeatureTable({
            layer: featureLayer,
            container: container,
            visibleElements: {
              header: true,
              menu: true,
              menuItems: {
                clearSelection: false,
                refreshData: false,
                toggleColumns: false
              }
            },
            menuConfig: {
              items: this.getTableMenuItem(curLayer)
            },
            fieldConfigs,
            multiSortEnabled: true,
            attachmentsEnabled: curLayer.enableAttachements,
            editingEnabled: editable
          })
          // async selected
          // versionChange need reselect
          if (versionChange) {
            const versionChangeReselect = () => {
              const selectedItems: DataRecord[] = dataSource.getSelectedRecords()
              this.dsAsyncSelectTable(dataSource, selectedItems, false, true)
            }
            versionChangeReselect()
          } else {
            // Action table does not need to be selected synchronously
            if (!dataActionObject) {
              setTimeout(() => {
                if (selectQueryFlag) this.asyncSelectedWhenSelection(Immutable(dataSource.getSelectedRecordIds() || []))
                setTimeout(() => {
                  this.asyncSelectedRebuild(dataSource)
                }, 500)
              }, 500)
            }
          }
          const tableInstant = this.table as any
          tableInstant.grid.visibleElements.selectionColumn = false
          if (curLayer.enableSelect) {
            const rowClickFn = ({ context, native }) => {
              // edit mode cancel row-click
              const clickEditTag = native?.path?.[0]?.nodeName || native?.path?.[0]?.tagName
              if (clickEditTag === 'INPUT' || clickEditTag === 'SELECT') return
              // Delay click function
              clearTimeout(this.timerFn)
              this.timerFn = setTimeout(() => {
                this.setState({ selfDsChange: true })
                const feature = context.item.feature
                if (curLayer.selectMode === SelectionModeType.Single) {
                  this.table.clearSelection()
                }
                context.selected
                  ? this.table.deselectRows(feature)
                  : this.table.selectRows(feature)
                const selectedItems = tableInstant.grid?.selectedItems?.toArray()
                this.dsAsyncSelectTable(dataSource, selectedItems, true)
              }, 200)
            }
            tableInstant.grid.on('row-click', rowClickFn)
          }
          // dblclick cancel click event
          tableInstant?.domNode?.addEventListener('dblclick', eve => {
            clearTimeout(this.timerFn)
          })
          if (!dataRecords) this.updateGeometryAndSql(dataSource)
          this.dataSourceChange = false
          this.dataActionCanLoad = true
          this.updatingTable = false
          this.setState({ emptyTable: false })
        }))
        // cancel previous promise
        if (this.promises.length !== 0) {
          this.promises.forEach(p => p.cancel())
        }
        this.promises.push(tablePromise)
      }
    }
    getLayerAndNewTable()
  }

  asyncSelectedRebuild = (dataSource: QueriableDataSource) => {
    const selectedRecordIds = dataSource?.getSelectedRecordIds()
    this.table?.clearSelection && this.table.clearSelection()
    // Synchronize new selection (the record of selectedRecords has different structure)
    // layer/url ds: the featuresArray's structure is not match the 'deselectRows', use primary id
    if (selectedRecordIds?.length > 0) {
      const featuresArray = []
      selectedRecordIds.forEach(recordId => {
        if (recordId) featuresArray.push(parseInt(recordId))
      })
      this.table?.selectRows && this.table.selectRows(featuresArray)
    }
  }

  async destoryTable () {
    if (this.table) {
      (this.table as any).menu.open = false
      !this.table.destroyed && this.table.destroy()
    }
    return await Promise.resolve()
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: messages[id] },
      values
    )
  }

  onTagClick = (dataSourceId: string) => {
    const { id } = this.props
    this.setState({
      activeTabId: dataSourceId,
      selectQueryFlag: false,
      tableShowColumns: undefined
    })
    this.props.dispatch(
      appActions.widgetStatePropChange(id, 'activeTabId', dataSourceId)
    )
  }

  handleTagChange = evt => {
    const dataSourceId = evt?.target?.value
    const { id } = this.props
    this.setState({
      activeTabId: dataSourceId,
      selectQueryFlag: false
    })
    this.props.dispatch(
      appActions.widgetStatePropChange(id, 'activeTabId', dataSourceId)
    )
  }

  onShowSelection = () => {
    const { dataSource, selectQueryFlag } = this.state
    if (selectQueryFlag) {
      const curQuery: any = dataSource && dataSource.getCurrentQueryParams()
      this.table.layer.definitionExpression = curQuery.where
      this.changeMenuConfig('showSelection')
    } else {
      const selectedArray = (this.table as any).grid.selectedItems.items
      if (selectedArray.length === 0) return
      const objectIdField = this.getLayerObjectIdField()
      const selectedQuery = `${objectIdField} IN (${selectedArray
        .map(item => {
          return item.feature?.attributes[objectIdField] || item.objectId
        })
        .join()})`
      this.table.layer.definitionExpression = selectedQuery
      this.changeMenuConfig('showAll')
    }
    setTimeout(() => {
      this.asyncSelectedRebuild(dataSource)
    }, 500)
    this.setState({ selectQueryFlag: !selectQueryFlag })
  }

  resetTable = () => {
    const { id } = this.props
    const { selectQueryFlag, dataSource } = this.state
    if (selectQueryFlag) {
      this.changeMenuConfig('showSelection')
      // reset sql
      if (this.table?.layer) {
        const curQuery: any = dataSource && dataSource.getCurrentQueryParams()
        this.table.layer.definitionExpression = curQuery.where
      }
      this.setState({
        selectQueryFlag: false,
        selfDsChange: true
      })
    }
    this.setState({ searchText: '' })
    this.table && this.table.clearSelection()
    dataSource.clearSelection()
    dataSource.updateQueryParams({ where: '1=1' } as QueryParams, id)
    MessageManager.getInstance().publishMessage(
      new DataRecordsSelectionChangeMessage(id, [])
    )
  }

  onSelectionClear = () => {
    this.resetTable()
  }

  onTableRefresh = () => {
    const { dataSource } = this.state
    this.table && this.table.refresh()
    setTimeout(() => {
      this.asyncSelectedRebuild(dataSource)
    }, 0)
  }

  changeMenuConfig = (label: 'showSelection' | 'showAll') => {
    const configItems = {
      showSelection: 'widget-table-tool-icon-show-selection',
      showAll: 'widget-table-tool-icon-show-all'
    }
    const menuConfigItems = this.table.menuConfig?.items || []
    if (menuConfigItems.length > 0) {
      menuConfigItems[0].label = this.formatMessage(label)
      menuConfigItems[0].iconClass = configItems[label]
    }
    this.table.menuConfig = {
      items: menuConfigItems
    }
  }

  popupShowHideCols = () => {
    const advancedElement = this.refs.advancedSelect.getElementsByTagName(
      'button'
    )[0]
    advancedElement && advancedElement.click()
  }

  // TODO: use getArcGISSQL to update
  getQueryOptions = (curLayer: LayersConfig) => {
    let options = '1=1'
    const { useDataSources } = this.props
    const { searchText, dataSource } = this.state
    const useDS = useDataSources && useDataSources[0]
    if (!dataSource || !useDS) return null
    // not queryiable data source, return
    if (!(dataSource).query) {
      return null
    }
    if (searchText && curLayer.enableSearch && curLayer.searchFields) {
      options = (options || '1=1') + ' AND '
      const searchSQL = getQuerySQL(searchText, curLayer, dataSource)?.sql
      options += searchSQL
    }
    return { where: options }
  }

  handleChange = (searchText: string) => {
    if (!searchText) {
      this.setState({ searchText, isShowSuggestion: false, searchSuggestion: [] }, () => {
        this.handleSubmit()
      })
    } else {
      this.setState({ searchText, isShowSuggestion: searchText?.length > 2 }, () => {
        clearTimeout(this.suggestionsQueryTimeout)
        this.suggestionsQueryTimeout = setTimeout(() => {
          this.getSearchSuggestions(searchText)
        }, 200)
      })
    }
  }

  getSearchSuggestions = (searchText: string) => {
    const { config } = this.props
    const { dataSource, activeTabId } = this.state
    if (searchText?.length < 3) {
      return false
    }
    const curLayer = config.layersConfig?.find(
      item => item.id === activeTabId
    )
    fetchSuggestionRecords(searchText, curLayer, dataSource).then(
      searchSuggestion => {
        this.setState({ searchSuggestion })
      }
    )
  }

  handleSubmit = () => {
    const { dataSource } = this.state
    const { id } = this.props
    const curLayer = this.props.config.layersConfig.find(
      item => item.id === this.state.activeTabId
    )
    const tableQuery = this.getQueryOptions(curLayer)
    dataSource.updateQueryParams(tableQuery as QueryParams, id)
  }

  onKeyUp = evt => {
    if (!evt || !evt.target) return
    if (evt.key === 'Enter') {
      this.setState({
        isShowSuggestion: false
      }, () => {
        this.handleSubmit()
      })
    }
  }

  getTextInputPrefixElement = () => {
    const { theme } = this.props
    return (
      <Button
        type='tertiary'
        icon
        size='sm'
        onClick={evt => {
          this.setState({
            isShowSuggestion: false
          }, () => {
            this.handleSubmit()
          })
        }}
        className='search-icon'
      >
        <SearchOutlined color={theme.colors.palette.light[800]} />
      </Button>
    )
  }

  renderSearchTools = () => {
    const { searchText, searchToolFlag, isOpenSearchPopper } = this.state
    const { theme } = this.props

    return (
      <div className='table-search-div'>
        {searchToolFlag
          ? (
            <div
              className='float-right'
              ref={ref => (this.refs.searchPopup = ref)}
            >
              <Button
                type='tertiary'
                icon
                size='sm'
                className='tools-menu'
                title={this.formatMessage('search')}
                onClick={evt => {
                  this.setState({ isOpenSearchPopper: !isOpenSearchPopper })
                }}
              >
                <SearchOutlined />
              </Button>
              <Popper
                placement='right-start'
                reference={this.refs.searchPopup}
                offset={[-10, -30]}
                open={isOpenSearchPopper}
                showArrow={false}
                toggle={e => {
                  this.setState({ isOpenSearchPopper: !isOpenSearchPopper })
                }}
              >
                <div className='d-flex align-items-center table-popup-search m-2'>
                  <Button
                    type='tertiary'
                    icon
                    size='sm'
                    onClick={evt => {
                      this.setState({ isOpenSearchPopper: false })
                    }}
                    className='search-back mr-1'
                  >
                    <ArrowLeftOutlined color={theme.colors.palette.dark[800]} />
                  </Button>
                  <TextInput
                    className='popup-search-input'
                    placeholder={this.formatMessage('search')}
                    onChange={e => this.handleChange(e.target.value)}
                    value={searchText || ''}
                    onKeyDown={e => this.onKeyUp(e)}
                    prefix={this.getTextInputPrefixElement()}
                    allowClear
                  />
                </div>
              </Popper>
            </div>
            )
          : (
            <div className='d-flex align-items-center table-search'>
              <TextInput
                className='search-input'
                placeholder={this.formatMessage('search')}
                onChange={e => this.handleChange(e.target.value)}
                value={searchText || ''}
                onKeyDown={e => this.onKeyUp(e)}
                prefix={this.getTextInputPrefixElement()}
                allowClear
              />
            </div>
            )}
      </div>
    )
  }

  getInitFields = () => {
    const { activeTabId } = this.state
    const { config } = this.props
    const { layersConfig } = config
    // data-action Table
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    const curLayer = allLayersConfig.find(item => item.id === activeTabId)
    const { tableFields } = curLayer
    const initSelectTableFields = []
    for (const item of tableFields) {
      initSelectTableFields.push({ value: item.name, label: item.alias })
    }
    return initSelectTableFields
  }

  onValueChangeFromRuntime = (valuePairs: ClauseValuePair[]) => {
    if (!valuePairs) valuePairs = []
    const { tableShowColumns } = this.state
    const initTableFields = this.getInitFields()
    const tableColumns = tableShowColumns || initTableFields
    const selectFlag = valuePairs.length > tableColumns.length
    minusArray(tableColumns, valuePairs, 'value').forEach(item => {
      selectFlag
        ? this.table.showColumn(item.value)
        : this.table.hideColumn(item.value)
    })
    this.setState({ tableShowColumns: valuePairs })
  }

  getDataActionTable = () => {
    const { viewInTableObj } = this.props
    const dataActionTableArray = []
    for (const key in viewInTableObj) {
      const tableObj = viewInTableObj[key]
      this.dataActionTableRecords[key] = tableObj.records
      dataActionTableArray.push({ ...tableObj.daLayerItem })
    }
    return dataActionTableArray
  }

  onCloseTab = (tabId: string, evt?) => {
    const { id, viewInTableObj } = this.props
    if (evt) evt.stopPropagation()
    this.removeConfig = true
    this.setState({ tableShowColumns: undefined })
    const newViewInTableObj = viewInTableObj
    delete newViewInTableObj[tabId]
    delete this.dataActionTableRecords[tabId]
    MutableStoreManager.getInstance().updateStateValue(id, 'viewInTableObj', newViewInTableObj)
  }

  getLoadingStatus = (ds?: QueriableDataSource, queryStatus?: DataSourceStatus) => {
    const { stateShowLoading: mustLoading } = this.props
    // loading
    let showLoading = false
    if (
      mustLoading ||
      window.jimuConfig.isInBuilder ||
      (ds && queryStatus === DataSourceStatus.Loading)
    ) {
      showLoading = true
    }
    return showLoading
  }

  setRefreshLoadingString = (showLoading = false) => {
    if (!showLoading) return false
    let time = 0
    // eslint-disable-next-line
    const _this = this
    clearInterval(this.autoRefreshLoadingTime)

    this.autoRefreshLoadingTime = setInterval(() => {
      time++
      _this.setState({
        autoRefreshLoadingString: _this.getLoadingString(time)
      })
    }, 60000)
  }

  getLoadingString = (time: number): string => {
    let loadingString = this.formatMessage('lastUpdateAFewTime')
    if (time > 1 && time <= 2) {
      loadingString = this.formatMessage('lastUpdateAMinute')
    } else if (time > 2) {
      loadingString = this.formatMessage('lastUpdateTime', { updateTime: time })
    }
    return loadingString
  }

  toggleAutoRefreshLoading = (ds: QueriableDataSource, showLoading: boolean, interval: number) => {
    this.resetAutoRefreshTimes(interval, showLoading)
    if (interval > 0) this.setRefreshLoadingString(showLoading)
  }

  resetAutoRefreshTimes = (interval: number, showLoading = false) => {
    // eslint-disable-next-line
    const _this = this
    clearTimeout(this.resetAutoRefreshTime)
    if (interval <= 0) clearInterval(this.autoRefreshLoadingTime)

    this.resetAutoRefreshTime = setTimeout(() => {
      if (showLoading && interval > 0) {
        _this.setState({
          autoRefreshLoadingString: _this.formatMessage('lastUpdateAFewTime')
        })
      }
      _this.setState({
        showLoading: showLoading
      })
    }, 0)
  }

  renderLoading = (showLoading: boolean, interval: number) => {
    const { autoRefreshLoadingString } = this.state
    return (
      <div className='position-absolute refresh-loading-con d-flex align-items-center'>
        {showLoading && <div className='loading-con' />}
        {interval > 0 && (
          <div className='flex-grow-1 auto-refresh-loading'>
            {autoRefreshLoadingString}
          </div>
        )}
      </div>
    )
  }

  onSuggestionConfirm = suggestion => {
    this.setState({
      searchText: suggestion,
      isShowSuggestion: false
    }, () => {
      this.handleSubmit()
    })
  }

  clearMessageAction = () => {
    MessageManager.getInstance().publishMessage(
      new DataRecordsSelectionChangeMessage(this.props.id, [])
    )
    this.setState({ emptyData: false })
  }

  render () {
    const {
      activeTabId,
      dataSource,
      selectQueryFlag,
      tableShowColumns,
      mobileFlag,
      emptyTable,
      selectRecords,
      notReady,
      advancedTableField,
      showLoading,
      interval,
      isShowSuggestion,
      searchSuggestion
    } = this.state
    const { config, id, theme, isRTL, enableDataAction, isHeightAuto, isWidthAuto } = this.props
    const { layersConfig, arrangeType } = config
    // data-action Table
    const daLayersConfig = this.getDataActionTable()
    const allLayersConfig = layersConfig.asMutable({ deep: true }).concat(daLayersConfig)
    let useDataSource
    const curLayer = allLayersConfig.find(item => item.id === activeTabId)
    if (allLayersConfig.length > 0) {
      useDataSource = curLayer
        ? curLayer.useDataSource
        : allLayersConfig[0].useDataSource
    }
    const classes = classNames(
      'jimu-widget',
      'widget-table',
      'surface-1',
      'table-widget-' + id
    )

    if (!useDataSource) {
      return (
        <WidgetPlaceholder
          widgetId={id}
          iconSize='large'
          style={{ position: 'absolute', left: 0, top: 0 }}
          icon={tablePlaceholderIcon}
          data-testid='tablePlaceholder'
        />
      )
    }

    const horizontalTag = arrangeType === TableArrangeType.Tabs
    const initSelectTableFields = this.getInitFields()
    const dataSourceLabel = dataSource?.getLabel()
    const outputDsWidgetId = appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
    const appConfig = getAppStore().getState()?.appConfig
    const widgetLabel = appConfig?.widgets?.[outputDsWidgetId]?.label
    const dataName = this.formatMessage('tableDataActionLabel', { layer: dataSourceLabel || '' })
    const hasSelected = dataSource?.getSelectedRecords()?.length > 0
    const partProps = { id, enableDataAction, isHeightAuto, isWidthAuto }
    const searchOn = curLayer.enableSearch && curLayer.searchFields

    return (
      <div className={classes} css={getStyle(theme, mobileFlag, partProps)} ref={el => (this.refs.currentEl = el)}>
        <div className='table-indent'>
          <div
            className={`d-flex ${
              horizontalTag ? 'horizontal-tag-list' : 'dropdown-tag-list'
            }`}
          >
            {/* someting wrong in lint check for Tabs */}
            {horizontalTag
              ? (
                <Tabs type='underline' onChange={this.onTagClick} className='tab-flex' value={activeTabId} onClose={this.onCloseTab} scrollable>
                  {
                    allLayersConfig.map(item => {
                      const isDataAction = !!item.dataActionObject
                      return (
                        <Tab
                          key={item.id}
                          id={item.id}
                          title={item.name}
                          className='text-truncate tag-size'
                          closeable={isDataAction}
                        >
                          <div className='mt-2' />
                        </Tab>
                      )
                    }) as any
                  }
                </Tabs>
                )
              : (
                <Select
                  size='sm'
                  value={activeTabId}
                  onChange={this.handleTagChange}
                  className='top-drop'
                >
                  {allLayersConfig.map(item => {
                    return (
                      <option key={item.id} value={item.id} title={item.name}>
                        <div className='table-action-option'>
                          <div className='table-action-option-tab' title={item.name}>{item.name}</div>
                          {item.dataActionObject &&
                          <div className='table-action-option-close'>
                            <Button
                              size='sm'
                              icon
                              type='tertiary'
                              onClick={(evt) => this.onCloseTab(item.id, evt)}
                            >
                              <CloseOutlined size='s' />
                            </Button>
                          </div>
                          }
                        </div>
                      </option>
                    )
                  })}
                </Select>
                )}
          </div>
          <div
            className={`${
              arrangeType === TableArrangeType.Tabs
                ? 'horizontal-render-con'
                : 'dropdown-render-con'
            }`}
          >
            {searchOn && this.renderSearchTools()}
            {searchOn &&
              <div ref='suggestPopup' style={{ position: 'relative', top: 25 }}>
                <Popper
                  css={getSuggestionStyle()}
                  placement='bottom-start'
                  reference={this.refs.suggestPopup}
                  offset={[0, 8]}
                  open={isShowSuggestion}
                  trapFocus={false}
                  autoFocus={false}
                  toggle={e => {
                    this.setState({ isShowSuggestion: !isShowSuggestion })
                  }}
                >
                  {searchSuggestion.map((suggestion, index) => {
                    const suggestionHtml = sanitizer.sanitize(
                      suggestion.suggestionHtml
                    )
                    return (
                      <Button
                        key={index}
                        type='secondary'
                        size='sm'
                        onClick={() => this.onSuggestionConfirm(suggestion.suggestion)}
                        dangerouslySetInnerHTML={{ __html: suggestionHtml }}
                      />
                    )
                  })}
                </Popper>
              </div>
            }
            {dataSource && mobileFlag && selectRecords && enableDataAction && !emptyTable &&
              <div className='horizontal-action-dropdown'>
                <DataActionDropDown
                  dataName={dataName}
                  widgetId={id}
                  dataSource={dataSource}
                  records={selectRecords}
                />
              </div>
            }
            <div className='top-button-list'>
              {/* {curLayer.allowCsv &&
                <Dropdown className="csv-dropdown-con ml-2">
                  <DropdownButton size="sm" arrow={true} type="default" title={this.formatMessage('downloadCsv')}>
                    {this.formatMessage('downloadCsv')}
                  </DropdownButton>
                  <DropdownMenu>
                    <DropdownItem title={this.formatMessage('exportAll')} onClick={this.handleExportCSVAll}>
                      {this.formatMessage('exportAll')}
                    </DropdownItem>
                    <DropdownItem title={this.formatMessage('exportSelected')} onClick={this.handleExportCSVSelected}>
                      {this.formatMessage('exportSelected')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              } */}
              {curLayer.enableSelect && (
                <div className='top-button ml-2'>
                  <Button
                    size='sm'
                    onClick={this.onShowSelection}
                    icon
                    title={
                      selectQueryFlag
                        ? this.formatMessage('showAll')
                        : this.formatMessage('showSelection')
                    }
                    disabled={emptyTable || !hasSelected}
                  >
                    {selectQueryFlag ? <MenuOutlined /> : (isRTL ? <ShowSelectionRtlOutlined/> : <ShowSelectionOutlined/>)}
                  </Button>
                </div>
              )}
              {curLayer.enableSelect && (
                <div className='top-button ml-2'>
                  <Button
                    size='sm'
                    onClick={this.onSelectionClear}
                    icon
                    title={this.formatMessage('clearSelection')}
                    disabled={emptyTable || !hasSelected}
                  >
                    <TrashCheckOutlined />
                  </Button>
                </div>
              )}
              {curLayer.enableRefresh && (
                <div className='top-button ml-2'>
                  <Button
                    size='sm'
                    onClick={this.onTableRefresh}
                    icon
                    title={this.formatMessage('refresh')}
                    disabled={emptyTable}
                  >
                    <RefreshOutlined />
                  </Button>
                </div>
              )}
              <div className='top-button ml-2'>
                <Button
                  size='sm'
                  onClick={this.popupShowHideCols}
                  icon
                  title={this.formatMessage('showHideCols')}
                  disabled={emptyTable}
                >
                  <ListVisibleOutlined />
                </Button>
              </div>
              {dataSource && !mobileFlag && selectRecords && enableDataAction && !emptyTable &&
                <React.Fragment>
                  <span className='tool-dividing-line'></span>
                  <div className='top-button data-action-btn'>
                    <DataActionDropDown
                      dataName={dataName}
                      widgetId={id}
                      dataSource={dataSource}
                      records={selectRecords}
                    />
                  </div>
                </React.Fragment>
              }
            </div>
            {dataSource && (
              <div ref='advancedSelect' className='adv-select-con'>
                <AdvancedSelect
                  fluid
                  staticValues={advancedTableField}
                  sortValuesByLabel={false}
                  isMultiple
                  selectedValues={tableShowColumns || initSelectTableFields}
                  isEmptyOptionHidden={false}
                  onChange={this.onValueChangeFromRuntime}
                />
              </div>
            )}
            {emptyTable &&
              <div className='placeholder-table-con'>
                <WidgetPlaceholder
                  icon={require('./assets/icon.svg')}
                  message={this.formatMessage('noData')}
                />
                {notReady &&
                  <div className='placeholder-alert-con'>
                    <Alert
                      form='tooltip'
                      size='small'
                      type='warning'
                      text={this.formatMessage('outputDataIsNotGenerated', { outputDsLabel: dataSourceLabel, sourceWidgetName: widgetLabel })}
                    />
                  </div>
                }
              </div>
            }
            {/* Hide the Reset button temporarily */}
            {/* {emptyData &&
              <div className='placeholder-reset-con'>
                <WidgetPlaceholder
                  icon={warningIcon}
                  message={this.formatMessage('noData')}
                />
                <Button
                  className="placeholder-reset-button"
                  size='sm'
                  title={this.formatMessage('reset')}
                  onClick={this.clearMessageAction}
                >
                  {this.formatMessage('reset')}
                </Button>
              </div>
            } */}
            <div ref='tableContainer' className='table-con' />
            {(showLoading || interval > 0) && this.renderLoading(showLoading, interval)}
            <div className='ds-container'>
              <DataSourceComponent
                widgetId={id}
                useDataSource={Immutable(useDataSource)}
                onDataSourceCreated={this.onDataSourceCreated}
                onDataSourceInfoChange={this.onDataSourceInfoChange}
                onQueryRequired={this.onQueryRequired}
              />
            </div>
            <Global styles={getGlobalTableTools(theme, isRTL)} />
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={this.debounceOnResize}
            />
          </div>
        </div>
      </div>
    )
  }
}
