import { FeatureLayerQueryParams } from 'jimu-core'
import { getSeriesType, WebMapWebChart, WebChartScatterPlotSeries, WebChartSeries } from 'jimu-ui/advanced/chart'
import { IWebChart } from '../../../../config'
import { getOutStatisticName } from '../../../../utils/common/serial'
import { isSerialSeries, getFillSymbol, getDefaultSeriesFillColor } from '../../../../utils/default'

/**
 * Normalize the statistic type `percentile_cont`, inject `statisticParameters` into `outStatistics`.
 * @param query
 */
const normalizePercentileCont = (query?: FeatureLayerQueryParams): FeatureLayerQueryParams => {
  if (!query?.outStatistics) return query
  query.outStatistics = query.outStatistics.map((outStatistic) => {
    if ((outStatistic.statisticType as any) === 'percentile_cont') {
      return {
        ...outStatistic,
        statisticParameters: { value: 0.5 }
      }
    } else {
      return outStatistic
    }
  })
  return query
}

/**
 * Function merging multiple `outStatistics` properties.
 * @param uniqueQuery
 * @param series
 */
const mergeOutStatistics = (uniqueQuery: FeatureLayerQueryParams, series: WebChartSeries[]): FeatureLayerQueryParams => {
  series.slice(1).forEach((serie) => {
    const outStatistics = (uniqueQuery.outStatistics ?? []).concat((serie.query?.outStatistics ?? []) as any)
    uniqueQuery = { ...uniqueQuery, outStatistics }
  })
  return normalizePercentileCont(uniqueQuery)
}

/**
 * Function building a unique query based on the chart series config.
 * Note: all queries have the same `groupByFieldsForStatistics`, so they can be combined into one query.
 */
const buildGroupStatUniqueQuery = (series: WebChartSeries[]): FeatureLayerQueryParams => {
  if (!series?.length) return null
  let uniqueQuery: FeatureLayerQueryParams = series[0].query as FeatureLayerQueryParams
  if (uniqueQuery.outStatistics?.length) {
    if (uniqueQuery?.groupByFieldsForStatistics?.length) {
      uniqueQuery = mergeOutStatistics(uniqueQuery, series)
    }
  } else {
    // For no-aggregation, set `outFields` to query.
    if (uniqueQuery?.groupByFieldsForStatistics?.length) {
      const outFields = buildOutFieldsQuery(series)
      uniqueQuery = { ...uniqueQuery, ...outFields }
    }
  }
  return uniqueQuery
}

/**
 * Function merging `outFields` to a unique query based on the chart series config.
 */
const buildOutFieldsQuery = (series: WebChartSeries[]): FeatureLayerQueryParams => {
  const outFields = []
  const x = series[0].x
  const y = (series[0] as any).y
  outFields.push(x)
  if (y) {
    outFields.push(y)
  }
  return { outFields }
}

const DefautSeriesFillColor = getDefaultSeriesFillColor()
/**
 * The colro type `colorMatch` is not supported, fallback to `singleColor`.
 * @param series
 */
const normalizeSeriesColorType = (series: WebChartSeries[]): WebChartSeries[] => {
  return series?.map((serie) => {
    let colorType = serie.colorType
    if (colorType !== 'singleColor') {
      // console.warn(`Unsupported color type: ${colorType}, fallback to "singleColor"`)
      colorType = 'singleColor'
      const seriesType = getSeriesType([serie])
      if (seriesType === 'scatterSeries') {
        serie = { ...serie, colorType } as any
      } else if (isSerialSeries(seriesType) || seriesType === 'pieSeries') {
        serie = { ...serie, colorType } as any
        if ((serie as any).fillSymbol && !(serie as any).fillSymbol.color) {
          const defaultFillSymbol = getFillSymbol(DefautSeriesFillColor, 0)
          const fillSymbol = {
            ...((serie as any).fillSymbol),
            ...defaultFillSymbol
          }
          serie = { ...serie, fillSymbol } as any
        }
      }
    }
    return serie
  })
}

/**
 * Ensure that the `outStatisticFieldName  is consistent with the `y` of the series.
 * @param series
 */
const normalizeGroupStateSeriesQuery = (series: WebChartSeries[]) => {
  return series.map((serie) => {
    const hasStatistics = serie.query?.outStatistics?.length
    if (!hasStatistics) return serie
    const y = (serie as any).y
    let query = serie.query
    const outStatisticFieldName = query?.outStatistics?.[0]?.outStatisticFieldName
    const orderByFields = query?.orderByFields?.map((orderByField) => {
      const field = orderByField.split(' ')?.[0]
      const order = orderByField.split(' ')?.[1] ?? 'ASC'
      if (field && field === outStatisticFieldName) {
        return `${y} ${order}`
      }
      return orderByField
    })
    const outStatistics = query?.outStatistics.map((outStatistic) => {
      return {
        ...outStatistic,
        outStatisticFieldName: y
      }
    })

    query = {
      ...query,
      orderByFields,
      outStatistics
    }

    serie = { ...serie, query }
    return serie
  })
}

/**
 * Ensure that the `id` and `y` of the series are consistent with the `onStatisticField` of the `query`.
 * @param series
 */
const normalizeGroupStateSeriesY = (series: WebChartSeries[]): WebChartSeries[] => {
  return series?.map((serie) => {
    const hasStatistics = serie.query?.outStatistics?.length
    if (!hasStatistics) return serie
    const numericField = serie.query?.outStatistics?.[0]?.onStatisticField
    const statisticType = serie.query?.outStatistics?.[0]?.statisticType as any
    const id = serie.id
    if (numericField && numericField !== id) {
      serie = { ...serie, id: numericField }
    }
    const y = getOutStatisticName(numericField, statisticType)
    if (y && y !== (serie as any).y) {
      serie = { ...serie, y } as any
    }
    return serie
  })
}

/**
 * Ensure that the `id` of the series are consistent with the `y` of the series for non-grouped statistics.
 * @param series
 */
const normalizeOutFieldsSeriesY = (series: WebChartSeries[]): WebChartSeries[] => {
  return series?.map((serie) => {
    const numericField = (serie as any).y
    if (!numericField) return serie

    const id = serie.id
    if (numericField && numericField !== id) {
      serie = { ...serie, id: numericField }
    }
    if (numericField && numericField !== (serie as any).y) {
      serie = { ...serie, y: numericField } as any
    }
    return serie
  })
}

/**
 * Normalize the `series` from mapviewer to the chart widget.
 * @param series
 * @returns
 */
const normalizeSeries = (series: WebChartSeries[]): [WebChartSeries[], FeatureLayerQueryParams] => {
  const seriesType = getSeriesType(series)
  let query = null
  if (isSerialSeries(seriesType) || seriesType === 'pieSeries') {
    series = normalizeGroupStateSeriesY(series)
    series = normalizeGroupStateSeriesQuery(series)
    series = normalizeSeriesColorType(series)
    query = buildGroupStatUniqueQuery(series)
  } else if (seriesType === 'scatterSeries') {
    series = normalizeOutFieldsSeriesY(series)
    series = normalizeSeriesColorType(series)
    query = buildOutFieldsQuery(series as WebChartScatterPlotSeries[])
  }

  series = series.map((serie) => {
    delete serie.query
    return serie
  })

  return [series, query]
}

/**
 * Normalize the webChart from mapviewer to the chart widget.
 * @param webChart
 * @returns {IWebChart}
 */
const normalizeChart = (webChart: WebMapWebChart): IWebChart => {
  const [series, query] = normalizeSeries(webChart.series)
  const dataSource = { query } as any

  return {
    ...webChart,
    series: series as any,
    dataSource
  } as unknown as IWebChart
}

export default normalizeChart
