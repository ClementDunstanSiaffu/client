import {
  React,
  ReactRedux,
  DataSourceStatus,
  DataSourceManager,
  FeatureLayerDataSource,
  IMState,
  ImmutableObject,
  UseDataSource
} from 'jimu-core'
import { Chart, ChartElementLimit, ChartInstance, SelectionData, WebChartDataTypes, WebChartFeatureLayerDataSource, WebMapWebChart } from 'jimu-ui/advanced/chart'
import { useChartRuntimeDispatch } from '../../../state'
import { IFeatureLayer } from '@esri/arcgis-rest-types'
import { IWebChart } from '../../../../../config'
import getSeriesWithQuery from './get-series-with-query'
import useDataVersion from './use-data-version'

interface WithFeatureLayerChartProps {
  className?: string
  widgetId: string
  webChart: ImmutableObject<IWebChart>
  useDataSource?: ImmutableObject<UseDataSource>
  chartLimits?: Partial<ChartElementLimit>
  onDataProcessComplete?: (e: CustomEventInit<WebChartDataTypes>) => void
  onDataProcessError?: () => void
  onSelectionChange?: (e: CustomEventInit<SelectionData>) => void
}

const getFeatureLayerDatasource = (featureLayer): WebChartFeatureLayerDataSource => {
  return {
    type: 'featureLayer',
    featureLayer
  } as WebChartFeatureLayerDataSource
}

const useDataSourceLayer = (dataSourceId: string) => {
  const [layer, setLayer] = React.useState(null)
  const sourceStatus = ReactRedux.useSelector(
    (state: IMState) => state.dataSourcesInfo?.[dataSourceId]?.instanceStatus
  )
  React.useEffect(() => {
    if (sourceStatus !== DataSourceStatus.Created) return null
    const featureLayer = getFeatureLayer(dataSourceId)
    setLayer(featureLayer)
  }, [dataSourceId, sourceStatus])

  return layer
}

const getFeatureLayer = (dataSourceId: string): IFeatureLayer => {
  const dataSource = DataSourceManager.getInstance().getDataSource(
    dataSourceId
  ) as FeatureLayerDataSource
  const definition = dataSource.getLayerDefinition()
  if (!dataSource) {
    console.error(`No data source founded for id: ${dataSourceId}`)
    return
  }
  const layerDefinition = {
    id: definition.id,
    drawingInfo: definition.drawingInfo
  }
  const url = dataSource.url
  const layerType = 'ArcGISFeatureLayer'
  const id = ''
  return { id, url, layerType, layerDefinition } as IFeatureLayer
}

const background = [0, 0, 0, 0] as any

function WithFeatureLayerChart (props: WithFeatureLayerChartProps): React.ReactElement {
  const {
    className,
    widgetId,
    webChart: propWebChart,
    useDataSource,
    chartLimits,
    onDataProcessComplete,
    onDataProcessError
  } = props

  const id = widgetId + '-' + (propWebChart?.id ?? 'chart')
  const dispatch = useChartRuntimeDispatch()
  const dataSourceId = useDataSource?.dataSourceId
  const featureLayer = useDataSourceLayer(dataSourceId)

  const query = propWebChart.dataSource?.query
  const dataVersion = useDataVersion(propWebChart.series?.[0], query)

  const dataSource = React.useMemo(() => getFeatureLayerDatasource(featureLayer), [featureLayer])

  const webMapWebChart = React.useMemo(
    () => {
      const query = propWebChart.dataSource?.query
      const series = getSeriesWithQuery(propWebChart.series, query)
      return propWebChart.without('dataSource').set('series', series).set('id', id).set('background', background) as unknown as ImmutableObject<WebMapWebChart>
    }, [id, propWebChart]
  )
  const hanldleCreated = React.useCallback(
    (chart: ChartInstance) => {
      dispatch({ type: 'SET_CHART', value: chart })
    },
    [dispatch]
  )

  return (
    <Chart
      className={className}
      webMapWebChart={webMapWebChart}
      dataSource={dataSource}
      dataVersion={dataVersion}
      chartLimits={chartLimits}
      ref={hanldleCreated}
      arcgisChartsJSBadDataWarningRaise={onDataProcessError}
      arcgisChartsJSDataProcessComplete={onDataProcessComplete}
    />
  )
}

export default WithFeatureLayerChart
