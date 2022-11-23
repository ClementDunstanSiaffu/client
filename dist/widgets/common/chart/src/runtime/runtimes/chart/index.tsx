import { React, ImmutableObject, UseDataSource } from 'jimu-core'
import { getSeriesType } from 'jimu-ui/advanced/chart'
import { ChartTools, IWebChart } from '../../../config'
import { Tools } from './universal'
import WebChart from './web-chart'
import { styled } from 'jimu-theme'
import { SourceStatus } from './web-chart/data-source'

interface ChartPorps {
  widgetId: string
  webChart: ImmutableObject<IWebChart>
  tools: ImmutableObject<ChartTools>
  enableDataAction: boolean
  outputDataSourceId: string
  useDataSource: ImmutableObject<UseDataSource>
  onStatusChange: (status: SourceStatus) => void
}

const Root = styled.div((props: { showTools: boolean }) => {
  return `
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .chart-tool-bar {
        height: 38px;
      }
      .web-chart {
        height: ${props.showTools ? 'calc(100% - 38px)' : '100%'} !important;
      }
    `
})

const Chart = (props: ChartPorps) => {
  const {
    widgetId,
    tools,
    enableDataAction = true,
    webChart,
    outputDataSourceId,
    useDataSource,
    onStatusChange
  } = props

  const type = getSeriesType(webChart?.series as any)
  const showTools = tools?.cursorEnable || !!tools.filter || enableDataAction

  return (
    <Root showTools={showTools} className='chart'>
      {showTools && (
        <Tools
          type={type}
          tools={tools}
          widgetId={widgetId}
          enableDataAction={enableDataAction}
        />
      )}
      <WebChart
        widgetId={widgetId}
        type={type}
        useInlineData={type !== 'histogramSeries'}
        webChart={webChart}
        outputDataSourceId={outputDataSourceId}
        useDataSource={useDataSource}
        onStatusChange={onStatusChange}
      />
    </Root>
  )
}

export default Chart

export { type SourceStatus } from './web-chart/data-source'
