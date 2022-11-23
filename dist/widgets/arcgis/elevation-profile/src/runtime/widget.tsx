/** @jsx jsx */
import { React, AllWidgetProps, BaseWidget, jsx, classNames, getAppStore, WidgetState, AppMode, IMState } from 'jimu-core'
import {
  WidgetPlaceholder, Card, CardBody, Button, Icon,
  defaultMessages as jimuUIDefaultMessages
} from 'jimu-ui'
import { IMConfig, ButtonTriggerType } from '../config'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import { getStyle } from './lib/style'
import ResultPane from './components/results-pane'
import defaultMessages from './translations/default'
import { getRuntimeIcon, epStatistics, defaultElevationLayer, ElevationProfileErrorState } from './constants'
import { getAllLayersFromDataSource, defaultSelectedUnits } from '../common/utils'
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel'
import Graphic from 'esri/Graphic'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import Point from 'esri/geometry/Point'
import Extent from 'esri/geometry/Extent'
import Query from 'esri/rest/support/Query'
import geometryEngine from 'esri/geometry/geometryEngine'
import ElevationProfileViewModel from 'esri/widgets/ElevationProfile/ElevationProfileViewModel'
import watchUtils from 'esri/core/watchUtils'
import ElevationLayer from 'esri/layers/ElevationLayer'
import jsonUtils from 'esri/symbols/support/jsonUtils'
import Polyline from 'esri/geometry/Polyline'
import SpatialReference from 'esri/geometry/SpatialReference'
import unitUtils from 'esri/core/unitUtils'
import Color from 'esri/Color'

const { epIcon } = getRuntimeIcon()

const defaultPointSymbol = {
  style: 'esriSMSCircle',
  color: [0, 0, 128, 128],
  name: 'Circle',
  outline: {
    color: [0, 0, 128, 255],
    width: 1
  },
  type: 'esriSMS',
  size: 18
}

interface ExtraProps {
  appMode: AppMode
}

interface IState {
  initialStage: boolean
  resultStage: boolean
  selectModeActive: boolean
  addToSelectionTool: boolean
  drawModeActive: boolean
  drawingOrSelectingComplete: boolean
  currentDatasource: string
  currentSketchVM: SketchViewModel
  jimuMapView: JimuMapView
  startChartRendering: boolean
  groundColor: string
  graphicsHighlightColor: string
  chartColorRender: string
  customElevationLayer: boolean
  elevationLayer: string
  profileResult: any
  selectedLinearUnit: string
  selectedElevationUnit: string
  noFeaturesError: boolean
  profileLineLayers: any
  lineLayersNotFound: boolean
  viewModelErrorState: boolean
  profileErrorMsg: string
  noGraphicAfterFirstSelection: boolean
  loadingIndicator: boolean
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, IState> {
  private drawingLayer: GraphicsLayer
  private nextPossibleSelectionLayer: GraphicsLayer
  private mapView: JimuMapView
  private selectedUnit: any
  private _defaultViewModel: ElevationProfileViewModel
  private _chartDataTimer = null
  private selectableLayersAtRuntime: string[]
  private readonly defaultConfig: any
  private newFeatureSelection: boolean
  private activeCurrentDs: string
  static mapExtraStateProps = (state: IMState): ExtraProps => {
    return {
      appMode: state.appRuntimeInfo?.appMode
    }
  }

  constructor (props) {
    super(props)
    this.defaultConfig = this.createDefaultConfigForDataSource()
    this.newFeatureSelection = false
    //create all graphic layers for drawing, highlighting etc.
    this.createDrawingLayers()
    this.activeCurrentDs = 'default'
    this.selectableLayersAtRuntime = []
    this.selectedUnit = defaultSelectedUnits(this.props.config.configInfo[this.props.config.activeDataSource], this.props.portalSelf)
    this.state = {
      initialStage: true,
      resultStage: false,
      selectModeActive: this.props.config.generalSettings?.isSelectToolActive,
      addToSelectionTool: false,
      drawModeActive: this.props.config.generalSettings?.isDrawToolActive,
      drawingOrSelectingComplete: false,
      currentDatasource: this.props.config.activeDataSource,
      currentSketchVM: null,
      jimuMapView: null,
      startChartRendering: false,
      groundColor: this.props.config.configInfo[this.props.config.activeDataSource]?.profileChartSettings?.groundColor,
      graphicsHighlightColor: this.props.config.configInfo[this.props.config.activeDataSource]?.profileChartSettings?.graphicsHighlightColor,
      chartColorRender: '',
      customElevationLayer: this.props.config.configInfo[this.props.config.activeDataSource]?.profileChartSettings?.isCustomElevationLayer,
      elevationLayer: this.props.config.configInfo[this.props.config.activeDataSource]?.profileChartSettings?.elevationLayerURL,
      profileResult: null,
      selectedLinearUnit: this.selectedUnit[1],
      selectedElevationUnit: this.selectedUnit[0],
      noFeaturesError: false,
      profileLineLayers: [],
      lineLayersNotFound: this.props.config.configInfo[this.props.config.activeDataSource]?.advanceOptions
        ? this.props.config.configInfo[this.props.config.activeDataSource].profileSettings.layers.length === 0
        : false,
      viewModelErrorState: false,
      profileErrorMsg: '',
      noGraphicAfterFirstSelection: false,
      loadingIndicator: false
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  createDrawingLayers = () => {
    //create new graphicsLayer to draw lines
    this.drawingLayer = new GraphicsLayer({
      listMode: 'hide',
      effect: 'bloom(0.8, 1px, 0)'
    })

    //create new graphicsLayer to show next possible selections
    this.nextPossibleSelectionLayer = new GraphicsLayer({
      listMode: 'hide',
      effect: 'bloom(0.8, 0px, 1%)'
    })
  }

  componentDidMount = () => {
    this.setState({
      chartColorRender: this.state.groundColor,
      noFeaturesError: false,
      viewModelErrorState: false
    })
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (!(jmv && jmv.view)) {
      this.setState({
        initialStage: false,
        resultStage: false
      })
      return
    }
    this.mapView = jmv
    if (this.state.jimuMapView) {
      // we have a 'previous' map where we added the widget
      // (ex: case where two Maps in single Experience page and user is switching
      // between them in the dropdown) - we must destroy the old widget in this case.
      // destroy the sketch view modal if it was still not destroyed
      // this will resolve the cross origin issue with react
      if (this.state.currentSketchVM && !this.state.currentSketchVM.destroyed) {
        this.state.currentSketchVM.destroy()
      }
      //Once the data source is changed, clear the chart and map graphics and set widget to initial stage
      this.clearAll()
      this.setState({
        initialStage: true,
        resultStage: false,
        drawModeActive: this.props.config.generalSettings?.isDrawToolActive,
        selectModeActive: this.props.config.generalSettings?.isSelectToolActive
      })
      //destroy prev drawing layers and create new for changed mapview
      this.destroyDrawingLayers()
      this.createDrawingLayers()
    }
    if (jmv) {
      this.setState({
        jimuMapView: jmv
      }, () => {
        //If no configuration found for selected data source
        //create and use the default configuration
        //this will allow user to use the widget with basic draw tool
        if (jmv.dataSourceId === null) {
          this.setState({
            currentDatasource: 'default'
          }, () => {
            this.activeCurrentDs = this.state.currentDatasource
            //set default Units
            this.selectedUnit = defaultSelectedUnits(this.props.config.configInfo[this.state.currentDatasource], this.props.portalSelf)
          })
        } else if (this.props.config.activeDataSource &&
          this.props.config.configInfo[this.props.config.activeDataSource]) {
          let configDs = this.props.config.activeDataSource
          if (this.state.jimuMapView && this.state.jimuMapView.dataSourceId) {
            if (Object.prototype.hasOwnProperty.call(this.props.config.configInfo, this.state.jimuMapView.dataSourceId)) {
              configDs = this.state.jimuMapView.dataSourceId
            } else {
              configDs = 'default'
            }
            this.setState({
              currentDatasource: configDs
            }, () => {
              this.activeCurrentDs = this.state.currentDatasource
              if (this.state.currentDatasource !== 'default') {
                this.checkLineLayerAvailableInDsAndConfig(this.state.currentDatasource)
              }
              this.setConfigForDatasources()
            })
          }
        }

        setTimeout(() => {
          const elevationInfo = {
            mode: this.state.jimuMapView.view.type === '3d' ? 'relative-to-ground' : 'on-the-ground',
            offset: null
          }
          this.drawingLayer.set('elevationInfo', elevationInfo)
          this.nextPossibleSelectionLayer.set('elevationInfo', elevationInfo)
          this.state.jimuMapView.view.map.addMany([this.nextPossibleSelectionLayer, this.drawingLayer])
          this.createApiWidget(jmv)
          this.createEpViewModel(jmv)
          //check the widget state whether open/close in live view
          const widgetState = getAppStore().getState().widgetsRuntimeInfo[this.props.id].state
          if (widgetState === WidgetState.Opened || !widgetState) {
            this.loadSelectDrawToolOnLoad(this.activeCurrentDs)
          }
        }, 100)
      })
    }
  }

  loadSelectDrawToolOnLoad = (activeCurrentDs) => {
    //on widget load activate draw/select tool if it is enabled in config
    if (activeCurrentDs === 'default') {
      if (this.state.drawModeActive) {
        this.manageActiveDrawSelect()
      }
    } else if (this.state.drawModeActive || this.state.selectModeActive) {
      if (this.state.lineLayersNotFound && this.state.selectModeActive) {
        return
      }
      this.manageActiveDrawSelect()
    } else {
      this.setState({
        resultStage: false,
        initialStage: true
      })
    }
  }

  manageActiveDrawSelect = () => [
    this.setState({
      resultStage: true,
      initialStage: false
    }, () => {
      this.clearAll()
      this._displayDefaultCursor()
      this.activateDrawOrSelectTool()
    })
  ]

  checkLineLayerAvailableInDsAndConfig = (activeDs: string) => {
    const allLayerSources: any = getAllLayersFromDataSource(activeDs)
    let noLineLayerFound: boolean = true
    allLayerSources?.forEach((layer) => {
      if (layer && layer.layerDefinition && layer.layerDefinition.geometryType &&
        layer.layerDefinition.geometryType === 'esriGeometryPolyline') {
        noLineLayerFound = false
      }
    })
    if (this.props.config.configInfo[activeDs]?.advanceOptions &&
      this.props.config.configInfo[activeDs]?.profileSettings.layers.length === 0) {
      noLineLayerFound = true
    }
    this.setState({
      lineLayersNotFound: noLineLayerFound
    })
  }

  setConfigForDatasources = () => {
    const configActiveDs = this.props.config.configInfo[this.state.currentDatasource]
    this.setState({
      groundColor: configActiveDs ? configActiveDs.profileChartSettings?.groundColor : this.defaultConfig.profileChartSettings.groundColor,
      graphicsHighlightColor: configActiveDs ? configActiveDs.profileChartSettings?.graphicsHighlightColor : this.defaultConfig.profileChartSettings.graphicsHighlightColor,
      chartColorRender: configActiveDs ? configActiveDs.profileChartSettings?.groundColor : this.defaultConfig.profileChartSettings.groundColor,
      customElevationLayer: configActiveDs ? configActiveDs.profileChartSettings?.isCustomElevationLayer : this.defaultConfig.profileChartSettings.isCustomElevationLayer,
      elevationLayer: configActiveDs ? configActiveDs.profileChartSettings?.elevationLayerURL : this.defaultConfig.profileChartSettings.elevationLayerURL,
      selectedLinearUnit: configActiveDs ? this.selectedUnit[1] : this.defaultConfig.profileChartSettings.linearUnit,
      selectedElevationUnit: configActiveDs ? this.selectedUnit[0] : this.defaultConfig.profileChartSettings.elevationUnit
    })
  }

  createDefaultConfigForDataSource = () => {
    let elevationUnit, linearUnit
    //Fetch and set the default units based on portal settings
    if (this.props.portalSelf?.units === 'english') {
      elevationUnit = 'feet'
    } else {
      elevationUnit = 'meters'
    }
    if (this.props.portalSelf?.units === 'english') {
      linearUnit = 'miles'
    } else {
      linearUnit = 'kilometers'
    }
    //Populate the default settings
    return {
      profileChartSettings: {
        isCustomElevationLayer: true,
        elevationLayerURL: defaultElevationLayer,
        linearUnit: linearUnit,
        elevationUnit: elevationUnit,
        displayStatistics: true,
        selectedStatistics: epStatistics,
        groundColor: '#b54900',
        graphicsHighlightColor: '#b54900'
      }
    }
  }

  createApiWidget = (jmv) => {
    // Create a new instance of sketchViewModel
    const sketchVM = new SketchViewModel({
      view: jmv ? jmv.view : null,
      layer: new GraphicsLayer(),
      updateOnGraphicClick: false,
      defaultCreateOptions: {
        mode: 'click',
        hasZ: jmv?.view?.type === '3d'
      },
      polylineSymbol: {
        type: 'simple-line',
        color: this.state.graphicsHighlightColor,
        width: 5
      },
      pointSymbol: jsonUtils.fromJSON(defaultPointSymbol) as any,
      defaultUpdateOptions: {
        toggleToolOnClick: false
      }
    })

    sketchVM.on('create', event => {
      if (event.state === 'start') {
        const polylineSymbol = {
          type: 'simple-line',
          color: this.state.graphicsHighlightColor,
          width: 5
        }
        this.state.currentSketchVM.set('polylineSymbol', polylineSymbol)
      } else if (event.state === 'complete') {
        this.setState({
          noFeaturesError: false
        })
        if (this.state.selectModeActive) {
          this.setState({
            loadingIndicator: true
          })
          jmv.selectFeaturesByGraphic(event.graphic, 'intersects').then((featuresByLayer) => {
            this.setState({
              loadingIndicator: false
            })
            this.queryForNewSelection(featuresByLayer)
          })
        }
      }
    })

    this.setState({
      currentSketchVM: sketchVM
    })

    jmv?.view?.on('click', (event) => {
      const filterLayer = this.nextPossibleSelectionLayer
      if (this.state.addToSelectionTool) {
        //stopPropagation so that info window is not shown
        event.stopPropagation()
        jmv.view.hitTest(event).then((response) => {
          // check if a feature is returned from the next possible selection layer
          // do something with the result graphic
          if (response && response.results) {
            const graphicResults = response.results.filter(r => r.type === 'graphic') as __esri.GraphicHit[]
            const results = graphicResults.filter((result) => {
              return result.graphic.layer === filterLayer &&
                result.graphic.geometry.type === 'polyline'
            })
            if (results && results.length > 0) {
              //clear profile chart
              this.clearChart()
              this.newFeatureSelection = false
              //to remove the extra selection form map view, done by system while showing info-window of selected features
              this.mapView.clearSelectedFeatures()
              this.selectFeatureForProfiling(results[0].graphic)
            }
          }
        })
      }
    })
  }

  createEpViewModel = (jmv) => {
    const profiles = []
    if (!this.state.customElevationLayer) {
      profiles.push({
        type: 'ground', // ground Profile
        color: this.state.groundColor
      })
    } else {
      profiles.push({
        // displays elevation values from a custom source
        type: 'query',
        source: new ElevationLayer({
          url: this.state.elevationLayer
        }),
        color: this.state.groundColor
      })
    }
    //Create new instance of ElevationProfileViewModel
    this._defaultViewModel = new ElevationProfileViewModel({
      view: jmv ? jmv.view : null,
      profiles: profiles
    })

    //if view model having some error in its error state while drawing/selecting to generate the profile
    watchUtils.watch(this._defaultViewModel, 'errorState', (result) => {
      const error = this.getErrorMsgState(result)
      if (error?.length === 0 || !error) {
        return
      }
      this.setState({
        viewModelErrorState: error[0],
        profileErrorMsg: error[1]
      })
    })

    watchUtils.watch(this._defaultViewModel, 'chartData', (result) => {
      if (!result) {
        return
      }

      if (this._chartDataTimer) {
        clearTimeout(this._chartDataTimer)
      }

      this._chartDataTimer = setTimeout(() => {
        if (this._defaultViewModel.state === 'created') {
          this.setState({
            drawingOrSelectingComplete: true
          })
        }
        if (this.state.drawModeActive || this.state.selectModeActive) {
          this.setState({
            viewModelErrorState: false,
            startChartRendering: true,
            profileResult: result
          })
        }
      }, 200)
    })
  }

  /**
  * The current error state of the widget, which allows it to display different
  * error messages while drawing/selecting on webmap/webscene
  *
  * @ignore
  */
  getErrorMsgState = (errorMsg): any => {
    switch (errorMsg) {
      case ElevationProfileErrorState.TooComplex:
        return [true, this.nls('tooComplexError')]
      case ElevationProfileErrorState.InvalidGeometry:
        return [true, this.nls('invalidGeometryError')]
      case ElevationProfileErrorState.InvalidElevationInfo:
        return [true, this.nls('invalidElevationInfoError')]
      case ElevationProfileErrorState.UnknownError:
        return [true, this.nls('unknownError')]
      case ElevationProfileErrorState.NoVisibleProfiles:
        return [true, this.nls('noProfileError')]
      case ElevationProfileErrorState.RefinedButNoChartData:
        return [true, this.nls('noProfileError')]
      case ElevationProfileErrorState.None:
        return []
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.appMode !== prevProps.appMode && this.props.appMode === AppMode.Run) {
      if (this.state.addToSelectionTool) {
        this._displayAddToSelectionCursor()
      }
    } else if (this.props.appMode !== prevProps.appMode && this.props.appMode === AppMode.Design) {
      this._displayDefaultCursor()
    }
    if (!this.mapView) {
      return
    }
    //if map or active datasource configuration is changed, update SketchVM and map instance
    if (prevProps.useMapWidgetIds !== this.props.useMapWidgetIds ||
      prevProps.config.activeDataSource !== this.props.config.activeDataSource) {
      if (this.props.config.configInfo[this.props.config.activeDataSource]) {
        this.setState({
          currentDatasource: this.props.config.activeDataSource
        }, () => {
          this.setState({
            customElevationLayer: this.props.config.configInfo[this.state.currentDatasource].profileChartSettings.isCustomElevationLayer,
            elevationLayer: this.props.config.configInfo[this.state.currentDatasource].profileChartSettings.elevationLayerURL
          })
        })
      }
    }

    if (prevProps.state !== this.props.state && (!this.state.profileResult && (this.state.drawModeActive || this.state.selectModeActive))) {
      //check widget the state open/close in live view
      const widgetState = getAppStore().getState().widgetsRuntimeInfo[this.props.id].state
      if (widgetState === WidgetState.Opened || !widgetState) {
        this.loadSelectDrawToolOnLoad(this.activeCurrentDs)
      }
    }

    const currentConfig = this.props.config.configInfo?.[this.state.currentDatasource]
    const prevConfig = prevProps.config.configInfo?.[this.state.currentDatasource]

    if (Object.prototype.hasOwnProperty.call(this.props.config.configInfo, this.state.currentDatasource)) {
      this.checkLineLayerAvailableInDsAndConfig(this.state.currentDatasource)
      this.setConfigForDatasources()
    }

    //profile chart settings
    if (prevConfig?.profileChartSettings.groundColor !== currentConfig?.profileChartSettings.groundColor ||
      prevConfig?.profileChartSettings.graphicsHighlightColor !== currentConfig?.profileChartSettings.graphicsHighlightColor
    ) {
      this.setState({
        groundColor: currentConfig?.profileChartSettings.groundColor,
        graphicsHighlightColor: currentConfig?.profileChartSettings.graphicsHighlightColor
      }, () => {
        this.setState({
          chartColorRender: this.state.groundColor
        })
        if (this.drawingLayer && this.drawingLayer.graphics.length > 0) {
          const polylineSymbol = {
            type: 'simple-line',
            color: this.state.graphicsHighlightColor,
            width: 5
          }
          const graphics: any = this.drawingLayer.graphics
          const individualGraphicItems = graphics.items
          individualGraphicItems.forEach((graphic) => {
            graphic.symbol = polylineSymbol
          })
        }
        if (this._defaultViewModel && this.state.groundColor) {
          this._defaultViewModel.profiles.getItemAt(0).color.setColor(this.state.groundColor)
        }
      })
    }

    if (prevConfig?.profileChartSettings.elevationUnit !== currentConfig?.profileChartSettings.elevationUnit ||
      prevConfig?.profileChartSettings.linearUnit !== currentConfig?.profileChartSettings.linearUnit) {
      this.setState({
        selectedLinearUnit: currentConfig?.profileChartSettings.linearUnit,
        selectedElevationUnit: currentConfig?.profileChartSettings.elevationUnit
      })
    }

    //clear all the graphics and chart when elevation layer changed in live view
    if (prevConfig?.profileChartSettings.elevationLayerURL !== currentConfig?.profileChartSettings.elevationLayerURL ||
      prevConfig?.profileChartSettings.isCustomElevationLayer !== currentConfig?.profileChartSettings.isCustomElevationLayer) {
      if (currentConfig && prevConfig) {
        this.setState({
          elevationLayer: currentConfig?.profileChartSettings.elevationLayerURL
        }, () => {
          if (!this.state.initialStage) {
            this.activateToolForNewProfile()
          }
          this.createEpViewModel(this.mapView)
        })
      }
    }

    //check if profile layers config are updated in live view mode
    if (this.didProfileLayersSettingsChanged(prevConfig?.profileSettings.layers, currentConfig?.profileSettings.layers) ||
      prevConfig?.advanceOptions !== currentConfig?.advanceOptions) {
      this.setState({
        profileLineLayers: currentConfig?.profileSettings.layers
      }, () => {
        let noLineConfigured: boolean = false
        if (currentConfig?.advanceOptions && this.state.profileLineLayers.length === 0) {
          this.onBackClick()
          noLineConfigured = true
        }
        this.setState({
          lineLayersNotFound: noLineConfigured
        })
      })
    }
  }

  didProfileLayersSettingsChanged = (prevProfileLayers, currentProfileLayers) => {
    let profileSettingsChanged = false
    if (prevProfileLayers?.length !== currentProfileLayers?.length) {
      profileSettingsChanged = true
    }
    return profileSettingsChanged
  }

  componentWillUnmount = () => {
    if (this._defaultViewModel) {
      this._defaultViewModel.clear()
    }
    //remove previously drawn graphics
    this.destroyDrawingLayers()
    //this will reset the cursor to default
    this._displayDefaultCursor()
  }

  queryForNewSelection = (featuresByLayer) => {
    let newSelectedFeature = null
    if (featuresByLayer.length > 0) {
      featuresByLayer.forEach(features => {
        if (features.length > 0) {
          const dsLayerId = this.getDSLayerID(features[0].layer.id)
          //In current release we will be dealing with only first feature out of multiple features from multiple layers
          //TODO: In future we may have to provide the features list and allow user to select one feature
          if (features[0].geometry.type === 'polyline' && this.selectableLayersAtRuntime.includes(dsLayerId)) {
            //In 3d, update the elevation info of drawing and nextPossibleSelectionLayer according to the first selected feature
            if (this.state.jimuMapView.view.type === '3d' && features[0]?.layer?.elevationInfo) {
              const elevationInfo = features[0]?.layer?.elevationInfo
              this.drawingLayer.set('elevationInfo', elevationInfo)
              this.nextPossibleSelectionLayer.set('elevationInfo', elevationInfo)
            }
            this.newFeatureSelection = true
            this.setState({
              noGraphicAfterFirstSelection: true
            })
            newSelectedFeature = new Graphic(
              {
                geometry: features[0]?.geometry,
                attributes: features[0]?.attributes ? features[0]?.attributes : {}
              }
            )
            newSelectedFeature.attributes.esriCTFeatureLayerId = dsLayerId
            //to remove the extra selection form map view, done by system while showing info-window of selected features
            this.mapView.clearSelectedFeatures()
            return true
          }
        }
      })
    }
    //clear the graphics added by drawing tool
    if (this.drawingLayer) {
      this.drawingLayer.removeAll()
    }
    if (newSelectedFeature) {
      this.setState({
        drawModeActive: false,
        noFeaturesError: false,
        viewModelErrorState: false
      })
      this.selectFeatureForProfiling(newSelectedFeature)
    } else {
      //reactivate sketch view model to select another point
      if (this.state.selectModeActive) {
        this.state.currentSketchVM.create('point')
      }
      //show error in widget panel
      this.setState({
        noFeaturesError: true
      })
    }
  }

  /**
   *
   * If layer is invisible by scale-dependent visibility, layer definitions and filters then user will unable to select the feature
  */

  considerLayerVisibility = (featureLayer): boolean => {
    const layersVisibility = featureLayer.visible &&
      ((featureLayer.minScale >= this.mapView.view.scale && featureLayer.maxScale <= this.mapView.view.scale) ||
        (featureLayer.minScale === 0 && featureLayer.maxScale <= this.mapView.view.scale) ||
        (featureLayer.maxScale === 0 && featureLayer.minScale >= this.mapView.view.scale) ||
        (featureLayer.minScale === 0 && featureLayer.maxScale === 0))
    return layersVisibility
  }

  getDSLayerID = (layerId: string): string => {
    let dsLayerId = ''
    if (this.state?.jimuMapView?.dataSourceId) {
      const dataSource: any = getAllLayersFromDataSource(this.state.jimuMapView.dataSourceId)
      dataSource?.forEach((ds) => {
        if (ds.jimuChildId === layerId) {
          dsLayerId = ds.id
          return true
        }
      })
    }
    return dsLayerId
  }

  queryForIndividualLayers = (dsId: string, geometry) => {
    const defArr = []
    const dataSource: any = getAllLayersFromDataSource(dsId)
    //use all the layers for selecting if advanceoptions is turned OFF and if it is ON but no line layers
    // are configured
    const layersArray = this.mapView.view.map.layers.toArray()
    let isLayerVisible: boolean = true
    if (!this.props.config.configInfo[this.state.currentDatasource]?.advanceOptions) {
      dataSource?.forEach((layer) => {
        //selectable layers at runtime
        this.selectableLayersAtRuntime.forEach((selectableLayerId) => {
          if (selectableLayerId === layer.id) {
            layersArray.forEach((viewLayers) => {
              const layersArray: any = viewLayers
              if (layersArray.type === 'group') {
                const grpLayer = layersArray.layers.toArray()
                grpLayer.forEach((grpLayers) => {
                  isLayerVisible = this.considerLayerVisibility(grpLayers)
                  if ((grpLayers.id === layer.jimuChildId) && isLayerVisible) {
                    if (layer.layerDefinition?.geometryType && layer.layerDefinition.geometryType === 'esriGeometryPolyline') {
                      defArr.push(this.queryIndividualLayer(grpLayers, layer, geometry))
                    }
                  }
                })
              } else if (layersArray.type === 'feature') {
                isLayerVisible = this.considerLayerVisibility(layersArray)
                if ((viewLayers.id === layer.jimuChildId) && isLayerVisible) {
                  if (layer.layerDefinition?.geometryType && layer.layerDefinition.geometryType === 'esriGeometryPolyline') {
                    defArr.push(this.queryIndividualLayer(viewLayers, layer, geometry))
                  }
                }
              }
            })
          }
        })
      })
    } else { //use configured line layers of selection
      if (this.props.config.configInfo[this.state.currentDatasource]?.profileSettings.layers.length > 0) {
        const layersCurrentConfig = this.props.config.configInfo[this.state.currentDatasource]?.profileSettings.layers
        dataSource?.forEach((layer) => {
          //selectable layers at runtime
          this.selectableLayersAtRuntime.forEach((selectableLayerId) => {
            if (selectableLayerId === layer.id) {
              layersArray.forEach((viewLayers) => {
                const layersArray: any = viewLayers
                if (layersArray.type === 'group') {
                  const grpLayer = layersArray.layers.toArray()
                  grpLayer.forEach((grpLayers) => {
                    isLayerVisible = this.considerLayerVisibility(grpLayers)
                    if ((grpLayers.id === layer.jimuChildId) && isLayerVisible) {
                      layersCurrentConfig.forEach((currentSetting) => {
                        if ((currentSetting.layerId === layer.id)) {
                          defArr.push(this.queryIndividualLayer(grpLayers, layer, geometry))
                        }
                      })
                    }
                  })
                } else if (layersArray.type === 'feature') {
                  isLayerVisible = this.considerLayerVisibility(layersArray)
                  if ((viewLayers.id === layer.jimuChildId) && isLayerVisible) {
                    layersCurrentConfig.forEach((currentSetting) => {
                      if ((currentSetting.layerId === layer.id)) {
                        defArr.push(this.queryIndividualLayer(viewLayers, layer, geometry))
                      }
                    })
                  }
                }
              })
            }
          })
        })
      }
    }
    return defArr
  }

  queryIndividualLayer = async (viewLayers, layer: any, selectedGeometry): Promise<any[]> => {
    let getLayer = null
    getLayer = this.mapView.view.map.findLayerById(viewLayers.id)
    const metersPerVSRForLayer = this.getMetersForVerticalSR(getLayer)
    const queryString = this.filterExistingFeatures(layer)
    const layerDefinition = viewLayers.definitionExpression
    const currentDateTime = Date.now() // To dirty the query string so that data will be fetched from server
    let lineLayerQuery = null
    lineLayerQuery = new Query()
    lineLayerQuery.geometry = selectedGeometry
    lineLayerQuery.returnGeometry = true
    lineLayerQuery.returnZ = true
    lineLayerQuery.outSpatialReference = this.state.jimuMapView.view.spatialReference
    lineLayerQuery.outFields = ['*']
    if (queryString) {
      if (layerDefinition) {
        lineLayerQuery.where = queryString + ' AND ' + layerDefinition + ' AND ' + currentDateTime + '=' + currentDateTime
      } else {
        lineLayerQuery.where = queryString + ' AND ' + currentDateTime + '=' + currentDateTime
      }
    } else if (layerDefinition) {
      lineLayerQuery.where = layerDefinition + ' AND ' + currentDateTime + '=' + currentDateTime
    } else {
      lineLayerQuery.where = currentDateTime + '=' + currentDateTime
    }
    let result = []
    try {
      await getLayer.queryFeatures(lineLayerQuery).then((results) => {
        if (results.features.length > 0) {
          results.features.forEach((feature) => {
            // Z value after queryFeatures are returned in SR of the map, only if layer don't have vertical SR
            // so in case when we have vertical SR for layer, convert the z values in map sr unit
            // multiply the value with metersPerSRForLayer will convert z value in meters
            // after that divide the value by metersPerSRForMap will give the value in mapSR unit
            if (metersPerVSRForLayer) {
              const metersPerSRForMap = unitUtils.getMetersPerUnitForSR(new SpatialReference(this.mapView.view.spatialReference.toJSON()))
              const eachGeometry = feature.geometry
              if (eachGeometry.paths.length > 0) {
                eachGeometry.paths.forEach((eachPath) => {
                  if (eachPath.length > 0) {
                    eachPath.forEach((eachPoint) => {
                      if (eachPoint.length > 1) {
                        eachPoint[2] = (eachPoint[2] * metersPerVSRForLayer) / metersPerSRForMap
                      }
                    })
                  }
                })
              }
            }
            feature.attributes.esriCTFeatureLayerId = layer.dataSourceJson.id
          })
        }
        result = results.features
      }, (err) => {
        console.log(err)
      })
    } catch (e) {
      result = []
    }
    return result
  }

  getMetersForVerticalSR = (layer) => {
    let metersPerSR = 1
    //get Units from VCS of layers source SR
    if (layer.sourceJSON?.sourceSpatialReference?.vcsWkid) {
      metersPerSR = unitUtils.getMetersPerVerticalUnitForSR(new SpatialReference({ wkid: layer.sourceJSON.sourceSpatialReference.vcsWkid }))
    } else if (layer.sourceJSON?.sourceSpatialReference?.vcsWkt) {
      metersPerSR = unitUtils.getMetersPerVerticalUnitForSR(new SpatialReference({ wkid: layer.sourceJSON.sourceSpatialReference.vcsWkt }))
    } else {
      metersPerSR = null
    }
    return metersPerSR
  }

  filterExistingFeatures = (layer) => {
    let oIdQueryString = ''
    const oIdField = layer.layer.objectIdField
    //Get the collection of graphics from the respective layer
    const layerFeatureGraphics = this.drawingLayer.graphics.filter((graphic) => {
      if (graphic.attributes && Object.prototype.hasOwnProperty.call(graphic.attributes, 'esriCTFeatureLayerId') &&
        graphic.attributes.esriCTFeatureLayerId === layer.dataSourceJson.id) {
        return true
      } else {
        return false
      }
    })
    layerFeatureGraphics.forEach((graphic, index) => {
      if (Object.prototype.hasOwnProperty.call(graphic.attributes, 'esriCTFeatureLayerId') &&
        graphic.attributes.esriCTFeatureLayerId === layer.dataSourceJson.id) {
        if (index === layerFeatureGraphics.length - 1) {
          oIdQueryString += oIdField + ' <> ' +
            graphic.attributes[oIdField]
        } else {
          oIdQueryString += oIdField + ' <> ' +
            graphic.attributes[oIdField] + ' and '
        }
      }
    })
    return oIdQueryString
  }

  selectFeatureForProfiling = (feature) => {
    let addAtFirst = false
    let reverse = false
    const graphicsLength = this.drawingLayer.graphics.length
    //if any features is already added then check the new selected one should be added as the first or last in the layer
    if (graphicsLength > 0) {
      const firstGeometry: any = this.drawingLayer.graphics.getItemAt(0).geometry
      const lastGeometry: any = this.drawingLayer.graphics.getItemAt(graphicsLength - 1).geometry

      const oldStartPoint = firstGeometry.getPoint(0, 0)
      const oldEndPoint = lastGeometry.getPoint(0, lastGeometry.paths[0].length - 1)

      const newStartPoint = feature.geometry.getPoint(0, 0)
      const newEndPoint = feature.geometry.getPoint(0, feature.geometry.paths[0].length - 1)

      //Old Start is same as new Start
      if (geometryEngine.intersects(newStartPoint, oldStartPoint)) {
        addAtFirst = true
        reverse = true
        //Old Start is same as new End
      } else if (geometryEngine.intersects(newEndPoint, oldStartPoint)) {
        addAtFirst = true
        reverse = false
        // Old End is same as new End
      } else if (geometryEngine.intersects(newEndPoint, oldEndPoint)) {
        addAtFirst = false
        reverse = true
        // Old End is same as new Start
      } else if (geometryEngine.intersects(newStartPoint, oldEndPoint)) {
        addAtFirst = false
        reverse = false
      }
    }

    const color = new Color(this.state.graphicsHighlightColor)
    const rgbaColor = color.toRgba()
    // rgbaColor[3] = 0.5
    const polylineSymbol = {
      type: 'simple-line',
      color: rgbaColor,
      width: 5
    }
    const polylineGeometry: Polyline = feature.geometry
    //flip the polyline geometry direction to get proper sequence
    if (reverse) {
      const flippedPaths = []
      for (let j = polylineGeometry.paths.length - 1; j >= 0; j--) {
        const arr1 = []
        for (let i = polylineGeometry.paths[j].length - 1; i >= 0; i--) {
          arr1.push(polylineGeometry.paths[j][i])
        }
        flippedPaths.push(arr1)
      }
      polylineGeometry.paths = flippedPaths
    }
    //create new graphic with the newly selected geometry
    const polylineGraphic = new Graphic({
      geometry: polylineGeometry,
      attributes: feature.attributes,
      symbol: polylineSymbol
    })
    //On selecting new feature render the chart
    if (!this.state.addToSelectionTool) {
      this._activateAddToSelectionTool()
      this._defaultViewModel.input = polylineGraphic
    }

    if (addAtFirst) {
      this.drawingLayer.graphics.add(polylineGraphic, 0)
    } else {
      this.drawingLayer.graphics.add(polylineGraphic)
    }
    //remove previous possible selection and highlight the new nextPossible selection
    this.nextPossibleSelectionLayer.removeAll()
    setTimeout(() => {
      //render chart dynamically on select lines
      this.renderChartOnSelect()
      this.highlightNextPossibleSelection()
    }, 200)
  }

  //If selected feature have multiple paths then the distance calculations was getting impacted
  //Whenever new feature is selected create its data into on single path and then add in to drawing layer
  createSinglePathPolyline = (polylineGeometry: Polyline) => {
    const singlePath = []
    polylineGeometry.paths.forEach((eachPath) => {
      eachPath.forEach((eachPoint) => singlePath.push(eachPoint))
    })
    // create new merged polyline feature to generate ground profile
    const newPolyLine = new Polyline({
      hasZ: polylineGeometry.hasZ,
      spatialReference: polylineGeometry.spatialReference.toJSON()
    })
    newPolyLine.addPath(singlePath)
    return newPolyLine
  }

  renderChartOnSelect = () => {
    if (this.state.addToSelectionTool) {
      let graphic
      //If selected line features length is more than one then merge them and create one single polyline for generating profile
      //Make union of the selected features by merging points in each path of each feature in to a single path and create only one graphic with one path
      if (this.drawingLayer.graphics.length > 1) {
        // create new merged polyline feature to generate ground profile
        const newPolyLine = new Polyline({
          spatialReference: this.drawingLayer.graphics.getItemAt(0).geometry.spatialReference.toJSON()
        })
        let singlePath = []
        //get geometries of all selected/drawn features and merge to create single polyline with only one path
        //If any line have multiple path keep them as it is, dont merge multiple paths of single line, it will corrupt the geometry
        this.drawingLayer.graphics.forEach((eachFeature) => {
          const eachGeometry: Polyline = eachFeature.geometry as Polyline
          //if geometry have multiple paths then add those paths into new polyline directly
          //else add points in single path array
          if (eachGeometry.paths.length > 1) {
            eachGeometry.paths.forEach((eachPath) => {
              if (singlePath.length > 0) {
                eachPath.forEach((eachPoint) => singlePath.push(eachPoint))
                newPolyLine.addPath(singlePath)
                singlePath = []
              } else {
                newPolyLine.addPath(eachPath)
              }
            })
          } else {
            const newLinesPathLength = newPolyLine.paths.length
            if (newLinesPathLength > 0) {
              eachGeometry.paths.forEach((eachPath) => {
                eachPath.forEach((eachPoint) => newPolyLine.paths[newLinesPathLength - 1].push(eachPoint))
              })
            } else {
              eachGeometry.paths.forEach((eachPath) => {
                eachPath.forEach((eachPoint) => singlePath.push(eachPoint))
              })
            }
          }
        })
        if (singlePath.length > 0) {
          newPolyLine.addPath(singlePath)
        }
        graphic = new Graphic({
          geometry: newPolyLine
        })
      } else if (this.drawingLayer.graphics.length === 1) {
        graphic = this.drawingLayer.graphics.getItemAt(0)
      }
      this._defaultViewModel.input = graphic
    }
  }

  highlightNextPossibleSelection = () => {
    let firstPoint: Point, lastPoint: Point, firstGeometry, lastGeometry
    const graphicsLength = this.drawingLayer.graphics.length
    if (graphicsLength > 0) {
      firstGeometry = this.drawingLayer.graphics.getItemAt(0).geometry
      firstPoint = firstGeometry.getPoint(0, 0)
      let lastIdx = firstGeometry.paths[0].length - 1
      lastPoint = firstGeometry.getPoint(0, lastIdx)
      //if more than one graphics then use last point of the last graphics
      if (graphicsLength > 1) {
        lastGeometry = this.drawingLayer.graphics.getItemAt(graphicsLength - 1).geometry
        lastIdx = lastGeometry.paths[0].length - 1
        lastPoint = lastGeometry.getPoint(0, lastIdx)
      }
    }
    const fg = new Graphic({
      geometry: firstPoint
    })
    this.nextPossibleSelectionLayer.graphics.add(fg)
    const lg = new Graphic({
      geometry: lastPoint
    })
    this.nextPossibleSelectionLayer.graphics.add(lg)

    this.queryForNextPossibleSelection([firstPoint, lastPoint])
  }

  queryForNextPossibleSelection = (endPointsGeometry: Point[]) => {
    let defArrResult = []
    endPointsGeometry.forEach((point) => {
      defArrResult = defArrResult.concat(this.queryForIndividualLayers(this.state.jimuMapView.dataSourceId, this.pointToExtent(point)))
    })
    this.setState({
      loadingIndicator: true
    })
    Promise.all(defArrResult).then((results: any) => {
      this.setState({
        loadingIndicator: false
      })
      const nextSelectableFeatures = []
      //Merge all the arrays into a single array
      const combinedResults = results.flat()
      if (combinedResults?.length > 0) {
        combinedResults.forEach((feature) => {
          if (feature?.geometry?.paths?.length > 0) {
            const firstPoint = feature.geometry.getPoint(0, 0)
            const lastIdx = feature.geometry.paths[feature.geometry.paths.length - 1].length - 1
            const lastPoint = feature.geometry.getPoint(0, lastIdx)
            //need to check returned geometries end point is intersecting with one of the endpoint of already selected line
            //since the intersection query will return the lines intersecting in between to the endpoints.
            if ((firstPoint && geometryEngine.intersects(endPointsGeometry[0], firstPoint)) ||
              (lastPoint && geometryEngine.intersects(endPointsGeometry[0], lastPoint)) ||
              (firstPoint && geometryEngine.intersects(endPointsGeometry[1], firstPoint)) ||
              (lastPoint && geometryEngine.intersects(endPointsGeometry[1], lastPoint))) {
              const polylineSymbol = {
                type: 'simple-line',
                color: [252, 252, 3, 0.8],
                style: 'short-dot',
                width: this.state?.jimuMapView?.view?.type === '3d' ? 7 : 4
              }
              const polylineGraphic = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: polylineSymbol
              })
              nextSelectableFeatures.push(polylineGraphic)
            }
          }
        })
        if (nextSelectableFeatures && nextSelectableFeatures.length > 0) {
          this.nextPossibleSelectionLayer.graphics.addMany(nextSelectableFeatures)
        }
      }
      setTimeout(() => {
        this.updateStateCanAddToSelection()
      }, 200)
    }, (err) => {
      console.log(err)
      this.updateStateCanAddToSelection()
    })
  }

  updateStateCanAddToSelection = () => {
    //based on possible next selection show or hide the addToSelection tool
    const results = this.nextPossibleSelectionLayer.graphics.filter((graphic) => {
      return graphic.geometry.type === 'polyline'
    })
    let newState: boolean = false
    if (results.length > 0) {
      newState = true
    } else {
      if (this.newFeatureSelection) {
        this.setState({
          noGraphicAfterFirstSelection: true
        })
      } else {
        this.setState({
          noGraphicAfterFirstSelection: false
        })
      }
    }
    if (!newState) {
      this._deActivateAddToSelectionTool()
    }
  }

  _activateAddToSelectionTool = () => {
    if (!this.state.addToSelectionTool) {
      this.setState({
        addToSelectionTool: true,
        drawingOrSelectingComplete: false
      })
    }
    if (this.state.jimuMapView && this.state.jimuMapView.view) {
      this.state.jimuMapView.view.popup.autoOpenEnabled = false
    }
    this._displayAddToSelectionCursor()
    this.nextPossibleSelectionLayer?.set('visible', true)
  }

  _deActivateAddToSelectionTool = () => {
    if (this.state.addToSelectionTool) {
      this.setState({
        addToSelectionTool: false,
        drawingOrSelectingComplete: true
      })
    }
    if (this.state.jimuMapView && this.state.jimuMapView.view) {
      this.state.jimuMapView.view.popup.autoOpenEnabled = true
    }
    this._displayDefaultCursor()
    this.nextPossibleSelectionLayer?.set('visible', false)
  }

  _displayAddToSelectionCursor = () => {
    if (this.state.jimuMapView && this.state.jimuMapView.view) {
      if (this.state.jimuMapView.view && this.state.jimuMapView.view.container &&
        this.state.jimuMapView.view.container.style.cursor !== null) {
        this.state.jimuMapView.view.container.style.cursor = 'copy'
      }
    }
  }

  activateDrawOrSelectTool = () => {
    //Check for a valid sketch modal and then do the further processing
    if (this.state.currentSketchVM) {
      //Cancel sketchVM if newSelection or drawTool is active
      if (this.state.drawModeActive || this.state.selectModeActive) {
        this.state.currentSketchVM.cancel()
      }
      this.setState({
        drawingOrSelectingComplete: false,
        startChartRendering: false,
        viewModelErrorState: false
      }, () => {
        //Activate draw tool
        if (this.state.drawModeActive) {
          if (this._defaultViewModel) {
            this._defaultViewModel.start({ mode: 'sketch' })
          }
        }
        //Activate select tool
        if (this.state.selectModeActive) {
          this.state.currentSketchVM.create('point')
        }
      })
    }
  }

  destroyDrawingLayers = () => {
    if (this.drawingLayer) {
      this.drawingLayer.removeAll()
      this.drawingLayer.destroy()
    }
    if (this.nextPossibleSelectionLayer) {
      this.nextPossibleSelectionLayer.removeAll()
      this.nextPossibleSelectionLayer.destroy()
    }
    this.hideChartPosition()
  }

  _displayDefaultCursor = () => {
    if (this.state.jimuMapView && this.state.jimuMapView.view) {
      if (this.state.jimuMapView.view && this.state.jimuMapView.view.container &&
        this.state.jimuMapView.view.container.style.cursor !== null) {
        this.state.jimuMapView.view.container.style.cursor = null
      }
    }
  }

  pointToExtent = (point, pixelTolerance: number = 5): Extent => {
    //calculate map coords represented per pixel
    const viewExtentWidth: number = this.state.jimuMapView.view.extent.get('width')
    const viewWidth: number = this.state.jimuMapView.view.get('width')
    const pixelWidth = viewExtentWidth / viewWidth
    //calculate map coords for tolerance in pixel
    const toleranceInMapCoords: number = pixelTolerance * pixelWidth
    //calculate & return computed extent
    const areaExtent = {
      xmin: (point.x - toleranceInMapCoords),
      ymin: (point.y - toleranceInMapCoords),
      xmax: (point.x + toleranceInMapCoords),
      ymax: (point.y + toleranceInMapCoords),
      spatialReference: this.state.jimuMapView.view.spatialReference
    }
    return new Extent(areaExtent)
  }

  selectableLayersAvailableAtRuntime = (layers: string[]) => {
    this.selectableLayersAtRuntime = layers
  }

  onSelectButtonClicked = () => {
    this.setState({
      initialStage: false,
      resultStage: true,
      selectModeActive: true,
      drawModeActive: false
    }, () => {
      this.activateDrawOrSelectTool()
    })
  }

  onDrawButtonClicked = () => {
    this.setState({
      initialStage: false,
      resultStage: true,
      selectModeActive: false,
      drawModeActive: true
    }, () => {
      this.activateDrawOrSelectTool()
    })
  }

  onBackClick = () => {
    this.clearAll()
    this.setState({
      initialStage: true,
      startChartRendering: false,
      drawingOrSelectingComplete: false,
      resultStage: false,
      drawModeActive: false,
      selectModeActive: false
    })
  }

  clearAll = () => {
    if (this.state.drawModeActive || this.state.selectModeActive) {
      this.state.currentSketchVM?.cancel()
    }
    this._deActivateAddToSelectionTool()
    this.clearGraphics()
    this.clearChart()
    if (this._defaultViewModel) {
      this._defaultViewModel.clear()
    }
  }

  clearGraphics = () => {
    //remove drawn, chartPosition, selected and nextPossible selection graphics layer
    if (this.drawingLayer) {
      this.drawingLayer.removeAll()
    }
    if (this.nextPossibleSelectionLayer) {
      this.nextPossibleSelectionLayer.removeAll()
    }
    this.hideChartPosition()
  }

  clearChart = () => {
    //clear profile result, which will result in clearing the chart
    this.setState({
      profileResult: null,
      noFeaturesError: false
    })
  }

  activateToolForNewProfile = () => {
    //Clear all the previous chart and graphics and create New Profile
    this.clearAll()
    this.setState({
      initialStage: false,
      resultStage: true
    }, () => {
      this.activateDrawOrSelectTool()
    })
  }

  onDoneButtonCLicked = (): boolean => {
    let enableNewProfileOption: boolean = false
    this._defaultViewModel.stop()
    if (this._defaultViewModel.state === 'created' || this._defaultViewModel.state === 'selected') {
      enableNewProfileOption = true
    }
    if (enableNewProfileOption) {
      this.stopFurtherSelectingLines()
    } else {
      this.activateDrawOrSelectTool()
    }
    return enableNewProfileOption
  }

  stopFurtherSelectingLines = () => {
    this._deActivateAddToSelectionTool()
    if (this.nextPossibleSelectionLayer) {
      this.nextPossibleSelectionLayer.removeAll()
    }
  }

  highlightChartPosition = (x) => {
    if (this._defaultViewModel) {
      this._defaultViewModel.hoveredChartPosition = x
    }
  }

  hideChartPosition = () => {
    if (this._defaultViewModel) {
      this._defaultViewModel.hoveredChartPosition = null
    }
  }

  renderFrontLandingPage = () => {
    return (
      <div tabIndex={-1} className={'h-100 w-100 d-flex align-items-center mainSection'}>
        <div tabIndex={-1} className={'adjust-cards'}>
          <Card tabIndex={0} aria-label={this.nls('selectLinesDesc')} button data-testid='selectButton'
            className={classNames('front-cards mt-3 mb-3 shadow', this.state.currentDatasource === 'default' || this.state.lineLayersNotFound ? 'hidden' : 'front-section')}
            onClick={this.onSelectButtonClicked} onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                this.onSelectButtonClicked()
              }
            }}>
            <CardBody className={'w-100 h-100 p-3'}>
              <h5 className={'text-truncate'} style={{ textAlign: 'center' }}>{this.nls('selectLinesLabel')}</h5>
              <p title={this.nls('selectLinesDesc')} className={'m-3 userGuideInfo'}>
                {this.nls('selectLinesDesc')}
              </p>
              <div style={{ textAlign: 'center' }}>
                <Button role={'button'} aria-label={this.nls('selectButtonLabel')} title={this.nls('selectButtonLabel')}
                  size={'default'} type='secondary' className={'text-break'}>
                  {this.props.config.generalSettings?.buttonStyle === ButtonTriggerType.IconText &&
                    <React.Fragment>
                      <Icon size='12' icon={epIcon.selectIcon} />
                      {this.nls('selectButtonLabel')}
                    </React.Fragment>
                  }
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card tabIndex={0} aria-label={this.nls('drawProfileDesc')} button data-testid='drawButton'
            className={classNames('front-cards front-section mt-3 mb-3 shadow', this.state.currentDatasource === 'default' || this.state.lineLayersNotFound ? 'h-100 ' : '')}
            onClick={this.onDrawButtonClicked} onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                this.onDrawButtonClicked()
              }
            }}>
            <CardBody className={'w-100 h-100 p-3'}>
              <h5 className={'text-truncate'} style={{ textAlign: 'center' }}>{this.nls('drawProfileLabel')}</h5>
              <p title={this.nls('drawProfileDesc')} className={'m-3 userGuideInfo'}>
                {this.nls('drawProfileDesc')}
              </p>
              <div style={{ textAlign: 'center' }}>
                <Button role={'button'} aria-label={this.nls('drawButtonLabel')} title={this.nls('drawButtonLabel')}
                  size={'default'} type='secondary' className={'text-break'}>
                  {this.props.config.generalSettings?.buttonStyle === ButtonTriggerType.IconText &&
                    <React.Fragment>
                      <Icon size='12' icon={epIcon.drawIcon} />
                      {this.nls('drawButtonLabel')}
                    </React.Fragment>
                  }
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }

  resetToDefault = () => {
    if (this.state.drawModeActive || this.state.selectModeActive) {
      this.state.currentSketchVM?.cancel()
    }
    if (this._defaultViewModel) {
      this._defaultViewModel.clear()
    }
    this.clearGraphics()
    this._displayDefaultCursor()
  }

  render () {
    const frontPage = this.renderFrontLandingPage()
    let jmc
    const useMapWidget = this.props.useMapWidgetIds &&
                         this.props.useMapWidgetIds[0]
    // If the user has selected a map, include JimuMapViewComponent.
    if (this.props.config.useMapWidget) {
      if (Object.prototype.hasOwnProperty.call(this.props, 'useMapWidgetIds') &&
        this.props.useMapWidgetIds &&
        this.props.useMapWidgetIds.length === 1) {
        jmc = <JimuMapViewComponent
          useMapWidgetId={this.props.useMapWidgetIds[0]} onActiveViewChange={this.activeViewChangeHandler.bind(this)} />
      }
    }

    //If map widget is not available or deleted then widget should revert to placeholder instantly
    if (!useMapWidget) {
      this.resetToDefault()
      return (
        <WidgetPlaceholder
          icon={epIcon.elevationIcon} widgetId={this.props.id} data-testid={'widgetPlaceholder'}
          message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: this.nls('_widgetLabel') })}
        />
      )
    }
    return (
      <div css={getStyle(this.props.theme)} className='jimu-widget'>
        <div className='widget-elevation-profile'>
          {jmc}
          {this.state.initialStage &&
            frontPage
          }
          {this.state.resultStage &&
            <ResultPane
              theme={this.props.theme}
              intl={this.props.intl}
              widgetId={this.props.id}
              portalSelf={this.props.portalSelf}
              displayLoadingIndicator={this.state.loadingIndicator}
              activeDataSource={this.state.currentDatasource}
              commonDsGeneralSettings={this.props.config.generalSettings}
              defaultConfig={this.defaultConfig}
              activeDatasourceConfig={this.props.config.configInfo[this.state.currentDatasource]}
              profileResult={this.state.profileResult}
              selectMode={this.state.selectModeActive}
              drawMode={this.state.drawModeActive}
              drawingOrSelectingComplete={this.state.drawingOrSelectingComplete}
              isNewSegmentsForSelection={this.state.addToSelectionTool}
              noGraphicAfterFirstSelection={this.state.noGraphicAfterFirstSelection}
              chartRender={this.state.startChartRendering}
              chartColorRender={this.state.chartColorRender}
              noFeaturesFoundError={this.state.noFeaturesError}
              onNavBack={this.onBackClick}
              doneClick={this.onDoneButtonCLicked}
              activateDrawSelectToolForNewProfile={this.activateToolForNewProfile}
              selectabelLayersRuntime={this.selectableLayersAvailableAtRuntime}
              chartPosition={this.highlightChartPosition}
              hideChartPosition={this.hideChartPosition}
              drawingLayer={this.drawingLayer}
              jimuMapview={this.state.jimuMapView}
              viewModelErrorState={this.state.viewModelErrorState}
              profileErrorMsg={this.state.profileErrorMsg}
            />
          }
        </div >
      </div>
    )
  }
}
