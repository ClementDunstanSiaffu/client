import { React, ImmutableObject, DataRecord, UseDataSource } from 'jimu-core'
import Chart from './with-feature-layer'
import { SourceStatus, OutputSourceManager } from '../data-source'
import { IWebChart } from '../../../../../config'
import { getRecordslimited } from '../../../utils'
import { hooks } from 'jimu-ui'
import { useChartRuntimeState } from '../../../state'
import { ChartElementLimit, getSeriesType } from 'jimu-ui/advanced/chart'
import convertChartDataToRecords from './convert-chart-data-to-records'

interface WebFeatureLayerChartPorps {
  className?: string
  useInlineData?: boolean
  widgetId: string
  webChart: ImmutableObject<IWebChart>
  outputDataSourceId: string
  chartLimits?: Partial<ChartElementLimit>
  useDataSource: ImmutableObject<UseDataSource>
  onStatusChange: (status: SourceStatus) => void
}

const WebFeatureLayerChart = (props: WebFeatureLayerChartPorps) => {
  const {
    className,
    widgetId,
    webChart,
    useDataSource,
    chartLimits,
    outputDataSourceId,
    onStatusChange
  } = props

  const type = getSeriesType(webChart?.series as any)
  const { outputDataSource } = useChartRuntimeState()
  const recordsLimited = getRecordslimited(webChart?.series)
  const [records, setRecords] = React.useState<DataRecord[]>()
  const [loadError, setLoadError] = React.useState(false)

  const handleDataProcessComplete = hooks.useEventCallback((e) => {
    const records = convertChartDataToRecords(type, e.detail, outputDataSource)
    setRecords(records)
  })

  return (
    <>
      <Chart
        className={className}
        widgetId={widgetId}
        webChart={webChart}
        chartLimits={chartLimits}
        useDataSource={useDataSource}
        onDataProcessComplete={handleDataProcessComplete}
        onDataProcessError={() => setLoadError(true)} />
      <OutputSourceManager
        widgetId={widgetId}
        loadError={loadError}
        records={records}
        recordsLimited={recordsLimited}
        dataSourceId={outputDataSourceId}
        onStatusChange={onStatusChange} />
    </>
  )
}

export default WebFeatureLayerChart
