import { BaseVersionManager, IMFeatureLayerQueryParams, Immutable, ImmutableArray } from 'jimu-core'
import { IMConfig, WebChartSeries } from './config'

/**
 * Function merging multiple `outStatistics` properties.
 * @param uniqueQuery
 * @param series
 */
const mergeOutStatistics = (uniqueQuery: IMFeatureLayerQueryParams, series: ImmutableArray<WebChartSeries>) => {
  series.slice(1).forEach((serie) => {
    const outStatistics = (uniqueQuery.outStatistics ?? []).concat(serie.query?.outStatistics ?? [])
    uniqueQuery = uniqueQuery.set('outStatistics', outStatistics)
  })
  return uniqueQuery
}

/**
 * Function building a unique query based on the chart series config.
 * Note: all queries have the same onStatisticsField, so they can be combined into one query.
 */
export const buildUniqueQuery = (series: ImmutableArray<WebChartSeries>): IMFeatureLayerQueryParams => {
  if (!series?.length) return null
  let uniqueQuery: IMFeatureLayerQueryParams = series[0].query
  if (!uniqueQuery.outStatistics?.length) return null
  if (uniqueQuery?.groupByFieldsForStatistics?.length) {
    uniqueQuery = mergeOutStatistics(uniqueQuery, series)
  }
  return uniqueQuery
}

/**
 * Use the numeric field as the id of the serie.
 */
export const setSeriesIdWithNumericField = (series: ImmutableArray<WebChartSeries>): ImmutableArray<WebChartSeries> => {
  return series?.map((serie) => {
    if (!serie.query?.groupByFieldsForStatistics?.length) {
      return serie
    } else {
      const numericField = serie.query?.outStatistics?.[0]?.onStatisticField
      const id = serie.id
      if (numericField && numericField !== id) {
        serie = Immutable.set(serie, 'id', numericField)
      }
      return serie
    }
  }) as unknown as ImmutableArray<WebChartSeries>
}

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.6.0',
    description: 'Rename `multipleBarType` to `stackedType`',
    upgrader: (oldConfig: IMConfig) => {
      if (!oldConfig) return oldConfig
      let series = oldConfig.webChart?.series
      if (!series?.length) return oldConfig
      series = series.map((serie) => {
        serie = (serie as any).set('stackedType', (serie as any).multipleBarType)
        serie = (serie as any).without('multipleBarType')
        return serie as unknown as WebChartSeries
      })
      const newConfig: IMConfig = oldConfig.setIn(['webChart', 'series'], series)
      return newConfig
    }
  }, {
    version: '1.7.0',
    description: 'Use the `numericField` as the `id` of serie, build the `query` in the `series` as a data source',
    upgrader: (oldConfig: IMConfig) => {
      if (!oldConfig) return oldConfig
      let series = oldConfig.webChart?.series
      if (!series?.length) return oldConfig
      series = setSeriesIdWithNumericField(series)
      const query = buildUniqueQuery(series)
      series = series.map(serie => Immutable.without(serie, 'query')) as unknown as ImmutableArray<WebChartSeries>
      const dataSource = { query }
      const newConfig: IMConfig = oldConfig.setIn(['webChart', 'series'], series)
        .setIn(['webChart', 'dataSource'], dataSource)
      return newConfig
    }
  }]
}

export const versionManager = new VersionManager()
