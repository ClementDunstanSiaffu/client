import convertRecordsToInlineDataForSerial from './serial'
import convertRecordsToInlineDataForPie from './pie'
import convertRecordsToInlineDataForScatter from './scatter'
import convertRecordsToInlineDataForHistogram from './histogram'
import { ChartTypes, InlineData, WebChartDataItem, WebChartDataTypes, WebChartSeries } from 'jimu-ui/advanced/chart'
import { DataRecord, IMFeatureLayerQueryParams, IntlShape } from 'jimu-core'
import { ColorMatches } from '../../../../../../config'
import { isSerialSeries } from '../../../../../../utils/default'

/**
 * In order for the series to know which data is to used for which series,
 * we should replace the default statistic field name by its value as defined in the series(serie.y)
 */
const convertRecordsToInlineData = (
  type: ChartTypes,
  records: DataRecord[],
  query: IMFeatureLayerQueryParams,
  colorMatches: ColorMatches,
  series: WebChartSeries[],
  dataSourceId: string,
  intl: IntlShape
): [InlineData<WebChartDataTypes>, WebChartDataItem[]] => {
  let rawData = null
  let inputData = null
  let processed = true
  if (isSerialSeries(type)) {
    rawData = convertRecordsToInlineDataForSerial(
      records,
      query,
      colorMatches,
      dataSourceId,
      intl
    ) ?? []
    inputData = { dataItems: rawData }
  } else if (type === 'pieSeries') {
    rawData = convertRecordsToInlineDataForPie(
      records,
      query,
      colorMatches,
      dataSourceId,
      intl
    ) ?? []
    inputData = rawData
  } else if (type === 'scatterSeries') {
    rawData = convertRecordsToInlineDataForScatter(records, query) ?? []
    inputData = { data: rawData }
    processed = false
  } else if (type === 'histogramSeries') {
    const data = convertRecordsToInlineDataForHistogram(records, series)
    rawData = data?.bins ?? []
    inputData = data
  }
  return [{ inputData, processed }, rawData]
}

export default convertRecordsToInlineData
