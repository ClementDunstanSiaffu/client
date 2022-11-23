import { JimuFieldType } from 'jimu-core'
import { getSeriesType, WebMapWebChart, WebChartCurrentVersion, WebChartSeriesType } from 'jimu-ui/advanced/chart'
import { getFieldType } from '../../../../utils/common'
import { isSerialSeries } from '../../../../utils/default'

export interface SpecValidationStatus {
  valid: boolean
  warning?: string
  error?: string
}

const composeCheckFn = (...fns): (...args) => SpecValidationStatus => {
  return (...args) => {
    let status = { valid: true, error: '' }
    fns.some(fn => {
      status = fn(...args)
      return !status.valid
    })
    return status
  }
}

/**
 * Check if the version of `WebMapWebChart` is supported.
 * Note: The chart stored in webmap has the version, but there is no version on the chart of layer, so don't check it first.
 * @param WebMapWebChart
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkVersion = (WebMapWebChart: WebMapWebChart): SpecValidationStatus => {
  let valid = true
  let error = ''

  valid = WebMapWebChart.version === WebChartCurrentVersion
  if (!valid) {
    error = `Unsupported versions: ${WebMapWebChart.version}.`
  }
  return { valid, error }
}

/**
 * Check whether it is a supported series type.
 * @param series
 */
const checkSeriesType = (series: WebChartSeriesType[]): SpecValidationStatus => {
  let valid = true
  let error = ''
  const seriesType = getSeriesType(series)
  if (!seriesType) {
    valid = false
    error = 'Invalid series type'
  } else {
    const isSerial = isSerialSeries(seriesType)
    valid = isSerial || seriesType === 'scatterSeries' ||
      seriesType === 'pieSeries'
    if (!valid) {
      error = `Unsupported type: ${seriesType}.`
    }
  }
  return { valid, error }
}

/**
 * Check whether there are unsupported query properties in the series.
 * @param series
 */
const checkSeriesQuery = (series: WebChartSeriesType[]) => {
  let valid = true
  let error = ''
  const seriesType = getSeriesType(series)
  if (isSerialSeries(seriesType) || seriesType === 'pieSeries') {
    const query = series[0].query
    const noAggregation = query?.groupByFieldsForStatistics?.length && !query?.outStatistics?.length
    if (noAggregation) {
      valid = false
      error = 'No aggregation is not supported now.'
    } else {
      const statisticType = query?.outStatistics?.[0].statisticType
      if (statisticType === 'percentile_cont') {
        valid = false
        error = `Unsupported statistic type: ${statisticType}.`
      }
    }
  }
  return { valid, error }
}

/**
 * Check whether there are `date` related properties.
 * @param series
 */
const checkSeriesField = (series: WebChartSeriesType[], dataSourceId: string) => {
  let valid = true
  let error = ''
  const field = series[0]?.x
  const isDateField = getFieldType(field, dataSourceId) === JimuFieldType.Date
  if (isDateField) {
    valid = false
    error = 'Date field is not supported.'
  }
  return { valid, error }
}

/**
 * Check whether `split-by` is set.
 * @param series
 */
const checkSeriesWhere = (series: WebChartSeriesType[]) => {
  let valid = true
  let error = ''
  const where = series[0].query?.where
  const splited = where && where !== '1=1' && where.includes('=')
  if (splited) {
    valid = false
    error = `Check that there is where in the series: ${where}, split by field is not supported now`
  }

  return { valid, error }
}

/**
 * Check color type, `colorMatch` is not supported.
 * @param series
 */
const checkSeriesColorType = (series: WebChartSeriesType[]) => {
  let valid = true
  let warning = ''
  const colorType = series[0].colorType
  if (colorType !== 'singleColor') {
    valid = true
    warning = `Unsupported color type: ${colorType}, will fallback to "singleColor"`
  }

  return { valid, warning }
}

/**
 * Check if the `WebMapWebChart` is supported.
 * @param WebMapWebChart
 * @returns {SpecValidationStatus}
 */
const checkChartSpec = (WebMapWebChart: WebMapWebChart, dataSourceId?: string): SpecValidationStatus => {
  return composeCheckFn(checkSeriesType, checkSeriesField, checkSeriesWhere, checkSeriesQuery, checkSeriesColorType)(WebMapWebChart.series, dataSourceId)
}

export default checkChartSpec
