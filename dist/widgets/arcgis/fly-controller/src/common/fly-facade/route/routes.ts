
// 0. Facade for fly styles (point, path, route)
// 1. endDelay & Dynamically generate Record
// 2. play RouteTasks

import {
  FlyItemMode, RouteItemConfig, ItemsType
} from '../../../config'
import { JimuMapView } from 'jimu-arcgis'
import { FlyStateChangeCallbacks, ControllerMode, prepareOptions } from '../controllers/base-fly-controller'
import { LiveviewSettingOptions } from '../controllers/common/liveview-setting'
import { FlyIds, FlyCmdOptions, PrepareCmdOptions } from '../fly-manager'
import Record, { RotateRecordConfig, RecordConfig } from './record/record'
import { GraphicsInfo } from '../../constraints'
import * as utils from '../../utils/utils'

export interface RouteConfig {
  idx: string
  isInUse: boolean
  displayName: string
  records: RecordConfig[]
  // timeScale: number
}

export default class Routes {
  type: FlyItemMode
  itemConfig: ItemsType
  flyStateCallbacks: FlyStateChangeCallbacks
  jimuMapView: JimuMapView

  drawOrUpdateGraphics: (recordConfig: RecordConfig) => GraphicsInfo
  highlightGraphics: (graphics: __esri.Graphic[]) => void
  checkAndSwitchJimuMapBeforePlay: ((ids: FlyIds) => Promise<{ isCanPlay: boolean, hadSwitchedMap: boolean }>)
  getCurrentSceneView: (() => __esri.SceneView)

  record: Record// only one this.record
  recordConfig: RecordConfig

  speedFactor: number// mult-plays need to be keeped

  playingInfo: {
    currentIds: {
      ids: FlyIds
      orderId: number
    }
    maxRecordLen: number
    // timeScale: number,
    // speedFactor: number,

    // waitting
    waittingPromise: any
    isWaiting: boolean
    continueDelay: number

    eventHandlers: __esri.Handle[]
  }

  // constructor()
  async setup (itemConfig: ItemsType, recordConfig: RecordConfig,
    jimuMapView: JimuMapView, flyCallbacks: FlyStateChangeCallbacks,
    drawOrUpdateGraphics, highlightGraphics,
    checkAndSwitchJimuMapBeforePlay, getCurrentSceneView,
    record?: Record): Promise<Routes> {
    this.type = itemConfig.name
    this.itemConfig = itemConfig
    // refs
    this.flyStateCallbacks = flyCallbacks
    this.jimuMapView = jimuMapView

    this.record = record ?? null// use record mode
    this.recordConfig = record?.getConfig() ?? recordConfig

    this.drawOrUpdateGraphics = drawOrUpdateGraphics
    this.highlightGraphics = highlightGraphics
    this.checkAndSwitchJimuMapBeforePlay = checkAndSwitchJimuMapBeforePlay
    this.getCurrentSceneView = getCurrentSceneView

    // just save config, create nothing
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        this.itemConfig = itemConfig
        break
      }
      case FlyItemMode.Route: {
        this.itemConfig = this.itemConfig as RouteItemConfig
        break
      }

      default: {
        console.error('error type:', this.type)
      }
    }

    this._resetPlayingInfo()

    return this
  }

  destructor (): void {
    this._resetPlayingInfo()
    this.record?.destructor()
  }

  handleUpdateJimuMapView (jimuMapView: JimuMapView): void {
    this.jimuMapView = jimuMapView

    if (this.playingInfo.currentIds?.ids) {
      this._redrawAllRecordGraphics(this.playingInfo.currentIds?.ids)
    }
  }

  handleUpdateFlyCallbacks (flyCallbacks: FlyStateChangeCallbacks): void {
    this.flyStateCallbacks = flyCallbacks
  }

  // Graphics
  _redrawAllRecordGraphics = (ids: FlyIds): void => {
    const route = utils.getRouteConfigByIdx((this.itemConfig as RouteItemConfig).routes, ids)
    route?.records.forEach((recordConfig: RecordConfig) => {
      if (recordConfig.mapViewId === this.jimuMapView.id || // 1.runtime
        recordConfig.mapViewId === utils.removeJimuMapIdForFly(this.jimuMapView.id)) { // 2.setting
        // TODO this redrawAll can be enhance

        this.drawOrUpdateGraphics(recordConfig)// draw graphics back
      }
    })
  }

  async _getFlyRecordDynamically (ids: FlyIds, sceneView: __esri.SceneView, callbacks: FlyStateChangeCallbacks): Promise<Record> {
    this.itemConfig = this.itemConfig as RouteItemConfig
    const recordConfig = utils.getRecordConfigByIds((this.itemConfig).routes, ids)
    // buildDefaultRecordConfig
    const record = await new Record().setup(recordConfig, sceneView, callbacks/* flyRecordConfig, sceneView, callbacks */)
    return record
  }

  _getLimitionParamForPrepare (record: Record, prepareCmdOpts: PrepareCmdOptions): prepareOptions {
    const limition = {}
    const type = record.getConfig().type
    const duration = record.getConfig().duration
    let angle
    // const endDelay = record.getConfig().endDelay;

    if (type === ControllerMode.Rotate) {
      angle = (record.getConfig() as RotateRecordConfig).angle
    }

    if (utils.isDefined(duration) && !isNaN(duration) && duration > 0) {
      Object.assign(limition, { duration: (duration * this._computeRouteTaskTimeScale() * 1000) })
    }
    if (utils.isDefined(angle)) {
      Object.assign(limition, { angleLimit: angle })
    }

    if (utils.isDefined(prepareCmdOpts)) {
      Object.assign(limition, { animate: prepareCmdOpts.animate })
      const _waittingForTerrain = prepareCmdOpts.waittingForTerrain ?? true
      Object.assign(limition, { waittingForTerrain: _waittingForTerrain })
    }

    return limition
  }

  async playSpecifiedRecord (/* flyCmdOptions: FlyCmdOptions */): Promise<any> {
    // redraw
    const graphicsInfo = this.drawOrUpdateGraphics(this.record.getConfig())
    this.highlightGraphics(graphicsInfo.getGraphics())

    await this.record.fly({ speedFactor: this.getSpeedFactor() })
  }

  // endDelay to create, Dynamically generate RecordConfig,
  async prepare (prepareCmdOpts: PrepareCmdOptions): Promise<boolean> {
    await this._setSpeed(null)// reset speed

    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        // do not need to draw
        const opts = this._getLimitionParamForPrepare(this.record, prepareCmdOpts)
        return await this.record.prepare(opts)
      }
      case FlyItemMode.Route: {
        // // 1. draw all Graphics
        // this._redrawAllRecordGraphics(prepareCmdOpts.ids)
        // 2. prepare first one
        const res = await this.prepareSpecifiedRecord(prepareCmdOpts, this.flyStateCallbacks)
        if (!res.isCanPlay || !res.prepareState) {
          return false
        } else {
          return true
        }
      }

      default: {
        console.error('error type:', this.type)
        return false
      }
    }
  }

  // life circle
  async fly (flyCmdOptions: FlyCmdOptions): Promise<any> {
    await this.setSpeedFactor(flyCmdOptions.settingSpeed)
    // 1. rotate item ==> route(just one) ==> record.controller.fly()
    // 2. path item ==> route(just one) ==> record.controller.fly()
    // 3. route-record item ==> route(uuid) ==> record(uuid).controller.fly()
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        await this.record.fly({ speedFactor: this.getSpeedFactor() })
        break
      }
      case FlyItemMode.Route: {
        // resume route fly
        if (utils.isDefined(this.playingInfo.currentIds?.ids)) {
          // console.log('==> resume route fly')
          this.flyStateCallbacks.onFly()
          await this.playTask()
          return
        }

        // start a Route or RecordConfig
        this.flyStateCallbacks.onFly()
        if (!this._isPlayRoute(flyCmdOptions.ids) && (flyCmdOptions.isPreviewSpecifiedRecord)) {
          await this.playSpecifiedRecord(/* flyCmdOptions */)
        } else {
          await this.playRouteFly({ routeUuid: flyCmdOptions.ids.routeUuid }, 0)// play to end
        }

        break
      }

      default: {
        console.error('error type:', this.type)
      }
    }
  }

  async pause (): Promise<any> {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path:
      case FlyItemMode.Route: {
        await this.record?.pause()
        break
      }

      default: {
        console.error('fly-route.pause error type:', this.type)
      }
    }
  }

  async stop (isUpdate: boolean = false): Promise<any> {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        await this.record?.stop()
        break
      }
      case FlyItemMode.Route: {
        if (isUpdate) {
          return// Triggered by update, continue to routeFly
        }

        await this.pause()
        this.interruptDelayWaiting()
        this._onAllRecordsFinish()

        await this.record?.stop()
        break
      }

      default: {
        console.error('fly-route.stop error type:', this.type)
      }
    }
  }

  // speed
  async setSpeedFactor (val: number): Promise<any> {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path:
      case FlyItemMode.Route:
      default: {
        return await this._setSpeed(val)
      }
    }
  }

  getSpeedFactor (): number {
    return this.speedFactor
  }

  async _setSpeed (speed: number): Promise<any> {
    if (speed === null) {
      const defaultLiveviewSetting = utils.getInitLiveviewSetting()
      speed = defaultLiveviewSetting.speed
    }

    this.speedFactor = speed

    if (this.playingInfo.isWaiting) {
      this.interruptDelayWaiting()
      await this.playTask()
    } else {
      this.record?.setSpeedFactor(speed)
    }
  }

  _computeRouteTaskTimeScale (): number {
    //          valFromUI   speedFactor
    //            0,        0.125x
    //            0.25,     0.25x
    //            0.375,    0.5x
    //            0.5 ,     1x
    //            0.59375,  1.5x
    //            0.625,    2x
    //            0.75,     4x
    //            1,        8x
    const speed = this.speedFactor
    let timeScale = 1

    switch (speed) {
      case 0: {
        timeScale = 1 / 0.125; break
      }
      case 0.25: {
        timeScale = 1 / 0.25; break
      }
      case 0.375: {
        timeScale = 1 / 0.5; break
      }
      case 0.5: {
        timeScale = 1 / 1; break
      }
      case 0.59375: {
        timeScale = 1 / 1.5; break
      }
      case 0.625: {
        timeScale = 1 / 2; break
      }
      case 0.75: {
        timeScale = 1 / 4; break
      }
      case 1: {
        timeScale = 1 / 8; break
      }

      default:
        timeScale = 1 / 1; break
    }

    return timeScale
  }

  // LiveView
  async setIsLiveview (isSetting: boolean, ids: FlyIds): Promise<boolean> {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        return await this.record.setIsLiveview(isSetting)
      }
      case FlyItemMode.Route: {
        if (isSetting) {
          const res = await this.prepareSpecifiedRecord({ ids: ids }, this.flyStateCallbacks)
          if (!res.isCanPlay || !res.prepareState) {
            return false
          }

          return await this.record?.setIsLiveview(isSetting)
        } else {
          return await this.record?.setIsLiveview(isSetting)// stop liveView
        }
      }

      default: {
        console.error('error type:', this.type)
      }
    }
  }

  getLiveviewSettingInfo (): LiveviewSettingOptions {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path: {
        return this.record.getLiveviewSettingInfo()
      }
      case FlyItemMode.Route: {
        return this.record.getLiveviewSettingInfo()
      }

      default: {
        console.error('error type:', this.type)
      }
    }
  }

  getDefaultDuration (): number {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path:
      case FlyItemMode.Route: {
        return this.record.getDefaultDuration()
      }

      default: {
        console.error('error type:', this.type)
      }
    }
  }

  async setLiveviewSettingInfo (settingParamObj: LiveviewSettingOptions, opts?: { isUpdateLine?: boolean, isNeedHighlight?: boolean }): Promise<any> {
    switch (this.type) {
      case FlyItemMode.Rotate:
      case FlyItemMode.Path:
      case FlyItemMode.Route: {
        await this.record?.setLiveviewSettingInfo(settingParamObj)
        // isUpdateLine
        const isUpdateLine = opts?.isUpdateLine ?? true
        if (isUpdateLine) {
          this.record.setGraphicsInfo(this.drawOrUpdateGraphics(this.record.getConfig()))
        }

        // isHighlight
        const graphicsInfo = this.record.getGraphicsInfo()
        const isNeedHighlight = (utils.isDefined(opts?.isNeedHighlight) && opts.isNeedHighlight)
        if (isNeedHighlight && utils.isDefined(graphicsInfo.getGraphics())) {
          this.highlightGraphics(graphicsInfo.getGraphics())
        }
        break
      }

      default: {
        console.error('error type:', this.type)
      }
    }
  }

  // getProgress() {
  //   let flyController = this.getController();
  //   if(FlyItemMode.RecordConfig !== flyController?.flyStyle) {
  //     return flyController.getProgress();
  //   }
  // }
  // clear = () => {
  //   flyController.clear();
  // }

  /// /////////////////////////////////////////////////
  _isPlayRoute (ids: FlyIds): boolean {
    return utils.isDefined(ids.routeUuid) && !utils.isDefined(ids.recordUuid)
  }

  // specifiedRecord
  async prepareSpecifiedRecord (prepareCmdOpts: PrepareCmdOptions, flyCallbacks: FlyStateChangeCallbacks): Promise<{ isCanPlay: boolean, prepareState: boolean }> {
    const flyIds = prepareCmdOpts.ids
    if (this._isPlayRoute(prepareCmdOpts.ids)) { // preview whole route
      const record = utils.findRecordConfigByOrder((this.itemConfig as RouteItemConfig).routes, prepareCmdOpts.ids, 0)
      flyIds.recordUuid = record?.idx
    }

    const { isCanPlay/*, hadSwitchedMap */ } = await this.checkAndSwitchJimuMapBeforePlay(prepareCmdOpts.ids)
    if (!isCanPlay) {
      console.error('FlyRoute.prepareSpecifiedRecord(): JimuMap is not matched')
      return {
        isCanPlay: false,
        prepareState: null
      }
    }

    // draw all Graphics (redraw may triggered after SwitchedMap)
    this._redrawAllRecordGraphics(prepareCmdOpts.ids)

    let callbacks: FlyStateChangeCallbacks = flyCallbacks
    // overwrite Callback, e.g. clear highlight when record preview pause
    const needToOverwriteCallback = !!prepareCmdOpts.isBuilderSettingFlag
    if (needToOverwriteCallback) {
      callbacks = {
        onFly: () => {
          flyCallbacks.onFly()
        },
        onFinish: () => {
          this.highlightGraphics(null)
          flyCallbacks.onFinish()
        },
        onPause: () => {
          this.highlightGraphics(null)
          flyCallbacks.onPause()
        }
      }
    }

    this.record = await this._getFlyRecordDynamically(prepareCmdOpts.ids, this.getCurrentSceneView(), callbacks)
    const opts = this._getLimitionParamForPrepare(this.record, prepareCmdOpts)

    const res = await this.record.prepare(opts)
    return {
      isCanPlay: true,
      prepareState: res
    }
  }

  /// /////////////////////////////////////////////////////////
  // Route Task
  /// /////////////////////////////////////////////////////////
  async playRouteFly (ids: FlyIds, startRecordIdx: number): Promise<any> {
    const route = utils.getRouteConfigByIdx((this.itemConfig as RouteItemConfig).routes, ids)
    const maxRecordLen = (route.records.length - startRecordIdx)

    const recordOrderId = startRecordIdx// init id
    const record = utils.findRecordConfigByOrder((this.itemConfig as RouteItemConfig).routes, ids, startRecordIdx)// maybe null if route is empty

    this.initTask({ routeUuid: route.idx, recordUuid: record?.idx }, recordOrderId, maxRecordLen)
    await this.playTask({ init: true })
  }

  initTask (ids: FlyIds, recordOrderId: number, maxRecordLen: number): void {
    this._resetPlayingInfo()

    this.playingInfo.currentIds = {
      ids: ids,
      orderId: recordOrderId - 1// +1 when playTask
    }
    this.playingInfo.maxRecordLen = maxRecordLen
    this.playingInfo.isWaiting = false
    this.playingInfo.continueDelay = 0

    // handlers
    const sceneView = this.getCurrentSceneView()
    const handler1 = sceneView.on('drag', (event) => {
      if (!this.playingInfo.isWaiting) {
        return
      }

      if (event.action === 'start') {
        // console.log('=======-------=========> drag')
        this.interruptDelayWaiting()
        this.flyStateCallbacks.onPause()
      } else {
        // event.stopPropagation();
      }
    })
    const handler2 = sceneView.on('mouse-wheel', (event) => {
      if (!this.playingInfo.isWaiting) {
        return
      }

      // console.log('=======-------=========> mouse-wheel')
      this.interruptDelayWaiting()
      this.flyStateCallbacks.onPause()
    })
    this.playingInfo.eventHandlers.push(handler1)
    this.playingInfo.eventHandlers.push(handler2)

    this._nextPlayingInfo()
  }

  private _nextPlayingInfo (): void {
    this.playingInfo.currentIds.orderId++
    // console.log('==> playInfo orderId==>', this.playingInfo.currentIds.orderId)

    const tmpIds = {
      routeUuid: this.playingInfo.currentIds.ids?.routeUuid,
      recordUuid: null
    }
    const record = utils.findRecordConfigByOrder((this.itemConfig as RouteItemConfig).routes, tmpIds, this.playingInfo.currentIds.orderId)

    // update info
    this.playingInfo.currentIds.ids = {
      routeUuid: tmpIds.routeUuid,
      recordUuid: record?.idx // can't find record, e.g.: play to the end
    }
  }

  async playTask (opts?: { init?: boolean }): Promise<any> {
    this.playingInfo.isWaiting = false
    if (this.playingInfo.currentIds.orderId >= this.playingInfo.maxRecordLen) {
      this._onAllRecordsFinish()// Finish
      return
    }

    const innerCallbacks: FlyStateChangeCallbacks = {
      onFinish: this._onOneRecordFinish.bind(this, {}/* this.playingInfo.currentFlyIds */),
      onPause: this._onPause.bind(this, {}/* this.playingInfo.currentFlyIds */)
    }

    const targetRecord = utils.findRecordConfigByOrder((this.itemConfig as RouteItemConfig).routes, this.playingInfo.currentIds.ids, this.playingInfo.currentIds.orderId)
    if (opts?.init || (this.record?.getConfig().idx !== targetRecord?.idx)) {
      const res = await this.prepareSpecifiedRecord({ ids: this.playingInfo.currentIds.ids }, innerCallbacks)
      if (!res.isCanPlay) {
        console.warn('playTask: skip a record')
        innerCallbacks.onFinish()// skip one record
        return false
      }

      if (!res.prepareState) {
        innerCallbacks.onPause()
        return false
      }
    }

    const endDelay = this.record.getConfig().endDelay
    if (utils.isDefined(endDelay)) {
      this.playingInfo.continueDelay = endDelay * this._computeRouteTaskTimeScale()// keep endDelay time
    } else {
      this.playingInfo.continueDelay = 0
    }

    await this.record.fly({ speedFactor: this.getSpeedFactor() })
  }

  async _onOneRecordFinish (/* flyIds: FlyIds */): Promise<any> {
    this._nextPlayingInfo()

    if (utils.isDefined(this.playingInfo.continueDelay)) {
      this.playingInfo.waittingPromise = this._abortWrapper(this.waitDelay(this.playingInfo.continueDelay))

      try {
        await this.playingInfo.waittingPromise
        // console.log('_onOneRecordFinish')
        await this.playTask()
      } catch (error) {
        // console.log('==> interruptDelayWaiting')
        // this.flyStateCallbacks.onPause();
      }
    } else {
      await this.playTask()
    }
  }

  // waitting for endDelay
  async waitDelay (second): Promise<any> {
    this.playingInfo.isWaiting = true
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({})
      }, second * 1000)
    })
  }

  interruptDelayWaiting (): void {
    if (utils.isDefined(this.playingInfo.waittingPromise?.abort)) {
      this.playingInfo.waittingPromise.abort()
    }
    this.playingInfo.isWaiting = false
    this.playingInfo.continueDelay = 0
  }

  async _abortWrapper (p1): Promise<any> {
    let abort
    const p2 = new Promise((resolve, reject) => (abort = reject))
    const p: any = Promise.race([p1, p2])
    p.abort = abort
    return p
  }

  _onPause (/* flyIds: FlyIds */): void {
    // console.log('on Pause route')
    this.flyStateCallbacks?.onPause()
  }

  _onAllRecordsFinish (): void {
    this._resetPlayingInfo()
    // console.log('routes Finish')
    this.flyStateCallbacks?.onFinish()
  }

  _resetPlayingInfo (): void {
    // clean events
    if (utils.isDefined(this.playingInfo?.eventHandlers)) {
      this.playingInfo.eventHandlers.forEach((handler) => {
        handler.remove()
      })
      this.playingInfo.eventHandlers = null
      this.playingInfo.eventHandlers = []
    }

    this.playingInfo = {
      currentIds: {
        ids: null,
        orderId: 0
      },
      maxRecordLen: 0,
      // timeScale: 1,
      // speedFactor: defaultLiveviewSetting.speed,
      waittingPromise: null,
      isWaiting: false,
      continueDelay: 0,

      eventHandlers: []
    }
  }
}
