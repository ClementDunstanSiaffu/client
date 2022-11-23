import { React, ImmutableObject, UseDataSource, IMState, ReactRedux, DataSourceStatus, defaultMessages as jimucoreDefaultMessages, DataSourceManager } from 'jimu-core'
import { hooks, defaultMessages as jimuDefaultMessages } from 'jimu-ui'
import { IMConfig, IWebChart } from '../../config'
import Chart, { SourceStatus } from './chart'
import Placeholder, { getNotReadyTranslation, getWarningMessageTranslation } from './placeholder'
import defaultMessages from '../translations/default'
import { getTemplateType } from '../../utils/common'
import { styled } from 'jimu-theme'
import { isWebChartValid } from './utils'
import { ChartTypes, getSeriesType } from 'jimu-ui/advanced/chart'

interface ChartRuntimePorps {
  widgetId: string
  useDataSource: ImmutableObject<UseDataSource>
  config: IMConfig
  enableDataAction: boolean
  outputDataSourceId: string
}

const Root = styled.div((props: { background: string }) => `
  position: relative;
  background-color: ${props.background} !important;
  .arcgis-charts-modal-content, .arcgis-charts-ampopup-content, .arcgis-charts-modal-curtain, .arcgis-charts-ampopup-curtain {
    z-index: auto;
  }
`)

const useWarningMessage = (chartType: ChartTypes, webChartValid: boolean, useDataSource: ImmutableObject<UseDataSource>, sourceStatus: SourceStatus): ['basic' | 'tooltip', string] => {
  const [type, setType] = React.useState<'basic' | 'tooltip'>('tooltip')
  const [message, setMessage] = React.useState('')
  const originSourceStatus = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[useDataSource?.dataSourceId]?.status)
  const instanceStatus = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[useDataSource?.dataSourceId]?.instanceStatus)
  const translate = hooks.useTranslate(jimucoreDefaultMessages, jimuDefaultMessages, defaultMessages)

  React.useEffect(() => {
    setType(sourceStatus === 'exceed' ? 'basic' : 'tooltip')
    if (originSourceStatus === DataSourceStatus.NotReady && instanceStatus === DataSourceStatus.Created) {
      const dataSource = DataSourceManager.getInstance().getDataSource(useDataSource.dataSourceId)
      const translation = getNotReadyTranslation(useDataSource, dataSource)
      if (translation) {
        const message = translate(...translation)
        setMessage(message)
      }
    } else {
      if (!webChartValid) {
        setMessage('')
      } else {
        const translation = getWarningMessageTranslation(chartType, sourceStatus)
        if (translation) {
          const message = translate(translation)
          setMessage(message)
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originSourceStatus, instanceStatus, chartType, webChartValid, sourceStatus])

  return [type, message]
}

const useChartRendered = (dataSourceId: string, webChart: ImmutableObject<IWebChart>, sourceStatus: SourceStatus) => {
  const originSourceStatus = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[dataSourceId]?.status)

  const webChartValid = React.useMemo(() => isWebChartValid(webChart), [webChart])
  const renderChart = originSourceStatus !== DataSourceStatus.NotReady && webChartValid
  const showPlaceholder = React.useMemo(() => !renderChart || sourceStatus !== 'loaded', [renderChart, sourceStatus])
  return { webChartValid, renderChart, showPlaceholder }
}

const ChartRuntime = (props: ChartRuntimePorps) => {
  const { widgetId, useDataSource, config, enableDataAction, outputDataSourceId } = props
  const { tools, webChart, _templateType } = config
  const [sourceStatus, setSourceStatus] = React.useState<SourceStatus>('none')
  const { webChartValid, renderChart, showPlaceholder } = useChartRendered(useDataSource?.dataSourceId, webChart, sourceStatus)

  const type = getSeriesType(webChart?.series as any)
  const templateType = getTemplateType(webChart?.series)?.[1] || _templateType || 'column'
  const [messageType, message] = useWarningMessage(type, webChartValid, useDataSource, sourceStatus)

  return (
    <Root className='chart-runtime w-100 h-100' background={webChart?.background}>
      {showPlaceholder && (
        <Placeholder
          templateType={templateType}
          message={message}
          messageType={messageType}
          showMessage={!!message}
        />
      )}
      {renderChart && <Chart
        widgetId={widgetId}
        webChart={webChart}
        enableDataAction={enableDataAction}
        tools={tools}
        useDataSource={useDataSource}
        outputDataSourceId={outputDataSourceId}
        onStatusChange={setSourceStatus}
      />}
    </Root>
  )
}

export * from './state'
export { getRecordslimited } from './utils'
export default ChartRuntime
