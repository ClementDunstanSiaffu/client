import {
  React,
  ImmutableObject,
  useIntl,
  UseDataSource,
  DataRecord,
  lodash
} from 'jimu-core'
import {
  Chart,
  ChartElementLimit,
  ChartInstance,
  getSeriesType,
  traverseConvertColor,
  WebChartDataSources,
  WebChartInlineDataSource,
  WebMapWebChart
} from 'jimu-ui/advanced/chart'
import { useChartRuntimeDispatch, useChartRuntimeState } from '../../../state'
import { IWebChart } from '../../../../../config'
import convertRecordsToInlineData from './convert-utils'
import useSelection from './use-selection'
import { useTheme } from 'jimu-theme'
import useDataVersion from './use-data-version'
import { hooks, defaultMessages as jimuUiMessages } from 'jimu-ui'
import defaultMessages from '../../../../translations/default'
import { getReadableSeriesName } from './utils'

interface WithInlineDataChartProps {
  className?: string
  widgetId: string
  dataSource?: WebChartDataSources
  webChart: ImmutableObject<IWebChart>
  chartLimits?: Partial<ChartElementLimit>
  useDataSource?: ImmutableObject<UseDataSource>
  records: DataRecord[]
}

const DefaultDataSource = {
  type: 'inline'
}

const background = [0, 0, 0, 0] as any

function WithInlineDataChart (
  props: WithInlineDataChartProps
): React.ReactElement {
  const { className, widgetId, webChart: propWebChart, records, chartLimits } = props
  const { dataSource: originDatasource, outputDataSource } = useChartRuntimeState()
  const dispatch = useChartRuntimeDispatch()

  const intl = useIntl()
  const theme = useTheme()
  const translate = hooks.useTranslate(defaultMessages, jimuUiMessages)

  const type = getSeriesType(propWebChart.series as any)
  const query = propWebChart?.dataSource?.query
  const propSeries = propWebChart?.series as any

  const configFields = propWebChart?.dataSource?.colorMatch?.configFields
  const propColorMatches = propWebChart?.dataSource?.colorMatch?.colorMatches
  /**
   * Traverses and converts all string colors to symbol colors
   * The chart component only supports symbol color formats, so we need to do color conversion
   */
  const colorMatches = React.useMemo(
    () =>
      propColorMatches && traverseConvertColor(
        lodash.cloneDeep(propColorMatches),
        theme,
        '_fillColor'
      ),
    [propColorMatches, theme]
  )
  const [inlineData, dataItems] = React.useMemo(
    () =>
      convertRecordsToInlineData(
        type,
        records,
        query,
        colorMatches,
        propSeries,
        originDatasource?.id,
        intl
      ),
    [type, records, query, colorMatches, propSeries, originDatasource?.id, intl]
  )

  const dataVersion = useDataVersion(records, colorMatches)

  const dataSource = React.useMemo(() => {
    return {
      ...DefaultDataSource,
      configFields,
      processed: inlineData?.processed ?? true
    } as unknown as WebChartInlineDataSource
  }, [inlineData?.processed, configFields])

  const id = widgetId + '-' + (propWebChart?.id ?? 'chart')

  const webMapWebChart = React.useMemo(
    () => {
      const series = getReadableSeriesName(propWebChart.series, query, translate)
      return propWebChart.without(
        'dataSource'
      ).set('id', id).set('background', background).set('series', series) as unknown as ImmutableObject<WebMapWebChart>
    }, [query, translate, propWebChart, id]
  )

  const hanldleCreated = React.useCallback(
    (chart: ChartInstance) => {
      dispatch({ type: 'SET_CHART', value: chart })
    },
    [dispatch]
  )

  const [selectionData, handleSelectionChange] = useSelection(
    widgetId,
    outputDataSource,
    dataItems
  )

  return (
    <Chart
      className={className}
      webMapWebChart={webMapWebChart}
      dataSource={dataSource}
      dataVersion={dataVersion}
      inlineData={inlineData}
      chartLimits={chartLimits}
      selectionData={selectionData}
      ref={hanldleCreated}
      arcgisChartsJSSelectionComplete={handleSelectionChange}
    />
  )
}

export default WithInlineDataChart
