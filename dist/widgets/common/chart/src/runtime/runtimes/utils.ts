import { React, DataSource, DataRecord, ReactRedux, IMState, ImmutableObject, IMFeatureLayerQueryParams } from 'jimu-core'
import { ChartTypes, getSeriesType } from 'jimu-ui/advanced/chart'
import { ChartDataSource, IWebChart } from '../../config'
import { MaxPieces, MaxSlices } from '../../constants'
import { isSerialSeries } from '../../utils/default'

export interface SourceRecords {
  version: number
  records: DataRecord[]
}

/**
 * Monitor and get the latest source records
 * @param dataSource
 */
export const useSourceRecords = (dataSource: DataSource): SourceRecords => {
  const dataSourceId = dataSource?.id
  const sourceVersion = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[dataSourceId]?.sourceVersion)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => {
    const records = dataSource?.getSourceRecords() ?? [] as DataRecord[]
    return { records, version: sourceVersion }
  }, [dataSource, sourceVersion])
}

/**
 * Get the limited records count.
 * @param series
 */
export const getRecordslimited = (series) => {
  const seriesLength = series?.length
  if (!seriesLength) return MaxPieces
  const type = getSeriesType(series)
  if (isSerialSeries(type)) {
    return MaxPieces / seriesLength
  } else if (type === 'pieSeries') {
    return MaxSlices
  }
}

/**
 * Check whether the query in chart data source is valid.
 * @param dataSource
 */
export const isValidQuery = (
  type: ChartTypes,
  query: IMFeatureLayerQueryParams
): boolean => {
  if (isSerialSeries(type) || type === 'pieSeries') {
    if (query.outFields) {
      return !!(query?.outFields?.[0] && query?.groupByFieldsForStatistics?.[0])
    } else {
      if (query?.groupByFieldsForStatistics) {
        return !!query?.groupByFieldsForStatistics?.[0] && !!query?.outStatistics?.[0]?.onStatisticField
      } else {
        return !!query?.outStatistics?.[0]?.onStatisticField
      }
    }
  } else if (type === 'scatterSeries') {
    return !!query?.outFields?.[1]
  } else if (type === 'histogramSeries') {
    return !!query?.outFields?.[0]
  }
}

/**
 * Check whether the chart data source is valid.
 * @param dataSource
 */
export const isValidIWebChartDataSource = (
  type: ChartTypes,
  dataSource: ImmutableObject<ChartDataSource>
): boolean => {
  return isValidQuery(type, dataSource?.query)
}

/**
 * Check whether the web chart config is valid.
 * @param webChart
 * @returns
 */
export const isWebChartValid = (webChart: ImmutableObject<IWebChart>): boolean => {
  const type = getSeriesType(webChart?.series as any)
  const sourceValid = isValidIWebChartDataSource(type, webChart?.dataSource)
  return sourceValid
}
