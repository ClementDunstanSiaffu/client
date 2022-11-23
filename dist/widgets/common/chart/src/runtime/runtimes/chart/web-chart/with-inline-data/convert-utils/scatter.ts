import { DataRecord, IMFeatureLayerQueryParams } from 'jimu-core'
import { WebChartDataItem } from 'jimu-ui/advanced/chart'

const convertRecordsToInlineData = (
  records: DataRecord[],
  query: IMFeatureLayerQueryParams
): WebChartDataItem[] => {
  const result = []
  const x = query?.outFields?.[0]
  records?.forEach((record) => {
    const data = record.getData()
    // Null category value will affect the calculation of value axis range,
    // and it will not be displayed on the chart by default, so we filter it out. #7607
    const item = { ...data }
    if (x && item[x] == null) return
    result.push(item)
  })
  return result
}

export default convertRecordsToInlineData
