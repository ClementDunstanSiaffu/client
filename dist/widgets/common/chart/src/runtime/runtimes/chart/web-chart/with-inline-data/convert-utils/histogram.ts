import { DataRecord } from 'jimu-core'
import { processInlineHistogramRawData, WebChartHistogramDataItem, WebChartHistogramSeries, WebChartSeries } from 'jimu-ui/advanced/chart'

const getInlineHistogramData = (
  records: DataRecord[],
  series: WebChartSeries[]
) => {
  const rawData = records?.map((record) => record.getData())
  const transformed = processInlineHistogramRawData(
    rawData,
    series[0] as WebChartHistogramSeries
  )
  let statistic = null
  let bins = []
  if (transformed.valid) {
    const data = transformed.data as WebChartHistogramDataItem
    bins = data.bins
    const { mean, stddev, median, min, max } = data
    statistic = { mean, stddev, median, min, max }
  }
  return { statistic, bins }
}

const convertRecordsToInlineData = (
  records: DataRecord[],
  series: WebChartSeries[]
): WebChartHistogramDataItem => {
  const { statistic, bins } = getInlineHistogramData(records, series)
  if (!bins?.length) return
  const data = {
    ...statistic,
    bins
  }
  return data
}

export default convertRecordsToInlineData
