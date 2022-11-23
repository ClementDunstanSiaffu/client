import {
  React,
  ImmutableObject,
  classNames,
  UseDataSource
} from 'jimu-core'
import { IWebChart } from '../../../../config'
import { SourceStatus } from './data-source'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import WebFeatureLayerChart from './with-feature-layer'
import WebInlineDataChart from './with-inline-data'

interface WebChartProps {
  type: ChartTypes
  className?: string
  widgetId: string
  useInlineData: boolean
  webChart: ImmutableObject<IWebChart>
  outputDataSourceId: string
  useDataSource?: ImmutableObject<UseDataSource>
  onStatusChange: (status: SourceStatus) => void
}
const chartLimits = {
  maxBarUniqueSeriesCountTotal: 1000,
  maxBarTwoSeriesCountTotal: 1000,
  maxBarThreePlusSeriesCountTotal: 1000,
  maxPieChartSliceCountTotal: 300
}

function WebChart (props: WebChartProps): React.ReactElement {
  const { className, widgetId, type = 'barSeries', useInlineData, outputDataSourceId, useDataSource, webChart, onStatusChange } = props

  return (
    <>
      {useInlineData && (
        <WebInlineDataChart
          key={type}
          className={classNames(className, 'web-chart')}
          widgetId={widgetId}
          webChart={webChart}
          chartLimits={chartLimits}
          useDataSource={useDataSource}
          outputDataSourceId={outputDataSourceId}
          onStatusChange={onStatusChange} />
      )}
      {!useInlineData && (
        <WebFeatureLayerChart
          key={type}
          className={classNames(className, 'web-chart')}
          widgetId={widgetId}
          webChart={webChart}
          chartLimits={chartLimits}
          useDataSource={useDataSource}
          outputDataSourceId={outputDataSourceId}
          onStatusChange={onStatusChange} />
      )}
    </>
  )
}

export default WebChart
