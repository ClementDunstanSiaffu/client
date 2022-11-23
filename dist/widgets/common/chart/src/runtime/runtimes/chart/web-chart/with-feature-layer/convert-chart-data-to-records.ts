import { isSerialSeries } from '../../../../../utils/default'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import { ObjectIdField } from '../../../../../constants'

const createRecordsFromChartData = (data = [], dataSource) => {
  const records = data?.map((item, i) => {
    const feature = { attributes: null }
    const data = { ...item }
    data[ObjectIdField] = i
    feature.attributes = data
    return dataSource.buildRecord(feature)
  })

  return records
}

const getDataItems = (type: ChartTypes, detail) => {
  let items = []
  if (isSerialSeries(type)) {
    items = detail?.dataItems
  } else if (type === 'pieSeries') {
    items = detail
  } else if (type === 'scatterSeries') {
    items = detail?.data
  } else if (type === 'histogramSeries') {
    items = detail?.bins
  }
  return items
}

const convertChartDataToRecords = (type: ChartTypes, detail, dataSource) => {
  const items = getDataItems(type, detail)
  return createRecordsFromChartData(items, dataSource)
}

export default convertChartDataToRecords
