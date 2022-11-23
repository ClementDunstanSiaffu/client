/** @jsx jsx */
import { React, IntlShape, jsx, getAppStore, ThemeVariables } from 'jimu-core'
import chartUtils from 'esri/widgets/support/chartUtils'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../translations/default'
import { defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { convertElevationsInfoArray, convertDistancesArray, convertSingle, niceScale } from '../../common/unit-conversion'
import { getAllLayersFromDataSource } from '../../common/utils'
import intl from 'esri/intl'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import lang from 'esri/core/lang'
import geometryEngineAsync from 'esri/geometry/geometryEngineAsync'
import Polyline from 'esri/geometry/Polyline'
import SpatialReference from 'esri/geometry/SpatialReference'
import unitUtils from 'esri/core/unitUtils'
import Graphic from 'esri/Graphic'

interface ChartParams {
  showGrid: boolean
  showTitleAxis: boolean
  container: HTMLElement
  isRTL: boolean
  isDarkTheme: boolean
  onCursorPositionChange?: (x: number, y: number) => void
  definition: any
  showLegend: boolean
}

interface Props {
  intl: IntlShape
  parentWidgetId: string
  commonGeneralSettings: any
  activeDs: string
  currentConfig: any
  theme: ThemeVariables
  selectedLinearUnit: string
  selectedElevationUnit: string
  profileResult: any
  unitOptions: any
  elevationGraphColor: string
  isFlip: boolean
  isUniformChartScalingEnable: boolean
  drawingLayer: GraphicsLayer
  mapView: JimuMapView
  highlightChartPositionOnMap: (props: any) => void
  hideChartPosition: () => void
  chartInfo: (chart: any) => void
  toggleLegendSeriesState: (hideSeries: boolean, seriesName: string) => void
}

interface IState {
  chartDefinition: any
  showLegend: boolean
}

export default class Chart extends React.PureComponent<Props, IState> {
  private readonly _chartContainer = React.createRef<HTMLDivElement>()
  private allDistances: number[]
  private readonly isRTL: boolean
  private chart
  private amchart4
  private xAxis: any
  private yAxis: any
  private chartSeries: any
  private accessChartParams: any
  private updatedProfileLayers: any
  private minMaxOfEachProfile: any
  private seriesKey: string[]
  private seriesValue: number[]
  constructor (props) {
    super(props)
    this.minMaxOfEachProfile = {}
    this.allDistances = []
    this.seriesKey = []
    this.seriesValue = []

    const appState = getAppStore().getState()
    this.isRTL = appState?.appContext?.isRTL
    this.chart = null
    this.amchart4 = null
    this.xAxis = null
    this.yAxis = null
    this.chartSeries = null
    this.accessChartParams = null
    this.updatedProfileLayers = this.props.currentConfig?.profileSettings.layers
    this.state = {
      chartDefinition: null,
      showLegend: this.props.commonGeneralSettings?.showLegend
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

  //update chart once any of the properties such as
  //linear unit, elevation unit or profile result has been change
  //This indicates that component needs to updated with latest props values
  componentDidUpdate = (prevProps) => {
    if ((prevProps.commonGeneralSettings?.showGridAxis !== this.props.commonGeneralSettings?.showGridAxis &&
      this.chart?.xAxes.values.length > 0 && this.chart.yAxes.values.length > 0) ||
      prevProps.elevationGraphColor !== this.props.elevationGraphColor) {
      if (this.chart) {
        this.xAxis.renderer.grid.template.disabled = !this.props.commonGeneralSettings?.showGridAxis
        this.yAxis.renderer.grid.template.disabled = !this.props.commonGeneralSettings?.showGridAxis

        const { am4core } = this.amchart4
        this.chartSeries.stroke = am4core.color(this.props.elevationGraphColor)
        this.chartSeries.fill = am4core.color(this.props.elevationGraphColor)
      }
      return
    }

    if (prevProps.commonGeneralSettings?.showLegend !== this.props.commonGeneralSettings?.showLegend ||
      prevProps.commonGeneralSettings?.showAxisTitles !== this.props.commonGeneralSettings?.showAxisTitles) {
      this.xAxis.title.visible = this.props.commonGeneralSettings?.showAxisTitles
      this.xAxis.title.textAlign = 'middle'
      this.yAxis.title.visible = this.props.commonGeneralSettings?.showAxisTitles
      this.yAxis.title.textAlign = 'middle'

      if (this.isRTL) {
        this.chart.padding(0, this.props.commonGeneralSettings?.showAxisTitles ? 5 : -10,
          (this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
            ? 4
            : (this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                ? -2
                : (!this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
                    ? 0
                    : (!this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                        ? -25
                        : 0,
          5)
      } else {
        this.chart.padding(0, 5,
          (this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
            ? 4
            : (this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                ? -2
                : (!this.props.commonGeneralSettings?.showAxisTitles && this.props.commonGeneralSettings?.showLegend)
                    ? 0
                    : (!this.props.commonGeneralSettings?.showAxisTitles && !this.props.commonGeneralSettings?.showLegend)
                        ? -25
                        : 0,
          this.props.commonGeneralSettings?.showAxisTitles ? 5 : -10)
      }
      //to position the axes labels properly in rtl and when chart flip occurs
      this.xAxis.invalidateLabels()
      this.yAxis.invalidateLabels()
      this.setState({
        showLegend: this.props.commonGeneralSettings?.showLegend
      }, () => {
        if (this.state.showLegend) {
          if (this.chart.legend) {
            this.chart.legend.visible = this.state.showLegend
          } else {
            this.displayChartLegend(this.accessChartParams)
          }
        } else {
          if (this.chart?.legend) {
            this.chart.legend.visible = this.state.showLegend
          }
        }
      })
      return
    }

    const profileSettingsChanged = this.didProfileLayersSettingsChanged(prevProps.currentConfig?.profileSettings.layers, this.props.currentConfig?.profileSettings.layers)

    if (profileSettingsChanged ||
      prevProps.selectedLinearUnit !== this.props.selectedLinearUnit ||
      prevProps.selectedElevationUnit !== this.props.selectedElevationUnit ||
      prevProps.profileResult !== this.props.profileResult ||
      prevProps.theme !== this.props.theme ||
      prevProps.isFlip !== this.props.isFlip ||
      prevProps.isUniformChartScalingEnable !== this.props.isUniformChartScalingEnable ||
      prevProps.currentConfig?.advanceOptions !== this.props.currentConfig?.advanceOptions) {
      //If theme is changed to/from dark theme,
      //we need to reCreate chart since when switching from dark to normal theme(or reverse) the already drawn chart is not removing dark theme labels
      if ((profileSettingsChanged ||
        prevProps.theme.darkTheme !== this.props.theme.darkTheme ||
        prevProps.theme.colors.palette.primary[600] !== this.props.theme.colors.palette.primary[600] ||
        prevProps.theme.typography.fontSizeRoot !== this.props.theme.typography.fontSizeRoot ||
        prevProps.currentConfig?.advanceOptions !== this.props.currentConfig?.advanceOptions) && this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.updatedProfileLayers = this.props.currentConfig?.profileSettings.layers
      this.createOrUpdateChartDefinition()
    }
  }

  didProfileLayersSettingsChanged = (prevSettings, newSettings) => {
    let isLayersSettingsChanged = false
    if (newSettings?.length !== prevSettings?.length) {
      return true
    }
    //eslint-disable-next-line
    newSettings?.some((newLayersSettings, index) => {
      if (newLayersSettings.style.lineType !== prevSettings[index].style.lineType ||
        newLayersSettings.style.lineColor !== prevSettings[index].style.lineColor ||
        newLayersSettings.style.lineThickness !== prevSettings[index].style.lineThickness ||
        newLayersSettings.elevationSettings.type !== prevSettings[index].elevationSettings.type ||
        newLayersSettings.elevationSettings.unit !== prevSettings[index].elevationSettings.unit ||
        newLayersSettings.elevationSettings.field1 !== prevSettings[index].elevationSettings.field1 ||
        newLayersSettings.elevationSettings.field2 !== prevSettings[index].elevationSettings.field2 ||
        newLayersSettings.distanceSettings.type !== prevSettings[index].distanceSettings.type ||
        newLayersSettings.distanceSettings.field !== prevSettings[index].distanceSettings.field ||
        newLayersSettings.distanceSettings.unit !== prevSettings[index].distanceSettings.unit) {
        isLayersSettingsChanged = true
        return true
      }
    })
    return isLayersSettingsChanged
  }

  createOrUpdateChartDefinition = () => {
    if (this.props.profileResult && this.props.profileResult.lines.length > 0 &&
      this.props.selectedLinearUnit && this.props.selectedElevationUnit && this.props.theme) {
      const profileOutput = this.props.profileResult.lines[0].samples
      if (profileOutput.length > 0) {
        const allElevations = []
        this.allDistances = []
        if (profileOutput.length > 0) {
          profileOutput.forEach((chartData, pointIndex) => {
            const elevationInfo = {
              x: convertSingle(chartData.distance, this.props.profileResult.effectiveUnits.distance, this.props.selectedLinearUnit),
              y: convertSingle(chartData.elevation, this.props.profileResult.effectiveUnits.elevation, this.props.selectedElevationUnit),
              pathIdx: 0,
              pointIdx: pointIndex
            }
            allElevations.push(elevationInfo)
            this.allDistances.push(chartData.distance)
          })

          //Reset the min,max for each profiles and series Key Value arrays, it will be again filled while creating data for profile lines
          this.minMaxOfEachProfile = {}
          this.seriesKey = []
          this.seriesValue = []
          //Creates data for each profile lines as the elevation and distance setting for each profile line
          this.createDataForProfileLines(allElevations).then((updatedData) => {
            //Create data for flipped chart
            const flippedData = []
            if (this.props.isFlip) {
              this.seriesKey.reverse()
              this.seriesValue.reverse()
              const reverseProfileOutput = [...profileOutput].reverse()
              allElevations.forEach((chartData, pointIndex) => {
                const yValue = convertSingle(reverseProfileOutput[pointIndex].elevation, this.props.profileResult.effectiveUnits.elevation, this.props.selectedElevationUnit)
                const elevationInfo = {
                  x: chartData.x,
                  y: yValue,
                  pathIdx: chartData.pathIdx,
                  pointIdx: chartData.pointIdx
                }
                elevationInfo[this.seriesKey[pointIndex]] = this.seriesValue[pointIndex]
                flippedData.push(elevationInfo)
              })
            }
            //get labels according to selected units
            const selectedUnits = this.getSelectedUnits()

            //Create x & y axis label for ground series
            const xAxisLabel = this.props.intl.formatMessage({
              id: 'graphDistanceLabel',
              defaultMessage: defaultMessages.graphDistanceLabel
            }, { unit: selectedUnits[0] })
            const yAxisLabel = this.props.intl.formatMessage({
              id: 'graphElevationLabel',
              defaultMessage: defaultMessages.graphElevationLabel
            }, { unit: selectedUnits[1] })

            const newChartDefinition = {
              data: this.props.isFlip ? flippedData : allElevations,
              series: [{
                x: {
                  field: 'x',
                  label: xAxisLabel
                },
                y: {
                  field: 'y',
                  label: yAxisLabel
                },
                color: this.props.elevationGraphColor
              }]
            }

            this.setState({
              chartDefinition: newChartDefinition
            }, () => {
              if (this.chart) {
                this.chart.data = this.props.isFlip ? flippedData : allElevations
                this.xAxis.title.text = xAxisLabel
                this.xAxis.title.textAlign = 'middle'
                this.yAxis.title.text = yAxisLabel
                this.yAxis.title.textAlign = 'middle'
                const { am4core } = this.amchart4
                this.chart.zoomOutButton.background.fill = am4core.color(this.props.theme.colors.palette.primary[600])
                if (this.chart.zoomOutButton.background.states.getKey('hover') && this.chart.zoomOutButton.background.states.getKey('down')) {
                  this.chart.zoomOutButton.background.states.getKey('hover').properties.fill = am4core.color(this.props.theme.colors.palette.primary[500])
                  this.chart.zoomOutButton.background.states.getKey('down').properties.fill = am4core.color(this.props.theme.colors.palette.primary[800])
                }
                this.xAxis.numberFormatter = this.makeFormatter(this.xAxis, selectedUnits[2])
                this.yAxis.numberFormatter = this.makeFormatter(this.yAxis, selectedUnits[3])
                //adjust axis range on data change
                this.adjustAxisRanges(this.accessChartParams)
                //to position and set the axes labels properly after changing of distance and elevation units
                this.xAxis.invalidateLabels()
                this.yAxis.invalidateLabels()
                return
              }
              this.createChart({
                definition: newChartDefinition,
                container: this._chartContainer.current,
                isRTL: this.isRTL,
                isDarkTheme: this.props.theme.darkTheme,
                showGrid: this.props.commonGeneralSettings?.showGridAxis,
                showTitleAxis: this.props.commonGeneralSettings?.showAxisTitles,
                showLegend: this.state.showLegend
              } as ChartParams)
            })
          })
        } else {
          //clears the chartDefinition and show error
          this.setState({
            chartDefinition: null
          }, () => {
            if (this.chart) {
              this.chart.dispose()
              this.chart = null
            }
          })
        }
      }
    } else {
      //clears the chart
      this.setState({
        chartDefinition: null
      })
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    }
  }

  checkForProfileSettings = () => {
    const uniqueSelectedProfileLines = []
    if (this.props.drawingLayer?.graphics?.length > 0 &&
      this.props.drawingLayer.graphics.getItemAt(0)?.attributes?.esriCTFeatureLayerId) {
      this.props.drawingLayer.graphics.forEach((a) => {
        const layerId = a.getAttribute('esriCTFeatureLayerId')
        if (!uniqueSelectedProfileLines.includes(layerId)) {
          uniqueSelectedProfileLines.push(layerId)
        }
      })
    }
    return uniqueSelectedProfileLines
  }

  getSelectedUnits = (): string[] => {
    const selectedLinearUnit = this.props.unitOptions.find(unit => unit.value === this.props.selectedLinearUnit)
    const selectedElevationUnit = this.props.unitOptions.find(unit => unit.value === this.props.selectedElevationUnit)
    const linearUnit = this.nls(selectedLinearUnit.value)
    const linearUnitAbbreviation = this.nls(selectedLinearUnit.abbreviation)
    const elevationUnit = this.nls(selectedElevationUnit.value)
    const elevationUnitAbbreviation = this.nls(selectedElevationUnit.abbreviation)
    return [linearUnit, elevationUnit, linearUnitAbbreviation, elevationUnitAbbreviation]
  }

  _updateProfileResults = (profileResults: any) => {
    const elevationProfileResults = {
      distances: {},
      elevations: {}
    }
    elevationProfileResults.distances = convertDistancesArray(profileResults.distances, profileResults.effectiveUnits.distance, this.props.selectedLinearUnit)
    elevationProfileResults.elevations = convertElevationsInfoArray(profileResults.elevations, profileResults.effectiveUnits.distance,
      profileResults.effectiveUnits.elevation, this.props.selectedLinearUnit, this.props.selectedElevationUnit)
    return elevationProfileResults
  }

  clearChart = () => {
    this.setState({
      chartDefinition: null
    })
  }

  getNearestElevationData = (chartObjectX: number) => {
    const allDistances = this.allDistances
    const needle = convertSingle(chartObjectX, this.props.selectedLinearUnit, this.props.profileResult.effectiveUnits.distance)
    const closest = allDistances.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a
    })
    if (closest >= 0) {
      const distanceIndex = (allDistances) ? allDistances.indexOf(closest) : -1
      if (distanceIndex >= 0) {
        const elevData = this.state.chartDefinition.data[distanceIndex]
        return elevData
      }
    }
    return null
  }

  getNearestFlippedElevationData = (chartObjectX: number) => {
    const allDistances = [...this.allDistances].reverse()
    const needle = convertSingle(chartObjectX, this.props.selectedLinearUnit, this.props.profileResult.effectiveUnits.distance)
    const closest = allDistances.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a
    })
    if (closest >= 0) {
      const distanceIndex = (allDistances) ? allDistances.indexOf(closest) : -1
      if (distanceIndex >= 0) {
        const elevData = this.state.chartDefinition.data[distanceIndex]
        return elevData
      }
    }
    return null
  }

  hideChartPosition = () => {
    this.props.hideChartPosition()
  }

  /**
  * Creates a new profile chart on the HTML element.
  */
  createChart = async (params: ChartParams): Promise<any> => {
    const amCharts4Index = await chartUtils.loadChartsModule()
    if (!amCharts4Index) {
      return
    }
    this.amchart4 = amCharts4Index

    const { am4core, am4charts } = amCharts4Index

    const isRTL = params.isRTL

    //Add animated theme to show animations
    am4core.useTheme(amCharts4Index.am4themes_animated)
    //if current theme is dark ass dark them to chart
    if (params.isDarkTheme) {
      am4core.useTheme(amCharts4Index.am4themes_dark)
    } else {
      am4core.unuseTheme(amCharts4Index.am4themes_dark)
    }

    //Create chart instance
    const chart = am4core.create(params.container, am4charts.XYChart)
    this.chart = chart
    if (isRTL) {
      chart.padding(0, params.showTitleAxis ? 5 : -10,
        (params.showTitleAxis && params.showLegend)
          ? 4
          : (params.showTitleAxis && !params.showLegend)
              ? -2
              : (!params.showTitleAxis && params.showLegend)
                  ? 0
                  : (!params.showTitleAxis && !params.showLegend)
                      ? -25
                      : 0,
        5)
    } else {
      chart.padding(0, 5,
        (params.showTitleAxis && params.showLegend)
          ? 4
          : (params.showTitleAxis && !params.showLegend)
              ? -2
              : (!params.showTitleAxis && params.showLegend)
                  ? 0
                  : (!params.showTitleAxis && !params.showLegend)
                      ? -25
                      : 0,
        params.showTitleAxis ? 5 : -10)
    }
    //Add data
    chart.data = params.definition.data

    //Use the configured graph color as a ground color for area chart
    const groundColor = params.definition.series[0]?.color ? params.definition.series[0].color : '#b54900'

    //color for zoom out button in themes
    chart.zoomOutButton.background.fill = am4core.color(this.props.theme.colors.palette.primary[600])
    if (chart.zoomOutButton.background.states.getKey('hover') && chart.zoomOutButton.background.states.getKey('down')) {
      chart.zoomOutButton.background.states.getKey('hover').properties.fill = am4core.color(this.props.theme.colors.palette.primary[500])
      chart.zoomOutButton.background.states.getKey('down').properties.fill = am4core.color(this.props.theme.colors.palette.primary[800])
    }

    //Set the zoomOut Button title so that it is translated in all supported languages by EXB
    chart.zoomOutButton.readerTitle = this.nls('zoomOut')

    //Create X and Y axis abbreviations
    const unitsAbbreviations = this.getSelectedUnits()

    //Create X and Y value axis
    const xAxis = chart.xAxes.push(new am4charts.ValueAxis())
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())

    this.accessChartParams = {
      params,
      am4charts,
      amCharts4Index,
      chart,
      xAxis,
      yAxis,
      unitsAbbreviations,
      groundColor,
      isRTL
    }

    this.configureXAxis(this.accessChartParams)
    this.configureYAxis(this.accessChartParams)
    this.configureTooltipCursorPosition(this.accessChartParams)
    this.addGroundSeries(this.accessChartParams)
    this.adjustAxisRanges(this.accessChartParams)
    this.hideLastGridLines(this.accessChartParams)
    this.profilingWithAdvanceOptions()

    if (this.state.showLegend) {
      //Set legend
      this.displayChartLegend(this.accessChartParams)
    }

    //Update chart for rtl
    if (isRTL) {
      chart.rtl = isRTL
      chart.zoomOutButton.align = 'left'
      chart.zoomOutButton.marginLeft = '5px'
      this.xAxis.renderer.inversed = isRTL
      this.xAxis.renderer.labels.template.textAlign = 'middle'
      this.yAxis.renderer.opposite = isRTL
      this.yAxis.renderer.labels.template.textAlign = 'middle'
    }
  }

  profilingWithAdvanceOptions = () => {
    if (this.props.currentConfig?.advanceOptions) {
      const uniqueProfileLayers = this.checkForProfileSettings()
      if (uniqueProfileLayers.length > 0) {
        uniqueProfileLayers.forEach((layerId) => {
          this.addLineSeries(layerId, this.accessChartParams)
        })
      }
    }
  }

  hideLastGridLines = (ctx) => {
    const { yAxis } = ctx
    const updateGridVisibility = (axis) => () => {
      axis.renderer.grid.each((g) => {
        g.visible = g.dataItem.label.dom.getAttribute('display') !== 'none'
      })
    }

    this.yAxis.events.on('rangechangeended', updateGridVisibility(yAxis))
    this.yAxis.events.on('validated', updateGridVisibility(yAxis))
  }

  adjustAxisRanges = (ctx) => {
    const { xAxis, yAxis } = ctx

    const { minX, maxX, minY, maxY } = this.getAdjustedBounds({
      data: this.props.profileResult,
      pixelWidth: xAxis.pixelWidth,
      pixelHeight: yAxis.pixelHeight
    })
    xAxis.min = minX
    xAxis.max = maxX
    yAxis.min = minY
    yAxis.max = maxY
  }

  getAdjustedBounds = ({ data, pixelWidth, pixelHeight }) => {
    const statistics = data.statistics
    const minX = 0
    //get min max from ground statistics
    let maxX = statistics.maxDistance
    maxX = convertSingle(maxX, data.effectiveUnits.distance, this.props.selectedLinearUnit)
    let minY = statistics.minElevation
    minY = convertSingle(minY, data.effectiveUnits.elevation, this.props.selectedElevationUnit)
    let maxY = statistics.maxElevation
    maxY = convertSingle(maxY, data.effectiveUnits.elevation, this.props.selectedElevationUnit)
    //calculate min max based on all the profiles
    for (const layerId in this.minMaxOfEachProfile) {
      if (this.minMaxOfEachProfile[layerId].max > maxY) {
        maxY = this.minMaxOfEachProfile[layerId].max
      }
      if (this.minMaxOfEachProfile[layerId].min < minY) {
        minY = this.minMaxOfEachProfile[layerId].min
      }
    }
    // Make sure our ranges are not too small.
    const rangeX = Math.max(maxX - minX, 0.001)
    let rangeY = Math.max(maxY - minY, 0.001)

    if (data.dynamicElevationRange) {
      // Convert to elevation units so that all values are compatible.
      const rangeXInElevationUnits = convertSingle(rangeY, this.props.selectedLinearUnit, this.props.selectedElevationUnit)
      // Make sure the Y axis is not too small in relation to the X axis.
      rangeY = Math.max(rangeY, rangeXInElevationUnits / 300)
    }

    // Apply some padding at the top and bottom so the chart lines don't align
    // with the axes.
    minY = minY - 0.02 * rangeY
    maxY = minY + rangeY + 0.02 * rangeY

    // Adjust the Y axis such that we obtain guides and labels at 'nice' locations.
    const yMinMax = niceScale(minY, maxY, 10)
    rangeY = yMinMax[1] - yMinMax[0]

    if (this.props.isUniformChartScalingEnable) { //if uniform scaling is true
      return this.getUniformBounds({
        bounds: { minX, maxX, minY, maxY },
        pixelWidth,
        pixelHeight,
        centered: true
      })
    }

    return {
      minX,
      maxX: minX + rangeX,
      minY,
      maxY: minY + rangeY
    }
  }

  getUniformBounds = ({ bounds, pixelWidth, pixelHeight, centered }) => {
    let { minX, maxX, minY, maxY } = bounds
    const rangeX = maxX - minX
    const rangeY = maxY - minY

    // Convert to distance units so that all values are compatible.
    const rangeYInDistanceUnits = convertSingle(rangeY, this.props.selectedElevationUnit, this.props.selectedLinearUnit)
    const unitsPerPixelX = rangeX / pixelWidth
    const unitsPerPixelY = rangeYInDistanceUnits / pixelHeight
    const scale = unitsPerPixelY / unitsPerPixelX

    if (scale >= 1) {
      // If the data would be stretched along the X axis, we grow the axis so that
      // the data keeps the right shape.
      [minX, maxX] = this.scaleRange([minX, maxX], scale, centered)
    } else {
      // When things would stretch past the right edge, we need to shrink the
      // Y axis instead to make everything fit.
      [minY, maxY] = this.scaleRange([minY, maxY], 1 / scale, centered)
    }
    return { minX, maxX, minY, maxY }
  }

  scaleRange = ([min, max]: [number, number], scale: number, centered: boolean): [number, number] => {
    const newRange = (max - min) * scale

    if (centered) {
      const center = (min + max) / 2
      const newMin = center - newRange / 2
      return [newMin, newMin + newRange]
    }
    return [min, min + newRange]
  }

  getFontSize = () => {
    const theme = this.props.theme
    let labelHeight = 9
    if (theme.typography.fontSizeRoot === '125%') {
      labelHeight = 11
    } else if (theme.typography.fontSizeRoot === '87.5%') {
      labelHeight = 8
    } else if (theme.typography.fontSizeRoot === '75%') {
      labelHeight = 7
    }
    return labelHeight
  }

  configureXAxis = (ctx) => {
    const { xAxis, params, unitsAbbreviations } = ctx
    const { am4core } = ctx.amCharts4Index
    const fontSize = this.getFontSize()
    //X axis title
    this.xAxis = xAxis
    xAxis.title.text = params.definition.series[0].x.label
    xAxis.title.textAlign = 'middle'
    xAxis.title.fontWeight = 400
    xAxis.title.fontSize = fontSize + 3
    xAxis.title.visible = params.showTitleAxis
    xAxis.cursorTooltipEnabled = true
    xAxis.extraTooltipPrecision = 2 //axis tooltip displays number upto 3 decimal places
    //Format the axis numbers
    xAxis.numberFormatter = this.makeFormatter(xAxis, unitsAbbreviations[2])
    xAxis.strictMinMax = true

    const xAxisLabelTemplate = xAxis.renderer.labels.template
    xAxisLabelTemplate.fontSize = fontSize
    xAxisLabelTemplate.fontWeight = '400'
    xAxisLabelTemplate.paddingTop = 6
    //Align labels to the left
    xAxisLabelTemplate.horizontalCenter = 'left'
    xAxisLabelTemplate.paddingLeft = 0
    //Axis renderer
    xAxis.renderer.line.visible = false
    xAxis.renderer.baseGrid.disabled = true
    xAxis.renderer.minGridDistance = 50
    xAxis.renderer.minLabelPosition = 0.05
    xAxis.renderer.maxLabelPosition = 0.95 // Hide the last label
    xAxis.renderer.fontWeight = 400
    xAxis.renderer.fontSize = fontSize
    //Enable/Disable grid for X axis
    xAxis.renderer.grid.template.disabled = !params.showGrid
    xAxis.renderer.grid.template.strokeOpacity = 0.1
    xAxis.renderer.grid.template.stroke = am4core.color('f4f4f4')
  }

  configureYAxis = (ctx) => {
    const { yAxis, params, unitsAbbreviations } = ctx
    const { am4core } = ctx.amCharts4Index
    const fontSize = this.getFontSize()
    //Format the axis numbers
    this.yAxis = yAxis
    //value axis title
    yAxis.title.text = params.definition.series[0].y.label
    yAxis.title.textAlign = 'middle'
    yAxis.title.fontWeight = 400
    yAxis.title.fontSize = fontSize + 3
    yAxis.title.paddingBottom = 6
    yAxis.title.visible = params.showTitleAxis
    yAxis.cursorTooltipEnabled = true
    yAxis.extraTooltipPrecision = 2 //axis tooltip displays number upto 3 decimal places
    yAxis.numberFormatter = this.makeFormatter(yAxis, unitsAbbreviations[3])
    yAxis.strictMinMax = true
    yAxis.baseValue = -500_000

    const yAxisLabelTemplate = yAxis.renderer.labels.template
    yAxisLabelTemplate.fontSize = fontSize
    yAxisLabelTemplate.fontWeight = '400'
    yAxisLabelTemplate.verticalCenter = 'bottom'
    yAxisLabelTemplate.paddingLeft = 4
    yAxisLabelTemplate.paddingBottom = 0
    yAxis.renderer.line.opacity = 0
    yAxis.renderer.line.visible = false
    yAxis.renderer.baseGrid.disabled = true
    yAxis.renderer.inside = true
    yAxis.renderer.minGridDistance = 30
    yAxis.renderer.minLabelPosition = 0
    yAxis.renderer.maxLabelPosition = 0.95 // Hide the last label
    yAxis.renderer.fontWeight = 400
    yAxis.renderer.fontSize = fontSize
    //Enable/Disable grid for value axis
    yAxis.renderer.grid.template.disabled = !params.showGrid
    yAxis.renderer.grid.template.strokeOpacity = 0.1
    yAxis.renderer.grid.template.stroke = am4core.color('f4f4f4')
  }

  configureTooltipCursorPosition = (ctx) => {
    const { xAxis, yAxis, chart } = ctx
    const { am4core } = ctx.amCharts4Index
    const fontSize = this.getFontSize()
    //Set styling for the series tooltip
    const tooltip = chart.tooltip
    tooltip.label.fontSize = fontSize + 3
    tooltip.label.padding(4, 4, 4, 4)
    tooltip.background.padding(0, 0, 0, 0)
    tooltip.background.cornerRadius = 0
    tooltip.background.stroke = null
    tooltip.background.fill = am4core.color(this.props.theme.colors.white)
    tooltip.label.fill = am4core.color(this.props.theme.colors.black)
    const cursor = new ctx.amCharts4Index.am4charts.XYCursor()
    cursor.trackable = true
    // Zooms horizontally and vertically when clicking and dragging in the chart.
    cursor.behavior = 'zoomXY'
    cursor.events.on('cursorpositionchanged', (ev) => {
      const normalizedPosition = xAxis.toAxisPosition(cursor.xPosition)
      const x = xAxis.positionToValue(normalizedPosition)
      //Get elevation data to current chart position
      const nearestElevationData = this.getNearestElevationData(x)
      if (nearestElevationData) {
        //Highlight the new position on map
        if (this.props.isFlip) {
          const fData = this.getNearestFlippedElevationData(x)
          if (fData) {
            this.props.highlightChartPositionOnMap(xAxis.valueToPosition(fData.x))
          }
        } else {
          this.props.highlightChartPositionOnMap(cursor.xPosition)
        }
        let maxY = null
        const yAxisHeight = yAxis.measuredHeight
        const yAxisY = yAxisHeight + chart.pixelPaddingTop

        //on cursor positioned get labels according to selected units
        const formattedY = this.yAxis.numberFormatter.format(nearestElevationData.y, 5)

        //Create tooltip html text
        let tooltipHTML = ''

        //Dont show chart tooltip if ground series is off
        if (!(this.chartSeries.isHiding || this.chartSeries.isHidden)) {
          maxY = nearestElevationData.y
          tooltipHTML += '<div style="display:inline-block; margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + this.chartSeries.stroke.hex + ';"></div> ' + this.chartSeries.name + ':  <b>' + formattedY + '</b> <br/>'
        }

        //get series info at the current point
        const seriesID = this.seriesKey && this.seriesKey[nearestElevationData.pointIdx] ? this.seriesKey[nearestElevationData.pointIdx] : null
        this.chart?.series?.values.forEach((series) => {
          //show series tooltip only if it is shown on chart
          if (series.dataFields.valueY === seriesID && !(series.isHiding || series.isHidden)) {
            const formattedSeriesY = this.yAxis.numberFormatter.format(nearestElevationData[seriesID], 5)
            if (maxY === null || maxY < nearestElevationData[seriesID]) {
              maxY = nearestElevationData[seriesID]
            }
            tooltipHTML += '<div style="display:inline-block; margin: 3px 0px 3px 0px; height: 2px; width:15px; background-color:' + series.stroke.hex + ';"></div> ' + series.name + ':  <b>' + formattedSeriesY + '</b> <br/>'
            return true
          }
        })
        if (tooltipHTML !== '' && this.yAxis.min <= maxY) {
          chart.tooltip.html = tooltipHTML
          //show the tooltip at the x and yMax (max elevation between ground and other line series)
          const chartPositionPoint = {
            x: cursor.point.x + cursor.parent.pixelX + chart.pixelPaddingLeft,
            y: yAxisY - yAxis.valueToPosition(maxY) * yAxisHeight - 1
          }
          chart.tooltip.pointTo(chartPositionPoint, true)
          chart.tooltip.show()
        }
      }
    })

    chart.events.on('out', () => {
      chart.tooltip.hide()
      this.hideChartPosition()
    })
    chart.cursor = cursor
  }

  addGroundSeries = (ctx) => {
    const { chart, groundColor, am4charts } = ctx
    const { am4core } = ctx.amCharts4Index
    //Create Area series
    const areaSeries = chart.series.push(new am4charts.LineSeries())
    this.chartSeries = areaSeries
    this.props.chartInfo(this.chart)
    areaSeries.dataFields.valueY = 'y'
    areaSeries.dataFields.valueX = 'x'
    areaSeries.name = this.nls('groundElevation')
    areaSeries.stroke = am4core.color(groundColor)
    areaSeries.fill = am4core.color(groundColor)
    areaSeries.strokeWidth = 1.5
    areaSeries.fillOpacity = 0.1
  }

  createDataForProfileLines = async (chartData): Promise<any> => {
    const allPromises = []
    if (this.props.currentConfig?.advanceOptions) {
      const uniqueProfileLayers = this.checkForProfileSettings()
      if (uniqueProfileLayers.length > 0) {
        const promise = new Promise<any>((resolve, reject) => {
          this.getDistanceOfAllSelectedFeatures().then((featuresDistances) => {
            uniqueProfileLayers.forEach((layerId) => {
              let currentTotalDistance = 0
              this.props.drawingLayer.graphics.forEach(async (selectedFeature, index) => {
                const selectedLayerId = selectedFeature.attributes.esriCTFeatureLayerId
                const config = this.getConfiguredSettingsForLine(selectedLayerId)
                if (config?.elevationSettings && selectedLayerId === layerId) {
                  const currentFeatureLength = featuresDistances[index]
                  const oldDistance = lang.clone(currentTotalDistance)
                  currentTotalDistance += currentFeatureLength
                  const nextDataToBeUpdated = chartData.filter((eachDataValue) => {
                    return eachDataValue.x >= oldDistance && eachDataValue.x <= currentTotalDistance
                  })
                  await allPromises.push(this.addElevationForSelectedFeature(config.elevationSettings, selectedFeature, currentFeatureLength, nextDataToBeUpdated, oldDistance))
                } else {
                  currentTotalDistance += featuresDistances[index]
                }
              })
            })
            Promise.all(allPromises).then(() => {
              resolve(chartData)
            }, () => {
              resolve(chartData)
            })
          })
        })
        return promise
      } else {
        return await Promise.resolve()
      }
    } else {
      return await Promise.resolve()
    }
  }

  getDistanceAsPerMapProjection = (geometry, unit): Promise<Number> => {
    const geodesicRequired = this.props.mapView.view.spatialReference.isWebMercator || this.props.mapView.view.spatialReference.isGeographic
    if (geodesicRequired) {
      return geometryEngineAsync.geodesicLength(geometry, unit)
    } else {
      return geometryEngineAsync.planarLength(geometry, unit)
    }
  }

  getConfiguredSettingsForLine = (selectedLayerId: string) => {
    return this.updatedProfileLayers.find((layer) => {
      return layer.layerId === selectedLayerId
    })
  }

  getDistanceAsPerConfiguredFieldAndUnits = (configuredDistanceSettings, selectedFeature: Graphic) => {
    const fieldValue = selectedFeature.attributes[configuredDistanceSettings.field]
    if (!isNaN(Number(fieldValue))) {
      return convertSingle(fieldValue, configuredDistanceSettings.unit, this.props.selectedLinearUnit)
    }
    return 0
  }

  updateMinMaxForProfile = (pointIndex: number, layerId: string, newValue: number) => {
    //store each key value for each point on ground related to which series
    //this is useful to flip the profile series
    this.seriesKey[pointIndex] = layerId + 'y'
    this.seriesValue[pointIndex] = newValue

    if (!this.minMaxOfEachProfile[layerId]) {
      this.minMaxOfEachProfile[layerId] = {
        min: newValue,
        max: newValue
      }
    } else if (this.minMaxOfEachProfile[layerId]) {
      if (this.minMaxOfEachProfile[layerId].min > newValue) {
        this.minMaxOfEachProfile[layerId].min = newValue
      }
      if (this.minMaxOfEachProfile[layerId].max < newValue) {
        this.minMaxOfEachProfile[layerId].max = newValue
      }
    }
  }

  addElevationForSelectedFeature = async (config, selectedFeature, currentFeatureLength, nextDataToBeUpdated, currentTotalDistance) => {
    const promise = new Promise<any>((resolve) => {
      let field1Value, field2Value
      const layerId = selectedFeature.attributes.esriCTFeatureLayerId
      if (config.type === 'one' && config.field1 && selectedFeature.attributes[config.field1] !== null) {
        field1Value = selectedFeature.attributes[config.field1]
        if (config.unit && config.unit !== this.props.selectedElevationUnit) {
          field1Value = convertSingle(field1Value, config.unit, this.props.selectedElevationUnit)
        }
        nextDataToBeUpdated.forEach(element => {
          element[layerId + 'y'] = field1Value
          this.updateMinMaxForProfile(element.pointIdx, layerId, field1Value)
        })
        resolve(true)
      } else if (config.type === 'two' && config.field1 && config.field2 &&
        selectedFeature.attributes[config.field1] !== null && selectedFeature.attributes[config.field2] !== null) {
        field1Value = selectedFeature.attributes[config.field1]
        if (config.unit && config.unit !== this.props.selectedElevationUnit) {
          field1Value = convertSingle(field1Value, config.unit, this.props.selectedElevationUnit)
        }
        field2Value = selectedFeature.attributes[config.field2]
        if (config.unit && config.unit !== this.props.selectedElevationUnit) {
          field2Value = convertSingle(field2Value, config.unit, this.props.selectedElevationUnit)
        }
        const slope = (field2Value - field1Value) / currentFeatureLength
        nextDataToBeUpdated.forEach((element) => {
          let pointLengthFromStart = 0
          pointLengthFromStart = element.x - currentTotalDistance
          const elevationValue = field1Value + (slope * pointLengthFromStart)
          element[layerId + 'y'] = elevationValue
          this.updateMinMaxForProfile(element.pointIdx, layerId, elevationValue)
        })
        resolve(true)
      } else if (config.type === 'z' && selectedFeature.geometry.hasZ) {
        const currentGeometry = selectedFeature.geometry
        if (currentGeometry.paths?.length > 0) {
          const segments = []
          let segmentIndex = 0
          currentGeometry.paths.forEach((linePathVertex) => {
            // const linePathVertex = currentGeometry.paths[0]
            linePathVertex.forEach((point, index) => {
              if (index !== 0) {
                const paths = [
                  [
                    lang.clone(linePathVertex[index - 1]),
                    lang.clone(point)
                  ]
                ]
                segments[segmentIndex++] = new Polyline({
                  hasZ: currentGeometry.hasZ,
                  hasM: currentGeometry.hasM,
                  paths: paths,
                  spatialReference: currentGeometry.spatialReference.toJSON()
                })
              }
            })
          })
          const getDistancePromiseArray = []
          segments.forEach((eachSegment) => {
            getDistancePromiseArray.push(this.getDistanceAsPerMapProjection(eachSegment, this.props.selectedLinearUnit))
          })
          Promise.all(getDistancePromiseArray).then((segmentLengths) => {
            //since all the features now have z value in map SR, get metersPerSR for mapSR and multiple the z value with it to get the z in meters
            const metersPerSRForMap = unitUtils.getMetersPerUnitForSR(new SpatialReference(this.props.mapView.view.spatialReference.toJSON()))
            const unitForZ = 'meters' // since we are taking value meters per SR
            let totalSegLength = nextDataToBeUpdated[0]?.x
            const elevationInfo = this.props.drawingLayer.elevationInfo // get the elevation info applied to drawing layer to update the z-value
            segmentLengths.forEach((segmentLength, segmentIndex) => {
              const segStartZInMeters = segments[segmentIndex].paths[0][0][2] * metersPerSRForMap
              const segEndZInMeters = segments[segmentIndex].paths[0][1][2] * metersPerSRForMap
              const nextDataToBeUpdatedForSeg = nextDataToBeUpdated.filter((eachDataValue) => {
                return eachDataValue.x >= totalSegLength && eachDataValue.x <= totalSegLength + segmentLength
              })

              let segStartZ = convertSingle(segStartZInMeters, unitForZ, this.props.selectedElevationUnit)
              let segEndZ = convertSingle(segEndZInMeters, unitForZ, this.props.selectedElevationUnit)
              //In case of webScene we need to update the z based on the elevation info applied
              if (this.props.mapView.view.type === '3d' && elevationInfo && nextDataToBeUpdatedForSeg?.length > 0) {
                //add the starting point z and ending point z in case of relative to scene/ground modes
                if (elevationInfo.mode === 'relative-to-ground' || elevationInfo.mode === 'relative-to-scene') {
                  segStartZ += nextDataToBeUpdatedForSeg[0].y
                  segEndZ += nextDataToBeUpdatedForSeg[nextDataToBeUpdatedForSeg.length - 1].y
                }
              }

              const slope = (segEndZ - segStartZ) / segmentLength
              nextDataToBeUpdatedForSeg.forEach((element) => {
                if (!element[layerId + 'y']) {
                  let pointLengthFromStart = 0
                  pointLengthFromStart = element.x - totalSegLength
                  let elevationValue = segStartZ + (slope * pointLengthFromStart)
                  //in case of on-the-ground mode the layers should be shown same as ground z and it should ignore the z layer in the features
                  if (this.props.mapView.view.type === '3d' && elevationInfo?.mode === 'on-the-ground') {
                    elevationValue = element.y
                  }
                  element[layerId + 'y'] = elevationValue
                  this.updateMinMaxForProfile(element.pointIdx, layerId, elevationValue)
                }
              })
              totalSegLength += segmentLength
            })
            resolve(true)
          }, () => {
            resolve(true)
          })
        }
      } else if (config.type) {
        nextDataToBeUpdated.forEach(element => {
          element[layerId + 'y'] = element.y
          this.updateMinMaxForProfile(element.pointIdx, layerId, element.y)
        })
        resolve(true)
      }
    })
    return promise
  }

  getDistanceOfAllSelectedFeatures = (): Promise<any[]> => {
    const getDistancePromiseArray = []
    //As per ticket 252 - we will now only support distance as per map projection
    //so get the distance of each feature according to mapProjection
    this.props.drawingLayer.graphics.forEach((selectedFeature) => {
      getDistancePromiseArray.push(this.getDistanceAsPerMapProjection(selectedFeature.geometry, this.props.selectedLinearUnit))
    })
    return Promise.all(getDistancePromiseArray)
  }

  addLineSeries = (layerId: string, ctx) => {
    let configuredProfileSetting = null
    let lineSeriesName = ''
    const layersArray = this.props.mapView.view.map.layers.toArray()
    const dataSource: any = getAllLayersFromDataSource(this.props.activeDs)
    if (this.updatedProfileLayers.length > 0) {
      configuredProfileSetting = this.updatedProfileLayers.filter((layerSettings) => {
        return layerSettings.layerId === layerId
      })
      dataSource?.forEach((layer) => {
        layersArray.forEach((viewLayers) => {
          const layersArray: any = viewLayers
          if (layersArray.type === 'group') {
            const grpLayer = layersArray.layers.toArray()
            grpLayer.forEach((grpLayers) => {
              if (grpLayers.id === layer.jimuChildId) {
                configuredProfileSetting.forEach((currentSetting) => {
                  if ((currentSetting.layerId === layer.id)) {
                    lineSeriesName = grpLayers.title
                  }
                })
              }
            })
          } else if (layersArray.type === 'feature') {
            if (viewLayers.id === layer.jimuChildId) {
              configuredProfileSetting.forEach((currentSetting) => {
                if ((currentSetting.layerId === layer.id)) {
                  lineSeriesName = viewLayers.title
                }
              })
            }
          }
        })
      })
    }

    if (configuredProfileSetting?.length === 1) {
      const { chart, am4charts } = ctx
      const { am4core } = ctx.amCharts4Index
      //Create new line series
      const lineSeries = chart.series.push(new am4charts.LineSeries())
      lineSeries.dataFields.valueY = layerId + 'y'
      lineSeries.dataFields.valueX = 'x'
      lineSeries.name = lineSeriesName
      lineSeries.stroke = am4core.color(configuredProfileSetting[0].style.lineColor)
      lineSeries.strokeWidth = configuredProfileSetting[0].style.lineThickness
      lineSeries.connect = false
      if (configuredProfileSetting[0].style.lineType === 'dotted-line') {
        lineSeries.strokeDasharray = '2 , 4'
      } else if (configuredProfileSetting[0].style.lineType === 'dashed-line') {
        lineSeries.strokeDasharray = '8 , 4'
      }
    }
  }

  displayChartLegend = (ctx) => {
    const { chart, am4charts, isRTL } = ctx
    chart.legend = new am4charts.Legend()
    chart.legend.itemContainers.template.paddingTop = 5
    chart.legend.itemContainers.template.marginBottom = 0
    chart.legend.itemContainers.template.paddingBottom = 0
    chart.legend.position = 'bottom'
    chart.legend.contentAlign = isRTL ? 'right' : 'left'
    chart.legend.itemContainers.template.reverseOrder = isRTL
    const markerTemplate = chart.legend.markers.template
    markerTemplate.width = 15
    markerTemplate.height = 15

    //legend on off
    chart.legend.itemContainers.template.events.on('hit', (ev) => {
      this.props.toggleLegendSeriesState(ev.target.dataItem.dataContext.isHidden, ev.target.dataItem.dataContext.name)
    })
  }

  makeFormatter = (axes, abbreviation) => {
    const formatter = axes.numberFormatter.clone()
    formatter.format = (value: number | string, _format: unknown, precision: number = 2): string => {
      if (typeof value === 'string') {
        return ''
      }
      // Set only a maximum fraction digits and not a minimum because we
      // don't need to display the full precision for the axis labels.
      const formatted = intl.formatNumber(value, { maximumFractionDigits: precision })
      return `${formatted} ${abbreviation}`
    }
    return formatter
  }

  render () {
    return (<React.Fragment>
      {this.state && this.state.chartDefinition &&
        <div tabIndex={-1} className={'w-100 h-100 p-2'}>
          <div tabIndex={0} aria-label={this.nls('chartRender')} className={'w-100 h-100'} ref={this._chartContainer}></div>
        </div>
      }
    </React.Fragment>
    )
  }
}
