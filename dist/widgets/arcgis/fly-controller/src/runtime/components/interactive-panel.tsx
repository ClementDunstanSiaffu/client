/** @jsx jsx */
import { React, jsx, IntlShape, ThemeVariables, getAppStore, appActions, ImmutableArray } from 'jimu-core'
import { Button, Slider, Dropdown, DropdownButton, DropdownMenu, DropdownItem, defaultMessages as jimuUiNls, NumericInput, Progress } from 'jimu-ui'
import { JimuMapView, JimuMapViewGroup } from 'jimu-arcgis'
// components
import BarLayout from '../skins/bar/layout'
import PaletteLayout from '../skins/palette/layout'
import { getPaletteDropdownStyle } from '../skins/palette/style'
import { RouteMenu } from './route-menu'
import { getStyle, getDropdownStyle } from '../style'
import { IMConfig, FlyItemMode, PanelLayout } from '../../config'
// fly facade
import FlyManager, { ItemData, UiLoadingCallbacks } from '../../common/fly-facade/fly-manager'
import GraphicInteractionManager, { DrawingMode, ShowItem } from '../../common/components/graphic-interaction-manager'
import { DrawRes } from '../../common/components/helpers/draw-helper'
import { PickRes } from '../../common/components/helpers/pick-helper'
import { GraphicsInfo, RecordConfig, FlyStateChangeCallbacks, Constraints } from '../../common/constraints'
// common
import * as utils from '../../common/utils/utils'
import nls from '../translations/default'
import { SettingOutlined } from 'jimu-icons/outlined/application/setting'
import { PlayOutlined } from 'jimu-icons/outlined/editor/play'
import { PauseOutlined } from 'jimu-icons/outlined/editor/pause'
import { RoutePointOutlined } from 'jimu-icons/outlined/gis/route-point'
import { AlongPathOutlined } from 'jimu-icons/outlined/gis/along-path'
import { RouteOutlined } from 'jimu-icons/outlined/directional/route'

interface TriggerActionsJudgment {
  subCompsLoaded?: boolean// default false
  isLiveview?: boolean
  isPlaying?: boolean
  focusedGraphic?: boolean
}

interface Props {
  widgetId: string
  config: IMConfig
  intl: IntlShape
  theme: ThemeVariables
  jimuMapView: JimuMapView
  viewGroup: JimuMapViewGroup
  useMapWidgetIds: ImmutableArray<string>
  autoControlWidgetId: string
  isPrintPreview: boolean
}
interface State {
  graphicInteractionManagerRef: GraphicInteractionManager
  // state
  flyManagerItems: ItemData[]
  subCompsLoaded: boolean
  isTerrainLoaded: boolean
  focusedGraphic: __esri.Graphic
  // 1.fly style
  isFlyStylePopupOpen: boolean
  activedItemUuid: string
  // 2.triggerAction
  isPlaying: boolean
  // 3.liveview
  isLiveview: boolean
  settingSpeed: number // [0 - 1]
  // settingHeading: number;
  settingTilt: number // [0 - 90]
  settingAltitude: number // [0 - 500]
  // 4.progresser
  progress: number
  // 5. speed
  isSpeedPopupOpen: boolean
  // 6. record
  activedRouteUuid: string
}

export default class InteractivePanel extends React.PureComponent<Props, State> {
  flyManager: FlyManager
  uiLoadingCallbacks: UiLoadingCallbacks
  flyStateCallbacks: FlyStateChangeCallbacks

  constructor (props) {
    super(props)
    const initLiveviewSetting = utils.getInitLiveviewSetting()
    this.state = {
      graphicInteractionManagerRef: null,
      // state
      flyManagerItems: null,
      // errorTip: this.errorTipsManager.getDefaultError(), //for errorTipsManager
      subCompsLoaded: false,
      isTerrainLoaded: false,
      focusedGraphic: null,
      // 1.fly style
      isFlyStylePopupOpen: false,
      activedItemUuid: null, // activedItemIdx
      // 2.triggerAction
      isPlaying: false,
      // 3.liveview
      isLiveview: false,
      settingSpeed: initLiveviewSetting.speed,
      settingTilt: initLiveviewSetting.tilt,
      settingAltitude: initLiveviewSetting.altitude,
      // settingHeading: 0,
      // 4.progresser
      progress: 0,
      // 5. speed
      isSpeedPopupOpen: false,
      // 6. record
      activedRouteUuid: null
    }

    // observeStore(this.onFlyStop.bind(this), ['widgetsState', this.props.id, 'flyStop']);
    // observeStore(this.onRecordAdd.bind(this), ['widgetsState', this.props.id, 'recordAdd']);
  }

  /* async */_reset (jimuMapView: JimuMapView): void {
    this.uiLoadingCallbacks = {
      onLoading: this.handleFlyLoading,
      onLoaded: this.handleFlyLoaded
    }

    this.flyStateCallbacks = {
      // onPreparing:
      onFly: this.handleFlyPlay,
      onPause: this.handleFlyPause,
      onFinish: this.handleFlyFinish,
      onUpdateProgress: this.handleUpdateProgress
    }
    // this.onSpeedChange(null);
    if (utils.isDefined(jimuMapView)) {
      this._resetFlyManager()
    }
  }

  _resetFlyManager (): void {
    this.flyManager?.destructor()

    this.flyManager = new FlyManager({
      widgetConfig: this.props.config,
      isBuilderSettingFlag: false,
      jimuMapView: this.props.jimuMapView,
      viewGroup: this.props.viewGroup,

      uiLoadingCallbacks: this.uiLoadingCallbacks,
      flyStateCallbacks: this.flyStateCallbacks,

      drawOrUpdateGraphics: this.handleDrawOrUpdateGraphics,
      highlightGraphics: this.highlightGraphics,
      onItemsUpdate: this.handleFlyManagerItemsUpdate,

      onBeforeSwitchMap: this.handleAutoControlMapPublish,
      onTerrainLoaded: this.onTerrainLoaded
    })

    this.flyManager.unRegisterItem()
    this.handleFlyStyleChange(null)
  }

  onTerrainLoaded = (): void => {
    // console.log('onTerrainLoaded')
    this.setState({ isTerrainLoaded: true })
  }

  handleFlyManagerItemsUpdate = (items): void => {
    this.setState({ flyManagerItems: items })
  }

  getCurrentActiveItemName (): FlyItemMode {
    const config = this.flyManager.getActiveItemConfig()
    return config?.name
  }

  componentDidMount (): void {
    this._reset(this.props.jimuMapView)
  }

  handleRefGraphicInteractionManager = (ref: GraphicInteractionManager): void => {
    this.setState({ graphicInteractionManagerRef: ref })

    if (ref !== null) {
      this.setState({ subCompsLoaded: true })
    } else {
      this.setState({ subCompsLoaded: false })
    }
  }

  componentWillUnmount (): void {
    this.resetDefaultUI({ isCleanGraphics: true })

    this.flyManager?.destructor()
  }

  componentDidUpdate (prevProps: Props, prevState: State): void {
    if (this.props.config !== prevProps.config) {
      this._resetFlyManager()
      this.handleClearBtnClick()
    }

    // map changed
    const isMapChanged = (this.props.jimuMapView !== prevProps.jimuMapView)
    const { isTriggeredByFly, isTriggeredByMapSelf } = utils.getMapSwitchingInfo(this.props.widgetId, this.props.autoControlWidgetId, this.props.useMapWidgetIds[0])
    if (isMapChanged) {
      this.setState({ isTerrainLoaded: false })

      // switchMap
      if (!isTriggeredByFly && isTriggeredByMapSelf) {
        this.handleClearBtnClick()
      } else if (isTriggeredByFly) {
        // console.log('isTriggerSwitchMapByFly ==> true')
        // do nothing
      }

      if (!utils.isDefined(this.flyManager)) {
        this._resetFlyManager()
      } else {
        // should not pause/stop fly, bacause of switchMap()
        this.flyManager.updateJimuMapView(this.props.jimuMapView)
      }
    }
    // viewGroup
    if (this.props.viewGroup !== prevProps.viewGroup) {
      if (!utils.isDefined(this.flyManager)) {
        this._resetFlyManager()
      } else {
        // this.flyManager.stop({ isUpdate: true })
        this.flyManager.updateViewGroup(this.props.viewGroup)
      }
    }

    // autoplay
    if (!isMapChanged && // map not changed
      this.isAutoControlWidgetIdChanged(prevProps) && // autoControlWidgetId changed
      !isTriggeredByMapSelf // switchMap not triggered by map
    ) {
      this.handlePause()
    }

    // print preview ,#9240
    const isPauseForPrintPreview = (!prevProps.isPrintPreview && this.props.isPrintPreview) // noPrintPreview -> PrintPreview
    if (isPauseForPrintPreview) {
      this.handlePause()
    }
  }

  // autoplay
  isAutoControlWidgetIdChanged = (prevProps: Props): boolean => {
    return (prevProps.autoControlWidgetId && this.props.autoControlWidgetId !== prevProps.autoControlWidgetId)
  }

  handleAutoControlMapPublish = (): void => {
    getAppStore().dispatch(appActions.requestAutoControlMapWidget(this.props.useMapWidgetIds[0], this.props.widgetId))
  }

  // handleAutoControlMapSubscribe = (): void => {
  //   this.flyManager?.pause()
  // }

  // 0 state
  resetDefaultUI = (actions: { isCleanGraphics?: boolean }): void => {
    // popup
    this.setState({ isFlyStylePopupOpen: false })
    this.setState({ isLiveview: false })
    // interaction
    this.state.graphicInteractionManagerRef?.onRenderStateChange({ drawingMode: DrawingMode.Null, isPicking: false })
    // controller
    this.handleStop()

    // clean
    if (actions?.isCleanGraphics) {
      this.handleFocusedGraphicChanged(null)
      this.state.graphicInteractionManagerRef?.clearAll()
    }
  }

  // 0.1 flyMode
  handleFlyStyleChange = (uuid: string): void => {
    let uid
    let item
    if (uuid === null) { // null means reset UI, and findFirstUsedItem in config
      item = this.flyManager.findFirstUsedItem()
      uid = item.config.uuid
    } else {
      item = this.flyManager.findItemByUuid(uuid)
      uid = uuid
    }

    // ui
    this.setState({ activedItemUuid: uid }, () => {
      if (!this.flyManager.isUesRouteFlyMode()) {
        this.handleActivedRouteChange(null)
      }
    })

    this.handleSpeedChange(null)
    this.resetDefaultUI({ isCleanGraphics: true })

    this.flyManager.unRegisterItem()
    this.flyManager.registerItem(uid)

    this.state.graphicInteractionManagerRef?.removeAllGraphics()
  }

  // 0.2 draw
  // 0.3 picking

  // 0.4
  handlePlayStateBtnClick = (): void => {
    if (!this.state.isPlaying) {
      this.handlePlay()
    } else {
      this.handlePause()
    }
  }

  setPlayStatePlaying = (playState: boolean): void => {
    this.setState({ isPlaying: playState, /* isDrawing: false, isPicking: false, */isLiveview: false })
    this.state.graphicInteractionManagerRef?.onRenderStateChange(null)
  }

  // for callbacks
  handleFlyLoading = (): void => {
    this.setPlayStatePlaying(true)// change UI to play first
  }

  handleFlyLoaded = (): void => {
    this.setPlayStatePlaying(false)
  }

  handleFlyPlay = (): void => {
    if (this.state.isLiveview) {
      return
    }

    if (!this.state.isPlaying) {
      this.setPlayStatePlaying(true)
    }
  }

  handleFlyPause = (): void => {
    this.setPlayStatePlaying(false)
  }

  handleFlyFinish = (): void => {
    this.setPlayStatePlaying(false)
  }

  isLiveviewMode = (): boolean => {
    return this.state.isLiveview
  }

  handleUpdateProgress = (p: number): void => {
    this.setState({ progress: p })
  }

  // 1 fly mode
  getFlyStyleContent = (): React.ReactElement => {
    const flyStyle = this.flyManager.getFlyStyle()

    let flyStyleContent = null
    if (flyStyle === FlyItemMode.Rotate) {
      flyStyleContent = <RoutePointOutlined />
    } else if (flyStyle === FlyItemMode.Path) {
      flyStyleContent = <AlongPathOutlined />
    } else if (flyStyle === FlyItemMode.Route) {
      flyStyleContent = <RouteOutlined />
    }

    return flyStyleContent
  }

  toggleFlyStylePopup = (): void => {
    if (utils.getEnabledItemNum(this.props.config.itemsList) <= 1) {
      this.setState({ isFlyStylePopupOpen: false })
      return // no dropdown if itemlist.length < 2
    }

    if (this.state.isPlaying) {
      return // no disable in dropdown
    }
    this.setState({ isFlyStylePopupOpen: !this.state.isFlyStylePopupOpen })
  }

  // 2 trigger action
  private readonly isDisableButton = (judgment: TriggerActionsJudgment): boolean => {
    const { isPlaying, isLiveview, focusedGraphic } = judgment
    let work = !this.state.subCompsLoaded
    if (isPlaying) {
      work = work && !this.state.isPlaying
    }
    if (isLiveview) {
      work = work && !this.state.isLiveview
    }
    if (focusedGraphic) {
      work = (work) || !utils.isDefined(this.state.focusedGraphic)
    }
    return work
  }

  // 2.0 focused
  handleFocusedGraphicChanged = (graphic: __esri.Graphic): void => {
    this.setState({ focusedGraphic: graphic })
  }

  // 2.1 draw
  handleGraphicsUpdateHanlder = async (res: PickRes | DrawRes): Promise<any> => {
    // reset speed
    this.handleSpeedChange(null)

    const graphicsInfo = res.graphicsInfo
    const cameraInfo = res.cameraInfo

    const flyStyle = this.flyManager.getFlyStyle()
    if (flyStyle === FlyItemMode.Rotate) {
      // 1.Point
    } else if (flyStyle === FlyItemMode.Path) {
      // 2. Line
      this.handleAltitudeChange(0, { setToController: true/* TODO should be false??? */, isUpdateLine: false, isNeedHighlight: false })
    }

    const recordConfig = await this.flyManager.buildTemporaryRecordConfig(graphicsInfo, cameraInfo, this.props.jimuMapView)
    const record = await this.flyManager.buildTemporaryRecord(recordConfig,
      this.props.jimuMapView.view as __esri.SceneView, this.flyStateCallbacks, graphicsInfo)

    const itemConfig = this.flyManager.getActiveItemConfig()
    await this.flyManager.setupFly(itemConfig, null, this.flyStateCallbacks, record)
    await this.flyManager.prepare(null)
  }

  // 2.2 picking
  handlePickHanlder = (res: PickRes | DrawRes): void => {
    this.handleGraphicsUpdateHanlder(res)
  }

  // 2.3 clearBtn
  handleClearBtnClick = (): void => {
    this.resetDefaultUI({ isCleanGraphics: true })

    if (utils.isDefined(this.flyManager)) {
      this.handleStop()
    }
  }

  // 2.4 liveview
  toggleLiveviewSettingPopup = async (): Promise<any> => {
    if (!utils.isDefined(this.state.focusedGraphic)) {
      return
    }

    const isOpen = !this.state.isLiveview
    await this.flyManager.setIsLiveview(isOpen)
    // reset liveViewInfo if info exist
    const liveviewInfo = await this.flyManager.getLiveviewSettingInfo()
    if (utils.isDefined(liveviewInfo)) {
      this.handleTiltChange(liveviewInfo.tilt)
      this.handleAltitudeChange(liveviewInfo.altitude, { isNeedHighlight: true })

      this.setState({ isLiveview: isOpen })
    }
  }

  handleSpeedChange = (value: number): void => {
    if (value === null) {
      // reset to default value
      const initLiveviewSetting = utils.getInitLiveviewSetting()
      value = initLiveviewSetting.speed
    }

    this.setState({ settingSpeed: value })
    this.flyManager?.setSpeedFactor(value)
  }

  handleTiltChange = (value, opts?: { setToController?: boolean, isNeedHighlight?: boolean }): void => {
    this.setState({ settingTilt: value })

    if (utils.isDefined(this.flyManager) && opts?.setToController) {
      this.flyManager.onLiveviewParamChange({ tilt: value }, { isUpdateLine: false, isNeedHighlight: opts?.isNeedHighlight })// goto this camPos
    }
  }

  handleAltitudeChange = (value: number, opts?: { setToController?: boolean, isUpdateLine?: boolean, isNeedHighlight?: boolean }): void => {
    const alt = utils.altNumFix(value)
    this.setState({ settingAltitude: alt })
    if (utils.isDefined(this.flyManager) && opts?.setToController) {
      this.flyManager.onLiveviewParamChange({ altitude: alt }, { isUpdateLine: opts?.isUpdateLine, isNeedHighlight: opts?.isNeedHighlight })// goto this camPos
    }
  }

  // 3 play state
  handlePlay = async (): Promise<any> => {
    if (!utils.isDefined(this.state.focusedGraphic) && (!this.flyManager.isUesRouteFlyMode())) {
      return
    }

    const isContinue = await this.flyManager.setIsLiveview(false)// force sync settingMode
    if (!isContinue) {
      return
    }

    // this.flyManager.loadingForUI()// change UI to play first
    this.handleAutoControlMapPublish()

    this.flyManager.fly({
      settingSpeed: this.state.settingSpeed,
      ids: { routeUuid: this.state.activedRouteUuid, recordUuid: null },
      isPreviewSpecifiedRecord: false
    })
  }

  handleStop = (): void => {
    this.flyManager?.stop()
  }

  handlePause = (): void => {
    this.flyManager?.pause()
  }

  // onResume = () => {
  //   flyManager.resume();
  // }
  handleClear = (): void => {
    this.flyManager?.clear()
  }

  // speed
  toggleSpeedPopup = (): void => {
    this.setState({ isSpeedPopupOpen: !this.state.isSpeedPopupOpen })
  }

  /// //////////
  // for render
  isShowDropdownButtonArrow = (layout: PanelLayout): boolean => {
    if (layout === PanelLayout.Palette) {
      return false
    }
    if (this.state.flyManagerItems?.length > 1) {
      return true
    }
    return false
  }

  isShowDropdownButtonDot = (layout: PanelLayout): boolean => {
    if (layout === PanelLayout.Palette && this.state.flyManagerItems?.length > 1) {
      return true
    }
    return false
  }

  renderFlyStyleSelectorContent (layout: PanelLayout): React.ReactElement {
    // const isDisable = this.isDisableButton({ isPlaying: true });
    const item = this.flyManager.getActiveItemConfig()

    const styleTips = utils.isDefined(item) && utils.getFlyStyleTitle(item.name, this.props)
    const rotateTips = this.props.intl.formatMessage({ id: 'flyStyleRotate', defaultMessage: nls.flyStyleRotate })
    const pathTips = this.props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath })
    const routeTips = this.props.intl.formatMessage({ id: 'flyStyleRoute', defaultMessage: nls.flyStyleRoute })

    const isShowArrow = this.isShowDropdownButtonArrow(layout)
    const isShowDot = this.isShowDropdownButtonDot(layout)
    const flyStyleContent = this.getFlyStyleContent()
    return (
      <Dropdown isOpen={this.state.isFlyStylePopupOpen} toggle={this.toggleFlyStylePopup} className='dropdowns flystyle-btn' activeIcon>
        <DropdownButton icon className='btns d-flex' title={styleTips} type='tertiary' arrow={isShowArrow} dot={isShowDot}>
          {flyStyleContent}
        </DropdownButton>
        <DropdownMenu showArrow={false}>
          {this.state.flyManagerItems.map((itemConfig, idx) => {
            const config = itemConfig.config
            const style = config.name
            const uuid = itemConfig.config.uuid
            const isActived = (uuid === this.state.activedItemUuid)
            if (!config.isInUse) {
              return null
            }

            if (FlyItemMode.Rotate === style) {
              return (
                <div key={idx}>
                  <DropdownItem
                    className='dropdown-items' title={rotateTips}
                    onClick={() => this.handleFlyStyleChange(uuid)} active={isActived}
                  >
                    <RoutePointOutlined />
                    <span className='mx-2'>{rotateTips}</span>
                  </DropdownItem>
                </div>
              )
            } else if (FlyItemMode.Path === style) {
              return (
                <div key={idx}>
                  <DropdownItem
                    className='dropdown-items' title={pathTips}
                    onClick={() => this.handleFlyStyleChange(uuid)} active={isActived}
                  >
                    <AlongPathOutlined />
                    <span className='mx-2'>{pathTips}</span>
                  </DropdownItem>
                </div>
              )
            } else if (FlyItemMode.Route === style) {
              return (
                <div key={idx}>
                  <DropdownItem
                    className='dropdown-items' title={routeTips}
                    onClick={() => this.handleFlyStyleChange(uuid)} active={isActived}
                  >
                    <RouteOutlined />
                    <span className='mx-2'>{routeTips}</span>
                  </DropdownItem>
                </div>
              )
            }

            return null
          })}
        </DropdownMenu>
      </Dropdown>
    )
  }

  renderLiveviewSettingContent (): React.ReactElement {
    const isDisable = this.isDisableButton({ isPlaying: true, focusedGraphic: true })

    const settings = this.props.intl.formatMessage({ id: 'settings', defaultMessage: jimuUiNls.settings })
    // const heading = this.props.intl.formatMessage({ id: 'heading', defaultMessage: nls.heading });
    const tilt = this.props.intl.formatMessage({ id: 'tilt', defaultMessage: jimuUiNls.tilt })
    const altitude = this.props.intl.formatMessage({ id: 'altitude', defaultMessage: jimuUiNls.altitude })

    const degree = this.props.intl.formatMessage({ id: 'degree', defaultMessage: jimuUiNls.degree })
    const meter = this.props.intl.formatMessage({ id: 'meter', defaultMessage: jimuUiNls.meter })
    const meterAbbr = this.props.intl.formatMessage({ id: 'meterAbbr', defaultMessage: jimuUiNls.meterAbbr })

    const ground = this.props.intl.formatMessage({ id: 'ground', defaultMessage: jimuUiNls.ground })
    const space = this.props.intl.formatMessage({ id: 'outerSpace', defaultMessage: jimuUiNls.outerSpace })
    const relative2Ground = this.props.intl.formatMessage({ id: 'relative2Ground', defaultMessage: jimuUiNls.relative2Ground })

    const flyStyle = this.flyManager?.getFlyStyle()
    return (
      <Dropdown isOpen={this.state.isLiveview} toggle={this.toggleLiveviewSettingPopup} className='dropdowns liveview-btn'>
        <DropdownButton icon className='btns d-flex' disabled={isDisable} title={settings} type='tertiary' arrow={false}>
          <SettingOutlined />
        </DropdownButton>
        <DropdownMenu showArrow={false} css={getDropdownStyle(this.props.theme)}>
          {/* <DropdownItem>
          <div className="d-flex flex-column">
            <span className="d-flex">{heading}</span>
            <Slider id="setting-heading" className="d-flex" value={this.state.settingHeading} min={-90} max={90} step={1} style={{}} size="sm"
              onChange={this.onHeadingChange} title={heading} />
          </div>
        </DropdownItem> */}
          {(flyStyle === FlyItemMode.Rotate) &&
            <div className='d-flex dropdown-items flex-column'>
              <span className='d-flex dropdown-item-title'>{tilt}</span>
              <Slider
                id='setting-tilt' className='d-flex' size='sm'
                value={this.state.settingTilt} min={Constraints.TILT.MIN} max={Constraints.TILT.MAX} step={Constraints.TILT.STEP}
                onChange={(evt) => this.handleTiltChange(evt.target.value, { setToController: true, isNeedHighlight: true })}
                title={utils.showLiveviewSetting(this.state.settingTilt, degree)}
              />
            </div>}
          {(flyStyle === FlyItemMode.Path) &&
            <React.Fragment>
              <div className='d-flex dropdown-items flex-column'>
                <span className='d-flex dropdown-item dropdown-item-title'>{altitude}</span>
                <Slider
                  id='setting-altitude' className='d-flex dropdown-item' size='sm'
                  value={this.state.settingAltitude} min={Constraints.ALT.MIN} max={Constraints.ALT.MAX} step={Constraints.ALT.STEP}
                  onChange={async (evt) => this.handleAltitudeChange(parseFloat(evt.target.value), { setToController: true, isNeedHighlight: true })}
                  title={utils.showLiveviewSetting(this.state.settingAltitude, meter)}
                />
                <div className='d-flex justify-content-between dropdown-item-comment dropdown-item'><span>{ground}</span><span>{space}</span></div>
              </div>
              <div className='d-flex dropdown-items flex-column'>
                <div className='d-flex alt-wapper'>
                  <div className='alt-input'>
                    <NumericInput
                      defaultValue='0' size='sm'
                      value={this.state.settingAltitude} min={Constraints.ALT.MIN} max={Constraints.ALT.MAX}
                      onChange={async (val) => this.handleAltitudeChange(val, { setToController: true, isNeedHighlight: true })}
                    />
                  </div>
                  <span className='setting-altitude-separator'>{meterAbbr}</span>
                  {relative2Ground}
                </div>
              </div>
            </React.Fragment>}
          {/* <DropdownItem >
            <div className="d-flex flex-column">
              <div><Label for="setting-att" style={{ cursor: 'pointer' }}> Altitude </Label></div>
              <div><Slider id="setting-att" value="40" style={{ width: '150px' }} size="sm" /></div>
              <div className="d-flex justify-content-between">
                <div>Ground</div><div>Space</div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem>
            <TextInput style={{ width: '50px' }} size="sm" value="40" />
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    )
  }

  renderPlayStateContent (): React.ReactElement {
    let tips = null
    const isDisable = this.isDisableButton({ isPlaying: true, isLiveview: true, focusedGraphic: true }) &&
      (this.state.activedRouteUuid === null)// choose a route

    let iconContent = null
    if (this.state.isPlaying) {
      iconContent = <PauseOutlined />
      tips = this.props.intl.formatMessage({ id: 'pause', defaultMessage: jimuUiNls.pause })
    } else {
      iconContent = <PlayOutlined />
      tips = this.props.intl.formatMessage({ id: 'play', defaultMessage: jimuUiNls.play })
    }

    return (
      <Button icon onClick={this.handlePlayStateBtnClick} title={tips} disabled={isDisable} className='btns play-btn' type='tertiary'>
        {iconContent}
      </Button>
    )
  }

  renderProgressBarContent (layout: PanelLayout): React.ReactElement {
    const type = (layout === PanelLayout.Palette ? 'circular' : 'linear')

    if (this.flyManager?.getFlyStyle() === FlyItemMode.Path) {
      return <Progress type={type} value={this.state.progress} className='w-100' />
    } else {
      return null
    }
  }

  renderSpeedControllerContent (): React.ReactElement {
    const speedTips = this.props.intl.formatMessage({ id: 'speed', defaultMessage: jimuUiNls.speed })
    const speed = this.props.intl.formatNumber(utils.speedMapping(this.state.settingSpeed))
    const title = speedTips + ': ' + (speed + 'x')
    // Hash: settingSpeed,   shown
    //            0,        0.125x
    //            0.25,     0.25x
    //            0.375,    0.5x
    //            0.5 ,     1x
    //            0.59375,  1.5x
    //            0.625,    2x
    //            0.75,     4x
    //            1,        8x
    const speedList = [0, 0.25, 0.375, 0.5, 0.59375, 0.625, 0.75, 1]
    const len = speedList.length

    return (
      <div className='d-flex item align-items-center h-100'>
        <Slider
          id='setting-speed' className='d-flex speed-controller' value={speedList.indexOf(this.state.settingSpeed)} min={0} max={len - 1} step={1} size='sm'
          onChange={(evt) => this.handleSpeedChange(speedList[evt.target.value])} title={title}
        />
      </div>
    )
  }

  renderSpeedControllerContentPalette (): React.ReactElement {
    const speedTips = this.props.intl.formatMessage({ id: 'speed', defaultMessage: jimuUiNls.speed })
    const speed = utils.speedMapping(this.state.settingSpeed)
    const formattedSpeed = this.props.intl.formatNumber(speed)
    const title = speedTips + ': ' + (formattedSpeed + 'x')

    const speedList = [0, 0.25, 0.375, 0.5, 0.59375, 0.625, 0.75, 1]

    return (
      <Dropdown isOpen={this.state.isSpeedPopupOpen} toggle={this.toggleSpeedPopup} className='speedcontroller-btn' direction='up'>
        <DropdownButton icon className='d-flex speedcontroller-text' title={title} type='tertiary' arrow={false}>
          {formattedSpeed + 'x'}
        </DropdownButton>
        <DropdownMenu showArrow={false} css={getPaletteDropdownStyle(/* this.props.theme */)}>
          <div className='speed-popup-wapper'>
            {speedList.map((speed, idx) => {
              const isActived = (speed === this.state.settingSpeed)
              const formattedSpeed = this.props.intl.formatNumber(utils.speedMapping(speed))
              return (
                <div key={idx}>
                  <DropdownItem onClick={() => this.handleSpeedChange(speed)} active={isActived}>
                    <span className='mx-2'>{formattedSpeed + 'x'}</span>
                  </DropdownItem>
                </div>
              )
            })}
          </div>
        </DropdownMenu>
      </Dropdown>
    )
  }

  render (): React.ReactElement {
    if (!this.state.flyManagerItems) {
      return null
    }

    const layout = this.props.config.layout
    const flyStyle = this.flyManager.getFlyStyle()

    const flyStyleContent = this.renderFlyStyleSelectorContent(layout)
    const liveviewSettingContent = this.renderLiveviewSettingContent()
    const playStateContent = this.renderPlayStateContent()
    const progressBar = this.renderProgressBarContent(layout)

    const speedController = this.renderSpeedControllerContent()
    const speedControllerPalette = this.renderSpeedControllerContentPalette()

    // route
    const isRouteMode = this.flyManager.isUesRouteFlyMode()
    const routeListContent = this.renderRouteFlyModeContent(layout)

    const graphicManagerShowItems = isRouteMode ? [] : [ShowItem.Point, ShowItem.Line, ShowItem.Pick, ShowItem.Clear]
    const graphicInteractionManagerContent = (
      <GraphicInteractionManager
        onRef={this.handleRefGraphicInteractionManager}
        widgetId={this.props.widgetId}
        theme={this.props.theme}
        intl={this.props.intl}
        jimuMapView={this.props.jimuMapView}
        showItems={graphicManagerShowItems}
        isDisabled={!this.state.isTerrainLoaded}
        //
        flyStyle={flyStyle}
        isPlaying={this.state.isPlaying}
        focusedGraphic={this.state.focusedGraphic}
        onFocusedGraphicChanged={this.handleFocusedGraphicChanged}
        //
        onDrawFinish={this.handleGraphicsUpdateHanlder}
        onClearBtnClick={this.handleClearBtnClick}
        onPickHanlder={this.handlePickHanlder}
      />
    )

    let flyControllerContent = null
    if (layout === PanelLayout.Horizontal) {
      flyControllerContent = (
        <BarLayout
          flyStyleContent={flyStyleContent}
          graphicInteractionManager={graphicInteractionManagerContent}
          //
          liveviewSettingContent={liveviewSettingContent}
          playStateContent={playStateContent}
          progressBar={progressBar}
          speedController={speedController}
          //
          theme={this.props.theme}
          isPlaying={this.state.isPlaying}
          isRouteMode={isRouteMode}
          routeListContent={routeListContent}
        />
      )
    } else if (layout === PanelLayout.Palette) {
      flyControllerContent = (
        <PaletteLayout
          flyStyleContent={flyStyleContent}
          graphicInteractionManager={graphicInteractionManagerContent}
          //
          liveviewSettingContent={liveviewSettingContent}
          playStateContent={playStateContent}
          progressBar={progressBar}
          speedController={speedControllerPalette}
          //
          theme={this.props.theme}
          isPlaying={this.state.isPlaying}
          isRouteMode={isRouteMode}
          routeListContent={routeListContent}
        />
      )
    }

    return (
      <div css={getStyle()} className='d-flex align-items-center justify-content-center'>
        {flyControllerContent}
      </div>
    )
  }

  // RouteMenu
  handleActivedRouteChange = async (uuid: string): Promise<any> => {
    this.state.graphicInteractionManagerRef?.clearAll()
    this.handleSpeedChange(null)

    this.setState({ activedRouteUuid: uuid }, async () => {
      if (utils.isDefined(this.state.activedRouteUuid) && this.flyManager.isUesRouteFlyMode()) {
        // this.flyManager.loadingForUI()// change UI to play first
        await this.flyManager.prepareRoutePreview({ routeUuid: uuid })
        // this.flyManager.loadedForUI()
      }
    })
  }

  renderRouteFlyModeContent (layout: PanelLayout): React.ReactElement {
    const isEnable = this.state.subCompsLoaded
    return (
      <RouteMenu
        theme={this.props.theme}
        intl={this.props.intl}
        layout={layout}
        isEnable={isEnable}
        itemsList={this.state.flyManagerItems}

        activedItemUuid={this.state.activedItemUuid}
        activedRouteUuid={this.state.activedRouteUuid}

        graphicInteractionManagerRef={this.state.graphicInteractionManagerRef}

        isRouteMode={this.flyManager.isUesRouteFlyMode()}
        onActivedRouteChange={this.handleActivedRouteChange}
      />
    )
  }

  // graphic interaction
  handleDrawOrUpdateGraphics = (record: RecordConfig): GraphicsInfo => {
    if (typeof this.state.graphicInteractionManagerRef?.drawOrUpdateGraphics === 'function') {
      return this.state.graphicInteractionManagerRef.drawOrUpdateGraphics(record)// draw graphics back
    }
  }

  highlightGraphics = (graphics: __esri.Graphic[]): void => {
    if (typeof this.state.graphicInteractionManagerRef?.highlight === 'function') {
      this.state.graphicInteractionManagerRef.highlight(graphics)// highlight graphics
    }
  }
}
