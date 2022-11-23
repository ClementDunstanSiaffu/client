/** @jsx jsx */
import {
  UseDataSource,
  React,
  jsx,
  ImmutableArray,
  APP_FRAME_NAME_IN_BUILDER,
  Immutable,
  lodash,
  ThemeVariables,
  css,
  polished,
  getAppStore,
  ImmutableObject,
  LayoutType,
  ResourceType
} from 'jimu-core'
import { Button, FloatingPanel, ImageFillMode } from 'jimu-ui'
import {
  JimuMapView,
  loadArcGISJSAPIModules,
  JimuMapViewGroup
} from 'jimu-arcgis'
import { JimuMap, JimuDraw, JimuDrawCreatedDescriptor, DrawingUpdatedDescriptor } from 'jimu-ui/advanced/map'
import {
  IMConfig,
  Bookmark,
  TemplateType,
  Status,
  ImgSourceType,
  LayersConfig
} from '../../config'
import { AppResourceManager, ResourceItemInfo } from 'jimu-for-builder'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'
import { LeftOutlined } from 'jimu-icons/outlined/directional/left'
import { DrawOutlined } from 'jimu-icons/outlined/editor/draw'
import { viewChangeBufferCompare } from '../utils'

interface Props {
  theme: ThemeVariables
  useMapWidgetIds?: ImmutableArray<string>
  useDataSources?: ImmutableArray<UseDataSource>
  jimuMapConfig?: IMConfig
  buttonLabel?: string
  title?: string
  id?: string
  isUseWidgetSize?: boolean
  className?: string
  style?: React.CSSProperties
  maxBookmarkId: number
  activeBookmarkId: number
  tempLayoutType: LayoutType

  onConfigChanged?: (config: IMConfig) => void
  onBookmarkUpdated: (bookmark: Bookmark) => void
  onShowBookmarkConfiger: (ref) => void
  onAddNewBookmark: (bookmark: Bookmark) => void
  formatMessage: (id: string, values?: any) => string
  duplicateNewLayouts: (
    originLayoutId: string,
    widgetId: string,
    layoutName: string,
    layoutLabel: string,
    layoutType?: LayoutType
  ) => string
}

interface SizeObj {
  width: number
  height: number
}

interface States {
  isShowDialog: boolean
  currentSketch: __esri.Sketch
  currentJimuMapView: JimuMapView
  graphics?: __esri.Graphic[]
  apiLoaded: boolean
  isSwitching: boolean
  configUpdate: boolean
  updateFlag: 'new' | 'edit'
  updateConfig?: ImmutableObject<Bookmark>
  viewGroup: JimuMapViewGroup
  closeConfirmOpen: boolean
  mapSize: SizeObj
  mapRatio: number
  isDrawToolsOpen: boolean
  viewEditable: boolean
  newFlag: boolean
  addWhenViewLoad: boolean
  editChangeView: boolean
  completeOperation: () => Promise<void>
}

export class MarkPopper extends React.PureComponent<Props, States> {
  bookmarkId: number
  reference: HTMLDivElement
  layerList: __esri.LayerList
  isSaving: boolean
  _uiOptions: any
  _drawingOptions: any
  _timer: any = null
  Graphic: typeof __esri.Graphic = null
  GraphicsLayer: typeof __esri.GraphicsLayer = null
  LayerList: typeof __esri.LayerList = null
  Extent: typeof __esri.Extent = null
  Viewpoint: typeof __esri.Viewpoint = null

  constructor (props) {
    super(props)

    this.state = {
      isShowDialog: false,
      currentSketch: null,
      currentJimuMapView: null,
      graphics: [],
      apiLoaded: false,
      isSwitching: false,
      configUpdate: false,
      updateFlag: 'new',
      viewGroup: undefined,
      closeConfirmOpen: false,
      mapSize: this.getDefalutSize().innerSize,
      mapRatio: this.getMapRatio(),
      isDrawToolsOpen: true,
      viewEditable: true,
      newFlag: false,
      addWhenViewLoad: false,
      editChangeView: false,
      completeOperation: undefined
    }
    // If the parent component sends the method, the method is called to pass the child component this pointer
    if (props.onShowBookmarkConfiger) {
      props.onShowBookmarkConfiger(this)
    }
    this.bookmarkId = props.maxBookmarkId
    this.layerList = null
    this.isSaving = false
    this._uiOptions = {
      isHideBgColor: true,
      isHideBorder: true
    }
    this._drawingOptions = {
      drawingElevationMode3D: 'relative-to-scene'
    }
  }

  formatMessage = (id: string, values?) => {
    return this.props.formatMessage(id, values)
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/widgets/LayerList',
        'esri/geometry/Extent',
        'esri/Viewpoint'
      ]).then(modules => {
        ;[
          this.Graphic,
          this.GraphicsLayer,
          this.LayerList,
          this.Extent,
          this.Viewpoint
        ] = modules

        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate (preProps, preStates) {
    const { currentSketch, graphics, currentJimuMapView } = this.state
    const { currentSketch: preCurrentSketch, graphics: preGraphics, currentJimuMapView: preJimuMapView } = preStates
    const layerChange = currentSketch?.layer && currentSketch.layer?.id !== preCurrentSketch?.layer?.id
    const graphicsChange = currentSketch?.layer && graphics !== preGraphics
    // repaint layer
    if (layerChange || graphicsChange) {
      this.changeLayerWithGraphics()
    }
    // zoom and listen view change
    const jimuMapViewChange = currentJimuMapView !== preJimuMapView
    if (currentJimuMapView && jimuMapViewChange) {
      this.locateAndSetLayersConfig(currentJimuMapView)
    }
  }

  componentWillUnmount (): void {
    const { currentSketch, completeOperation } = this.state
    if (completeOperation) completeOperation()
    currentSketch?.destroy()
  }

  changeLayerWithGraphics = (reset?: boolean) => {
    const { graphics, currentSketch, updateConfig } = this.state
    const currentLayer = currentSketch?.layer
    const orgConfig = updateConfig?.asMutable({ deep: true })
    const useGraphics = reset ? orgConfig?.graphics : graphics
    if (reset) {
      this.setState({ graphics: useGraphics })
    }
    const graphicsExist = useGraphics?.length > 0
    currentLayer?.removeAll()
    if (graphicsExist) {
      useGraphics &&
        useGraphics.forEach(graphic => {
          const tempGraphic = this.Graphic.fromJSON(graphic)
          tempGraphic.layer = currentLayer
          currentLayer?.add(tempGraphic)
        })
    }
  }

  // set watcher
  startWatcher = (view: __esri.MapView | __esri.SceneView) => {
    // eslint-disable-next-line
    const that = this
    const { activeBookmarkId, jimuMapConfig } = this.props
    const toEditBookmarkConfig = jimuMapConfig?.asMutable().bookmarks.find(x => x.id === activeBookmarkId)
    // view watcher
    if (view.type === '2d') {
      view.watch('extent', function (newValue) {
        if (toEditBookmarkConfig && toEditBookmarkConfig.type !== '2d') return
        const originExtent =
          toEditBookmarkConfig?.extent &&
          JSON.parse(JSON.stringify(toEditBookmarkConfig.extent))
        const curExtent = JSON.parse(JSON.stringify(newValue.toJSON()))
        if (!viewChangeBufferCompare(originExtent, curExtent, '2d')) {
          that.setState({ configUpdate: true })
        } else {
          if (!that._timer) {
            that.setState({ configUpdate: false })
          }
        }
      })
    } else {
      view.watch('viewpoint', function (newValue) {
        if (toEditBookmarkConfig && toEditBookmarkConfig.type !== '3d') return
        const originViewPoint =
          toEditBookmarkConfig?.viewpoint &&
          JSON.parse(JSON.stringify(toEditBookmarkConfig.viewpoint))
        const curViewPoint = JSON.parse(JSON.stringify(newValue.toJSON()))
        if (!viewChangeBufferCompare(originViewPoint, curViewPoint, '3d')) {
          that.setState({ configUpdate: true })
        } else {
          that.setState({ configUpdate: false })
        }
      })
    }
    // layer watcher
    const layers = view?.map?.layers
    this.layerWatcher(layers, that)
  }

  locateAndSetLayersConfig = (currentJimuMapView: JimuMapView) => {
    const { updateConfig } = this.state
    if (updateConfig?.mapViewId !== currentJimuMapView?.id) return
    const config = updateConfig.asMutable({ deep: true })
    const { viewpoint, extent } = config
    if (currentJimuMapView && currentJimuMapView.view) {
      // location
      setTimeout(() => {
        if (currentJimuMapView && currentJimuMapView.view) {
          currentJimuMapView.view.type === '3d'
            ? currentJimuMapView.view.goTo(this.Viewpoint.fromJSON(viewpoint))
            : currentJimuMapView.view.goTo({
              extent: this.Extent.fromJSON(extent)
            })
          this.startWatcher(currentJimuMapView.view)
        }
      }, 1000)
      // layers visibility
      // const layersArray = currentJimuMapView.view.map.layers.toArray()
      // const operationalLayers = JSON.parse(
      //   JSON.stringify(currentJimuMapView.view.map)
      // )?.operationalLayers
      // This variable indicates whether the current map is the map for which the bookmark corresponds.
      // If it is not, the variable is true, need to keep the layer attribute of the map itself.
      // const mapDsChange = currentJimuMapView.dataSourceId !== config.mapDataSourceId
      // showLayersConfig
      this.setState({ configUpdate: false })
    }
  }

  // turn base64 to file
  dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  uploadSnapFile = (dataurl: string, activeBookmarkId: number, callback) => {
    const { id } = this.props
    const timestamp = new Date().getTime()
    const snapFile = this.dataURLtoFile(
      dataurl,
      `${id}-snap${activeBookmarkId}-${timestamp}`
    )
    const timeString = new Date().getTime().toString()
    const fileName = snapFile.name
    const portalFileName = `${fileName}.jpg`
    const fileSize = snapFile.size
    const fileFormat = snapFile.type
    const resourceItemInfo: ResourceItemInfo = {
      file: snapFile,
      fileName: portalFileName,
      originalName: fileName,
      type: ResourceType.Image,
      widgetId: id ? id.replace(/\./g, '_').replace(/\-/g, '_') : null
    }

    let resourceInfo
    AppResourceManager.assignBlobUrlToResourceItem(resourceItemInfo)
      .then(
        newResourceItemInfo => {
          AppResourceManager.getInstance().upLoadAppResource(newResourceItemInfo)
          resourceInfo = {
            fileName: portalFileName,
            originalName: fileName,
            url: newResourceItemInfo.blobUrl,
            type: ResourceType.Image,
            size: fileSize,
            created: Number(timeString),
            resourcesPrefix: newResourceItemInfo.resourcesPrefix,
            fileFormat: fileFormat
          } as ResourceItemInfo
          callback(resourceInfo)
        },
        error => {
          console.error(error)
        }
      )
  }

  getLayersConfig = (layersArray: __esri.Layer[]) => {
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
        if (children && children.length > 0) { recursion(children, config[layer.id]?.layers) }
      })
      return config
    }
    return recursion(layersArray, layersConfig)
  }

  handleClickUpdate = () => {
    const { currentSketch, completeOperation } = this.state
    this.isSaving = true
    if (currentSketch) {
      completeOperation().then(() => {
        this.isSaving = false
        const { currentJimuMapView, graphics } = this.state
        const { activeBookmarkId, jimuMapConfig } = this.props
        const toEditBookmarkConfig = jimuMapConfig.bookmarks.find(
          x => x.id === activeBookmarkId
        )
        const customType = [TemplateType.Custom1, TemplateType.Custom2]
        this.setState({
          isShowDialog: true,
          configUpdate: false
        })
        const view = currentJimuMapView.view
        const allLayers = view.map.layers.toArray()
        const layersConfig = this.getLayersConfig(allLayers)
        const imgShot = toEditBookmarkConfig.snapParam
        const updateBookmark = (snapShot?) => {
          const bookmark: Bookmark = {
            id: activeBookmarkId,
            name: toEditBookmarkConfig.name,
            title: toEditBookmarkConfig.title,
            description: toEditBookmarkConfig.description,
            type: view.type,
            imgParam: toEditBookmarkConfig.imgParam,
            snapParam: snapShot || imgShot,
            imagePosition: toEditBookmarkConfig.imagePosition,
            imgSourceType: toEditBookmarkConfig.imgSourceType,
            extent: view.extent.toJSON(),
            viewpoint: view.viewpoint.toJSON(),
            graphics,
            showFlag: true,
            mapViewId: currentJimuMapView.id,
            mapDataSourceId: currentJimuMapView.dataSourceId,
            layersConfig
          }
          if (customType.includes(jimuMapConfig.templateType)) {
            bookmark.layoutId = toEditBookmarkConfig.layoutId
            bookmark.layoutName = toEditBookmarkConfig.layoutName
          }
          this.setState({ updateConfig: Immutable(bookmark) })
          this.props.onBookmarkUpdated(bookmark)
        }
        const isSnapshot =
          toEditBookmarkConfig.imgSourceType === ImgSourceType.Snapshot
        if (isSnapshot) {
          view.takeScreenshot().then(screenshot => {
            if (screenshot.dataUrl) {
              this.uploadSnapFile(
                screenshot.dataUrl,
                activeBookmarkId,
                updateBookmark
              )
            }
          })
        } else {
          updateBookmark()
        }
      })
    }
  }

  handleClickClose = (delLastFlag?: boolean) => {
    const { configUpdate } = this.state
    if (configUpdate && !delLastFlag) {
      this.setState({ closeConfirmOpen: true })
    } else {
      // After closing the window and opening it again, the jimuMapview refreshes to a new view without layers
      this.setState({
        isShowDialog: false,
        viewEditable: true
      })
    }
  }

  handleClickReset = () => {
    const { currentJimuMapView } = this.state
    this.changeLayerWithGraphics(true)
    this.locateAndSetLayersConfig(currentJimuMapView)
  }

  layerWatcher = (layersArray, that) => {
    const recursion = array => {
      array.forEach(layer => {
        layer.watch('visible', function (newValue, oldValue) {
          if (newValue !== oldValue) that.setState({ configUpdate: true })
        })
        const children = layer.layers || layer.sublayers || layer.allSublayers
        if (children && children.length > 0) recursion(children.toArray())
      })
    }
    recursion(layersArray)
  }

  addNewShowConfiger = (jimuMapView?: JimuMapView) => {
    const { currentJimuMapView } = this.state
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    let view
    if (jimuMapView) {
      if (!jimuMapView.view) return
      view = jimuMapView.view
    } else {
      if (!currentJimuMapView || !currentJimuMapView.view) return
      view = currentJimuMapView.view
    }
    // eslint-disable-next-line
    const that = this
    const { jimuMapConfig, id, tempLayoutType } = this.props
    const allLayers = view.map.layers.toArray()
    const layersConfig = this.getLayersConfig(allLayers)
    // new a bookmark with default snapshot
    const newBookmark = (snapShot?) => {
      this.bookmarkId++
      const bookmark: Bookmark = {
        id: this.bookmarkId,
        name: `${this.formatMessage('bookmarkName')}-${this.bookmarkId}`,
        title: `${this.formatMessage('bookmarkName')}-${this.bookmarkId}`,
        type: view.type,
        imgParam: {},
        snapParam: snapShot || {},
        imagePosition: ImageFillMode.Fill,
        imgSourceType: ImgSourceType.Snapshot,
        extent: view.extent.toJSON(),
        viewpoint: view.viewpoint.toJSON(),
        graphics: [],
        showFlag: true,
        mapViewId: jimuMapView?.id ? jimuMapView?.id : currentJimuMapView?.id,
        mapDataSourceId: jimuMapView?.dataSourceId ? jimuMapView?.dataSourceId : currentJimuMapView?.dataSourceId,
        layersConfig
      }
      if (customType.includes(jimuMapConfig.templateType)) {
        let originLayoutId: string
        // get origin layoutId from last one or from temp
        if (jimuMapConfig.bookmarks && jimuMapConfig.bookmarks.length > 0) {
          const mutableBookmark = jimuMapConfig.bookmarks.asMutable()
          originLayoutId = mutableBookmark[mutableBookmark.length - 1].layoutId
        } else {
          const appConfig = getAppStore().getState().appStateInBuilder.appConfig
          originLayoutId =
            appConfig.widgets[id].layouts[Status.Regular][
              appConfig.mainSizeMode
            ]
        }
        const newLayoutId = this.props.duplicateNewLayouts(
          originLayoutId,
          id,
          `Bookmark-${this.bookmarkId}`,
          `Bookmark-${this.bookmarkId}-label`,
          tempLayoutType
        )
        bookmark.layoutName = `Bookmark-${this.bookmarkId}`
        bookmark.layoutId = newLayoutId
      }
      // change watcher
      const layers = view.map.layers
      const viewWatcher = () => {
        if (view.type === '2d') {
          view.watch('extent', function (newValue) {
            if (bookmark && bookmark.type !== '2d') return
            const originExtent =
              bookmark &&
              bookmark.extent &&
              JSON.parse(JSON.stringify(bookmark.extent))
            const curExtent = JSON.parse(JSON.stringify(newValue.toJSON()))
            if (!viewChangeBufferCompare(originExtent, curExtent, '2d')) {
              that.setState({ configUpdate: true })
            } else {
              if (!that._timer) {
                that.setState({ configUpdate: false })
              }
            }
          })
        } else {
          view.watch('viewpoint', function (newValue) {
            if (bookmark && bookmark.type !== '3d') return
            const originViewPoint =
              bookmark &&
              bookmark.viewpoint &&
              JSON.parse(JSON.stringify(bookmark.viewpoint))
            const curViewPoint = JSON.parse(JSON.stringify(newValue.toJSON()))
            if (!viewChangeBufferCompare(originViewPoint, curViewPoint, '3d')) {
              that.setState({ configUpdate: true })
            } else {
              that.setState({ configUpdate: false })
            }
          })
        }
        this.layerWatcher(layers, that)
      }
      viewWatcher()
      this.props.onAddNewBookmark(bookmark)
    }
    // There is an additional delay because of JSAPI
    setTimeout(() => {
      view.takeScreenshot().then(screenshot => {
        if (screenshot.dataUrl) {
          this.uploadSnapFile(
            screenshot.dataUrl,
            this.bookmarkId + 1,
            newBookmark
          )
        }
      })
    }, 1000)
    const usedMapViewId = jimuMapView?.id ? jimuMapView?.id : currentJimuMapView?.id
    const initBookmark: Bookmark = {
      id: this.bookmarkId,
      name: `${this.formatMessage('bookmarkName')}-${this.bookmarkId}`,
      title: `${this.formatMessage('bookmarkName')}-${this.bookmarkId}`,
      type: view.type,
      imgParam: {},
      imagePosition: ImageFillMode.Fill,
      imgSourceType: ImgSourceType.Snapshot,
      extent: view.extent.toJSON(),
      viewpoint: view.viewpoint.toJSON(),
      graphics: [],
      showFlag: true,
      mapViewId: usedMapViewId,
      mapDataSourceId: jimuMapView?.dataSourceId ? jimuMapView?.dataSourceId : currentJimuMapView?.dataSourceId,
      layersConfig
    }
    this.setState({
      graphics: [],
      configUpdate: false,
      updateConfig: Immutable(initBookmark)
    })
  }

  showDialogAndEdit = (jimuMapView?: JimuMapView) => {
    const { activeBookmarkId, jimuMapConfig } = this.props
    const { updateConfig, viewGroup, editChangeView } = this.state
    let { currentJimuMapView } = this.state
    if (jimuMapView) currentJimuMapView = jimuMapView
    const config = updateConfig.asMutable({ deep: true })
    if (!currentJimuMapView || !currentJimuMapView.view) return
    const activeBookmarkConfig = jimuMapConfig.bookmarks.find(x => x.id === activeBookmarkId)
    const viewGroupArray = viewGroup?.jimuMapViews ? Object.keys(viewGroup.jimuMapViews) : []
    const isOrgBookmarkInViewGroup = viewGroupArray.findIndex(x => x === activeBookmarkConfig?.mapViewId) > -1
    // 'editChangeView' indicates that the view change is caused by the setting switch (non-manual)
    // This situation need to determine whether to switchMap
    const activeViewDsId = viewGroup?.getActiveJimuMapView()?.dataSourceId
    if (editChangeView && isOrgBookmarkInViewGroup && config && activeViewDsId && activeViewDsId !== config.mapDataSourceId) {
      viewGroup?.switchMap()
    } else {
      this.changeLayerWithGraphics()
      this.locateAndSetLayersConfig(currentJimuMapView)
    }
    this.setState({ editChangeView: false })
  }

  handleActiveViewChange = (jimuMapView: JimuMapView) => {
    const { currentJimuMapView } = this.state
    // Switching map: Resolve draw compoent's current support for hybrid maps
    if (currentJimuMapView && (currentJimuMapView.id !== jimuMapView.id)) {
      this.setState({ isSwitching: true }, () => {
        this.setState({ isSwitching: false })
      })
    }
    this.setState({
      currentJimuMapView: jimuMapView,
      configUpdate: true,
      viewEditable: true
    })
  }

  handleExtentChanged = (extent: __esri.Extent) => {
    const { activeBookmarkId, jimuMapConfig } = this.props
    const toEditBookmarkConfig = jimuMapConfig.bookmarks.find(
      x => x.id === activeBookmarkId
    )
    if (toEditBookmarkConfig && toEditBookmarkConfig.type !== '2d') return
    const originExtent =
      toEditBookmarkConfig?.extent &&
      JSON.parse(JSON.stringify(toEditBookmarkConfig.extent))
    const curExtent = JSON.parse(JSON.stringify(extent.toJSON()))
    // Draw currently triggers this event in certain cases, this is used to avoid cases where the actual extent has not changed.
    // There is no need to use 'else', because it is impossible for the user to move the extent to exactly the same as before
    if (originExtent && !lodash.isDeepEqual(originExtent, curExtent)) {
      this.setState({ configUpdate: true })
    }
  }

  handleViewPointChanged = (viewPoint: __esri.Viewpoint) => {
    const { activeBookmarkId, jimuMapConfig } = this.props
    const toEditBookmarkConfig = jimuMapConfig.bookmarks.find(
      x => x.id === activeBookmarkId
    )
    if (toEditBookmarkConfig && toEditBookmarkConfig.type !== '3d') return
    const originViewPoint =
      toEditBookmarkConfig?.viewpoint &&
      JSON.parse(JSON.stringify(toEditBookmarkConfig.viewpoint))
    const curViewPoint = JSON.parse(JSON.stringify(viewPoint.toJSON()))
    // Draw currently triggers this event in certain cases, this is used to avoid cases where the actual viewport has not changed.
    // There is no need to use 'else', because it is impossible for the user to move the viewport to exactly the same as before
    if (originViewPoint && !lodash.isDeepEqual(originViewPoint, curViewPoint)) {
      this.setState({ configUpdate: true })
    }
  }

  handleEditWhenOpen = (bookmark: ImmutableObject<Bookmark>) => {
    const { isShowDialog } = this.state
    if (isShowDialog) this.handleNewOrEdit(bookmark)
  }

  getDialogStatus = () => {
    const { isShowDialog } = this.state
    return isShowDialog
  }

  handleNewOrEdit = (config?: ImmutableObject<Bookmark>, settingEdit?: boolean) => {
    const { isShowDialog, viewEditable } = this.state
    // Continuous clicking only triggers one new addition
    if (!viewEditable) return
    const flag = config ? 'edit' : 'new'
    if (!config) this.setState({ newFlag: true })
    if (!isShowDialog) {
      this.setState({
        isShowDialog: true,
        updateFlag: flag,
        updateConfig: config,
        graphics: config ? config.asMutable({ deep: true })?.graphics : [],
        viewEditable: false,
        addWhenViewLoad: !settingEdit,
        editChangeView: !!settingEdit
      })
    } else {
      this.setState(
        {
          updateFlag: flag,
          updateConfig: config,
          graphics: config ? config.asMutable({ deep: true })?.graphics : [],
          editChangeView: !!settingEdit
        },
        () => {
          flag === 'new' ? this.addNewShowConfiger() : this.showDialogAndEdit()
        }
      )
    }
  }

  handleViewGroupCreate = (viewGroup: JimuMapViewGroup) => {
    this.setState({ viewGroup })
  }

  handleJimuMapViewCreated = (jimuMapView: JimuMapView) => {
    const { updateFlag, addWhenViewLoad, currentJimuMapView } = this.state
    const { activeBookmarkId, jimuMapConfig } = this.props
    const toEditBookmarkConfig =
      jimuMapConfig &&
      jimuMapConfig.bookmarks.find(x => x.id === activeBookmarkId)
    // When there are multiple maps, the second trigger is not the view currently in use
    if (updateFlag === 'new') {
      if (currentJimuMapView && (currentJimuMapView.id !== jimuMapView.id)) return
    } else {
      if (toEditBookmarkConfig && (toEditBookmarkConfig.mapViewId !== jimuMapView.id)) return
    }
    // click "Add bookmark" when markpopper is close
    if (addWhenViewLoad) {
      this.addNewShowConfiger(jimuMapView)
      this.setState({ addWhenViewLoad: false })
    }
    if (updateFlag === 'edit') {
      this.showDialogAndEdit(jimuMapView)
    }
  }

  querySelector (selector: string): HTMLElement {
    const appFrame: HTMLFrameElement = document.querySelector(
      `iframe[name="${APP_FRAME_NAME_IN_BUILDER}"]`
    )
    if (appFrame) {
      const appFrameDoc =
        appFrame.contentDocument || appFrame.contentWindow.document
      return appFrameDoc.querySelector(selector)
    }
    return null
  }

  getDefalutSize = () => {
    const layoutElem = this.querySelector(
      `div.widget-renderer[data-widgetid="${this.props.useMapWidgetIds[0]}"]`
    )
    const maxHeight = document.querySelector('#default')
      ? document.querySelector('#default').clientHeight - 20
      : 1080
    let innerSize = { width: 770, height: 850 }
    let innerMapSize = { width: 770, height: 770 }
    if (layoutElem) {
      const clientRect = layoutElem.getBoundingClientRect()
      const ratio = clientRect.width / clientRect.height || 1
      let defaultExpandWidth = clientRect.width * 1.1
      let defaultExpandHeight = clientRect.height * 1.1 + 111
      let defaultMapWidth = clientRect.width * 1.1
      let defaultMapHeight = clientRect.height * 1.1
      // width
      if (defaultExpandWidth < 770) {
        defaultExpandWidth = 770
        defaultExpandHeight = 770 / ratio + 111
        defaultMapWidth = 770
        defaultMapHeight = 770 / ratio
      } else if (defaultExpandWidth > 1080) {
        defaultExpandWidth = 1080
        defaultExpandHeight = 1080 / ratio + 111
        defaultMapWidth = 1080
        defaultMapHeight = 1080 / ratio
      }
      // height
      if (defaultExpandHeight > maxHeight) {
        defaultExpandHeight = maxHeight
        defaultExpandWidth =
          (maxHeight - 111) * ratio > 770 ? (maxHeight - 111) * ratio : 770
      }
      if (defaultMapHeight > maxHeight - 111) {
        defaultMapHeight = maxHeight - 111
        defaultMapWidth = (maxHeight - 111) * ratio
      }
      innerSize = {
        width: defaultExpandWidth,
        height: defaultExpandHeight
      }
      innerMapSize = {
        width: defaultMapWidth - 2,
        height: defaultMapHeight
      }
    }
    return { innerSize, innerMapSize }
  }

  getMapRatio = () => {
    const layoutElem = this.querySelector(
      `div.widget-renderer[data-widgetid="${this.props.useMapWidgetIds[0]}"]`
    )
    let ratio = 1
    if (layoutElem) {
      const clientRect = layoutElem.getBoundingClientRect()
      ratio = clientRect.width / clientRect.height || 1
    }
    return ratio
  }

  getWidgetPosition = () => {
    const isRTL = getAppStore().getState().appStateInBuilder.appContext.isRTL
    let pos = { x: 500, y: 50 }
    const { innerSize } = this.getDefalutSize()
    const width = isRTL
      ? 260
      : document.body.clientWidth - innerSize.width - 260
    pos = { x: width, y: 50 }
    return pos
  }

  onDrawCreatedCallback = (jimuDrawCompleteDescriptor: JimuDrawCreatedDescriptor) => {
    const { sketch, completeOperation } = jimuDrawCompleteDescriptor
    this.setState({ currentSketch: sketch, completeOperation })
  }

  toggleDrawTools = () => {
    const { isDrawToolsOpen } = this.state
    this.setState({ isDrawToolsOpen: !isDrawToolsOpen })
  }

  onDrawEndCallback = (newGraphic: __esri.Graphic) => {
    const { graphics } = this.state
    const newGraphicJson = newGraphic.toJSON()
    // Temporary modifications to address API changes
    this._timer = setTimeout(() => {
      clearTimeout(this._timer)
      this._timer = null
    }, 500)
    // use id to edit and delete graphics, id is now already produce by Draw
    this.setState({
      configUpdate: true,
      graphics: graphics.concat(newGraphicJson)
    })
  }

  onDrawUpdatedCallback = ({ type, graphics }: DrawingUpdatedDescriptor): void => {
    const { graphics: originGraphics } = this.state
    let noChangeCount = 0
    graphics.forEach(graphic => {
      const jsonGraphic = graphic.toJSON()
      const updateIndex = originGraphics.findIndex(
        item => item.attributes.jimuDrawId === jsonGraphic.attributes.jimuDrawId
      )
      // Handle the problem of triggering a callback function when clicked
      const orgGraphicGeo =
        updateIndex > -1 ? originGraphics[updateIndex].geometry : {}
      const newGraphicGeo = jsonGraphic.geometry
      const orgGraphicSym =
        updateIndex > -1 ? originGraphics[updateIndex].symbol : {}
      const newGraphicSym = jsonGraphic.symbol
      // when click save button trigger the editCallback
      if (this.isSaving) {
        if (
          lodash.isDeepEqual(orgGraphicGeo, newGraphicGeo) &&
          lodash.isDeepEqual(orgGraphicSym, newGraphicSym)
        ) {
          noChangeCount++
          return
        }
      } else {
        if (
          lodash.isDeepEqual(orgGraphicGeo, newGraphicGeo) &&
          type === 'complete'
        ) {
          noChangeCount++
          return
        }
      }
      if (type === 'deleted') {
        if (updateIndex > -1) originGraphics.splice(updateIndex, 1)
      } else if (type === 'complete') {
        if (updateIndex > -1) {
          const temp = originGraphics[updateIndex]
          originGraphics[updateIndex] = jsonGraphic
          originGraphics[updateIndex].symbol = temp.symbol
        }
      }
    })
    if (noChangeCount !== graphics.length) {
      this.setState({
        configUpdate: true,
        graphics: originGraphics
      })
    }
  }

  onDrawClearedCallback = () => {
    this.setState({
      configUpdate: true,
      graphics: []
    })
  }

  handleCloseOk = () => {
    this.setState({
      isShowDialog: false,
      closeConfirmOpen: false,
      viewEditable: true
    })
  }

  handleCloseBtn = () => {
    this.setState({ closeConfirmOpen: false })
  }

  getPoperStyle = (theme: ThemeVariables) => {
    return css`
      .popper-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .popper-header {
          width: 100%;
          flex-shrink: 0;
          flex-grow: 0;
          cursor: move;
        }
        .map-container {
          width: 100%;
          height: 100%;
          background-color: gray;
          display: contents;
        }
        .popper-footer {
          background: ${theme.colors.palette.light[300]};
          color: ${theme.colors.palette.dark[600]};
          padding: ${polished.rem(8)} ${polished.rem(12)};
          .left-btn {
            position: absolute;
            margin: 6px;
          }
          .left-tool {
            position: absolute;
            left: 55px;
            z-index: 10;
          }
          .hidden-tool {
            display: none;
          }
          .right-btn {
            height: 45px;
            padding: 6px 2px;
            .btn {
              min-width: 80px;
            }
          }
        }
      }
    `
  }

  resizeRatio = size => {
    const maxElem = this.querySelector('body')
    const maxClientRect = maxElem.getBoundingClientRect()
    const { mapRatio } = this.state
    let { width } = size
    if (width > 1080) width = 1080
    let height = width / mapRatio + 111
    if (height > maxClientRect.height) {
      height = maxClientRect.height
      width = (maxClientRect.height - 111) * mapRatio
    }
    this.setState({ mapSize: { width, height } })
  }

  render () {
    const {
      currentJimuMapView,
      isShowDialog,
      isSwitching,
      configUpdate,
      closeConfirmOpen,
      isDrawToolsOpen,
      viewEditable,
      newFlag
    } = this.state
    const { title, theme } = this.props
    const useMapWidget =
      this.props.useMapWidgetIds && this.props.useMapWidgetIds[0]
    const config = getAppStore().getState().appStateInBuilder.appConfig
    const isRTL = getAppStore().getState().appStateInBuilder.appContext.isRTL
    if (!config.widgets[useMapWidget]) return null
    let useDataSource = config.widgets[useMapWidget].useDataSources
    // use the current view of Map widget
    if (newFlag) {
      const initialMapDataSourceID =
        config.widgets[useMapWidget].config?.initialMapDataSourceID
      const needToReverse = () => {
        return (
          useDataSource &&
          useDataSource.length > 1 &&
          initialMapDataSourceID &&
          useDataSource[0].dataSourceId !== initialMapDataSourceID
        )
      }
      if (needToReverse()) {
        useDataSource = Immutable(
          useDataSource.asMutable({ deep: true }).reverse()
        )
      }
    }
    const toolConfig = {
      canZoom: true,
      canHome: true,
      canSearch: true,
      canCompass: true,
      canLayers: true
    }
    const jimuMapConfig = this.props.jimuMapConfig
      ? this.props.jimuMapConfig.set('toolConifg', toolConfig)
      : Immutable({} as any)
    const panelHeader = css`
      .panel-header {
        background: ${theme.colors.palette.light[300]};
        color: ${theme.colors.palette.dark[600]};
        height: 50px;
        flex-shrink: 0;
        font-size: 1rem;
        font-weight: 500;
        .jimu-btn {
          color: ${theme.colors.palette.dark[600]} !important;
        }
        & >.actions >.jimu-btn.action-close :hover {
          color: ${theme.colors.black};
        }
      }
    `
    const { innerMapSize, innerSize } = this.getDefalutSize()

    const floatingPanel = (
      <FloatingPanel
        onHeaderClose={() => this.handleClickClose()}
        defaultPosition={this.getWidgetPosition()}
        headerTitle={title}
        size={innerSize}
        minSize={{ width: 770, height: 850 }}
        disableResize
        css={panelHeader}
        className='surface-3'
        disableActivateOverlay
        dragBounds='body'
      >
        <div
          className='rounded w-100 h-100'
          css={this.getPoperStyle(theme)}
          ref={ref => (this.reference = ref)}
        >
          <div className='popper-content'>
            <div
              style={{
                width: `${innerMapSize.width}px`,
                height: `${innerMapSize.height}px`,
                margin: '0 auto'
              }}
            >
              <div className='map-container'>
                <JimuMap
                  id={`${this.props.id}editor`}
                  useDataSources={useDataSource}
                  jimuMapConfig={jimuMapConfig}
                  onActiveViewChange={this.handleActiveViewChange}
                  onExtentChanged={this.handleExtentChanged}
                  onViewPointChanged={this.handleViewPointChanged}
                  onViewGroupCreate={this.handleViewGroupCreate}
                  onJimuMapViewCreated={this.handleJimuMapViewCreated}
                />
                {closeConfirmOpen && (
                  <div
                    css={css`
                      position: absolute;
                      z-index: 11;
                      top: 0;
                      left: 0;
                      background-color: ${polished.rgba(
                        theme.colors.palette.secondary[400],
                        0.65
                      )};
                      width: ${innerSize.width}px;
                      height: ${innerSize.height}px;
                      .real-container {
                        background-color: ${theme.colors.palette.light[300]};
                        border: 1px solid ${theme.colors.palette.light[800]};
                        background-clip: padding-box;
                        width: 400px;
                        position: relative;
                        top: 50%;
                        margin: -60px auto 0;
                        padding: 30px;
                      }
                      .confirm-context {
                        .title-icon{
                          padding: 0 6px;
                        }
                        .title-label{
                          font-size: 1rem;
                        }
                      }
                      .confirm-footer {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 30px;
                        button {
                          cursor: pointer;
                          margin-left: ${polished.rem(10)};
                          min-width: ${polished.rem(80)};
                        }
                      }
                    `}
                  >
                    <div className='real-container'>
                      <div className='confirm-context d-flex align-items-start'>
                        <div className='title-icon'>
                          <WarningOutlined size={24} color={'var(--warning-600)'} />
                        </div>
                        <div className='title-label'>
                          {this.formatMessage('confirmUnsave')}
                        </div>
                      </div>
                      <div className='confirm-footer'>
                        <Button type='primary' onClick={this.handleCloseOk}>
                          {this.formatMessage('yes')}
                        </Button>
                        <Button onClick={this.handleCloseBtn}>
                          {this.formatMessage('cancel')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='popper-footer'>
              <div className='left-btn'>
                <Button icon type='tertiary' onClick={this.toggleDrawTools}>
                  {isDrawToolsOpen
                    ? <LeftOutlined className='mr-1' css={css`${isRTL && 'transform: scaleX(-1);'}`} />
                    : <DrawOutlined className='mr-1' css={css`${isRTL && 'transform: scaleX(-1);'}`} />
                  }
                </Button>
              </div>
              <div className={`left-tool ${isDrawToolsOpen ? '' : 'hidden-tool'}`}>
                {currentJimuMapView &&
                  currentJimuMapView.view &&
                  !isSwitching && (
                  <JimuDraw
                    jimuMapView={currentJimuMapView}
                    drawingOptions={this._drawingOptions}
                    uiOptions={this._uiOptions}
                    onJimuDrawCreated={this.onDrawCreatedCallback}
                    onDrawingFinished={this.onDrawEndCallback}
                    onDrawingUpdated={this.onDrawUpdatedCallback}
                    onDrawingCleared={this.onDrawClearedCallback}
                  />
                )}
              </div>
              <div className='float-right right-btn'>
                <Button
                  className='mr-2'
                  type='primary'
                  onClick={this.handleClickUpdate}
                  disabled={!configUpdate}
                  data-testid='popperSaveBtn'
                >
                  {configUpdate
                    ? this.formatMessage('save')
                    : this.formatMessage('saved')}
                </Button>
                <Button
                  className='mr-1'
                  onClick={this.handleClickReset}
                  disabled={!configUpdate}
                >
                  {this.formatMessage('reset')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FloatingPanel>
    )

    return (
      <div className='w-100'>
        <Button
          className='w-100 text-dark map-popper-btn'
          type='primary'
          disabled={!viewEditable}
          onClick={() => this.handleNewOrEdit()}
        >
          {this.props.buttonLabel}
        </Button>
        {isShowDialog && floatingPanel}
      </div>
    )
  }
}
