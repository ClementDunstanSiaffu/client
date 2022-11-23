import { FeatureLayerQueryParams, Immutable, ImmutableArray, ImmutableObject } from 'jimu-core'
import { isSerialSeries } from '../../../../../utils/default'
import { WebChartSeries } from '../../../../../config'
import { getSeriesType } from 'jimu-ui/advanced/chart'

const getSingleQueryForStat = (serie: ImmutableObject<WebChartSeries>, queries: ImmutableObject<FeatureLayerQueryParams>): ImmutableObject<WebChartSeries> => {
  const y = (serie as any).y
  const outStatistics = queries.outStatistics.filter((s) => s.outStatisticFieldName === y)
  const { groupByFieldsForStatistics, orderByFields } = queries
  const query = Immutable({ groupByFieldsForStatistics, outStatistics, orderByFields, where: '1=1' }) as any
  return serie.set('query', query)
}

const getSeriesWithQuery = (series: ImmutableArray<WebChartSeries>, query: ImmutableObject<FeatureLayerQueryParams>) => {
  let callback = null
  const type = getSeriesType(series as any)
  if (isSerialSeries(type) || type === 'pieSeries') {
    callback = getSingleQueryForStat
  }
  if (callback) {
    return series?.map((serie) => callback(serie, query))
  }
  return series
}

export default getSeriesWithQuery
