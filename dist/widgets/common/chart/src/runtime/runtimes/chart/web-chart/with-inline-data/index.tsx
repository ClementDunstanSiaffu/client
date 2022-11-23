import { React, ImmutableObject, UseDataSource } from 'jimu-core'
import Chart from './with-inline-data'
import { IWebChart } from '../../../../../config'
import OriginDataSourceManager from '../data-source/original'
import { OutputSourceManager, SourceStatus, useFetchRecords } from '../data-source'
import { getRecordslimited } from '../../../utils'
import { getSourceRecords } from './utils'
import { useChartRuntimeState } from '../../../state'
import { ChartElementLimit, getSeriesType } from 'jimu-ui/advanced/chart'

interface WebInlineDataChartProps {
  className?: string
  useInlineData?: boolean
  widgetId: string
  webChart: ImmutableObject<IWebChart>
  outputDataSourceId: string
  chartLimits?: Partial<ChartElementLimit>
  useDataSource: ImmutableObject<UseDataSource>
  onStatusChange: (status: SourceStatus) => void
}

const WebInlineDataChart = (props: WebInlineDataChartProps) => {
  const {
    className,
    widgetId,
    webChart,
    outputDataSourceId,
    chartLimits,
    useDataSource,
    onStatusChange
  } = props

  const { dataSource: originDatasource, outputDataSource } = useChartRuntimeState()
  const type = getSeriesType(webChart.series as any)
  const query = webChart?.dataSource?.query
  const recordsLimited = getRecordslimited(webChart?.series)
  const [fetchVersion, setFetchVersion] = React.useState(0)

  const [records, loadError] = useFetchRecords(
    type,
    originDatasource,
    query,
    fetchVersion
  )

  const sourceRecords = React.useMemo(() => getSourceRecords(records, outputDataSource), [records, outputDataSource])

  return (
    <>
      <Chart
        className={className}
        widgetId={widgetId}
        webChart={webChart}
        chartLimits={chartLimits}
        records={sourceRecords}/>
      <OriginDataSourceManager
        widgetId={widgetId}
        useDataSource={useDataSource}
        onQueryRequired={() => setFetchVersion(v => v + 1)}
      />
      <OutputSourceManager
        widgetId={widgetId}
        loadError={loadError}
        records={sourceRecords}
        recordsLimited={recordsLimited}
        dataSourceId={outputDataSourceId}
        onStatusChange={onStatusChange} />
    </>
  )
}

export default WebInlineDataChart
