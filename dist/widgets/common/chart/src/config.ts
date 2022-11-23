import { FeatureLayerQueryParams, ImmutableObject, SqlExpression } from 'jimu-core'
import {
  WebChart as _WebChart,
  WebChartSeries as _WebChartSeries,
  WebChartConfigFields
} from 'jimu-ui/advanced/chart'

export type WebChartSeries = Omit<_WebChartSeries, 'query'> & {
  query?: FeatureLayerQueryParams
}

export type HistogramOverlaysType = 'mean' | 'median' | 'standardDeviation' | 'comparisonDistribution'

export const ConfigFields = {
  fillColor: '_fillColor'
}

export interface ColorMatch {
  _fillColor: any
}

export interface ColorMatches {
  [value: string]: ColorMatch
}

export interface ChartDataSource {
  query: FeatureLayerQueryParams
  colorMatch?: {
    configFields?: WebChartConfigFields
    colorMatches: ColorMatches
  }
}

export interface IWebChart extends Omit<_WebChart, 'dataSource' | 'background' | 'series'> {
  dataSource: ChartDataSource
  background?: string
  series: WebChartSeries[]
}

export enum CategoryType {
  ByGroup = 'BYGROUP',
  ByField = 'BYFIELD'
}

export interface ChartTools {
  filter?: SqlExpression
  cursorEnable?: boolean
}

export type ChartType = 'column' | 'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'histogram'

export type TemplateType = 'bar' | 'stacked-bar' | 'stacked100-bar'
| 'column' | 'stacked-column' | 'stacked100-column'
| 'line' | 'smooth-line'
| 'area' | 'smooth-area'
| 'pie' | 'donut'
| 'scatter'
| 'histogram'

export interface Config {
  //It is only used when configuring the app template
  _templateType?: TemplateType
  template: string
  webChart: IWebChart
  tools?: ChartTools
}

export type IMConfig = ImmutableObject<Config>
