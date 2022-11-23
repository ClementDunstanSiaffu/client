// record = config + controller

// 0. static buildDefaultRecordConfig config
// 1. gen Record object

import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { FlyStateChangeCallbacks, ControllerConfig, prepareOptions, flyOptions, InitParams, ControllerMode } from '../../controllers/base-fly-controller'
import ControllerFactory, { FlyControllerImp } from '../../controllers/controller-factory'
import { GraphicsInfo, GraphicsInfoConfig, LiveviewSettingOptions } from '../../../../common/constraints'
import { isDefined } from '../../../utils/utils'
import { RotateDirection, PathDirection } from '../../../../config'

export type RecordConfig = (RotateRecordConfig | PathRecordConfig)
export interface RotateRecordConfig {
  idx: string
  type: ControllerMode.Rotate
  displayName: string

  duration: number
  startDelay: number
  endDelay: number
  angle: number

  controllerConfig: ControllerConfig
  direction: RotateDirection

  storedGraphicsInfo: StoredGraphicsInfo

  mapViewId: string// jimumapViewId
}
export type PathType = (ControllerMode.Smoothed | ControllerMode.RealPath)
export interface PathRecordConfig {
  idx: string
  type: PathType
  displayName: string

  duration: number
  startDelay: number
  endDelay: number
  // altitude: number;
  controllerConfig: ControllerConfig
  direction: PathDirection

  storedGraphicsInfo: StoredGraphicsInfo

  mapViewId: string
}

// StoredGraphics
export enum StoredGraphicsType {
  RawData = 'rawData',
  DsInfo = 'dsInfo'// for picking bigData geo: e.g. line with too many poits
}
export interface StoredGraphicsInfo {
  type: StoredGraphicsType
  // 1: simple geo data
  rawData?: GraphicsInfoConfig// mapPoint(hitPoint) or line
  // 2: ids for DS query(for bigData geo)
  dsInfo?: {
    mapDsId: string
    layerId: string
    // use config query: MapDS.getDataSourceByLayer()
    // save to config: dataSourceUtils.getJSAPILayerBySublayer(layer)
    layerOfSubLayerId: string// 1. in group layers is layerId, 2.in map services is subLayerId
    featureId: string
  }
}

export default class Record {
  Geometry: typeof __esri.Geometry = null
  Graphic: typeof __esri.Graphic = null

  private recordConfig: RecordConfig

  // runtime
  sceneView: __esri.SceneView
  flyCallbacks: FlyStateChangeCallbacks
  cachingGraphicsInfo: GraphicsInfo
  // flyImp
  controller: FlyControllerImp// only 1

  // constructor()
  async setup (recordConfig: RecordConfig, sceneView: __esri.SceneView, flyCallbacks: FlyStateChangeCallbacks): Promise<Record> {
    await loadArcGISJSAPIModules([
      'esri/geometry',
      'esri/Graphic'
    ]).then(async (modules) => {
      [this.Geometry, this.Graphic] = modules

      this.recordConfig = recordConfig
      // runtime
      this.sceneView = sceneView
      this.flyCallbacks = flyCallbacks
      this.controller = null

      const type = this.recordConfig.type
      switch (type) {
        case ControllerMode.Rotate:
        case ControllerMode.RealPath:
        case ControllerMode.Smoothed: {
          // RawData//9.2 support rawData only
          let geo
          if (recordConfig.storedGraphicsInfo?.type === StoredGraphicsType.RawData) {
            const graphics = recordConfig.storedGraphicsInfo.rawData.graphics
            geo = this.Graphic.fromJSON(graphics[0]).geometry
          }

          const controllerInitParams: InitParams = {
            id: recordConfig.idx,
            type: recordConfig.type,
            geometry: geo,
            direction: recordConfig.direction,
            config: {
              cameraInfo: recordConfig.controllerConfig?.cameraInfo,
              liveviewSettingState: recordConfig.controllerConfig?.liveviewSettingState
            },
            sceneView: sceneView,
            flyCallbacks: flyCallbacks
          }

          this.controller = await ControllerFactory.make(controllerInitParams)
          break
        }

        default: {
          console.error('error type: ', type)
        }
      }
    })
    return this
  }

  destructor (): void {
    this.controller?.destructor()
    this.controller = null

    this.recordConfig = null
  }

  // setConfig(controllerConfig: ControllerConfig): void {
  //   this.cameraInfo = controllerConfig.cameraInfo
  //   this.liveviewSetting.setState(controllerConfig.liveviewSettingState)
  // }
  getConfig (): RecordConfig {
    // update controller config
    this.recordConfig.controllerConfig = this.controller.getConfig()

    // update line duration
    if ((isNaN(this.recordConfig.duration) || this.recordConfig.duration < 0) && // have not set
      (this.controller?.animate.state.amount >= 0)) { // has be calculated
      this.recordConfig.duration = this.controller.animate.getDuration() / 1000
    }

    // update GraphicsInfo
    if (this.cachingGraphicsInfo) {
      this.recordConfig.storedGraphicsInfo.rawData = this.cachingGraphicsInfo.getConfig()
    }
    return this.recordConfig
  }

  // controller's life circle
  async prepare (opts?: prepareOptions): Promise<boolean> {
    if (isDefined(opts) && !isDefined(opts.animate)) {
      Object.assign(opts, { animate: true })// default is true
    }

    return await this.controller?.prepare(opts)
  }

  async fly (opts?: flyOptions): Promise<any> {
    if (!isDefined(opts.animate)) {
      Object.assign(opts, { animate: true })// default is true
    }

    await this.controller?.fly(opts)
  }

  async pause (): Promise<boolean> {
    return await this.controller?.pause()
  }

  async stop (): Promise<any> {
    await this.controller?.stop()
  }

  // graphics
  setGraphicsInfo (graphicsInfo: GraphicsInfo): void {
    this.cachingGraphicsInfo = graphicsInfo
  }

  getGraphicsInfo (): GraphicsInfo {
    return this.cachingGraphicsInfo // this.controller?.getCachedGraphics()
  }

  // liveview
  setSpeedFactor (val: number): void {
    return this.controller?.liveviewSetting.setSpeedFactor(val)
  }

  async setIsLiveview (isSetting: boolean): Promise<boolean> {
    return await this.controller.setIsLiveview(isSetting)
  }

  async setLiveviewSettingInfo (settingParamObj: LiveviewSettingOptions): Promise<any> {
    // this.recordConfig.liveviewSettingState.fixAltitude = settingParamObj.altitude
    // this.recordConfig.liveviewSettingState.fixTilt =settingParamObj.tilt
    return await this.controller.setLiveviewSettingInfo(settingParamObj)
  }

  getLiveviewSettingInfo (): LiveviewSettingOptions {
    return this.controller?.getLiveviewSettingInfo()
  }

  getDefaultDuration (): number {
    return this.controller.getDefaultDuration()
  }
}
