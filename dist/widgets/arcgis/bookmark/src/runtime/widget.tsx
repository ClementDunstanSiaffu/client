/** @jsx jsx */
import {
  IMState,
  classNames,
  React,
  css,
  jsx,
  polished,
  AllWidgetProps,
  defaultMessages as jimuCoreMessages,
  ThemeVariables,
  SerializedStyles,
  AppMode,
  ImmutableArray,
  ImmutableObject,
  utils,
  IMAppConfig,
  appActions,
  TransitionContainer,
  getAppStore,
  BrowserSizeMode
} from 'jimu-core'
import {
  Button,
  Card,
  CardBody,
  TextInput,
  ImageWithParam,
  NavButtonGroup,
  Select,
  ImageFillMode,
  defaultMessages as jimuUIDefaultMessages,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem
} from 'jimu-ui'
import {
  IMConfig,
  Bookmark,
  TemplateType,
  PageStyle,
  DirectionType,
  DisplayType,
  Status,
  ImgSourceType,
  LayersConfig
} from '../config'
import defaultMessages from './translations/default'
import { Fragment } from 'react'
import {
  JimuMapViewComponent,
  JimuMapView,
  loadArcGISJSAPIModules,
  JimuMapViewGroup
} from 'jimu-arcgis'
import {
  LayoutEntry,
  ViewportVisibilityContext,
  ViewVisibilityContext,
  ViewVisibilityContextProps
} from 'jimu-layouts/layout-runtime'
import { versionManager } from '../version-manager'
import { TextDotsOutlined } from 'jimu-icons/outlined/editor/text-dots'
import { PlayCircleFilled } from 'jimu-icons/filled/editor/play-circle'
import { PauseOutlined } from 'jimu-icons/outlined/editor/pause'
import { PinOutlined } from 'jimu-icons/outlined/application/pin'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import { DownOutlined } from 'jimu-icons/outlined/directional/down'
import { UpOutlined } from 'jimu-icons/outlined/directional/up'
import { RightOutlined } from 'jimu-icons/outlined/directional/right'
import { LeftOutlined } from 'jimu-icons/outlined/directional/left'
import { TrashFilled } from 'jimu-icons/filled/editor/trash'
const AUTOPLAY_DURATION = 1000

interface Props {
  appMode: AppMode
  appConfig: IMAppConfig
  layouts: any
  selectionIsSelf: boolean
  selectionIsInSelf: boolean
  autoplayActiveId: string
  mapWidgetId: string
  browserSizeMode: BrowserSizeMode
  isPrintPreview: boolean
}

interface States {
  jimuMapView: JimuMapView
  widgetRect: {
    width: number
    height: number
  }
  apiLoaded: boolean
  viewGroup: JimuMapViewGroup
  bookmarkOnViewId: number | string
  autoPlayStart: boolean
  LayoutEntry: any
  runtimeBmArray: any[]
  playTimer: any
  isSetLayout: boolean
  isSuspendMode: boolean
}

export class Widget extends React.PureComponent<
AllWidgetProps<IMConfig> & Props,
States
> {
  graphicsLayerCreated: {
    [viewId: string]: boolean
  }

  graphicsPainted: {
    [viewId: string]: {
      [bookmarkId: number]: boolean
    }
  }

  graphicsLayerId: {
    [viewId: string]: string
  }

  runtimeReference: HTMLDivElement
  containerRef: any
  rtBookmarkId: number
  showInView: boolean
  alreadyActiveLoading: boolean
  Graphic: typeof __esri.Graphic = null
  GraphicsLayer: typeof __esri.GraphicsLayer = null
  Extent: typeof __esri.Extent = null
  Viewpoint: typeof __esri.Viewpoint = null
  Basemap: typeof __esri.Basemap = null

  static mapExtraStateProps = (
    state: IMState,
    props: AllWidgetProps<IMConfig>
  ): Props => {
    const appConfig = state?.appConfig
    const {
      layouts,
      layoutId,
      layoutItemId,
      builderSupportModules,
      id,
      useMapWidgetIds
    } = props
    const selection = state?.appRuntimeInfo?.selection
    const selectionIsInSelf =
      selection &&
      builderSupportModules &&
      builderSupportModules.widgetModules &&
      builderSupportModules.widgetModules.selectionInBookmark(
        selection,
        id,
        appConfig,
        false
      )
    const mapWidgetsInfo = state?.mapWidgetsInfo
    const mapWidgetId =
      useMapWidgetIds && useMapWidgetIds.length !== 0
        ? useMapWidgetIds[0]
        : undefined
    const browserSizeMode = state?.browserSizeMode || BrowserSizeMode.Large
    return {
      appMode: state?.appRuntimeInfo?.appMode,
      appConfig,
      layouts,
      selectionIsSelf:
        selection &&
        selection.layoutId === layoutId &&
        selection.layoutItemId === layoutItemId,
      selectionIsInSelf,
      autoplayActiveId: mapWidgetId
        ? mapWidgetsInfo[mapWidgetId]?.autoControlWidgetId
        : undefined,
      mapWidgetId,
      browserSizeMode,
      isPrintPreview: state?.appRuntimeInfo?.isPrintPreview ?? false
    }
  }

  constructor (props) {
    super(props)

    const runtimeBmId = this.getRuntimeUuid()
    const runtimeBmArray = JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
    const stateObj: States = {
      jimuMapView: undefined,
      widgetRect: undefined,
      apiLoaded: false,
      viewGroup: undefined,
      bookmarkOnViewId: 1,
      autoPlayStart: false,
      LayoutEntry: null,
      runtimeBmArray,
      playTimer: undefined,
      isSetLayout: false,
      isSuspendMode: false
    }

    if (window.jimuConfig.isInBuilder) {
      stateObj.LayoutEntry = this.props.builderSupportModules.LayoutEntry
    } else {
      stateObj.LayoutEntry = LayoutEntry
    }

    let rtId = 0
    if (runtimeBmArray.length > 0) {
      const lastId = runtimeBmArray[runtimeBmArray.length - 1]
      const { title: lastItem } = JSON.parse(utils.readLocalStorage(lastId))
      const strIndex = lastItem.lastIndexOf('-')
      rtId = parseInt(lastItem.substring(strIndex + 1))
    }
    this.state = stateObj
    this.graphicsLayerCreated = {}
    this.graphicsPainted = {}
    this.graphicsLayerId = {}
    this.runtimeReference = undefined
    this.containerRef = React.createRef()
    this.rtBookmarkId = rtId
    this.showInView = false
    this.alreadyActiveLoading = false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      !nextProps ||
      Object.keys(nextProps).length === 0 ||
      !prevState ||
      Object.keys(prevState).length === 0
    ) {
      return null
    }
    const { autoPlayStart, playTimer } = prevState
    if (nextProps.autoplayActiveId !== nextProps.id) {
      if (autoPlayStart && playTimer) clearInterval(playTimer)
      return {
        autoPlayStart: false,
        playTimer: undefined
      }
    }
    return null
  }

  static versionManager = versionManager

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/geometry/Extent',
        'esri/Viewpoint',
        'esri/Basemap'
      ]).then(modules => {
        ;[
          this.Graphic,
          this.GraphicsLayer,
          this.Extent,
          this.Viewpoint,
          this.Basemap
        ] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate (prevProps) {
    // config setting widget synchronous switch
    const { config, appMode, id, autoplayActiveId, isPrintPreview } = this.props
    const { autoPlayStart, playTimer, jimuMapView, isSuspendMode } = this.state
    const activeBookmarkId = this.props?.stateProps?.activeBookmarkId || 0
    // Clear the previous widget's drawing when the widget that controls the Map changes
    if (autoplayActiveId && jimuMapView && id !== autoplayActiveId) {
      const toClearLayerId = this.graphicsLayerId[jimuMapView.id]
      if (!toClearLayerId) return
      const toClearLayer = jimuMapView.view.map.findLayerById(
        toClearLayerId
      ) as __esri.GraphicsLayer
      toClearLayer && toClearLayer.removeAll()
      this.graphicsPainted[jimuMapView.id] = {}
    }
    // Handle manually opening Live view (active on loading)
    if (prevProps.appMode === AppMode.Design && appMode === AppMode.Run) {
      if (jimuMapView && config.initBookmark) {
        const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
        const bookmarks = config.displayFromWeb
          ? config.bookmarks.concat(mapBookmarks)
          : config.bookmarks
        if (bookmarks.length > 0 && this.showInView) {
          jimuMapView.view.when(() => {
            this.setState({
              bookmarkOnViewId: bookmarks[0].id
            })
            this.onViewBookmark(bookmarks[0])
          })
        }
      }
    }
    // Turn off liveview,change paging style to 'scroll',sizeMode change and uncheck auto play need to turn off the autoplay
    if (this.autoOffCondition(prevProps)) {
      if (autoPlayStart) {
        if (playTimer) clearInterval(playTimer)
        this.setState({
          autoPlayStart: false,
          playTimer: undefined
        })
        return
      }
    }
    // PrintPreview mode
    if (prevProps.isPrintPreview !== isPrintPreview) {
      if (autoPlayStart) {
        this.setState({ isSuspendMode: true })
        this.handleAutoPlay()
      } else if (isSuspendMode && !autoPlayStart) {
        this.setState({ isSuspendMode: false })
        this.handleAutoPlay()
      }
    }
    // This indicates that the activeId change is caused by setting
    const settingChangeBookmark =
      this.props?.stateProps?.settingChangeBookmark || false
    if (settingChangeBookmark && activeBookmarkId) {
      // && (activeBookmarkId !== bookmarkOnViewId)
      const current =
        config.bookmarks.findIndex(x => x.id === activeBookmarkId) > -1
          ? config.bookmarks.findIndex(x => x.id === activeBookmarkId)
          : 0
      this.setState({ bookmarkOnViewId: activeBookmarkId })
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'settingChangeBookmark', false)
      )
      if (appMode === AppMode.Run) { this.onViewBookmark(config.bookmarks[current]) }
    }
    // Delete the last bookmark need to clear the layer in map widget
    const lastFlag = this.props?.stateProps?.lastFlag || false
    if (lastFlag) {
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'lastFlag', false)
      )
      const bookmarkLayer = jimuMapView.view.map.findLayerById(
        this.graphicsLayerId[jimuMapView.id]
      ) as __esri.GraphicsLayer
      bookmarkLayer && bookmarkLayer.removeAll()
    }
    this.settingLayout()
  }

  autoOffCondition = prevProps => {
    const { config, appMode, browserSizeMode } = this.props
    const { pageStyle, autoPlayAllow, autoInterval, autoLoopAllow } = config
    const sizeModeChange = browserSizeMode !== prevProps.browserSizeMode
    const autoSettingChange =
      autoInterval !== prevProps.config?.autoInterval ||
      autoLoopAllow !== prevProps.config?.autoLoopAllow
    return (
      appMode === AppMode.Design ||
      pageStyle === PageStyle.Scroll ||
      !autoPlayAllow ||
      autoSettingChange ||
      sizeModeChange
    )
  }

  componentWillUnmount () {
    // Delete the widget need to clear the layer in map widget and the localeStorage for runtime bm.
    const { jimuMapView } = this.state
    const widgets = getAppStore().getState().appConfig.widgets
    if (!widgets[this.props.id] && jimuMapView) {
      const bookmarkLayer = jimuMapView.view.map.findLayerById(
        this.graphicsLayerId[jimuMapView.id]
      ) as __esri.GraphicsLayer
      bookmarkLayer && bookmarkLayer.removeAll()
      const runtimeBmId = this.getRuntimeUuid()
      const runtimeBookmarkArray: string[] =
        JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
      runtimeBookmarkArray.forEach(key => {
        utils.removeFromLocalStorage(key)
      })
      utils.removeFromLocalStorage(runtimeBmId)
    }
  }

  getRuntimeUuid = () => {
    const { id, mapWidgetId } = this.props
    const runtimeUuid = utils.getLocalStorageAppKey()
    return `${runtimeUuid}-${id}-${mapWidgetId || 'default'}-RtBmArray`
  }

  settingLayout = () => {
    const { layoutId, layoutItemId, id, selectionIsSelf } = this.props
    const { isSetLayout } = this.state
    if (layoutId && id && layoutItemId && !isSetLayout && selectionIsSelf) {
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'layoutInfo', {
          layoutId,
          layoutItemId
        })
      )
      this.setState({ isSetLayout: true })
    }
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign(
      {},
      defaultMessages,
      jimuUIDefaultMessages,
      jimuCoreMessages
    )
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: messages[id] },
      values
    )
  }

  isEditing = (): boolean => {
    const { appMode, config, selectionIsSelf, selectionIsInSelf } = this.props
    if (!window.jimuConfig.isInBuilder) return false
    return (
      (selectionIsSelf || selectionIsInSelf) &&
      window.jimuConfig.isInBuilder &&
      appMode !== AppMode.Run &&
      config.isTemplateConfirm
    )
  }

  handleRuntimeAdd = () => {
    this.rtBookmarkId++
    const { jimuMapView } = this.state
    if (!jimuMapView) return
    const view = jimuMapView.view
    const { appMode, id } = this.props
    if (appMode === AppMode.Run) {
      const allLayers = view.map.layers.toArray()
      const opLayersArray = JSON.parse(JSON.stringify(view.map)).operationalLayers
      const layersArray = []
      allLayers.forEach(layer => {
        for (const index in opLayersArray) {
          const item = opLayersArray[index]
          if (layer.id === item.id) {
            layersArray.push(layer)
            break
          }
        }
      })
      const layersConfig = this.getLayersConfig(layersArray)
      const newBookmarkId = `RtBm-${utils.getUUID()}`
      const bookmark: Bookmark = {
        id: newBookmarkId,
        name: `${this.formatMessage('_widgetLabel')}(${this.rtBookmarkId})`,
        title: `${this.formatMessage('_widgetLabel')}-${this.rtBookmarkId}`,
        type: view.type,
        extent: view.extent.toJSON(),
        viewpoint: view.viewpoint.toJSON(),
        showFlag: true,
        runTimeFlag: true,
        mapViewId: jimuMapView.id,
        mapDataSourceId: jimuMapView.dataSourceId,
        layersConfig
      }
      const runtimeBmId = this.getRuntimeUuid()
      const runtimeBookmarkArray: string[] =
        JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
      utils.setLocalStorage(
        runtimeBmId,
        JSON.stringify(runtimeBookmarkArray.concat(`${id}-${newBookmarkId}`))
      )
      utils.setLocalStorage(`${id}-${newBookmarkId}`, JSON.stringify(bookmark))
      this.setState({
        runtimeBmArray: runtimeBookmarkArray.concat(`${id}-${newBookmarkId}`)
      })
    }
  }

  getLayersConfig = layersArray => {
    const layersConfig: LayersConfig = {}
    const recursion = (array, config: LayersConfig) => {
      array.forEach(layer => {
        config[layer.id] = { layers: {} }
        const visibleFalg =
          layer?.visibility === undefined
            ? !!layer?.visible
            : false
        config[layer.id].visibility = visibleFalg
        const children = layer.layers || layer.sublayers || layer.allSublayers
        if (children && children.length > 0) { recursion(children, config[layer.id].layers) }
      })
      return config
    }
    return recursion(layersArray, layersConfig)
  }

  showLayersConfig = (
    layersArray,
    layersConfig,
    operationalLayers = [],
    mapDsChange = false
  ) => {
    if (mapDsChange) return
    const recursion = (array, config) => {
      array.forEach(layer => {
        // The Bookmark layer displays by default. Map layers and other map operations layers,
        // if the value of visibility is not available in config, it will not be displayed by default.
        const index = operationalLayers.findIndex(
          operLayer => operLayer.id === layer.id
        )
        const defaultVision = !(index > -1)
        layer.visible =
          config[layer.id]?.visibility === undefined
            ? defaultVision
            : config[layer.id]?.visibility
        const children = layer.layers || layer.sublayers || layer.allSublayers
        const subConfig = config?.[layer.id]?.layers
        if (
          children &&
          children.length > 0 &&
          subConfig &&
          Object.keys(subConfig).length > 0
        ) { recursion(children.toArray(), subConfig) }
      })
    }
    recursion(layersArray, layersConfig)
  }

  showMapOrgLayer = (layersArray, visibleLayers) => {
    const recursion = (array, visibleArray) => {
      array.forEach(layer => {
        for (const index in visibleArray) {
          const item = visibleArray[index]
          layer.visible = false
          if (layer.id === item.id) {
            layer.visible = true
            break
          }
        }
        if (layer.layers && layer.layers.length > 0) { recursion(layer.layers.toArray(), visibleArray) }
      })
    }
    recursion(layersArray, visibleLayers)
  }

  onViewBookmark = (item: ImmutableObject<Bookmark>) => {
    if (!item) return
    const { jimuMapView, viewGroup } = this.state
    const { id, useMapWidgetIds } = this.props
    const activeBookmarkId = this.props?.stateProps?.activeBookmarkId || 0
    if (item && !item.runTimeFlag && activeBookmarkId !== item.id) {
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'activeBookmarkId', item.id)
      )
    }
    // Apply for control of the Map, to turn off other widget's control
    if (useMapWidgetIds && useMapWidgetIds.length !== 0) {
      getAppStore().dispatch(
        appActions.requestAutoControlMapWidget(useMapWidgetIds[0], id)
      )
    }
    // Either go directly to view or view after the switch of the map
    if (jimuMapView) {
      if (item && jimuMapView.dataSourceId !== item.mapDataSourceId) {
        viewGroup &&
          viewGroup.switchMap().then(() => {
            this.viewBookmark(item)
          })
      } else {
        this.viewBookmark(item)
      }
    }
  }

  viewBookmark = (item: ImmutableObject<Bookmark>) => {
    const { appMode, config } = this.props
    const { jimuMapView } = this.state
    const { extent, viewpoint } = item
    const gotoOpts = { duration: AUTOPLAY_DURATION }

    if (appMode === AppMode.Run) {
      if (jimuMapView && jimuMapView.view) {
        jimuMapView.view.type === '3d'
          ? jimuMapView.view.goTo(
            { target: this.Viewpoint.fromJSON(viewpoint) },
            gotoOpts
          )
          : jimuMapView.view.goTo(
            { extent: this.Extent.fromJSON(extent) },
            gotoOpts
          )
        if (item.baseMap) { jimuMapView.view.map.basemap = this.Basemap.fromJSON(item.baseMap) }
        const layersArray = jimuMapView.view.map.layers.toArray()
        const operationalLayers = JSON.parse(
          JSON.stringify(jimuMapView.view.map)
        )?.operationalLayers
        // This variable indicates whether the current map is the map for which the bookmark corresponds.
        // If it is not, the variable is true, need to keep the layer attribute of the map itself.
        const mapDsChange = jimuMapView.dataSourceId !== item.mapDataSourceId
        item.mapOriginFlag
          ? this.showMapOrgLayer(layersArray, item.visibleLayers)
          : this.showLayersConfig(
            layersArray,
            item.layersConfig,
            operationalLayers,
            mapDsChange
          )
        // repaint graphics to map widget
        const graphicsExist = item.graphics && item.graphics.length > 0
        if (!this.graphicsLayerCreated[jimuMapView.id]) {
          const timeStamp = (new Date().getTime())
          const bookmarkGraphicsLayerId = `bookmark-layer-${jimuMapView.id}-${timeStamp}`
          const layer = new this.GraphicsLayer({
            id: bookmarkGraphicsLayerId,
            listMode: 'hide',
            title: this.formatMessage('graphicLayer'),
            elevationInfo: { mode: 'relative-to-scene' }
          })
          if (graphicsExist) {
            item.graphics.forEach(graphic => {
              layer.graphics.push(this.Graphic.fromJSON(graphic))
            })
          }
          jimuMapView.view.map.add(layer)
          this.graphicsPainted[jimuMapView.id] = {}
          this.graphicsPainted[jimuMapView.id][item.id] = true
          this.graphicsLayerId[jimuMapView.id] = layer.id
          this.graphicsLayerCreated[jimuMapView.id] = true
        } else {
          const graphicsLayer = jimuMapView.view.map.findLayerById(
            this.graphicsLayerId[jimuMapView.id]
          ) as __esri.GraphicsLayer
          if (config.displayType === DisplayType.Selected) {
            // Only selected
            graphicsLayer.removeAll()
            if (graphicsExist) {
              item.graphics.forEach(graphic => {
                graphicsLayer.graphics.push(this.Graphic.fromJSON(graphic))
              })
            }
          } else {
            // See all (Note: Already drawed repaint after edit)
            if (!this.graphicsPainted[jimuMapView.id][item.id]) {
              if (graphicsExist) {
                item.graphics.forEach(graphic => {
                  graphicsLayer.graphics.push(this.Graphic.fromJSON(graphic))
                })
              }
              this.graphicsPainted[jimuMapView.id][item.id] = true
            } else {
              // Already drawed repaint after edit
              if (graphicsExist) {
                const toRemoveGraphics = []
                item.graphics.forEach(toMoveGraphic => {
                  const toMoveIndex = graphicsLayer.graphics.findIndex(
                    oldGraphic =>
                      oldGraphic.attributes.id === toMoveGraphic.attributes.id
                  )
                  if (toMoveIndex > -1) {
                    toRemoveGraphics.push(
                      graphicsLayer.graphics.getItemAt(toMoveIndex)
                    )
                  }
                })
                graphicsLayer.removeMany(toRemoveGraphics)
                item.graphics.forEach(graphic => {
                  graphicsLayer.graphics.push(this.Graphic.fromJSON(graphic))
                })
              }
            }
          }
        }
      }
    }
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    const { id, appMode, config } = this.props
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    return css`
      ${'&.bookmark-widget-' + id} {
        overflow: ${
          window.jimuConfig.isInBuilder && appMode !== AppMode.Run
            ? 'hidden'
            : 'auto'
        };
        height: 100%;
        width: 100%;
        .bookmark-title-height{
          height: 45px;
        }
        .bookmark-list-height {
          height: calc(100% - 45px);
          overflow-y: ${
            window.jimuConfig.isInBuilder && appMode !== AppMode.Run
              ? 'hidden !important'
              : 'auto'
          };
        }
        .bookmark-title {
          flex-grow: 1;
          padding: 0 15px;
          line-height: 45px;
          font-size: ${polished.rem(16)};
        }
        .bookmark-btn-container {
          width: 32px;
          height: 32px;
        }
        .bookmark-btn {
          font-weight: bold;
          font-size: ${polished.rem(12)};
        }
        .bookmark-view-auto {
          overflow-y: ${
            window.jimuConfig.isInBuilder &&
            appMode !== AppMode.Run &&
            !customType.includes(config.templateType)
              ? 'hidden'
              : 'auto'
          };
        }
        .gallery-card-add {
          cursor: pointer;
          min-width: 200px;
          height: 189px;
          display: grid;
          border: 1px solid ${theme.colors.secondary};
          background: ${theme.colors.white};
          margin: ${
            config.direction === DirectionType.Horizon
              ? polished.rem(12)
              : polished.rem(16)
          };
        }
        .card-add {
          cursor: pointer;
          height: 159px;
          display: inline-flex;
          border: 1px solid ${theme.colors.palette.light[400]};
          background: ${theme.colors.white};
          width: 150px;
          margin: 15px 10px;
          position: relative;
          .add-placeholder {
            height: 120px;
          }
        }
        .list-add {
          cursor: pointer;
          height: 37px;
          display: inline-flex;
          border: 1px solid ${theme.colors.palette.light[400]};
          background: ${theme.colors.white};
          width: calc(100% - 30px);
          margin: 0 15px 15px;
          position: relative;
        }
        .gallery-add-icon {
          position: relative;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin-top: -${polished.rem(10)};
          margin-left: -${polished.rem(10)};
        }
        .bookmark-container {
          ${config.templateType !== TemplateType.Card &&
            config.templateType !== TemplateType.List &&
            'height: 100%'};
          width: 100%;
          color: ${theme.colors.black};
          .bookmark-runtimeSeparator {
            margin: 10px 15px 15px;
            border: 1px dashed ${theme.colors.secondary};
          }
          .widget-card-content {
            padding: 8px 9px !important;
          }
          .bookmark-card-col {
            width: 170px;
            padding: 10px 10px 0;
            position: relative;
            .widget-card-image-inner {
              width: 148px;
              height: 120px;
            }
            .card-inner {
              transition: all 0.5s;
            }
          }
          .bookmark-list-col {
            padding: ${polished.rem(8)} 0;
            align-items: center !important;
            margin: 8px 15px 0;
          }
          .bookmark-pointer {
            cursor: pointer;
            &:hover {
              background: ${theme.colors.palette.light[200]};
            }
          }
          .bookmark-only-pointer {
            cursor: pointer;
          }
          .bookmark-custom-pointer {
            cursor: pointer;
            border: 1px solid ${theme.colors.light};
            ${config.direction === DirectionType.Vertical &&
              'position: absolute;'}
            ${config.direction === DirectionType.Vertical &&
              'width: calc(100% - 40px) !important;'}
            ${config.direction === DirectionType.Vertical &&
              `height: calc(100% - ${config.space}px) !important;`}
          }
          .layout-height{
            height: ${
              config.pageStyle === PageStyle.Paging
                ? 'calc(100% - 49px)'
                : '100%'
            } !important;
          }
          .border-none {
            border: none !important;
          }
          .runtime-bookmarkCard {
            .runtimeBookmarkCard-upload,
            .runtimeBookmarkCard-operation {
              display: none;
            }
            &:hover {
              .runtimeBookmarkCard-operation {
                display: block;
                position: absolute;
                right: 10px;
                background: ${theme.colors.secondary};
                opacity: 0.9;
              }
              .runtimeBookmarkCard-upload {
                display: block;
                position: absolute;
                right: 10px;
                bottom: 48px;
                background: ${theme.colors.secondary};
                opacity: 0.9;
              }
            }
          }
          .runtime-bookmarkList {
            display: inline-block !important;
            width: calc(100% - 30px);
            padding: ${polished.rem(4)} 0;
            margin: 0 15px 6px;
            align-items: center !important;
            .runtimeBookmarkList-operation {
              margin-right: 15px;
              display: none;
              height: 28px;
            }
            &:hover {
              .runtimeBookmarkList-operation {
                display: block;
              }
            }
          }
          .runtime-title-con {
            padding: 4px 0 !important;
          }
          .runtime-title {
            width: auto;
            border: none;
            background-color: transparent;
            display: inline-block !important;
            height: 29px;
            &:focus {
              border: 1px solid ${theme.colors.secondary};
            }
            &:hover {
              border: 1px solid ${theme.colors.secondary};
            }
          }
          .suspension-drop-btn{
            border-radius: 12px;
            border: 0;
          }
          .suspension-drop-placeholder{
            width: 32px;
          }
          .suspension-nav-placeholder1{
            height: 32px;
            width: 60px;
          }
          .suspension-nav-placeholder2{
            height: 24px;
            width: 100px;
          }
          .suspension-noborder-btn{
            border: 0;
            padding-left: ${polished.rem(7)};
          }
          .suspension-tools-top {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${polished.rem(2)};
            }
          }
          .suspension-top-number {
            position: absolute;
            top: 5px;
            right: 5px;
            background: ${theme.colors.white};
            border-radius: 10px;
            opacity: 0.8;
            width: 40px;
            text-align: center;
            z-index: 1;
          }
          .suspension-tools-middle {
            display: flex;
            width: 100%;
            padding: 0 ${polished.rem(8)};
            position: absolute;
            top: 50%;
            margin-top: ${
              config.direction === DirectionType.Horizon ? '-13px' : '-26px'
            };
            z-index: 1;
            .middle-nav-group button {
              background: ${theme.colors.white};
              opacity: 0.8;
              border-radius: 50%;
            }
          }
          .suspension-middle-play {
            position: absolute;
            right: 5px;
            bottom: 20px;
            z-index: 2;
          }
          .suspension-navbar {
            display: flex;
            width: 100%;
            padding: 0 ${polished.rem(8)};
            position: absolute;
            top: 50%;
            z-index: 1;
            .navbar-btn-pre{
              position: absolute;
              left: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              right: 5px;
              border-radius: 50%;
            }
          }
          .suspension-navbar-verticle {
            display: flex;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            z-index: 1;
            margin-left: -13px;
            .navbar-btn-pre{
              position: absolute;
              top: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              bottom: 5px;
              border-radius: 50%;
            }
          }
          .suspension-tools-text {
            display: flex;
            width: 100%;
            padding: ${polished.rem(8)};
            position: absolute;
            border-top: 1px solid ${theme.colors.secondary};
            bottom: 0;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${polished.rem(2)};
            }
            .nav-btn-text {
              width: 100px;
            }
          }
          .suspension-tools-bottom {
            display: flex;
            width: 100%;
            padding: 0 ${polished.rem(8)};
            position: absolute;
            bottom: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${polished.rem(3)};
            }
            .scroll-navigator {
              .btn {
                border-radius: ${theme.borderRadiuses.circle};
              }
            }
            .nav-btn-bottom {
              width: ${config.autoPlayAllow ? '100px' : '60px'};
              border-radius: 16px;
              opacity: 0.8;
              background: ${theme.colors.white};
            }
            .number-count {
              border-radius: 10px;
              opacity: 0.8;
              background: ${theme.colors.white};
              width: 40px;
              text-align: center;
            }
          }
          .bookmark-slide {
            position: absolute;
            bottom: ${
              config.templateType === TemplateType.Slide3 ? '1px' : 'unset'
            };
            opacity: 0.8;
            background: ${theme.colors.white};
            width: calc(100% - 2px);
            z-index: 1;
            padding: ${polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              font-size: ${polished.rem(13)};
              max-height: 80px;
              overflow-y: auto;
            }
          }
          .bookmark-slide-gallery {
            position: absolute;
            bottom: ${
              config.templateType === TemplateType.Slide3 ? 0 : 'unset'
            };
            opacity: 0.8;
            background: ${theme.colors.white};
            width: calc(100% - 2px);
            z-index: 1;
            padding: ${polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              max-height: 60px;
              overflow-y: auto;
              font-size: ${polished.rem(13)};
            }
          }
          .bookmark-text {
            background: ${theme.colors.white};
            width: calc(100% - 2px);
            height: 60%;
            z-index: 1;
            padding: ${polished.rem(8)};
            .bookmark-text-title {
              font-size: ${polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-text-description {
              height: calc(100% - 75px);
              overflow-y: auto;
              font-size: ${polished.rem(14)};
            }
          }
          .gallery-card {
            min-width: 200px;
            min-height: 180px;
            height: auto;
            position: relative;
            padding: ${
              config.direction === DirectionType.Horizon
                ? 'unset'
                : polished.rem(16)
            };
            margin: ${
              config.direction === DirectionType.Horizon
                ? polished.rem(12)
                : 'unset'
            };
            .gallery-card-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
              }
            }
            .gallery-card-operation {
              display: none;
            }
            &:hover {
              .gallery-card-operation {
                display: block;
                position: absolute;
                top: ${
                  config.direction === DirectionType.Horizon
                    ? 0
                    : polished.rem(20)
                };
                right: ${
                  config.direction === DirectionType.Horizon
                    ? 0
                    : polished.rem(20)
                };
                background: ${theme.colors.light};
                opacity: 0.9;
              }
            }
            .gallery-img {
              width: 198px;
              height: 150px;
              display: inline-flex;
            }
            .gallery-img-vertical {
              width: 100%;
              height: 200px;
            }
          }
          .gallery-slide-card {
            ${config.direction === DirectionType.Horizon &&
              `width: ${config.itemWidth}px !important`};
            ${
              config.direction === DirectionType.Horizon
                ? `min-width: ${config.itemWidth}px !important`
                : `height: ${config.itemHeight}px !important`
            };
            height: calc(100% - ${polished.rem(32)});
            position: relative;
            margin: ${
              config.direction === DirectionType.Horizon
                ? `${polished.rem(16)} 0`
                : `0 ${polished.rem(16)}`
            };
            padding-top: ${
              config.direction === DirectionType.Horizon
                ? 'unset'
                : polished.rem(config.space)
            };
            ${config.direction === DirectionType.Horizon &&
              `margin-left: ${polished.rem(config.space)}`};
            &:first-of-type {
              margin-top: ${
                config.direction === DirectionType.Horizon
                  ? polished.rem(16)
                  : polished.rem(10)
              };
              padding-top: ${
                config.direction === DirectionType.Horizon
                  ? 'unset'
                  : polished.rem(10)
              };
            }
            &:last-of-type {
              ${
                config.direction === DirectionType.Horizon
                  ? `padding-right: ${polished.rem(16)}`
                  : `margin-bottom: ${polished.rem(20)}`
              };
            }
            .gallery-slide-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
                .bookmark-slide-gallery {
                  width: 100%;
                }
              }
            }
          }
          .gallery-slide-lastItem {
            padding-right: 16px;
            margin-bottom: 16px;
          }
          .nav-bar {
            height: 48px;
            width: 280px;
            min-width: 280px;
            border: 1px solid ${theme.colors.secondary};
            background: ${theme.colors.light};
            padding: 0 ${polished.rem(8)};
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -24px;
            margin-left: -140px;
            .scroll-navigator {
              .btn {
                border-radius: ${theme.borderRadiuses.circle};
              }
            }
            .navbtn {
              width: 100px;
            }
          }
          .example-tips {
            margin-top: -10px;
            top: 50%;
            position: relative;
            text-align: center;
          }
        }
        .bookmark-container::-webkit-scrollbar {
          display: none;
        }
        .gallery-container {
          display: inline-flex !important;
          overflow-x: ${
            window.jimuConfig.isInBuilder &&
            appMode !== AppMode.Run &&
            !customType.includes(config.templateType)
              ? 'hidden'
              : 'auto'
          };
        }
        .gallery-container-ver {
          overflow-y: ${
            window.jimuConfig.isInBuilder &&
            appMode !== AppMode.Run &&
            !customType.includes(config.templateType)
              ? 'hidden'
              : 'auto'
          };
        }
        .horizon-line {
          margin: 10px 15px;
          border-bottom: 1px solid ${theme.colors.secondary};
        }
        .vertical-line {
          margin: 10px 15px;
          border-right: 1px solid ${theme.colors.secondary};
        }
        .vertical-border {
          padding-right: ${polished.rem(16)};
        }
        .default-img {
          width: 100%;
          height: 100%;
          background: ${
            theme.colors.palette.light[200]
          } url(${require('./assets/defaultimg.svg')}) center center no-repeat;
          background-size: 50% 50%;
        }
        .edit-mask {
          height: calc(100% - 49px);
          z-index: 2;
        }
      }
    `
  }

  onActiveViewChange = (jimuMapView: JimuMapView) => {
    const { appMode, config } = this.props
    this.setState({ jimuMapView })

    if (
      jimuMapView &&
      appMode === AppMode.Run &&
      config.initBookmark &&
      !this.alreadyActiveLoading
    ) {
      const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
      const bookmarks = config.displayFromWeb
        ? config.bookmarks.concat(mapBookmarks)
        : config.bookmarks
      if (bookmarks.length > 0) {
        this.alreadyActiveLoading = true
        jimuMapView.view.when(() => {
          this.setState({
            bookmarkOnViewId: bookmarks[0].id
          })
          this.onViewBookmark(bookmarks[0])
        })
      }
    }
  }

  handleViewGroupCreate = (viewGroup: JimuMapViewGroup) => {
    this.setState({ viewGroup })
  }

  typedImgExist = bookmark => {
    return bookmark.imgSourceType === ImgSourceType.Snapshot
      ? bookmark.snapParam?.url
      : bookmark.imgParam?.url
  }

  renderSlideViewTop = item => {
    const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
    const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
    return (
      <div
        className='w-100 h-100 bookmark-pointer surface-1'
        onClick={() => this.onViewBookmark(item)}
        key={item.id || `webmap-${item.name}`}
      >
        <div className='bookmark-slide'>
          <div className='bookmark-slide-title'>{item.name}</div>
          <div className='bookmark-slide-description'>{item.description}</div>
        </div>
        {exist
          ? (
            <ImageWithParam
              imageParam={typeSnap ? item.snapParam : item.imgParam}
              altText={item.name}
              useFadein
              imageFillMode={item.imagePosition}
            />
            )
          : (
            <div className='default-img' />
            )}
      </div>
    )
  }

  renderSlideViewText = item => {
    const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
    const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
    return (
      <div
        className='w-100 h-100 bookmark-only-pointer surface-1'
        onClick={() => this.onViewBookmark(item)}
        key={item.id || `webmap-${item.name}`}
      >
        <div className='w-100' style={{ height: '40%' }}>
          {exist
            ? (
              <ImageWithParam
                imageParam={typeSnap ? item.snapParam : item.imgParam}
                altText={item.name}
                useFadein
                imageFillMode={item.imagePosition}
              />
              )
            : (
              <div className='default-img' />
              )}
        </div>
        <div className='bookmark-text'>
          <div className='bookmark-text-title'>{item.name}</div>
          <div className='bookmark-text-description'>{item.description}</div>
        </div>
      </div>
    )
  }

  renderSlideViewBottom = item => {
    const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
    const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
    return (
      <div
        className='w-100 h-100 bookmark-pointer surface-1'
        onClick={() => this.onViewBookmark(item)}
        key={item.id || `webmap-${item.name}`}
      >
        {exist
          ? (
            <ImageWithParam
              imageParam={typeSnap ? item.snapParam : item.imgParam}
              altText={item.name}
              useFadein
              imageFillMode={item.imagePosition}
            />
            )
          : (
            <div className='default-img' />
            )}
        <div className='bookmark-slide'>
          <div className='bookmark-slide-title'>{item.name}</div>
          <div className='bookmark-slide-description'>{item.description}</div>
        </div>
      </div>
    )
  }

  renderCustomContents = item => {
    const { LayoutEntry } = this.state
    const { layouts } = this.props
    if (!item.layoutName) return
    return (
      <div
        className='w-100 h-100 bookmark-only-pointer surface-1'
        onClick={() => this.onViewBookmark(item)}
        key={item.id}
      >
        <LayoutEntry
          isRepeat
          layouts={layouts[item.layoutName]}
          isInWidget
          className='layout-height'
        />
      </div>
    )
  }

  renderCustomExample = () => {
    const { LayoutEntry } = this.state
    const { layouts } = this.props
    if (!layouts[Status.Regular]) return
    return (
      <div className='w-100 h-100 bookmark-only-pointer surface-1'>
        <LayoutEntry
          isRepeat
          layouts={layouts[Status.Regular]}
          isInWidget
          className='layout-height'
        />
      </div>
    )
  }

  handleArrowChange = (previous: boolean) => {
    const { config } = this.props
    const { jimuMapView } = this.state
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    const bookmarks = config.displayFromWeb
      ? config.bookmarks.concat(mapBookmarks)
      : config.bookmarks
    const bookmarkCount = bookmarks.length
    if (bookmarkCount === 0) return
    const { bookmarkOnViewId } = this.state
    let current =
      bookmarks.findIndex(x => x.id === bookmarkOnViewId) > -1
        ? bookmarks.findIndex(x => x.id === bookmarkOnViewId)
        : 0
    if (current === bookmarkCount - 1 && !previous) {
      // the last one, click next
      current = 0
    } else if (current === 0 && previous) {
      // the first one, click previous
      current = bookmarkCount - 1
    } else if (previous && current > 0) {
      current--
    } else if (!previous) {
      current++
    }
    this.setState({ bookmarkOnViewId: bookmarks[current].id })
    this.onViewBookmark(bookmarks[current])
  }

  handleOnViewChange = value => {
    const { appMode, config } = this.props
    const { jimuMapView } = this.state
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    const bookmarks = config.displayFromWeb
      ? config.bookmarks.concat(mapBookmarks)
      : config.bookmarks
    const current =
      bookmarks.findIndex(x => x.id === value) > -1
        ? bookmarks.findIndex(x => x.id === value)
        : 0
    this.setState({ bookmarkOnViewId: value })
    if (appMode !== AppMode.Run) return
    this.onViewBookmark(bookmarks[current])
  }

  getBookmarksOptions = (bookmarks): JSX.Element[] => {
    const optionsArray = []
    bookmarks.forEach(item => {
      optionsArray.push(
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      )
    })
    return optionsArray
  }

  getBookmarksDropdownItems = (bookmarks): JSX.Element[] => {
    const { bookmarkOnViewId } = this.state
    const optionsArray = []
    bookmarks.forEach(item => {
      optionsArray.push(
        <DropdownItem key={item.id} active={item.id === bookmarkOnViewId}>
          {item.name}
        </DropdownItem>
      )
    })
    return optionsArray
  }

  handleAutoPlay = () => {
    const { config, useMapWidgetIds, id } = this.props
    const {
      bookmarkOnViewId,
      autoPlayStart,
      playTimer,
      jimuMapView
    } = this.state
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    const bookmarks = config.displayFromWeb
      ? config.bookmarks.concat(mapBookmarks)
      : config.bookmarks
    if (bookmarks.length === 0) return
    // turn off the autoplay
    if (autoPlayStart) {
      if (playTimer) clearInterval(playTimer)
      this.setState({
        autoPlayStart: false,
        playTimer: undefined
      })
      return
    }
    // Apply for control of the Map, to turn off other widget's control
    if (useMapWidgetIds && useMapWidgetIds.length !== 0) {
      getAppStore().dispatch(
        appActions.requestAutoControlMapWidget(useMapWidgetIds[0], id)
      )
    }
    // this.props.dispatch(appActions.autoplayActiveIdChanged(id));
    const { autoInterval, autoLoopAllow } = config
    let index = bookmarks.findIndex(x => x.id === bookmarkOnViewId)
    // Other bookmarks change the bookmarkOnViewId, and then click directly on the autoplay of another bookmark.
    // And when the current is the last, click play, start play form the first one
    if (index === -1 || index === bookmarks.length - 1) index = 0
    this.setState({ bookmarkOnViewId: bookmarks[index].id })
    this.onViewBookmark(bookmarks[index])
    const autoplayTimer = setInterval(() => {
      index++
      if (autoLoopAllow) {
        if (index >= bookmarks.length) index = 0
      } else {
        if (index >= bookmarks.length) {
          clearInterval(autoplayTimer)
          if (playTimer) clearInterval(playTimer)
          this.setState({
            autoPlayStart: false,
            playTimer: undefined
          })
          return
        }
      }
      this.setState({ bookmarkOnViewId: bookmarks[index].id })
      this.onViewBookmark(bookmarks[index])
    }, autoInterval * 1000 + AUTOPLAY_DURATION)
    this.setState({
      autoPlayStart: true,
      playTimer: autoplayTimer
    })
  }

  renderBottomTools = (example?: boolean) => {
    const { config } = this.props
    const { jimuMapView } = this.state
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    const bookmarks = config.displayFromWeb
      ? config.bookmarks.concat(mapBookmarks)
      : config.bookmarks
    const totalCount = bookmarks.length
    const { bookmarkOnViewId, autoPlayStart } = this.state
    let current = 1
    if (example) {
      current = 0
    } else {
      current =
        bookmarks.findIndex(x => x.id === bookmarkOnViewId) > -1
          ? bookmarks.findIndex(x => x.id === bookmarkOnViewId) + 1
          : 1
    }

    const typedNavbtnGrounp = (tempType: TemplateType) => {
      let navbtnGrounp
      switch (tempType) {
        case TemplateType.Slide1:
          navbtnGrounp = (
            <div className='suspension-tools-bottom align-items-center justify-content-around'>
              {bookmarks.length > 1
                ? (
                  <Dropdown size='sm' activeIcon>
                    <DropdownButton
                      arrow={false}
                      icon
                      size='sm'
                      type='default'
                      className='suspension-drop-btn'
                      title={this.formatMessage('bookmarkList')}
                    >
                      <TextDotsOutlined className='suspension-drop-btn' />
                    </DropdownButton>
                    <DropdownMenu>
                      {bookmarks.map(item => {
                        const isActived = item.id === bookmarkOnViewId
                        return (
                          <DropdownItem key={item.id} active={isActived} onClick={() => this.handleOnViewChange(item.id)}>
                            {item.name}
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  )
                : (
                  <div className='suspension-drop-placeholder' />
                  )}
              {bookmarks.length > 1
                ? (
                  <NavButtonGroup
                    type='tertiary'
                    vertical={false}
                    onChange={this.handleArrowChange}
                    className='nav-btn-bottom'
                    previousTitle={this.formatMessage('previous')}
                    nextTitle={this.formatMessage('next')}
                  >
                    <div className='bookmark-btn-container'>
                      {config.autoPlayAllow && (
                        <Button
                          icon
                          className='bookmark-btn'
                          type='link'
                          onClick={this.handleAutoPlay}
                          title={this.formatMessage('autoPlay')}
                          data-testid='triggerAuto'
                        >
                          {autoPlayStart ? <PauseOutlined className='mr-1' size='l' /> : <PlayCircleFilled className='mr-1' size='l' />}
                        </Button>
                      )}
                    </div>
                  </NavButtonGroup>
                  )
                : (
                  <div className='suspension-nav-placeholder1' />
                  )}
              <span className='number-count'>
                {current}/{totalCount}
              </span>
            </div>
          )
          break
        case TemplateType.Slide2:
        case TemplateType.Custom1:
        case TemplateType.Custom2:
          navbtnGrounp =
            bookmarks.length > 1
              ? (
                <div className='suspension-tools-text align-items-center justify-content-around'>
                  <Dropdown size='sm' activeIcon>
                    <DropdownButton
                      arrow={false}
                      icon
                      size='sm'
                      type='default'
                      className='suspension-drop-btn'
                      title={this.formatMessage('bookmarkList')}
                    >
                      <TextDotsOutlined className='suspension-drop-btn' />
                    </DropdownButton>
                    <DropdownMenu>
                      {bookmarks.map(item => {
                        const isActived = item.id === bookmarkOnViewId
                        return (
                          <DropdownItem key={item.id} active={isActived} onClick={() => this.handleOnViewChange(item.id)}>
                            {item.name}
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <NavButtonGroup
                    type='tertiary'
                    vertical={false}
                    onChange={this.handleArrowChange}
                    className='nav-btn-text'
                    previousTitle={this.formatMessage('previous')}
                    nextTitle={this.formatMessage('next')}
                  >
                    <span>
                      {current}/{totalCount}
                    </span>
                  </NavButtonGroup>
                  <div className='bookmark-btn-container'>
                    {config.autoPlayAllow && (
                      <Button
                        icon
                        className='bookmark-btn'
                        type='link'
                        onClick={this.handleAutoPlay}
                        title={this.formatMessage('autoPlay')}
                      >
                        {autoPlayStart ? <PauseOutlined className='mr-1' size='l' /> : <PlayCircleFilled className='mr-1' size='l' />}
                      </Button>
                    )}
                  </div>
                </div>
                )
              : (
                <div className='align-items-center' />
                )
          break
        case TemplateType.Slide3:
          navbtnGrounp = (
            <Fragment>
              <div className='suspension-tools-top align-items-center justify-content-around'>
                {bookmarks.length > 1
                  ? (
                    <Dropdown size='sm' activeIcon>
                      <DropdownButton
                        arrow={false}
                        icon
                        size='sm'
                        type='default'
                        className='suspension-drop-btn'
                        title={this.formatMessage('bookmarkList')}
                      >
                        <TextDotsOutlined className='suspension-drop-btn' />
                      </DropdownButton>
                      <DropdownMenu>
                        {bookmarks.map(item => {
                          const isActived = item.id === bookmarkOnViewId
                          return (
                            <DropdownItem key={item.id} active={isActived} onClick={() => this.handleOnViewChange(item.id)}>
                              {item.name}
                            </DropdownItem>
                          )
                        })}
                      </DropdownMenu>
                    </Dropdown>
                    )
                  : (
                    <div className='suspension-drop-placeholder' />
                    )}
              </div>
              <span className='suspension-top-number'>
                {current}/{totalCount}
              </span>
              <div className='suspension-tools-middle'>
                {bookmarks.length > 1 && (
                  <NavButtonGroup
                    type='tertiary'
                    vertical={false}
                    onChange={this.handleArrowChange}
                    className='middle-nav-group'
                    previousTitle={this.formatMessage('previous')}
                    nextTitle={this.formatMessage('next')}
                  />
                )}
              </div>
              {config.autoPlayAllow && (
                <div className='suspension-middle-play'>
                  <Button
                    icon
                    className='bookmark-btn'
                    type='link'
                    onClick={this.handleAutoPlay}
                    title={this.formatMessage('autoPlay')}
                  >
                    {autoPlayStart ? <PauseOutlined className='mr-1' size={30} /> : <PlayCircleFilled className='mr-1' size={30} />}
                  </Button>
                </div>
              )}
            </Fragment>
          )
          break
        default:
      }
      return navbtnGrounp
    }
    return typedNavbtnGrounp(config.templateType)
  }

  renderSlideScroll = (bookmarks: ImmutableArray<Bookmark>) => {
    const bookmarkGalleryList = bookmarks.map((item, index) => {
      const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
      const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
      return (
        <div className='gallery-slide-card' key={index}>
          <div
            className='w-100 h-100 bookmark-pointer gallery-slide-inner surface-1'
            onClick={() => this.onViewBookmark(item)}
          >
            <div className='bookmark-slide-gallery'>
              <div className='bookmark-slide-title'>{item.name}</div>
              <div className='bookmark-slide-description'>
                {item.description}
              </div>
            </div>
            {exist
              ? (
                <ImageWithParam
                  imageParam={typeSnap ? item.snapParam : item.imgParam}
                  altText={item.name}
                  useFadein
                  imageFillMode={item.imagePosition}
                />
                )
              : (
                <div className='default-img' />
                )}
          </div>
        </div>
      )
    })
    const lastItem = <div className='gallery-slide-lastItem' key='last' />
    const scrollGalleryList = bookmarkGalleryList
      .asMutable({ deep: true })
      .concat(lastItem)
    return scrollGalleryList
  }

  renderCustomScroll = (bookmarks: ImmutableArray<Bookmark>) => {
    const { LayoutEntry } = this.state
    const { layouts } = this.props
    const bookmarkCustomList = bookmarks.map((item, index) => {
      return (
        <div className='gallery-slide-card' key={index}>
          <div
            className='w-100 h-100 bookmark-custom-pointer surface-1'
            onClick={() => this.onViewBookmark(item)}
          >
            <LayoutEntry
              isRepeat
              layouts={layouts[item.layoutName]}
              isInWidget
              className='layout-height'
            />
          </div>
        </div>
      )
    })
    const lastItem = <div className='gallery-slide-lastItem' key='last' />
    const scrollCustomList = bookmarkCustomList
      .asMutable({ deep: true })
      .concat(lastItem)
    return scrollCustomList
  }

  scrollContainer = scrollParam => {
    this.containerRef.current.scrollBy(scrollParam)
  }

  handleScroll = (type: string = 'next') => {
    const appState = getAppStore().getState()
    const isRTL = appState?.appContext?.isRTL
    const { config } = this.props
    const {
      itemHeight: scrollHeight = 280,
      itemWidth: scrollWidth = 210,
      space = 0
    } = config
    const directionIsHorizon = config.direction === DirectionType.Horizon
    if (this.containerRef.current && type === 'next') {
      const scrollParam = directionIsHorizon
        ? {
            top: 0,
            left: isRTL ? -(scrollWidth + space) : scrollWidth + space,
            behavior: 'smooth'
          }
        : {
            top: scrollHeight,
            left: 0,
            behavior: 'smooth'
          }
      this.scrollContainer(scrollParam)
    } else if (this.containerRef.current && type === 'previous') {
      const scrollParam = directionIsHorizon
        ? {
            top: 0,
            left: isRTL ? scrollWidth + space : -(scrollWidth + space),
            behavior: 'smooth'
          }
        : {
            top: -scrollHeight,
            left: 0,
            behavior: 'smooth'
          }
      this.scrollContainer(scrollParam)
    }
  }

  renderNavbar = (isHorizon: boolean) => {
    const { config } = this.props
    return (
      <div
        key='navBar'
        className={`${
          config.direction === DirectionType.Horizon
            ? 'suspension-navbar'
            : 'suspension-navbar-verticle'
        } align-items-center justify-content-between`}
      >
        <Button
          title={this.formatMessage('previous')}
          type='primary'
          size='sm'
          icon
          onClick={() => this.handleScroll('previous')}
          className='navbar-btn-pre'
        >
          {isHorizon ? <LeftOutlined autoFlip size='s' /> : <UpOutlined autoFlip size='s' />}
        </Button>
        <Button
          title={this.formatMessage('next')}
          type='primary'
          size='sm'
          icon
          onClick={() => this.handleScroll('next')}
          className='navbar-btn-next'
        >
          {isHorizon ? <RightOutlined autoFlip size='s' /> : <DownOutlined autoFlip size='s' />}
        </Button>
      </div>
    )
  }

  getMapBookmarks = (jimuMapView: JimuMapView) => {
    if (jimuMapView && jimuMapView?.dataSourceId) {
      const view = jimuMapView.view
      // del the map
      if (!view) return
      const mapSource = jimuMapView.view?.map as any
      // extra bookmark from map
      let extraBookmarks = []
      if (view.type === '3d') {
        extraBookmarks = mapSource.presentation?.slides
          ? JSON.parse(JSON.stringify(mapSource.presentation.slides))
          : []
      } else if (view.type === '2d') {
        extraBookmarks = mapSource?.bookmarks
          ? JSON.parse(JSON.stringify(mapSource.bookmarks))
          : []
      }
      return extraBookmarks.map((item, index) => {
        item.id = `maporigin-${index}`
        item.runTimeFlag = true
        item.mapOriginFlag = true
        item.mapDataSourceId = jimuMapView.dataSourceId
        if (item.thumbnail?.url) {
          item.imgParam = { url: item.thumbnail.url }
        } else {
          item.imgParam = {}
        }
        if (item.title?.text) {
          item.name = item.title.text
        }
        item.imagePosition = ImageFillMode.Fill
        return item
      })
    }
  }

  renderBookmarkList = (bookmarks: ImmutableArray<Bookmark>) => {
    const { appMode, config } = this.props
    const { transitionInfo } = config
    const { bookmarkOnViewId, autoPlayStart, jimuMapView } = this.state
    // get ds bookmark
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    if (config.displayFromWeb) {
      bookmarks = bookmarks.concat(mapBookmarks)
    }
    const currentIndex =
      bookmarks.findIndex(x => x.id === bookmarkOnViewId) > -1
        ? bookmarks.findIndex(x => x.id === bookmarkOnViewId)
        : 0
    const previousIndex = currentIndex === 0 ? 1 : Math.max(0, currentIndex - 1)
    const directionIsHorizon = config.direction === DirectionType.Horizon
    const slideType = [
      TemplateType.Slide1,
      TemplateType.Slide2,
      TemplateType.Slide3,
      TemplateType.Custom1,
      TemplateType.Custom2
    ]
    const typedBookmarkList = (tempType: TemplateType) => {
      let bookmarkList
      switch (tempType) {
        case TemplateType.Card:
          bookmarkList = bookmarks.map((item, index) => {
            const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
            const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
            return (
              <Fragment key={index}>
                <div className='d-inline-flex bookmark-card-col'>
                  <Card
                    onClick={() => this.onViewBookmark(item)}
                    className={`${
                      appMode === AppMode.Run ? 'bookmark-pointer' : ''
                    } card-inner surface-1`}
                  >
                    <div className='widget-card-image'>
                      <div className='widget-card-image-inner'>
                        {exist
                          ? (
                            <ImageWithParam
                              imageParam={
                                typeSnap ? item.snapParam : item.imgParam
                              }
                              altText={item.name}
                              useFadein
                              imageFillMode={item.imagePosition}
                            />
                            )
                          : (
                            <div className='default-img' />
                            )}
                      </div>
                    </div>
                    <CardBody className='widget-card-content text-truncate'>
                      <span className='text-capitalize' title={item.name}>
                        {item.name}
                      </span>
                    </CardBody>
                  </Card>
                </div>
              </Fragment>
            )
          })
          break
        case TemplateType.List:
          bookmarkList = bookmarks.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => this.onViewBookmark(item)}
                className={`${
                  appMode === AppMode.Run ? 'bookmark-pointer' : ''
                } d-flex bookmark-list-col surface-1`}
              >
                <PinOutlined className='ml-3' />
                <div className='ml-2'>{item.name}</div>
              </div>
            )
          })
          break
        case TemplateType.Slide1:
          const viewTopContents = bookmarks.map(item =>
            this.renderSlideViewTop(item)
          )
          return (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={previousIndex}
                    currentIndex={currentIndex}
                    transitionType={
                      transitionInfo?.transition?.type
                    }
                    direction={
                      transitionInfo?.transition?.direction
                    }
                    playId={transitionInfo?.previewId}
                  >
                    {viewTopContents}
                  </TransitionContainer>
                  )
                : (
                    this.renderSlideScroll(bookmarks)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools()}
            </Fragment>
          )
        case TemplateType.Slide2:
          const viewTextContents = bookmarks.map(item =>
            this.renderSlideViewText(item)
          )
          return (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={previousIndex}
                    currentIndex={currentIndex}
                    transitionType={
                      transitionInfo?.transition?.type
                    }
                    direction={
                      transitionInfo?.transition?.direction
                    }
                    playId={transitionInfo?.previewId}
                  >
                    {viewTextContents}
                  </TransitionContainer>
                  )
                : (
                    this.renderSlideScroll(bookmarks)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools()}
            </Fragment>
          )
        case TemplateType.Slide3:
          const viewContents = bookmarks.map(item =>
            this.renderSlideViewBottom(item)
          )
          return (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={previousIndex}
                    currentIndex={currentIndex}
                    transitionType={
                      transitionInfo?.transition?.type
                    }
                    direction={
                      transitionInfo?.transition?.direction
                    }
                    playId={transitionInfo?.previewId}
                  >
                    {viewContents}
                  </TransitionContainer>
                  )
                : (
                    this.renderSlideScroll(bookmarks)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools()}
            </Fragment>
          )
        case TemplateType.Gallery:
          const runtimeBmId = this.getRuntimeUuid()
          const runtimeBookmarkArray =
            JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
          const bookmarkGalleryList = bookmarks.map((item, index) => {
            const typeSnap = item.imgSourceType === ImgSourceType.Snapshot
            const exist = typeSnap ? item.snapParam?.url : item.imgParam?.url
            return (
              <div className='gallery-card' key={index}>
                <Card
                  onClick={() => this.onViewBookmark(item)}
                  className={`${
                    appMode === AppMode.Run ? 'bookmark-pointer' : ''
                  } gallery-card-inner surface-1`}
                >
                  <div
                    className={`widget-card-image bg-light-300 ${
                      directionIsHorizon
                        ? 'gallery-img'
                        : 'gallery-img-vertical'
                    }`}
                  >
                    {exist
                      ? (
                        <ImageWithParam
                          imageParam={typeSnap ? item.snapParam : item.imgParam}
                          altText={item.name}
                          useFadein
                          imageFillMode={item.imagePosition}
                        />
                        )
                      : (
                        <div className='default-img' />
                        )}
                  </div>
                  <CardBody className='widget-card-content text-truncate'>
                    <span className='text-capitalize' title={item.name}>
                      {item.name}
                    </span>
                  </CardBody>
                </Card>
              </div>
            )
          })
          const runtimeGalleryList = runtimeBookmarkArray.map(
            (rbmId, index) => {
              const item = JSON.parse(utils.readLocalStorage(rbmId))
              const titleTextInput = React.createRef<HTMLInputElement>()
              return (
                <div className='gallery-card' key={`RuntimeGallery-${index}`}>
                  <Card
                    onClick={() => this.onViewBookmark(item)}
                    className={`${
                      appMode === AppMode.Run ? 'bookmark-pointer' : ''
                    } gallery-card-inner surface-1`}
                  >
                    <div
                      className={`widget-card-image bg-light-300 ${
                        directionIsHorizon
                          ? 'gallery-img'
                          : 'gallery-img-vertical'
                      }`}
                    >
                      <div className='default-img' />
                    </div>
                    <CardBody className='widget-card-content text-truncate runtime-title-con'>
                      <TextInput
                        className='runtime-title w-100'
                        ref={titleTextInput}
                        size='sm'
                        title={item.name}
                        defaultValue={item.name || ''}
                        onClick={evt => evt.stopPropagation()}
                        onKeyDown={evt => this.handleKeydown(evt, titleTextInput)}
                        onAcceptValue={value => this.onRuntimeBookmarkNameChange(rbmId, value)}
                      />
                    </CardBody>
                  </Card>
                  <span className='gallery-card-operation float-right'>
                    <Button
                      title={this.formatMessage('deleteOption')}
                      onClick={() => this.handleRuntimeDelete(rbmId)}
                      type='tertiary'
                      icon
                    >
                      <TrashFilled size='s' />
                    </Button>
                  </span>
                </div>
              )
            }
          )
          const galleryAdd = config.runtimeAddAllow
            ? (
              <Fragment key='galleryAdd'>
                <div
                  className='gallery-card-add'
                  onClick={this.handleRuntimeAdd}
                  title={this.formatMessage('addBookmark')}
                >
                  <div className='gallery-add-icon'>
                    <PlusOutlined className='mr-1' size='l' />
                  </div>
                </div>
                <div className='vertical-border' />
              </Fragment>
              )
            : (
              <div className='vertical-border' key='last' />
              )
          const newList = bookmarkGalleryList
            .asMutable({ deep: true })
            .concat(runtimeGalleryList)
          const galleryNavbar = this.renderNavbar(
            config.direction === DirectionType.Horizon
          )
          newList.push(galleryAdd)
          newList.push(galleryNavbar)
          bookmarkList = newList
          break
        case TemplateType.Navigator:
          const totalCount = config.bookmarks.length
          const current =
            config.bookmarks.findIndex(x => x.id === bookmarkOnViewId) > -1
              ? config.bookmarks.findIndex(x => x.id === bookmarkOnViewId) + 1
              : 1
          return (
            <div className='nav-bar d-flex align-items-center justify-content-around'>
              <Select
                size='sm'
                value={bookmarkOnViewId}
                onChange={this.handleOnViewChange}
                style={{ width: 32 }}
              >
                {this.getBookmarksOptions(bookmarks)}
              </Select>
              <Button
                icon
                className='bookmark-btn'
                type='tertiary'
                onClick={this.handleRuntimeAdd}
              >
                <PlusOutlined className='mr-1' size='l' />
              </Button>
              <NavButtonGroup
                type='tertiary'
                circle
                vertical={false}
                onChange={this.handleArrowChange}
                className='navbtn'
              >
                <span>
                  {current}/{totalCount}
                </span>
              </NavButtonGroup>
              <Button
                icon
                className='bookmark-btn'
                type='tertiary'
                onClick={this.handleAutoPlay}
                disabled={!config.autoPlayAllow}
              >
                {autoPlayStart ? <PauseOutlined className='mr-1' size='l' /> : <PlayCircleFilled className='mr-1' size='l' />}
              </Button>
            </div>
          )
        case TemplateType.Custom1:
        case TemplateType.Custom2:
          const isEditing = this.isEditing()
          const customContents = bookmarks.map(item =>
            this.renderCustomContents(item)
          )
          return (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={previousIndex}
                    currentIndex={currentIndex}
                    transitionType={
                      transitionInfo?.transition?.type
                    }
                    direction={
                      transitionInfo?.transition?.direction
                    }
                    playId={transitionInfo?.previewId}
                  >
                    {customContents}
                  </TransitionContainer>
                  )
                : (
                    this.renderCustomScroll(bookmarks)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools()}
              {!isEditing &&
                config.pageStyle === PageStyle.Paging &&
                appMode === AppMode.Design && (
                <div className='edit-mask position-absolute w-100' />
              )}
            </Fragment>
          )
        default:
      }
      return bookmarkList
    }
    const showGallery =
      config.templateType === TemplateType.Gallery ||
      (slideType.includes(config.templateType) &&
        config.pageStyle === PageStyle.Scroll)
    return (
      <div
        className={`bookmark-container ${
          showGallery
            ? directionIsHorizon
              ? 'gallery-container'
              : 'gallery-container-ver'
            : ''
        }`}
        ref={this.containerRef}
      >
        {typedBookmarkList(config.templateType)}
      </div>
    )
  }

  renderExampleSlideScroll = (bookmark: Bookmark) => {
    return (
      <div className='gallery-slide-card'>
        <div className='w-100 h-100 bookmark-pointer surface-1'>
          <div className='bookmark-slide-gallery'>
            <div className='bookmark-slide-title'>{bookmark.title}</div>
            <div className='bookmark-slide-description'>
              {bookmark.description}
            </div>
          </div>
          <div className='default-img' />
        </div>
      </div>
    )
  }

  renderBookmarkExample = (bookmark: Bookmark) => {
    const { appMode, config } = this.props
    const directionIsHorizon = config.direction === DirectionType.Horizon
    const typedBookmarkExampleList = (tempType: TemplateType) => {
      let bookmarkExample
      switch (tempType) {
        case TemplateType.Card:
          bookmarkExample = new Array(3).fill(1).map((item, index) => {
            return (
              <div className='d-inline-flex bookmark-card-col' key={index}>
                <Card className='surface-1'>
                  <div className='widget-card-image bg-light-300'>
                    <div className='widget-card-image-inner'>
                      <div className='default-img' />
                    </div>
                  </div>
                  <CardBody className='widget-card-content text-truncate'>
                    <span className='text-capitalize' title={bookmark.name}>
                      {bookmark.name}
                    </span>
                  </CardBody>
                </Card>
              </div>
            )
          })
          break
        case TemplateType.List:
          bookmarkExample = new Array(3).fill(1).map((item, index) => {
            return (
              <div className='d-flex bookmark-list-col surface-1' key={index}>
                <PinOutlined className='ml-3' />
                <div className='ml-2'>{bookmark.name}</div>
              </div>
            )
          })
          break
        case TemplateType.Slide1:
          bookmarkExample = (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={1}
                    currentIndex={0}
                    transitionType={config.transition}
                    direction={config.transitionDirection}
                  >
                    <div className='w-100 h-100 bookmark-pointer surface-1'>
                      <div className='bookmark-slide'>
                        <div className='bookmark-slide-title'>
                          {bookmark.title}
                        </div>
                        <div className='bookmark-slide-description'>
                          {bookmark.description}
                        </div>
                      </div>
                      <div className='default-img' />
                    </div>
                  </TransitionContainer>
                  )
                : (
                    this.renderExampleSlideScroll(bookmark)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools(true)}
            </Fragment>
          )
          break
        case TemplateType.Slide2:
          bookmarkExample = (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={1}
                    currentIndex={0}
                    transitionType={config.transition}
                    direction={config.transitionDirection}
                  >
                    <div className='w-100 h-100 bookmark-only-pointer surface-1'>
                      <div className='w-100' style={{ height: '40%' }}>
                        <div className='default-img' />
                      </div>
                      <div className='bookmark-text'>
                        <div className='bookmark-text-title'>
                          {bookmark.title}
                        </div>
                        <div className='bookmark-text-description'>
                          {bookmark.description}
                        </div>
                      </div>
                    </div>
                  </TransitionContainer>
                  )
                : (
                    this.renderExampleSlideScroll(bookmark)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools(true)}
            </Fragment>
          )
          break
        case TemplateType.Slide3:
          bookmarkExample = (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={1}
                    currentIndex={0}
                    transitionType={config.transition}
                    direction={config.transitionDirection}
                  >
                    <div className='w-100 h-100 bookmark-pointer surface-1'>
                      <div className='default-img' />
                      <div className='bookmark-slide'>
                        <div className='bookmark-slide-title'>
                          {bookmark.title}
                        </div>
                        <div className='bookmark-slide-description'>
                          {bookmark.description}
                        </div>
                      </div>
                    </div>
                  </TransitionContainer>
                  )
                : (
                    this.renderExampleSlideScroll(bookmark)
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools(true)}
            </Fragment>
          )
          break
        case TemplateType.Gallery:
          bookmarkExample = new Array(3).fill(1).map((item, index) => {
            return (
              <div className='gallery-card' key={index}>
                <Card
                  className={`${
                    appMode === AppMode.Run ? 'bookmark-pointer' : ''
                  } surface-1`}
                >
                  <div
                    className={`widget-card-image bg-light-300 ${
                      directionIsHorizon
                        ? 'gallery-img'
                        : 'gallery-img-vertical'
                    }`}
                  >
                    <div className='default-img' />
                  </div>
                  <CardBody className='widget-card-content text-truncate'>
                    <span className='text-capitalize' title={bookmark.name}>
                      {bookmark.name}
                    </span>
                  </CardBody>
                </Card>
              </div>
            )
          })
          break
        case TemplateType.Custom1:
        case TemplateType.Custom2:
          const isEditing = this.isEditing()
          const customExample = this.renderCustomExample()
          bookmarkExample = (
            <Fragment>
              {config.pageStyle === PageStyle.Paging
                ? (
                  <TransitionContainer
                    previousIndex={1}
                    currentIndex={0}
                    transitionType={config.transition}
                    direction={config.transitionDirection}
                  >
                    {customExample}
                  </TransitionContainer>
                  )
                : (
                  <div className='gallery-slide-card'>{customExample}</div>
                  )}
              {config.pageStyle === PageStyle.Scroll &&
                this.renderNavbar(config.direction === DirectionType.Horizon)}
              {config.pageStyle === PageStyle.Paging &&
                this.renderBottomTools(true)}
              {!isEditing &&
                config.pageStyle === PageStyle.Paging &&
                appMode === AppMode.Design && (
                <div className='edit-mask position-absolute w-100 h-100' />
              )}
            </Fragment>
          )
          break
        default:
      }
      return bookmarkExample
    }
    const showGallery = config.templateType === TemplateType.Gallery
    return (
      <div
        className={`bookmark-container ${
          showGallery
            ? directionIsHorizon
              ? 'gallery-container'
              : 'gallery-container-ver'
            : ''
        }`}
        ref={this.containerRef}
      >
        {typedBookmarkExampleList(config.templateType)}
      </div>
    )
  }

  onRuntimeBookmarkNameChange = (rbmId: string, newName: string) => {
    const item = JSON.parse(utils.readLocalStorage(rbmId))
    item.name = newName
    utils.setLocalStorage(rbmId, JSON.stringify(item))
  }

  handleKeydown = (e: any, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur()
    }
  }

  handleRuntimeDelete = (rbmId: string) => {
    const runtimeBmId = this.getRuntimeUuid()
    const runtimeBookmarkArray =
      JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
    const delIndex = runtimeBookmarkArray.findIndex(id => id === rbmId)
    if (delIndex > -1) {
      runtimeBookmarkArray.splice(delIndex, 1)
    }
    utils.setLocalStorage(runtimeBmId, JSON.stringify(runtimeBookmarkArray))
    utils.removeFromLocalStorage(rbmId)
    this.setState({ runtimeBmArray: runtimeBookmarkArray })
  }

  renderRuntimeBookmarkList = () => {
    const { appMode, config } = this.props
    const runtimeBmId = this.getRuntimeUuid()
    const runtimeBookmarkArray =
      JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
    const typedRuntimeBookmarkList = () => {
      let runtimeBookmarkList
      switch (config.templateType) {
        case TemplateType.Card:
          runtimeBookmarkList = runtimeBookmarkArray.map(rbmId => {
            const item = JSON.parse(utils.readLocalStorage(rbmId))
            const titleTextInput = React.createRef<HTMLInputElement>()
            return (
              <Fragment key={rbmId}>
                <div className='d-inline-flex bookmark-card-col runtime-bookmarkCard'>
                  <Card
                    onClick={() => this.onViewBookmark(item)}
                    className={`${
                      appMode === AppMode.Run ? 'bookmark-pointer' : ''
                    } surface-1`}
                  >
                    <div className='widget-card-image bg-light-300'>
                      <div className='widget-card-image-inner'>
                        <div className='default-img' />
                      </div>
                    </div>
                    <CardBody className='widget-card-content runtime-title-con'>
                      <TextInput
                        className='runtime-title w-100'
                        ref={titleTextInput}
                        size='sm'
                        title={item.name}
                        defaultValue={item.name || ''}
                        onClick={evt => evt.stopPropagation()}
                        onKeyDown={evt => this.handleKeydown(evt, titleTextInput)}
                        onAcceptValue={value => this.onRuntimeBookmarkNameChange(rbmId, value)}
                      />
                    </CardBody>
                  </Card>
                  {/* import { ImageOutlined } from 'jimu-icons/outlined/data/image'
                  <span className="runtimeBookmarkCard-upload float-right">
                    <Button title={this.formatMessage('uploadImage')} onClick={() => this.handleRuntimeUpload(rbmId)} type="tertiary" icon>
                      <ImageOutlined size='s' />
                    </Button>
                  </span> */}
                  <span className='runtimeBookmarkCard-operation float-right'>
                    <Button
                      title={this.formatMessage('deleteOption')}
                      onClick={() => this.handleRuntimeDelete(rbmId)}
                      type='tertiary'
                      icon
                    >
                      <TrashFilled size='s' />
                    </Button>
                  </span>
                </div>
              </Fragment>
            )
          })
          const cardAdd = (
            <Fragment key='card-add'>
              <div
                className='card-add'
                onClick={this.handleRuntimeAdd}
                title={this.formatMessage('addBookmark')}
              >
                <div className='add-placeholder' />
                <div className='gallery-add-icon'>
                  <PlusOutlined className='mr-1' size='l' />
                </div>
              </div>
              <div className='vertical-border' />
            </Fragment>
          )
          if (config.runtimeAddAllow) runtimeBookmarkList.push(cardAdd)
          break
        case TemplateType.List:
          runtimeBookmarkList = runtimeBookmarkArray.map(rbmId => {
            const item = JSON.parse(utils.readLocalStorage(rbmId))
            const titleTextInput = React.createRef<HTMLInputElement>()
            return (
              <div
                key={rbmId}
                onClick={() => this.onViewBookmark(item)}
                className={`${
                  appMode === AppMode.Run ? 'bookmark-pointer' : ''
                } d-flex runtime-bookmarkList surface-1`}
              >
                <PinOutlined className='ml-3' />
                <TextInput
                  className='runtime-title'
                  ref={titleTextInput}
                  size='sm'
                  title={item.name}
                  defaultValue={item.name || ''}
                  // onClick={evt =>  evt.stopPropagation()}
                  onKeyDown={evt => this.handleKeydown(evt, titleTextInput)}
                  onAcceptValue={value => this.onRuntimeBookmarkNameChange(rbmId, value)}
                />
                <span className='runtimeBookmarkList-operation float-right'>
                  <Button
                    title={this.formatMessage('deleteOption')}
                    onClick={() => this.handleRuntimeDelete(rbmId)}
                    type='tertiary'
                    icon
                  >
                    <TrashFilled size='s' />
                  </Button>
                </span>
              </div>
            )
          })
          const listAdd = (
            <Fragment key='list-add'>
              <div
                className='list-add'
                onClick={this.handleRuntimeAdd}
                title={this.formatMessage('addBookmark')}
              >
                <div className='gallery-add-icon'>
                  <PlusOutlined className='mr-1' size='l' />
                </div>
              </div>
              <div className='vertical-border' />
            </Fragment>
          )
          if (config.runtimeAddAllow) runtimeBookmarkList.push(listAdd)
          break
        default:
      }
      return runtimeBookmarkList
    }

    return (
      <div className='bookmark-container'>
        {((runtimeBookmarkArray &&
          runtimeBookmarkArray.length > 0 &&
          config.templateType !== TemplateType.Gallery) ||
          config.runtimeAddAllow) && (
          <div className='bookmark-runtimeSeparator' />
        )}
        {typedRuntimeBookmarkList()}
      </div>
    )
  }

  render () {
    const { config, id, useMapWidgetIds, theme, isPrintPreview } = this.props
    const { jimuMapView, apiLoaded } = this.state
    const { runtimeAddAllow } = config
    const classes = classNames(
      'jimu-widget',
      'widget-bookmark',
      'bookmark-widget-' + id
    )
    const mapBookmarks = this.getMapBookmarks(jimuMapView) || []
    const configLength = config.displayFromWeb
      ? config.bookmarks.concat(mapBookmarks).length
      : config.bookmarks.length
    const runtimeBmId = this.getRuntimeUuid()
    const runtimeArray = JSON.parse(utils.readLocalStorage(runtimeBmId)) || []
    const runtimeLength = runtimeArray.length
    const egBookmark: Bookmark = {
      id: 99999,
      name: this.formatMessage('_widgetLabel'),
      title: this.formatMessage('_widgetLabel'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      type: '2d',
      mapViewId: 'widget_egeditor-dataSource_eg',
      mapDataSourceId: 'dataSource_eg'
    }
    const noRuntimeType = [
      TemplateType.Slide1,
      TemplateType.Slide2,
      TemplateType.Slide3,
      TemplateType.Gallery,
      TemplateType.Custom1,
      TemplateType.Custom2
    ]

    return (
      <ViewVisibilityContext.Consumer>
        {({ isInView, isInCurrentView }: ViewVisibilityContextProps) => {
          let embedLoad = true
          embedLoad = isInView ? isInCurrentView : true
          if (!embedLoad) this.alreadyActiveLoading = false
          return (
            <Fragment>
              {embedLoad && (
                <ViewportVisibilityContext.Consumer>
                  {isVisibleInViewPort => {
                    if (!isVisibleInViewPort) this.alreadyActiveLoading = false
                    this.showInView = isVisibleInViewPort
                    return (
                      <div className={classes} css={this.getStyle(theme)}>
                        {(isPrintPreview || isVisibleInViewPort) && apiLoaded && (
                          <Fragment>
                            <JimuMapViewComponent
                              useMapWidgetId={useMapWidgetIds?.[0]}
                              onActiveViewChange={this.onActiveViewChange}
                              onViewGroupCreate={this.handleViewGroupCreate}
                            />
                            {runtimeAddAllow ||
                            runtimeLength !== 0 ||
                            configLength !== 0
                              ? (
                                <Fragment>
                                  <div className='h-100 d-flex flex-wrap bookmark-view-auto'>
                                    {(configLength > 0 ||
                                    config.templateType ===
                                      TemplateType.Gallery) &&
                                    this.renderBookmarkList(
                                      config.bookmarks
                                    )}
                                    {(runtimeLength > 0 || runtimeAddAllow) &&
                                    !noRuntimeType.includes(
                                      config.templateType
                                    ) &&
                                    this.renderRuntimeBookmarkList()}
                                  </div>
                                </Fragment>
                                )
                              : (
                                <Fragment>
                                  <div className='h-100 d-flex flex-wrap bookmark-view-auto'>
                                    {this.renderBookmarkExample(egBookmark)}
                                  </div>
                                </Fragment>
                                )}
                          </Fragment>
                        )}
                      </div>
                    )
                  }}
                </ViewportVisibilityContext.Consumer>
              )}
            </Fragment>
          )
        }}
      </ViewVisibilityContext.Consumer>
    )
  }
}

export default Widget
