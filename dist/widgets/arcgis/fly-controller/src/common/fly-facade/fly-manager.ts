// for runtime & setting executive fly control
// (create, fly, stop....)

// route management: play , preview all, getDelay...
// managment current flyFacade

import { JimuMapView, JimuMapViewGroup } from 'jimu-arcgis'
import {
  IMConfig, FlyItemMode,
  RouteItemConfig, ItemsType
} from '../../config'
import { FlyStateChangeCallbacks, ControllerMode } from './controllers/base-fly-controller'
import { LiveviewSettingOptions } from './controllers/common/liveview-setting'
import Routes, { RouteConfig } from './route/routes'
import Record, { RecordConfig, StoredGraphicsType } from './route/record/record'
import { isDefined, removeJimuMapIdForFly, getRecordConfigByIds } from '../utils/utils'
import { GraphicsInfo } from '../constraints'
import TerrainLoadingHelper from './helpers/terrain-loading-helper'

export interface ItemData {
  config: ItemsType
  routes: Routes
}

export interface FlyIds {
  routeUuid: string
  recordUuid?: string
}

export interface UiLoadingCallbacks {
  onLoading: (() => void)
  onLoaded: (() => void)
}

// play route/record
export interface PrepareCmdOptions {
  ids: FlyIds
  animate?: boolean
  isBuilderSettingFlag?: boolean
  waittingForTerrain?: boolean
}
export interface FlyCmdOptions {
  ids: FlyIds
  settingSpeed: number
  // isSettingMode: boolean,
  isPreviewSpecifiedRecord: boolean
}

interface FlyManagerOptions {
  widgetConfig: IMConfig
  isBuilderSettingFlag: boolean// is in Builder's Setting
  jimuMapView: JimuMapView
  viewGroup: JimuMapViewGroup

  uiLoadingCallbacks?: UiLoadingCallbacks
  flyStateCallbacks: FlyStateChangeCallbacks

  drawOrUpdateGraphics: (recordConfig: RecordConfig) => GraphicsInfo
  highlightGraphics: (graphics: __esri.Graphic[]) => void

  onItemsUpdate: (items: ItemData[]) => void

  onBeforeSwitchMap: () => void
  onTerrainLoaded: () => void
}

export default class FlyManager {
  isBuilderSettingFlag: boolean
  jimuMapView: JimuMapView
  viewGroup: JimuMapViewGroup
  sceneView: __esri.SceneView
  uiLoadingCallbacks: UiLoadingCallbacks
  flyStateCallbacks: FlyStateChangeCallbacks
  drawOrUpdateGraphics: (recordConfig: RecordConfig) => GraphicsInfo
  highlightGraphics: (graphics: __esri.Graphic[]) => void
  onItemsUpdate: (items: ItemData[]) => void
  onBeforeSwitchMap: () => void

  terrainLoadingHelper: TerrainLoadingHelper
  onTerrainLoaded: () => void

  itemsList: ItemData[]
  activedItem: ItemData// only 1 item.routes actived

  constructor (options: FlyManagerOptions) {
    this.stop()

    // TerrainLoadingHelper
    this.onTerrainLoaded = options.onTerrainLoaded
    // callbacks
    this.onBeforeSwitchMap = options.onBeforeSwitchMap
    this.drawOrUpdateGraphics = options.drawOrUpdateGraphics
    this.highlightGraphics = options.highlightGraphics
    this.onItemsUpdate = options.onItemsUpdate

    this.isBuilderSettingFlag = options.isBuilderSettingFlag// in setting mode, highlight timing is different

    this.updateViewGroup(options.viewGroup)
    this.updateJimuMapView(options.jimuMapView)

    this.uiLoadingCallbacks = options.uiLoadingCallbacks
    this.flyStateCallbacks = options.flyStateCallbacks

    this.updateItems(options.widgetConfig)
  }

  updateViewGroup (viewGroup: JimuMapViewGroup): void {
    // this.stop();
    this.viewGroup = viewGroup
  }

  // TODO need to re setupFly()
  // updateViewGroup is faster then updateJimuMapView, in jimuMap
  updateJimuMapView (jimuMapView: JimuMapView): void {
    // this.stop();
    this.jimuMapView = jimuMapView
    this.sceneView = this.jimuMapView?.view as __esri.SceneView // 3d scene;

    const activedItem = this.getActiveItem()
    if (isDefined(activedItem?.routes)) {
      activedItem?.routes.handleUpdateJimuMapView(jimuMapView)
    }

    this.getTerrainLoadingHelper(this.sceneView, this.onTerrainLoaded)
  }

  updateItems (config: IMConfig): void {
    this.itemsList = []
    const list: ItemsType[] = config.itemsList.asMutable({ deep: true })

    for (const item of list) {
      if (item.isInUse) {
        this.itemsList.push({
          config: item,
          routes: null // empty array at first, when draw/pick/select then create routes
        })
      }
    }

    if (typeof this.onItemsUpdate === 'function') {
      this.onItemsUpdate(this.itemsList)
    }
  }

  destructor (): void {
    this.stop()
    // this.clearAll();
  }

  // items
  findItemByUuid (uuid: string): ItemData {
    let found = null
    found = this.itemsList?.find((item) => (item.config.uuid === uuid))
    return found
  }

  findFirstUsedItem = (): ItemData => {
    for (let i = 0, len = this.itemsList.length; i < len; i++) {
      const item = this.itemsList[i]
      if (item.config.isInUse) {
        return item
      }
    }
    return { config: null, routes: null }
  }

  findFirstRouteItem = (): ItemData => {
    for (const item of this.itemsList) {
      if (item.config.isInUse && FlyItemMode.Route === item.config.name) {
        return item
      }
    }
    return { config: null, routes: null }
  }

  _findItemIdx = (uuid: string): number => {
    return this.itemsList.findIndex((item) => (item.config.uuid === uuid))
  }

  // items data
  getActiveItem = (): ItemData => {
    return this.activedItem
  }

  getActiveItemConfig = (): ItemsType => {
    return this.activedItem?.config
  }

  getFlyStyle = (): FlyItemMode => {
    return this.activedItem?.config.name
  }

  // getRecordFlyModeConfigByflyModeIdx = (flyModeIdx: number): RouteItemConfig => {
  //   const flyModeConfig = this.props.config.itemsList.asMutable({ deep: true });
  //   const recordsConfig = flyModeConfig[flyModeIdx] as RouteItemConfig;
  //   return recordsConfig
  // }
  getRouteByIdx = (ids: FlyIds): Routes => {
    const item = this.getActiveItem()
    return item.routes
  }

  getRouteConfigByIdx = (ids: FlyIds): RouteConfig => {
    const itemConfig = this.getActiveItemConfig() as RouteItemConfig
    const route = itemConfig?.routes?.find(route => (route.idx === ids.routeUuid))
    return route
  }

  getRecordConfigByIds = (ids: FlyIds): RecordConfig => {
    const itemConfig = this.getActiveItemConfig() as RouteItemConfig
    const route = itemConfig.routes
    const record = getRecordConfigByIds(route, ids)

    return record
  }

  getRecordByIds = (ids: FlyIds): Record => {
    const record = this.activedItem.routes?.record
    if (ids.recordUuid === record?.getConfig().idx) {
      return record
    } else {
      return null
    }
  }

  // register
  registerItem (uuid: string): void {
    const itemConfig = this.findItemByUuid(uuid)
    this.activedItem = itemConfig
  }

  unRegisterItem (): void {
    if (this.activedItem?.routes) {
      this.activedItem.routes.destructor()
    }
    this.activedItem = null
  }

  getControllerTypeByItemData (itemConfig: ItemsType): ControllerMode {
    let type
    if (itemConfig.name === FlyItemMode.Rotate) {
      type = ControllerMode.Rotate
    } else if (itemConfig.name === FlyItemMode.Path) {
      type = (itemConfig).style
    }

    return type
  }

  // gen a Controller by draw/pick
  // timing: draw or pick a Graphic
  // 1. runtime interactive-panel.tsx :: handleGraphicsUpdateHanlder()
  // 2. setting action-panel.tsx :: addPointRecord()/addPathRecord()
  buildTemporaryRecordConfig (graphicsInfo: GraphicsInfo, cameraInfo: __esri.Camera, jimuMapView: JimuMapView): RecordConfig {
    const item = this.getActiveItemConfig()
    const flyStyle = this.getFlyStyle()

    let recordConfigType
    if (flyStyle === FlyItemMode.Rotate) {
      recordConfigType = ControllerMode.Rotate
    } else if (flyStyle === FlyItemMode.Path) {
      recordConfigType = this.getControllerTypeByItemData(item)
    }

    const recordConfig: RecordConfig = {
      idx: null,
      type: recordConfigType,
      displayName: 'runtime',
      duration: null,
      startDelay: null,
      endDelay: null,
      angle: null,
      controllerConfig: {
        cameraInfo: cameraInfo,
        liveviewSettingState: null
      },
      direction: item.direction,
      storedGraphicsInfo: {
        type: StoredGraphicsType.RawData,
        rawData: graphicsInfo.getConfig()
      },
      mapViewId: jimuMapView.id
    }

    return recordConfig
  }

  async buildTemporaryRecord (recordConfig: RecordConfig, sceneView: __esri.SceneView, flyCallbacks: FlyStateChangeCallbacks,
    graphicsInfoRef: GraphicsInfo): Promise<Record> {
    const tmpRecord = await new Record().setup(recordConfig, sceneView, flyCallbacks)

    if (isDefined(graphicsInfoRef)) {
      tmpRecord.setGraphicsInfo(graphicsInfoRef)// tmpRecord.cachingGraphicsInfo = graphicsInfoRef;
    }

    return tmpRecord
  }

  // Route
  isUesRouteFlyMode = (): boolean => {
    const itemConfig = this.getActiveItemConfig()
    return (itemConfig?.name === FlyItemMode.Route)
  }

  async prepareRoutePreview (ids: FlyIds, flyCallbacks?: FlyStateChangeCallbacks): Promise<boolean> {
    if (!this.isUesRouteFlyMode()) {
      return false
    }
    // await this.stop();
    const item = this.getActiveItem()
    await this.setupFly(item.config, null, flyCallbacks ?? this.flyStateCallbacks)

    return await this.prepare({ ids: { routeUuid: ids.routeUuid }, waittingForTerrain: false })
  }

  async previewSpecifiedRoute (settingSpeed: number, ids: FlyIds, flyCallbacks?: FlyStateChangeCallbacks): Promise<any> {
    if (!this.isUesRouteFlyMode()) {
      return
    }
    const item = this.getActiveItem()
    const updatedFlyCallbacks = flyCallbacks ?? this.flyStateCallbacks
    if (!isDefined(item.routes)) {
      await this.prepareRoutePreview(ids, updatedFlyCallbacks)
    }
    await this.fly({ ids: ids, settingSpeed: settingSpeed, isPreviewSpecifiedRecord: false }, updatedFlyCallbacks)
  }

  // record
  async previewSpecifiedRecord (ids: FlyIds, flyCallbacks: FlyStateChangeCallbacks): Promise<any> {
    if (!this.isUesRouteFlyMode()) {
      return
    }

    const { isCanPlay/*, hadSwitchedMap */ } = await this.checkAndSwitchJimuMapBeforePlay(ids)
    if (!isCanPlay) {
      return
    }

    const item = this.getActiveItem()
    await this.setupFly(item.config, null, flyCallbacks)
    const prepared = await this.prepare({ ids: ids, isBuilderSettingFlag: this.isBuilderSettingFlag })
    if (prepared) {
      await this.fly({ ids: ids, settingSpeed: null, isPreviewSpecifiedRecord: true })
    }
  }

  // setting L3 page
  async setIsLiveviewSpecifiedRecord (ids: FlyIds, isOpen: boolean): Promise<any> {
    if (!this.isUesRouteFlyMode()) {
      return
    }

    const item = this.getActiveItem()
    if (!isDefined(item.routes)) {
      await this.setupFly(item.config, null)
      await this.prepare({ ids: ids, animate: false })// no animate
    }
    await this.setIsLiveview(isOpen, ids)

    if (isOpen) {
      const liveviewInfo = await this.getLiveviewSettingInfo()
      this.onLiveviewParamChange(liveviewInfo, { isNeedHighlight: true })
    }
  }

  // loading
  loadingForUI (uiLoadingCallbacks?: UiLoadingCallbacks): void {
    const callbacks = uiLoadingCallbacks ?? this.uiLoadingCallbacks
    if (typeof callbacks.onLoading === 'function') {
      callbacks.onLoading()
    }
  }

  loadedForUI (uiLoadingCallbacks?: UiLoadingCallbacks): void {
    const callbacks = uiLoadingCallbacks ?? this.uiLoadingCallbacks
    if (typeof callbacks.onLoaded === 'function') {
      callbacks.onLoaded()
    }
  }

  // fly life circle
  async setupFly (itemConfig: ItemsType, recordConfig: RecordConfig, flyCallbacks?: FlyStateChangeCallbacks, record?: Record): Promise<ItemData> {
    const activedItem = this.getActiveItem()
    if (activedItem.routes) {
      activedItem.routes.destructor()
    }

    const flyStateCallbacks = flyCallbacks ?? this.flyStateCallbacks
    activedItem.routes = await new Routes().setup(itemConfig, recordConfig,
      this.jimuMapView, flyStateCallbacks,
      this.drawOrUpdateGraphics, this.highlightGraphics,
      this.checkAndSwitchJimuMapBeforePlay, this.getCurrentSceneView,
      record)

    return activedItem
  }

  async prepare (prepareCmdOpts: PrepareCmdOptions): Promise<boolean> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    return await item.routes?.prepare(prepareCmdOpts)
  }

  async fly (flyCmdOptions: FlyCmdOptions, flyCallbacks?: FlyStateChangeCallbacks): Promise<any> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    if (flyCallbacks) {
      item.routes?.handleUpdateFlyCallbacks(flyCallbacks)
    }

    await item.routes?.fly(flyCmdOptions)
  }

  async pause (): Promise<any> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    await item.routes?.pause()
  }

  async stop (opts: { isUpdate?: boolean } = { isUpdate: false }): Promise<any> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    await item.routes?.stop(opts.isUpdate)
  }

  // life cycle
  getProgress (): void {
    // let flyController = this.getController();
    // if(FlyItemMode.RecordConfig !== flyController?.flyStyle) {
    //   return flyController.getProgress();
    // }
  }

  clear = (): void => {
    // let flyController = this.getController();
    // if (flyController) {
    //   if(FlyItemMode.RecordConfig !== flyController?.flyStyle) {
    //     flyController.clear();
    //   }
    // }
  }

  // 3. liveView
  // async
  getLiveviewSettingInfo (): LiveviewSettingOptions {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    return item.routes.getLiveviewSettingInfo()
  }

  // Duration
  getDefaultDuration (): number {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    return item.routes?.getDefaultDuration()
  }

  async setIsLiveview (isSetting: boolean, ids?: FlyIds): Promise<boolean> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    return await item.routes.setIsLiveview(isSetting, ids)
  }

  async onLiveviewParamChange (settingParamObj: LiveviewSettingOptions, opts?: { isUpdateLine?: boolean, isNeedHighlight?: boolean }): Promise<any> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    await item.routes?.setLiveviewSettingInfo(settingParamObj, opts)
  }

  async setSpeedFactor (val: number): Promise<any> {
    const item = this.getActiveItem()
    if (!isDefined(item)) {
      return null
    }

    await item.routes?.setSpeedFactor(val)
  }

  /// //////////////////////////////////////////////////////
  // group
  checkAndSwitchJimuMapBeforePlay = async (ids: FlyIds): Promise<{ isCanPlay: boolean, hadSwitchedMap: boolean }> => {
    const record = this.getRecordConfigByIds(ids)
    if (!isDefined(record)) {
      return { isCanPlay: false, hadSwitchedMap: false }
    }

    const isInGroup = this.isJimuMapViewInGroup(record.mapViewId)
    const isCurrentJimuMap = this.isCurrentJimuMap(record)
    if (isCurrentJimuMap) {
      return { isCanPlay: true, hadSwitchedMap: false }
    } else if (isInGroup) {
      if (!isCurrentJimuMap) {
        this.onBeforeSwitchMap()
        await this.viewGroup.switchMap()
        return { isCanPlay: true, hadSwitchedMap: true }
      } else {
        return { isCanPlay: true, hadSwitchedMap: false }
      }
    } else {
      console.error('FlyManager.checkAndSwitchJimuMapBeforePlay: this RecordConfig can\'t fly in this JimuMap')
      return { isCanPlay: false, hadSwitchedMap: false }// other's condition can't fly
    }
  }

  isRecordCanPlay = (record: RecordConfig): boolean => {
    const isInGroup = this.isJimuMapViewInGroup(record.mapViewId)
    const isCurrentJimuMap = this.isCurrentJimuMap(record)
    if (isCurrentJimuMap) {
      return true
    } else if (isInGroup) {
      if (!isCurrentJimuMap) {
        return true
      } else {
        return true
      }
    } else {
      console.error('FlyManager.isRecordCanPlay: this RecordConfig can\'t fly in this JimuMap')
      return false// other's condition can't fly
    }
  }

  isJimuMapViewInGroup = (jimuMapViewsId?: string): boolean => {
    let jimuMapId = jimuMapViewsId ?? this.jimuMapView.id
    jimuMapId = removeJimuMapIdForFly(jimuMapId)

    const jimuMapViewKeysInGroup = Object.keys(this.viewGroup?.jimuMapViews)
    const found = jimuMapViewKeysInGroup.find(mapViewId => removeJimuMapIdForFly(mapViewId) === jimuMapId)
    // const view = this.viewGroup?.jimuMapViews[jimuMapId]
    if (isDefined(found)) {
      return true
    } else {
      return false
    }
  }

  isCurrentJimuMap = (record: RecordConfig): boolean => {
    return (record.mapViewId === removeJimuMapIdForFly(this.jimuMapView?.id))
  }

  getCurrentSceneView = (): __esri.SceneView => {
    return this.sceneView
  }

  // TerrainLoadingHelper
  async getTerrainLoadingHelper (sceneView: __esri.SceneView, onTerrainLoaded) {
    this.terrainLoadingHelper = await new TerrainLoadingHelper().setup({ sceneView: sceneView, onTerrainLoaded: onTerrainLoaded })
  }
}
