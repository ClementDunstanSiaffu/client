/** @jsx jsx */
import { React, jsx, Immutable, ImmutableObject, IMState, IMAppConfig, LayoutInfo, LayoutType, IMThemeVariables, getAppStore, appActions } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent, JimuMapViewGroup } from 'jimu-arcgis'
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { IMConfig, ItemsType, PathItemConfig, FlyItemMode, RotateDirection, PathStyle, PanelLayout, RouteItemConfig } from '../config'
import { Radio, Label, Loading, LoadingType } from 'jimu-ui'
// components
import { ItemMode } from './components/item-mode'
import { RouteList } from './components/route-list'
import { RouteDetail } from './components/route-detail'
import { RecordDetail } from './components/record/record-detail'
import { TreeItemType, TreeItemsType } from 'jimu-ui/basic/list-tree'
import { MapPopper } from './components/map-popper/map-popper'
import { getStyle, getSettingSectionStyles } from './style'
import nls from './translations/default'
import * as utils from '../common/utils/utils'
// fly
import FlyManager, { /* UiLoadingCallbacks, */ FlyIds } from '../common/fly-facade/fly-manager'
import { GraphicsInfo, Record, RouteConfig, RecordConfig, FlyStateChangeCallbacks, LiveviewSettingOptions } from '../common/constraints'
// graphics
import GraphicInteractionManager from '../common/components/graphic-interaction-manager'

const ControllerStyleSize = {
  [PanelLayout.Horizontal]: { w: 340, h: 60 }, // w: 264
  [PanelLayout.Palette]: { w: 340, h: 98 }// w: 142
}

interface ExtraProps {
  appConfig: IMAppConfig
  layoutInfo: LayoutInfo
  autoControlWidgetId: string
  settingPanelChange: string
}
interface CustomeProps {
  theme: IMThemeVariables
}

export enum PageMode {
  Common = 'flyStyle-list', // records-list, L1
  RouteDetails = 'route-details', // L2
  RecordLoading = 'record-loading', // L3-loading
  RecordDetails = 'record-details'// L3
}
export enum NewFeatureMode {
  Empty = 'Empty',
  Point = 'Point',
  Path = 'Path',
  Pick = 'Pick'
}

interface State {
  // activeMapviewId: string;
  jimuMapView: JimuMapView
  viewGroup: JimuMapViewGroup
  // page
  pageMode: PageMode
  isShowMapPopper: boolean
  mapPopperJimuMapView: JimuMapView
  // flyManager
  flyManagerItems: []
  isTerrainLoaded: boolean
  // active states
  activedRecordFlyStyleIdx: number
  activedRouteUuid: string
  activedRecordUuid: string
  // playing
  isPreviewRouteBtnPlaying: boolean// play/pause but not finish
  playingInfo: FlyIds
  newestRecordIdx: string// cache RecordIdx for L2 badge notify
  // liveview
  delayUpdateFlyManagerFlag: boolean// for keep controller, sush as liveviewSetting
  // for draw
  isDrawHelperLoaded: boolean// for loading
  newFeatureMode: NewFeatureMode
  // flyMode UX
  flyModesUICollapseMap: ImmutableObject<{id: number, isUICollapse: boolean}>
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  flyManager: FlyManager
  graphicInteractionManagerRef: GraphicInteractionManager

  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>): ExtraProps => {
    const { id, useMapWidgetIds } = props
    const mapWidgetId = useMapWidgetIds && useMapWidgetIds.length !== 0 ? utils.genJimuMapIdForFly(useMapWidgetIds[0]) : undefined
    const mapWidgetsInfo = state && state.mapWidgetsInfo
    return {
      appConfig: state?.appStateInBuilder?.appConfig,
      layoutInfo: state?.appStateInBuilder?.widgetsState[id]?.layoutInfo,
      autoControlWidgetId: mapWidgetId ? mapWidgetsInfo[mapWidgetId]?.autoControlWidgetId : undefined,
      settingPanelChange: state?.widgetsState?.[props.id]?.settingPanelChange
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      jimuMapView: null,
      viewGroup: null,
      pageMode: PageMode.Common,
      isShowMapPopper: false,
      mapPopperJimuMapView: null,
      // flyManager
      flyManagerItems: null,
      isTerrainLoaded: false,
      // active states
      activedRecordFlyStyleIdx: null,
      activedRouteUuid: null,
      activedRecordUuid: null,
      // playing
      isPreviewRouteBtnPlaying: false,
      playingInfo: null,
      newestRecordIdx: null,
      // liveview
      delayUpdateFlyManagerFlag: false,
      // for draw
      isDrawHelperLoaded: false,
      newFeatureMode: NewFeatureMode.Empty,
      // flyMode UX
      flyModesUICollapseMap: this._initFlyModesUICollapseState()
    }
  }

  _initFlyModesUICollapseState (): ImmutableObject<{ id: number, isUICollapse: boolean }> {
    const map = {}
    const itemsList = this.props.config.itemsList.asMutable({ deep: true })
    itemsList.forEach((styleConfig, idx) => {
      if (styleConfig.isInUse) {
        map[String(idx)] = false
      } else {
        map[String(idx)] = true
      }
    })
    return Immutable(map as { id: number, isUICollapse: boolean })
  }

  componentDidMount (): void {
    const firstRouteItemIdx = 2// react warn: setState in render
    this.handleRecordModeSelected(firstRouteItemIdx)
    this.initFlyManager()
  }

  componentDidUpdate (prevProps: AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, prevState: State): void {
    if (this.props.config !== prevProps.config) {
      this.initFlyManager()
    }

    // setting page changed
    if (this.props.settingPanelChange !== prevProps.settingPanelChange) {
      this.handleRouteEdit({ routeUuid: null })// L2
      this.handleRecordEdit({ routeUuid: null, recordUuid: null }, true)// L3
      this.handleSettingPageModeChange(PageMode.Common)

      this.initFlyManager()
    }

    // autoplay
    // if (this.props.autoControlWidgetId !== prevProps.autoControlWidgetId) {
    //   this.handleAutoControlMapSubscribe()
    // }
  }

  // autoplayActive
  // handleAutoControlMapPublish = (): void => {
  //   getAppStore().dispatch(appActions.requestAutoControlMapWidget(this.props.useMapWidgetIds[0], this.props.widgetId))
  // }

  // 0
  handleMapWidgetChange = (useMapWidgetIds: string[]): void => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  handleActiveViewChange = (jimuMapView: JimuMapView/*, previousActiveViewId: string */): void => {
    if (!utils.isDefined(jimuMapView) || jimuMapView.view.type === '2d') {
      this.setState({ jimuMapView: null })
    } else if (this.state.jimuMapView?.id !== jimuMapView.id) {
      this.setState({ jimuMapView: jimuMapView })
    }
  }

  // fly callback
  handleFlyPlay = (): void => {
    // console.log('setting onFlyPlay()')
  }

  handleFlyPause = (): void => {
    // console.log('setting onFlyPause()')
    this.setState({ isPreviewRouteBtnPlaying: false })
  }

  handleFlyFinish = (): void => {
    // console.log('setting onFlyFinish()')
    this.setState({ isPreviewRouteBtnPlaying: false })
  }

  handleFlyModesChange = (isInUse: boolean, idx: number): void => {
    const items = this.props.config.itemsList.asMutable({ deep: true })
    const $item = Immutable(items[idx])
    let item
    if ($item.name === FlyItemMode.Rotate) {
      item = $item.set('isInUse', isInUse)
      items.splice(idx, 1, item.asMutable({ deep: true }))
    } else if ($item.name === FlyItemMode.Path) {
      item = $item.set('isInUse', isInUse)
      items.splice(idx, 1, item.asMutable({ deep: true }))
    } else if ($item.name === FlyItemMode.Route) {
      item = $item.set('isInUse', isInUse)
      items.splice(idx, 1, item.asMutable({ deep: true }))
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  // PanelLayout
  private readonly activeControllerLayout = (style: PanelLayout): string => {
    if (this.props.config.layout === style) {
      return ' active'
    } else {
      return ''
    }
  }

  private readonly handleControllerLayoutChanged = (e: React.ChangeEvent<any>): void => {
    const style: PanelLayout = e.target.getAttribute('data-uimode')

    const appConfigAction = getAppConfigAction()
    const { layoutInfo } = this.props
    const size = ControllerStyleSize[style]
    const layoutType = this.getLayoutType()
    if (layoutType === LayoutType.FixedLayout) {
      appConfigAction.editLayoutItemSize(layoutInfo, size.w, size.h).exec()
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('layout', style)
    })
  }

  private readonly getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props
    const layoutId = layoutInfo.layoutId
    const layoutType = appConfig?.layouts?.[layoutId]?.type
    return layoutType
  }

  // 1 Rotate Setting
  handleRotateRadioChange = (dir: RotateDirection, idx: number): void => {
    const items = this.props.config.itemsList.asMutable({ deep: true })
    const $item = Immutable(items[idx])
    if ($item.name === FlyItemMode.Rotate) {
      const item = $item.set('direction', dir)
      items.splice(idx, 1, item.asMutable({ deep: true }))

      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      })
    }
  }

  // 2 Path Setting
  handlePathRadioChange = (style: PathStyle, idx: number): void => {
    const items = this.props.config.itemsList.asMutable({ deep: true })
    const $item = Immutable(items[idx])
    if ($item.name === FlyItemMode.Path) {
      const item = $item.set('style', style)
      items.splice(idx, 1, item.asMutable({ deep: true }))

      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      })
    }
  }

  // for render
  renderRotateSetting = (styleConfig: ItemsType, idx: number): React.ReactElement => {
    const isCW = (styleConfig.direction === RotateDirection.CW)
    const klass = getSettingSectionStyles(this.props.config.itemsList, idx, this.state.flyModesUICollapseMap.getIn([String(idx)]))

    const label = this.props.intl.formatMessage({ id: 'styleLabelRotate', defaultMessage: nls.styleLabelRotate })
    const cw = this.props.intl.formatMessage({ id: 'CW', defaultMessage: nls.CW })
    const ccw = this.props.intl.formatMessage({ id: 'CCW', defaultMessage: nls.CCW })

    return (
      <SettingSection className={'d-2 item-detail-wapper ' + klass}>
        <SettingRow>
          <Label className='flystyle-label'>{label}</Label>
        </SettingRow>
        <SettingRow className='mt-2 radio-wapper'>
          <Radio checked={isCW} id='CW' style={{ cursor: 'pointer' }} onChange={e => this.handleRotateRadioChange(RotateDirection.CW, idx)} />
          <Label style={{ cursor: 'pointer' }} for='CW' className='ml-1 text-break'>{cw}</Label>
        </SettingRow>
        <SettingRow className='mt-2 radio-wapper'>
          <Radio checked={!isCW} id='CCW' style={{ cursor: 'pointer' }} onChange={e => this.handleRotateRadioChange(RotateDirection.CCW, idx)} />
          <Label style={{ cursor: 'pointer' }} for='CCW' className='ml-1 text-break'>{ccw}</Label>
        </SettingRow>
      </SettingSection>
    )
  }

  renderPathSetting = (styleConfig: ItemsType, idx: number): React.ReactElement => {
    const isCurve = ((styleConfig as PathItemConfig).style === PathStyle.Smoothed)
    const klass = getSettingSectionStyles(this.props.config.itemsList, idx, this.state.flyModesUICollapseMap.getIn([String(idx)]))

    const label = this.props.intl.formatMessage({ id: 'styleLabelPath', defaultMessage: nls.styleLabelPath })
    const smoothedCurve = this.props.intl.formatMessage({ id: 'pathTypeSmoothedCurve', defaultMessage: nls.pathTypeSmoothedCurve })
    const realPath = this.props.intl.formatMessage({ id: 'pathTypeRealPath', defaultMessage: nls.pathTypeRealPath })

    return (
      <SettingSection className={'d-2 item-detail-wapper ' + klass}>
        <SettingRow>
          <Label className='flystyle-label text-truncate'>{label}</Label>
        </SettingRow>
        <SettingRow className='mt-2 radio-wapper'>
          <Radio checked={isCurve} id='CURVED' style={{ cursor: 'pointer' }} onChange={e => this.handlePathRadioChange(PathStyle.Smoothed, idx)} />
          <Label style={{ cursor: 'pointer' }} for='CURVED' className='ml-1 text-break'>{smoothedCurve}</Label>
        </SettingRow>
        <SettingRow className='mt-2 radio-wapper'>
          <Radio checked={!isCurve} id='LINE' style={{ cursor: 'pointer' }} onChange={e => this.handlePathRadioChange(PathStyle.RealPath, idx)} />
          <Label style={{ cursor: 'pointer' }} for='LINE' className='ml-1 text-break'>{realPath}</Label>
        </SettingRow>
      </SettingSection>
    )
  }

  render (): React.ReactElement {
    const itemsList = this.props.config.itemsList.asMutable({ deep: true })

    const selectMapTips = this.props.intl.formatMessage({ id: 'selectMap', defaultMessage: nls.selectMap })
    const controllerStyle = this.props.intl.formatMessage({ id: 'controllerStyle', defaultMessage: nls.controllerStyle })
    const bar = this.props.intl.formatMessage({ id: 'bar', defaultMessage: nls.bar })
    const palette = this.props.intl.formatMessage({ id: 'palette', defaultMessage: nls.palette })
    const selectStyleTips = this.props.intl.formatMessage({ id: 'selectStyle', defaultMessage: nls.selectStyle })
    // const flyStyleRotate = this.props.intl.formatMessage({ id: 'flyStyleRotate', defaultMessage: nls.flyStyleRotate })
    // const flyStylePath = this.props.intl.formatMessage({ id: 'flyStylePath', defaultMessage: nls.flyStylePath })
    // const flyStyleRecord = this.props.intl.formatMessage({ id: 'flyStyleRecord', defaultMessage: nls.flyStyleRecord })
    const { theme, useDataSources, useMapWidgetIds, config, intl } = this.props
    const { jimuMapView, isShowMapPopper, newFeatureMode } = this.state

    const activedRouteConfig = this.flyManager?.getRouteConfigByIdx({ routeUuid: this.state.activedRouteUuid })

    return (
      <div className=' h-100' css={getStyle(this.props.theme)}>
        <div className='widget-setting-fly-controller h-100'>
          {/* 1.Common */}
          {(PageMode.Common === this.state.pageMode) &&
            <React.Fragment>
              <SettingSection className='map-selector-section'>
                <SettingRow flow='wrap'>
                  <div className='select-map-descript text-break'>{selectMapTips}</div>
                </SettingRow>
                <SettingRow>
                  <MapWidgetSelector onSelect={this.handleMapWidgetChange} useMapWidgetIds={this.props.useMapWidgetIds} />
                </SettingRow>
                <div className='fly-map'>
                  <div><JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds?.[0]} onActiveViewChange={this.handleActiveViewChange} /></div>
                </div>
              </SettingSection>

              <SettingSection title={controllerStyle}>
                <SettingRow>
                  <div className='ui-mode-card-chooser'>
                    <div className='ui-mode-card-wapper'>
                      <img
                        className={'ui-mode-card' + this.activeControllerLayout(PanelLayout.Horizontal)} data-uimode={PanelLayout.Horizontal} id='uimode-0'
                        src={require('./assets/style0.svg')} onClick={this.handleControllerLayoutChanged}
                      />
                      <Label for='uimode-0' className='mx-1 text-break ui-mode-label'>{bar}</Label>
                    </div>
                    <div className='ui-mode-card-separator' />
                    <div className='ui-mode-card-wapper'>
                      <img
                        className={'ui-mode-card' + this.activeControllerLayout(PanelLayout.Palette)} data-uimode={PanelLayout.Palette} id='uimode-1'
                        src={require('./assets/style1.svg')} onClick={this.handleControllerLayoutChanged}
                      />
                      <Label for='uimode-1' className='mx-1 text-break ui-mode-label'>{palette}</Label>
                    </div>
                  </div>
                </SettingRow>
              </SettingSection>

              <SettingSection title={selectStyleTips}>
                {itemsList.map((styleConfig, idx) => {
                  const style = styleConfig.name

                  if (FlyItemMode.Rotate === style) {
                    return (
                      <div key={idx}>
                        <ItemMode
                          idx={idx} styleConfig={styleConfig}
                          handleFlyModesChange={this.handleFlyModesChange}
                          flyModesUICollapseMap={this.state.flyModesUICollapseMap}
                          handleToggleFlyModesUICollapse={this.handleToggleFlyModesUICollapse}
                        />

                        {this.renderRotateSetting(styleConfig, idx)}
                      </div>
                    )
                  } else if (FlyItemMode.Path === style) {
                    return (
                      <div key={idx}>
                        <ItemMode
                          idx={idx} styleConfig={styleConfig}
                          handleFlyModesChange={this.handleFlyModesChange}
                          flyModesUICollapseMap={this.state.flyModesUICollapseMap}
                          handleToggleFlyModesUICollapse={this.handleToggleFlyModesUICollapse}
                        />

                        {this.renderPathSetting(styleConfig, idx)}
                      </div>
                    )
                  } else if (FlyItemMode.Route === style) {
                    return (
                      <div key={idx}>
                        <ItemMode
                          idx={idx} styleConfig={styleConfig}
                          handleFlyModesChange={this.handleFlyModesChange}
                          flyModesUICollapseMap={this.state.flyModesUICollapseMap}
                          handleToggleFlyModesUICollapse={this.handleToggleFlyModesUICollapse}
                        />

                        {/* 1.RoutesList */}
                        {this.renderRoutesList(styleConfig, idx)}
                      </div>
                    )
                  }

                  return null
                })}
              </SettingSection>
            </React.Fragment>}

          {/* 2.RouteDetails */}
          {(PageMode.RouteDetails === this.state.pageMode) && this.renderRouteDetailPage()}

          {/* 3.RecordDetails */}
          {(PageMode.RecordLoading === this.state.pageMode) && this.renderRecordLoadingPage()}
          {(PageMode.RecordDetails === this.state.pageMode) && this.renderRecordDetailPage()}

          {/* 4.MapPopper */}
          {this.state.isShowMapPopper && activedRouteConfig &&
            <MapPopper
              specifiedJimuMapId={this.getSpecifiedJimuMapId()}
              theme={theme}
              intl={intl}
              config={config}
              isShowMapPopper={isShowMapPopper}
              useDataSources={useDataSources}
              useMapWidgetIds={useMapWidgetIds}
              jimuMapView={jimuMapView}
              isTerrainLoaded={this.state.isTerrainLoaded}
              onRefGraphicInteractionManager={this.handleRefGraphicInteractionManager}
              activedRouteConfig={activedRouteConfig}
              //
              onShowMapPopperChange={this.handleShowMapPopperChange}
              //
              newFeatureMode={newFeatureMode}
              onNewFeatureModeChange={this.handleNewFeatureModeChange}
              //
              onMapPopperJimuMapViewUpdate={this.handleMapPopperJimuMapViewUpdate}
              onMapPopperViewGroupUpdate={this.handleMapPopperViewGroupUpdate}
              //
              onRecordAdd={this.handleRecordAdd}
              onRecordAddAndEdit={this.handleRecordAddAndEdit}
              buildTemporaryRecordConfig={this.buildTemporaryRecordConfig}
              buildDefaultRecord={this.buildDefaultRecord}
              getPopperJimuMapId={this.getPopperJimuMapId}
              //
              playingInfo={this.state.playingInfo}
              isPreviewRouteBtnPlaying={this.state.isPreviewRouteBtnPlaying}
              //
              onRemoveGraphics={this.handleRemoveGraphics}
              stopFly={this.stopFly}
            />}
        </div>
      </div>
    )
  }

  handleRefGraphicInteractionManager = (ref: GraphicInteractionManager): void => {
    this.graphicInteractionManagerRef = ref
    this.setState({ isDrawHelperLoaded: true })

    if (ref === null) {
      this.setState({ isDrawHelperLoaded: false })
    }
  }

  handleToggleFlyModesUICollapse = (idx: number, isUICollapse: boolean): void => {
    this.setState({
      flyModesUICollapseMap: this.state.flyModesUICollapseMap.setIn([String(idx)], isUICollapse)
    })
  }

  /// ////////////////////////////////////////////////////////////////////
  // planned routes
  // state
  handleSettingPageModeChange = async (mode: PageMode): Promise<any> => {
    await this.stopFly()
    this.setState({ pageMode: mode })
    this.setState({ playingInfo: null })// clean when PageModeChange

    if (mode === PageMode.Common) {
      this.setState({ activedRouteUuid: null, activedRecordUuid: null })// clean ids in PageMode.Common
      this.handleShowMapPopperChange(false)
    } else {
      this.handleShowMapPopperChange(true)
    }

    // clean newestRecord & PreviewingRouteInfo when outof L2 page
    if (mode !== PageMode.RouteDetails && mode !== PageMode.RecordLoading) {
      this.setState({ newestRecordIdx: null, playingInfo: null })
    }

    // highlight
    if (mode === PageMode.RouteDetails) {
      this.graphicInteractionManagerRef?.highlight(null)// clean highlight, when goto L2
    }
  }

  handleShowMapPopperChange = async (isShow: boolean, mode?: PageMode): Promise<any> => {
    // await this.stopFly();
    this.setState({ isShowMapPopper: isShow })

    if (!isShow) {
      this.setState({ isTerrainLoaded: false })
      if (utils.isDefined(mode)) {
        this.handleSettingPageModeChange(mode)
      }
    }
  }

  handleMapPopperJimuMapViewUpdate = (jimuMapView: JimuMapView): void => {
    this.setState({ isTerrainLoaded: false })

    this.setState({ mapPopperJimuMapView: jimuMapView }, () => {
      const { isTriggeredByFly, isTriggeredByMapSelf } = utils.getMapSwitchingInfo(this.props.widgetId, this.props.autoControlWidgetId, utils.genJimuMapIdForFly(this.props.useMapWidgetIds[0]))
      // switchMap
      if (!isTriggeredByFly && isTriggeredByMapSelf) {
        this.flyManager?.stop()
      } else if (isTriggeredByFly) {
        // do nothing
      }

      if (!utils.isDefined(this.flyManager)) {
        this.initFlyManager()
      } else {
        this.flyManager.stop({ isUpdate: true })
        this.flyManager.updateJimuMapView(this.state.mapPopperJimuMapView)
      }
    })
  }

  handleAutoControlMapPublish = (): void => {
    getAppStore().dispatch(appActions.requestAutoControlMapWidget(utils.genJimuMapIdForFly(this.props.useMapWidgetIds[0]), this.props.widgetId))
  }

  handleMapPopperViewGroupUpdate = (viewGroup: JimuMapViewGroup): void => {
    this.setState({ viewGroup: viewGroup }, () => {
      if (!utils.isDefined(this.flyManager)) {
        this.initFlyManager()
      } else {
        this.flyManager.stop({ isUpdate: true })
        this.flyManager.updateViewGroup(this.state.viewGroup)
      }
    })
  }

  getSpecifiedJimuMapId = (): string => {
    return utils.genJimuMapIdForFly(this.props.useMapWidgetIds[0])
  }

  async initFlyManager (): Promise<any> {
    if (this.state.delayUpdateFlyManagerFlag) {
      return// skip
    }

    // await this.stopFly();
    this.flyManager = new FlyManager({
      widgetConfig: this.props.config,
      isBuilderSettingFlag: true,
      jimuMapView: this.state.mapPopperJimuMapView,
      viewGroup: this.state.viewGroup,

      // uiLoadingCallbacks: {
      //   onLoading: this.handleFlyLoading,
      //   onLoaded: this.handleFlyLoaded
      // },

      flyStateCallbacks: {
        onFly: this.handleFlyPlay,
        onPause: this.handleFlyPause,
        onFinish: this.handleFlyFinish
      },
      // call mult times in a single play, so use callback
      drawOrUpdateGraphics: this.handleDrawOrUpdateGraphics,
      highlightGraphics: this.handleHighlightGraphics,

      onItemsUpdate: this.handleFlyManagerItemsUpdate,

      onBeforeSwitchMap: this.handleAutoControlMapPublish,
      onTerrainLoaded: this.onTerrainLoaded
    })

    this.flyManager.unRegisterItem()
    const routeItem = this.flyManager.findFirstRouteItem()
    this.flyManager.registerItem(routeItem.config?.uuid)
    // this.onRecordModeSelected(this.flyManager._findItemIdx(routeItem.config.uuid));
  }

  handleFlyManagerItemsUpdate = (items): void => {
    this.setState({ flyManagerItems: items })
  }

  onTerrainLoaded = (): void => {
    // console.log('onTerrainLoaded')
    this.setState({ isTerrainLoaded: true })
  }

  // config

  // routeConfig
  handleRoutesOrderUpdate = (treeItems: TreeItemsType): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx
    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig

    const reorderdItems = []
    treeItems.forEach((item: TreeItemType/*, keyIdx */) => {
      const key = item.itemKey
      const route = routesModeConfig.routes.find((route) => (route.idx === key))

      reorderdItems.push(route)
    })
    routesModeConfig.routes = reorderdItems

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  handleRouteConfigPush = (routesConfig: RouteConfig): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    routesModeConfig.routes.push(routesConfig)

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  handleRouteConfigDelete = (routeIdx: string): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const idx = routesModeConfig.routes.findIndex(route => (route.idx === routeIdx))
    if (idx > -1) {
      routesModeConfig.routes.splice(idx, 1)// remove

      items.splice(flyModeId, 1, routesModeConfig)// update
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      })
    }
  }

  handleRouteDisplayNameChange = (routeIdx: string, name: string): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const idx = routesModeConfig.routes.findIndex(route => (route.idx === routeIdx))

    const route: RouteConfig = routesModeConfig.routes[idx]
    route.displayName = name

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  handleRouteToggleVisibilityChange = (ids: FlyIds, visible: boolean): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const idx = routesModeConfig.routes.findIndex(route => (route.idx === ids.routeUuid))

    const route: RouteConfig = routesModeConfig.routes[idx]
    route.isInUse = visible

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  // recordConfig
  handleRecordsOrderUpdate = (treeItems: TreeItemsType): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx
    const routeId = this.state.activedRouteUuid

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const route = routesModeConfig.routes.find(route => (route.idx === routeId))

    const recordsConfig = route.records
    const reorderdRecords = []
    treeItems.forEach((item: TreeItemType/*, keyIdx */) => {
      const key = item.itemKey
      const record = recordsConfig.find((record) => (record.idx === key))

      // TODO if(record.storedGraphicsInfo.type === )
      record.storedGraphicsInfo.rawData.graphics.forEach((graphic) => {
        graphic.symbol = null
      })

      reorderdRecords.push(record)
    })
    route.records = reorderdRecords

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  handleRecordConfigPush = (recordConfig: RecordConfig): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx
    const routeId = this.state.activedRouteUuid

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const route = routesModeConfig.routes.find(route => (route.idx === routeId))

    route.records.push(recordConfig)

    items.splice(flyModeId, 1, routesModeConfig)// update
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('itemsList', items)
    })
  }

  handleRecordConfigDelete = (recordIdx: string): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx
    const routeId = this.state.activedRouteUuid

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const route = routesModeConfig.routes.find(route => (route.idx === routeId))

    const records = route.records
    const idx = records.findIndex(record => (record.idx === recordIdx))
    if (idx > -1) {
      records.splice(idx, 1)// remove

      items.splice(flyModeId, 1, routesModeConfig)// update
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      })
    }
  }

  handleRecordConfigUpdate = (recordConfig: RecordConfig): void => {
    const flyModeId = this.state.activedRecordFlyStyleIdx
    const routeId = this.state.activedRouteUuid

    const recordIdx = recordConfig.idx

    const items = this.props.config.itemsList.asMutable({ deep: true })
    const routesModeConfig = items[flyModeId] as RouteItemConfig
    const route = routesModeConfig.routes.find(route => (route.idx === routeId))

    const records = route.records
    const idx = records.findIndex(record => (record.idx === recordIdx))
    if (idx > -1) {
      records.splice(idx, 1, recordConfig)// update

      items.splice(flyModeId, 1, routesModeConfig)// update
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('itemsList', items)
      })
    }
  }

  handleRecordModeSelected = (idx: number): void => {
    this.setState({ activedRecordFlyStyleIdx: idx })
  }

  // level-1 routes-list
  handleRouteAdd = (routesConfig: RouteConfig): void => {
    this.handleRouteConfigPush(routesConfig)
    setTimeout(() => {
      this.handleRouteEdit({ routeUuid: routesConfig.idx })
    }, 100)
  }

  handleRouteDelete = (ids: FlyIds): void => {
    this.handleRouteConfigDelete(ids.routeUuid)
  }

  handleRouteEdit = (ids: FlyIds): void => {
    // this.setState({ activedRecordFlyStyleIdx: flyModeIdx });
    this.setState({ activedRouteUuid: ids.routeUuid })
    this.handleSettingPageModeChange(PageMode.RouteDetails)
  }

  getCurrentRouteName = (): string => {
    const routesConfig = this.flyManager.getRouteConfigByIdx({ routeUuid: this.state.activedRouteUuid })
    return routesConfig?.displayName
  }

  renderRoutesList = (routeConfig: RouteItemConfig, idx: number): React.ReactElement => {
    const { theme, intl } = this.props
    const klass = getSettingSectionStyles(this.props.config.itemsList, idx, this.state.flyModesUICollapseMap.getIn([String(idx)]))
    // this.onRecordModeSelected(idx);// react warn: setState in render
    return (
      <SettingSection className={'d-2 item-detail-wapper ' + klass}>
        <RouteList
          useMapWidgetIds={this.props.useMapWidgetIds}
          jimuMapView={this.state.jimuMapView}
          theme={theme}
          intl={intl}
          //
          flyModeIdx={idx}
          routeConfig={routeConfig}
          // onSettingPageModeChange={this.onSettingPageModeChange}
          onRouteEdit={this.handleRouteEdit}
          onRouteAdd={this.handleRouteAdd}
          onRouteDelete={this.handleRouteDelete}
          onRouteToggleVisibilityChange={this.handleRouteToggleVisibilityChange}
          onRoutesOrderUpdate={this.handleRoutesOrderUpdate}
        />
      </SettingSection>
    )
  }

  stopFly = async (): Promise<any> => {
    // await this.flyManager?.pause();
    await this.flyManager?.stop()
  }

  // level-2 route-details & record-list
  handleRecordAdd = async (record: RecordConfig): Promise<any> => {
    await this.stopFly()
    this.handleRecordConfigPush(record)
    this._handleRecordAddNotify(record.idx)// for level-2 badge
  }

  _handleRecordAddNotify = (idx: string): void => {
    this.setState({ newestRecordIdx: idx })
  }

  handleRecordAddAndEdit = async (record: RecordConfig): Promise<boolean> => {
    await this.stopFly()
    this.handleRecordConfigPush(record)
    await setTimeout(() => {
      this.handleRecordEdit({ routeUuid: this.state.activedRouteUuid, recordUuid: record.idx })
    }, 100)
    return true
  }

  handleRouteNameChange = (ids: FlyIds, name: string): void => {
    this.handleRouteDisplayNameChange(ids.routeUuid, name)
  }

  handleRecordEdit = async (ids: FlyIds, isTriggeredByExit?: boolean): Promise<any> => {
    await this.stopFly()

    // 1 state
    this.setState({ activedRecordUuid: ids.recordUuid })
    if (isTriggeredByExit) {
      return// if exit, do not update flyManager
    }

    // 2 update Record
    const isLiveview = (ids.recordUuid !== null)
    this.setState({ delayUpdateFlyManagerFlag: isLiveview, activedRecordUuid: ids.recordUuid }, () => {
      this.handleSettingPageModeChange(PageMode.RecordLoading)
      this._asyncRecordEdit(isLiveview, ids)
    })
  }

  _asyncRecordEdit = async (isLiveview: boolean, ids: FlyIds): Promise<any> => {
    await this.flyManager.setIsLiveviewSpecifiedRecord({ routeUuid: this.state.activedRouteUuid, recordUuid: this.state.activedRecordUuid }, isLiveview)
    // ui
    if (isLiveview) {
      this.handleSettingPageModeChange(PageMode.RecordDetails)
    } else {
      this.initFlyManager()
      this.handleSettingPageModeChange(PageMode.RouteDetails)// means backBtn to RouteConfig-Detail-page
    }
  }

  _getCurrentLiveviewSetting = (): LiveviewSettingOptions => {
    return this.flyManager.getLiveviewSettingInfo()
  }

  getDefaultDuration = (): number => {
    return this.flyManager.getDefaultDuration()
  }

  handleRecordPreview = async (ids: FlyIds): Promise<any> => {
    this.setState({ playingInfo: ids })

    await this.stopFly()

    // playingInfo + isPreviewRouteBtnPlaying = isPlaying
    const flyCallbacks: FlyStateChangeCallbacks = {
      onFly: async () => {
        this.handleFlyPlay()
        this.setState({ playingInfo: ids })
      },
      onPause: async () => {
        this.handleFlyPause()
        await this.handlePauseRecordPreview(null, true)
      },
      onFinish: async () => {
        this.handleFlyFinish()
        await this.handleFinishRecordPreview()
      }
    }
    await this.flyManager.previewSpecifiedRecord({ routeUuid: this.state.activedRouteUuid, recordUuid: ids.recordUuid }, flyCallbacks)
  }

  handlePauseRecordPreview = async (ids: FlyIds, avoidTrigger?: boolean): Promise<any> => {
    if (!avoidTrigger) {
      await this.stopFly()// trigger stop
    }
    this.setState({ playingInfo: null })
  }

  handleFinishRecordPreview = async (/* ids: FlyIds */): Promise<any> => {
    this.setState({ playingInfo: null })
  }

  handleRecordDelete = async (ids: FlyIds): Promise<any> => {
    await this.stopFly()
    this.handleRecordConfigDelete(ids.recordUuid)
    this.setState({ playingInfo: null })
  }

  // Route preview
  handlePreviewRoute = async (speed: number, ids: FlyIds, needToReset: boolean): Promise<any> => {
    const playingInfo = this.state.playingInfo
    if (playingInfo && playingInfo.routeUuid === null && playingInfo.recordUuid !== null) {
      await this.stopFly()// stop RecordPreview
    } // else do not stop current fly

    const flyIds = { routeUuid: ids.routeUuid }
    if (needToReset) { // needToReset e.g. configs changed
      await this.flyManager.prepareRoutePreview(flyIds)
    }

    this.setState({ isPreviewRouteBtnPlaying: true })
    this.setState({ playingInfo: ids })
    await this.flyManager.previewSpecifiedRoute(speed, flyIds)
  }

  handlePauseRoutePreview = (): void => {
    this.flyManager?.pause()
    this.setState({ isPreviewRouteBtnPlaying: false })
  }

  handleNewFeatureModeChange = async (mode: NewFeatureMode): Promise<any> => {
    await this.stopFly()
    if (this.state.newFeatureMode !== mode) {
      this.setState({ newFeatureMode: mode })
    }
  }

  renderRouteDetailPage = (): React.ReactElement => {
    let content
    const { theme, intl } = this.props
    const { newFeatureMode } = this.state

    const routesConfig = this.flyManager.getRouteConfigByIdx({ routeUuid: this.state.activedRouteUuid })
    if (!utils.isDefined(this.state.mapPopperJimuMapView)) {
      // loading
      content = <Loading type={LoadingType.Secondary} />
    } else {
      content = (utils.isDefined(routesConfig) &&
        <RouteDetail
          routeConfig={routesConfig}
          mapPopperJimuMapView={this.state.mapPopperJimuMapView}
          isTerrainLoaded={this.state.isTerrainLoaded}
          theme={theme}
          intl={intl}
          //
          onShowMapPopperChange={this.handleShowMapPopperChange}
          onSettingPageModeChange={this.handleSettingPageModeChange}
          //
          onRouteNameChange={this.handleRouteNameChange}
          onRouteDelete={this.handleRouteDelete}
          onRouteEdit={this.handleRouteEdit}
          newFeatureMode={newFeatureMode}
          onNewFeatureModeChange={this.handleNewFeatureModeChange}
          //
          isPreviewRouteBtnPlaying={this.state.isPreviewRouteBtnPlaying}
          onPreviewRoute={this.handlePreviewRoute}
          onPauseRoutePreview={this.handlePauseRoutePreview}
          newestRecordIdx={this.state.newestRecordIdx}
          //
          playingInfo={this.state.playingInfo}
          //
          onRecordEdit={this.handleRecordEdit}
          onRecordPreview={this.handleRecordPreview}
          onPauseRecordPreview={this.handlePauseRecordPreview}
          onRecordDelete={this.handleRecordDelete}
          onRecordsOrderUpdate={this.handleRecordsOrderUpdate}
          //
          isRecordCanPlay={this.flyManager?.isRecordCanPlay}
          isDrawHelperLoaded={this.state.isDrawHelperLoaded}
        />)
    }

    return content
  }

  // level-3  record details setting
  buildTemporaryRecordConfig = (graphicsInfo: GraphicsInfo, cameraInfo: __esri.Camera, jimuMapView: JimuMapView): RecordConfig => {
    return this.flyManager.buildTemporaryRecordConfig(graphicsInfo, cameraInfo, jimuMapView)
  }

  buildDefaultRecord = async (recordConfig: RecordConfig, graphicsInfoRef: GraphicsInfo): Promise<Record> => {
    const record = await this.flyManager.buildTemporaryRecord(recordConfig, this.state.jimuMapView.view as __esri.SceneView, null, graphicsInfoRef)
    return record
  }

  getPopperJimuMapId = (): string => {
    return utils.removeJimuMapIdForFly(this.state.mapPopperJimuMapView.id)
  }

  handleRecordChange = (record: RecordConfig): void => {
    this.handleRecordConfigUpdate(record)
  }

  handleLiveviewSettingChange = (settingParamObj: LiveviewSettingOptions): void => {
    this.flyManager.onLiveviewParamChange(settingParamObj, { isNeedHighlight: true })
  }

  renderRecordLoadingPage = (): React.ReactElement => {
    return <Loading type={LoadingType.Secondary} />
  }

  renderRecordDetailPage = (): React.ReactElement => {
    const { theme, intl } = this.props

    const record = this.flyManager.getRecordByIds({ routeUuid: this.state.activedRouteUuid, recordUuid: this.state.activedRecordUuid })
    return (utils.isDefined(record) &&
      <RecordDetail
        record={record}
        mapPopperJimuMapView={this.state.mapPopperJimuMapView}
        theme={theme}
        intl={intl}
        //
        onRecordEdit={this.handleRecordEdit}
        onRecordChange={this.handleRecordChange}
        //
        getCurrentLiveviewSetting={this._getCurrentLiveviewSetting}
        onLiveviewSettingChange={this.handleLiveviewSettingChange}
        getDefaultDuration={this.getDefaultDuration}
      />)
  }

  // graphicInteractionManager callback
  // draw(update) graphics back
  handleDrawOrUpdateGraphics = (record: RecordConfig): GraphicsInfo => {
    if (typeof this.graphicInteractionManagerRef?.drawOrUpdateGraphics === 'function') {
      return this.graphicInteractionManagerRef.drawOrUpdateGraphics(record)// draw graphics back
    }
  }

  handleRemoveGraphics = (graphics: __esri.Graphic[]): void => {
    this.graphicInteractionManagerRef?.removeGraphics(graphics)
  }

  handleHighlightGraphics = (graphics: __esri.Graphic[]): void => {
    if (typeof this.graphicInteractionManagerRef?.highlight === 'function') {
      this.graphicInteractionManagerRef.highlight(graphics)// highlight graphics
    }
  }
}
