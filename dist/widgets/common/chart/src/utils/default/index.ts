import {
  ISimpleMarkerSymbol,
  IFont,
  ITextSymbol,
  ISimpleLineSymbol,
  ISimpleFillSymbol
} from '@esri/arcgis-rest-types'
import {
  IMFieldSchema,
  ImmutableArray,
  JimuFieldType,
  utils
} from 'jimu-core'
import { getTheme, getTheme2 } from 'jimu-theme'
import { utils as jimuUtils } from 'jimu-ui'
import {
  RESTSymbolType,
  RESTHorizontalAlignment,
  WebChartAxis,
  RESTSimpleMarkerSymbolStyle,
  WebChartTypes,
  getDefaultCategoryFormat,
  WebChartOverlay,
  RESTVerticalAlignment,
  WebChartLegendPositions,
  getSeriesType,
  RESTFontStyle,
  RESTFontWeight,
  RESTFontDecoration,
  RESTSimpleLineSymbolStyle,
  RESTSimpleFillSymbolStyle,
  WebChartText,
  WebChartColoringPatterns,
  WebChartStackedKinds,
  WebChartLegend,
  ScatterPlotOverlays,
  ChartTypes,
  HistogramOverlays,
  WebChartDataTransformations,
  WebChartGuide
} from 'jimu-ui/advanced/chart'

import { HistogramOverlaysType, WebChartSeries } from '../../config'

export const DefaultColor = 'var(--dark)'
export const DefaultTextColor = 'var(--dark)'
export const DefaultBgColor = 'var(--white)'
export const DefaultLineColor = 'var(--light-900)'
export const DefaultFillColor = 'var(--primary)'
export const DefaultTextSize = 14
export const DefaultCircleMarkerSize = 10
export const DefaultFontWeight = 400

// title
export const DefaultTitleColor = 'var(--black)'
export const DefaultTitleWeight = 500
export const DefaultTitleSize = 24

// footer
export const DefaultFooterSize = 14
export const DefaultFooterColor = 'var(--dark-800)'

// series
export const DefaultSeriesLabelSize = 10
export const DefaultValueLabelColor = 'var(--dark-600)'

// axes
export const DefaultAxisColor = 'var(--light-800)'
export const DefaultAxisLabelColor = 'var(--dark-500)'
export const DefaultAxisTitleColor = 'var(--dark-800)'
export const DefaultAxisTitleSize = 20
export const DefaultAxisLabelSize = 14

// guide
export const DefaultGuideFillColor = '#67b7dc'
export const DefaultGuideLineColor = '#67b7dc'
export const DefaultGuideLabelSize = 12

// legend
export const DefaultLegendTitleSize = 20
export const DefaultLegendLabelSize = 14
export const DefaultLegendTitleColor = 'var(--dark-800)'
export const DefaultLegendLabelColor = 'var(--dark-800)'
// grid
export const DefaultGridColor = 'var(--light-300)'
//color match
export const DefaultColorMatchOtherColor = '#D6D6D6'
//marker simbol
export const defaultMarkerSize = 20

export const getDefaultColor = (): string => {
  return DefaultColor
}

export const getDefaultTextColor = (): string => {
  return DefaultTextColor
}

export const getDefaultBgColor = (): string => {
  return DefaultBgColor
}

export const getDefaultTitleColor = (): string => {
  return DefaultTitleColor
}

export const getDefaultFooterColor = (): string => {
  return DefaultFooterColor
}

export const getDefaultAxisLabelColor = (): string => {
  return DefaultAxisLabelColor
}

export const getDefaultAxisTitleColor = (): string => {
  return DefaultAxisTitleColor
}

export const getDefaultLegendTitleColor = (): string => {
  return DefaultAxisTitleColor
}

export const getDefaultLegendLabelColor = (): string => {
  return DefaultAxisTitleColor
}

export const getDefaultValueLabelColor = (): string => {
  return DefaultValueLabelColor
}

export const getDefaultLineColor = () => {
  return DefaultLineColor
}

export const getDefaultAxisColor = (): string => {
  return DefaultAxisColor
}

export const getDefaultGridColor = (): string => {
  return DefaultGridColor
}

export const SeriesColors = [
  '#5E8FD0',
  '#77B484',
  '#DF6B35',
  '#DBCF4E',
  '#41546D',
  '#8257C2',
  '#D6558B'
]

export const DefaultSeriesOutlineColor = 'var(--light-900)'
export const DefaultPieSeriesOutlineColor = 'var(--light-100)'
export const DefaultScatterPlotTrandLineColor = SeriesColors[2]

const defaultHistomgramMeanColor = '#A6CEE3'
const defaultHistomgramMedianColor = '#33A02C'
const defaultHistomgramStdColor = '#B2DF8A'
const defaultHistomgramCodColor = '#E31A1C'

export const getDefaultHistomgramOverlayColor = (type: HistogramOverlaysType) => {
  if (type === 'mean') {
    return defaultHistomgramMeanColor
  } else if (type === 'median') {
    return defaultHistomgramMedianColor
  } else if (type === 'standardDeviation') {
    return defaultHistomgramStdColor
  } else if (type === 'comparisonDistribution') {
    return defaultHistomgramCodColor
  }
}

export const getDefaultSeriesOutlineColor = (type: ChartTypes = 'barSeries') => {
  if (isXYChart(type)) {
    return DefaultSeriesOutlineColor
  } else if (type === 'pieSeries') {
    return DefaultPieSeriesOutlineColor
  } else {
    return DefaultSeriesOutlineColor
  }
}

export const getDefaultSeriesFillColor = (): string => {
  return SeriesColors[0]
}

export const getDefaultNumberFormat = () => {
  return {
    type: WebChartTypes.NumberAxisFormat,
    intlOptions: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    }
  }
}

/**
 * Get series fill colors in order
 */
export const getSeriesFillColor = (index: number = 0): string => {
  const length = SeriesColors?.length ?? 0
  if (length < 0) return
  index = index % length
  if (index < 0) index = 0
  return SeriesColors[index]
}

export const DefaultFont: IFont = {
  family: 'Avenir Next',
  size: DefaultTextSize,
  style: RESTFontStyle.Normal,
  weight: RESTFontWeight.Normal,
  decoration: RESTFontDecoration.None
}

export const DefaultTextSymbol: ITextSymbol = {
  type: RESTSymbolType.TS,
  color: DefaultTextColor as any,
  font: DefaultFont,
  horizontalAlignment: RESTHorizontalAlignment.Center
}

export const DefaultLineSymbol: ISimpleLineSymbol = {
  type: RESTSymbolType.SLS,
  style: RESTSimpleLineSymbolStyle.Solid,
  color: DefaultLineColor as any,
  width: 1
}

export const DefaultFillSymbol: ISimpleFillSymbol = {
  type: RESTSymbolType.SFS,
  style: RESTSimpleFillSymbolStyle.Solid,
  color: DefaultFillColor as any,
  outline: DefaultLineSymbol
}

export const DefaultCircleMarkerSymbol: ISimpleMarkerSymbol = {
  type: RESTSymbolType.SMS,
  style: RESTSimpleMarkerSymbolStyle.Circle,
  color: DefaultFillColor as any,
  size: DefaultCircleMarkerSize,
  outline: DefaultLineSymbol
}

/**
 * Get all theme variables
 */
export const getThemeColorVariables = (): string[] => {
  const theme = window.jimuConfig.isBuilder ? getTheme2() : getTheme()
  const palette = theme.colors?.getPalette != null ? theme.colors.getPalette() : theme.colors?.palette

  const variables = []
  Object.keys(palette).forEach(name => {
    for (let i = 1; i <= 9; i++) {
      const shadeIndex = i * 100
      const value = jimuUtils.toColorVariable(name, shadeIndex)
      variables.push(value)
    }
  })

  return variables
}

/**
 * Generate a random theme color
 */
export const generateRandomThemeColor = (): string => {
  const varialbes = getThemeColorVariables()
  const length = varialbes.length
  const randomIndex = Math.floor(Math.random() * length)
  return varialbes[randomIndex]
}

export const getFont = (size = DefaultTextSize): IFont => {
  return {
    ...DefaultFont,
    size
  }
}

/**
 * Get the default text symbol
 * @param text
 * @param size
 */
export const getTextSymbol = (
  text = '',
  size = DefaultTextSize,
  color = DefaultTextColor as any
): ITextSymbol => {
  return {
    ...DefaultTextSymbol,
    text,
    color,
    font: getFont(size)
  }
}

/**
 * Get the default line symbol
 * @param useRandomColor Whether to randomly generate colors
 * @param width
 */
export const getLineSymbol = (
  width: number = 1,
  color = DefaultLineColor as any,
  style: RESTSimpleLineSymbolStyle = RESTSimpleLineSymbolStyle.Solid
): ISimpleLineSymbol => {
  return {
    ...DefaultLineSymbol,
    width,
    color,
    style
  }
}

/**
 * Get the default fill symbol.
 */
export const getFillSymbol = (
  color: string = DefaultColor,
  outlineWidth: number = 1,
  outlineColor = DefaultLineColor
): ISimpleFillSymbol => {
  return {
    ...DefaultFillSymbol,
    color: color as any,
    outline: getLineSymbol(outlineWidth, outlineColor)
  }
}

/**
 * Get the default circle marker symbol
 */
export const getCircleMarkerSymbol = (
  color: any = DefaultFillColor,
  outlineWidth: number = 0,
  markerSize: number = DefaultCircleMarkerSize
): ISimpleMarkerSymbol => {
  return {
    ...DefaultCircleMarkerSymbol,
    color,
    size: markerSize,
    outline: getLineSymbol(outlineWidth)
  }
}

export function getDefaultGuide (name: string, label: string = '', isHorizontal?: boolean): WebChartGuide {
  const horizontalAlignment = isHorizontal ? 'center' : 'right'
  const verticalAlignment = isHorizontal ? 'top' : 'middle'
  const labelText = getTextSymbol(label, DefaultGuideLabelSize, DefaultTextColor as any)
  labelText.horizontalAlignment = horizontalAlignment
  labelText.verticalAlignment = verticalAlignment

  return {
    type: WebChartTypes.Guide,
    start: undefined,
    style: getLineSymbol(2, DefaultGuideLineColor as any),
    name,
    label: labelText,
    visible: true,
    above: false
  }
}

export function getDefaultOverlay (color?: string): WebChartOverlay {
  return {
    type: WebChartTypes.Overlay,
    visible: false,
    created: false,
    symbol: getLineSymbol(1, color)
  }
}

export function getScatterPlotOverlays (
  color: any = SeriesColors[2],
  width: number = 3
): ScatterPlotOverlays {
  return {
    type: WebChartTypes.Overlays,
    trendLine: {
      type: WebChartTypes.Overlay,
      created: true,
      visible: true,
      symbol: {
        type: 'esriSLS',
        color,
        width
      }
    }
  }
}

/**
 * Generate a default chart text
 * @param visible
 */
export const getChartText = (
  text = '',
  visible: boolean = true,
  size?: number,
  color = DefaultTextColor as any
): WebChartText => {
  return {
    type: WebChartTypes.Text,
    visible,
    content: getTextSymbol(text, size, color)
  }
}

export const getCategoryAxis = (text = ''): WebChartAxis => {
  const title = getChartText(text, false, DefaultAxisTitleSize, DefaultAxisTitleColor)
  title.content.horizontalAlignment = RESTHorizontalAlignment.Center
  return {
    type: WebChartTypes.Axis,
    visible: true,
    title,
    labels: getChartText('', false, DefaultAxisLabelSize, DefaultAxisLabelColor),
    valueFormat: getDefaultCategoryFormat(),
    lineSymbol: getLineSymbol(1, DefaultAxisColor)
  }
}

export const getValueAxis = (
  text = '',
  isYAxis?: boolean
): WebChartAxis => {
  const title = getChartText(text, false, DefaultAxisTitleSize, DefaultAxisTitleColor)
  if (isYAxis) {
    title.content.horizontalAlignment = undefined
    title.content.verticalAlignment = RESTVerticalAlignment.Middle
    title.content.angle = 270
  } else {
    title.content.horizontalAlignment = RESTHorizontalAlignment.Center
  }
  return {
    type: WebChartTypes.Axis,
    visible: true,
    title,
    labels: getChartText('', false, DefaultAxisLabelSize, DefaultAxisLabelColor),
    valueFormat: getDefaultNumberFormat(),
    lineSymbol: getLineSymbol(1, DefaultAxisColor)
  }
}

/**
 * Returns default axes based on chart type as per the WebChart Specification
 * @param chartType The type of WebChart which is of type WebChartTypes.BarSeries | WebChartTypes.HistogramSeries | WebChartTypes.ScatterSeries
 *
 */
export function getDefaultAxes (
  chartType:
    typeof WebChartTypes.BarSeries
  | typeof WebChartTypes.LineSeries
  | typeof WebChartTypes.HistogramSeries
  | typeof WebChartTypes.ScatterSeries
): WebChartAxis[] {
  const defaultAxes: WebChartAxis[] = []
  const xAxisTitle = ''
  const yAxisTitle = ''
  const yAxis = getValueAxis(yAxisTitle, true)
  const defaultGridLine = getLineSymbol(
    1,
    DefaultGridColor,
    RESTSimpleLineSymbolStyle.Dash
  )
  switch (chartType) {
    case WebChartTypes.BarSeries: {
      // Setting Line Chart baseline to 0.
      yAxis.minimum = 0
      yAxis.grid = defaultGridLine
      defaultAxes.push(getCategoryAxis(xAxisTitle), yAxis)
      break
    }
    case WebChartTypes.LineSeries: {
      // Setting Bar Chart baseline to 0.
      yAxis.minimum = 0
      yAxis.grid = defaultGridLine
      defaultAxes.push(getCategoryAxis(xAxisTitle), yAxis)
      break
    }
    case WebChartTypes.ScatterSeries: {
      const xAxis = getValueAxis(xAxisTitle)
      xAxis.grid = defaultGridLine
      yAxis.grid = defaultGridLine
      defaultAxes.push(xAxis, yAxis)
      break
    }
    case WebChartTypes.HistogramSeries: {
      yAxis.grid = defaultGridLine
      defaultAxes.push(getValueAxis(xAxisTitle), yAxis)
      break
    }
    default:
      break
  }
  // TODO: once `getDefaultAxes` is only needed via `getDefaultBarChart` deep clone can be removed.
  return defaultAxes
}

/**
 * Returns a default BarChartSeries object as per the WebChart Specification
 */
export function getDefaultBarChartSeries (index: number = 0): WebChartSeries {
  const color = getSeriesFillColor(index)
  return {
    type: WebChartTypes.BarSeries,
    id: '',
    name: '',
    x: '',
    y: '',
    colorType: WebChartColoringPatterns.Single,
    stackedType: WebChartStackedKinds.Side,
    fillSymbol: getFillSymbol(color, 0),
    dataLabels: getChartText('', false, DefaultSeriesLabelSize, DefaultValueLabelColor),
    rotated: false
  } as WebChartSeries
}

/**
 * Returns a default LineChartSeries object as per the WebChart Specification
 */
export function getDefaultLineChartSeries (index: number = 0): WebChartSeries {
  const color = getSeriesFillColor(index)
  return {
    type: WebChartTypes.LineSeries,
    id: '',
    name: '',
    x: '',
    y: '',
    colorType: WebChartColoringPatterns.Single,
    stackedType: WebChartStackedKinds.Side,
    lineSymbol: getLineSymbol(2, color),
    dataLabels: getChartText('', false, DefaultSeriesLabelSize, DefaultValueLabelColor),
    rotated: false
  } as WebChartSeries
}

/**
 * Returns a default PieChartSeries object as per the WebChart Specification
 */
export function getDefaultPieChartSeries (): WebChartSeries {
  const color = getSeriesFillColor(0)
  return {
    type: WebChartTypes.PieSeries,
    colorType: WebChartColoringPatterns.Single,
    id: '',
    name: '',
    x: '',
    y: '',
    innerRadius: 0,
    startAngle: 0,
    endAngle: 360,
    displayNumericValueOnDataLabel: true,
    displayPercentageOnDataLabel: false,
    displayNumericValueOnTooltip: true,
    displayPercentageOnTooltip: true,
    dataLabelsOffset: 0,
    sliceGrouping: {
      percentageThreshold: 0,
      groupName: 'Other'
    },
    numericValueFormat: getDefaultNumberFormat(),
    percentValueFormat: getDefaultNumberFormat(),
    fillSymbol: getFillSymbol(color, 1, 'var(--light-100)'),
    dataLabels: getChartText('', false, DefaultSeriesLabelSize, DefaultValueLabelColor)
  } as WebChartSeries
}

/**
 * Returns a default ScatterPlotChartSeries object as per the WebChart Specification
 */
export function getDefaultScatterPlotChartSeries (): WebChartSeries {
  const color = getSeriesFillColor(0)
  return {
    type: WebChartTypes.ScatterSeries,
    colorType: WebChartColoringPatterns.Single,
    id: '',
    name: '',
    x: '',
    y: '',
    markerSymbol: getCircleMarkerSymbol(color, 0, defaultMarkerSize),
    overlays: getScatterPlotOverlays()
  } as WebChartSeries
}

/**
 * Returns a default HistogramChartSeries object as per the WebChart Specification
 */
export function getDefaultHistogramSeries (): WebChartSeries {
  const color = getSeriesFillColor(0)
  return {
    type: WebChartTypes.HistogramSeries,
    colorType: WebChartColoringPatterns.Single,
    id: '',
    name: '',
    x: '',
    binCount: 15,
    overlays: getDefaultHistogramOverlays(),
    dataTransformationType: WebChartDataTransformations.None,
    fillSymbol: getFillSymbol(color, 1, 'var(--light-100)'),
    dataLabels: getChartText('', false, DefaultSeriesLabelSize, DefaultValueLabelColor),
    rotated: false
  } as WebChartSeries
}

export function getDefaultHistogramOverlays (): HistogramOverlays {
  return {
    type: WebChartTypes.Overlays,
    mean: getDefaultOverlay(getDefaultHistomgramOverlayColor('mean')),
    median: getDefaultOverlay(getDefaultHistomgramOverlayColor('median')),
    standardDeviation: getDefaultOverlay(getDefaultHistomgramOverlayColor('standardDeviation')),
    comparisonDistribution: getDefaultOverlay(getDefaultHistomgramOverlayColor('comparisonDistribution'))
  }
}

export const getDefaultLegend = (visible = true): WebChartLegend => {
  return {
    type: WebChartTypes.Legend,
    visible,
    title: getChartText('', true, DefaultLegendTitleSize, DefaultLegendTitleColor),
    body: getTextSymbol('', DefaultLegendLabelSize, DefaultLegendLabelColor),
    position: WebChartLegendPositions.Right
  }
}

/**
 * Generate a `FormatOptions` of ac-spec by a field schema
 * @param fieldSchema
 * @param characterLimit
 */
export const getValueFormat = (
  fieldSchema: IMFieldSchema,
  characterLimit: number = 10
): any => {
  if (fieldSchema.type === JimuFieldType.Date) {
    const intlOptions = utils.getIntlOption(fieldSchema)
    return {
      type: 'date',
      intlOptions
    }
  } else if (fieldSchema.type === JimuFieldType.String) {
    return {
      type: 'category',
      characterLimit
    }
  } else if (fieldSchema.type === JimuFieldType.Number) {
    const intlOptions = utils.getIntlOption(fieldSchema)
    return {
      type: 'number',
      intlOptions
    }
  }
}

export const isSerialSeries = (
  value?: string | WebChartSeries[] | ImmutableArray<WebChartSeries>
): boolean => {
  if (value == null || (value as string) === '') return
  const seriesType = typeof value === 'string' ? value as ChartTypes : getSeriesType(value as any) as string
  return seriesType === WebChartTypes.BarSeries || seriesType === WebChartTypes.LineSeries
}

/**
 * Check if the chart is a XY chart.
 * @param series
 * @returns {boolean}
 */
export const isXYChart = (value: string | WebChartSeries[] | ImmutableArray<WebChartSeries>): boolean => {
  if (value == null || (value as string) === '') return false
  const seriesType = typeof value === 'string' ? value : getSeriesType(value as any) as string
  return seriesType === WebChartTypes.BarSeries || seriesType === WebChartTypes.LineSeries ||
    seriesType === WebChartTypes.ScatterSeries || seriesType === WebChartTypes.HistogramSeries
}
