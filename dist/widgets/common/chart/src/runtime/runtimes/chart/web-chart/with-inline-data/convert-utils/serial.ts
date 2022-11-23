import { DataRecord, IMFeatureLayerQueryParams, IntlShape } from 'jimu-core'
import { WebChartDataItem } from 'jimu-ui/advanced/chart'
import { CategoryType, ColorMatches } from '../../../../../../config'
import { getCategoryType } from '../../../../../../utils/common/serial'
import { convertGroupData, convertFieldData, applyColorMatch } from './common'
import { ByFieldSeriesX, ByFieldSeriesY } from '../../../../../../constants'

const convertRecordsToInlineData = (
  records: DataRecord[],
  query: IMFeatureLayerQueryParams,
  colorMatches: ColorMatches,
  dataSourceId: string,
  intl: IntlShape
): WebChartDataItem[] => {
  let items = []
  const categoryType = getCategoryType(query)
  if (categoryType === CategoryType.ByGroup) {
    items = convertGroupData(records, query, intl)
  } else if (categoryType === CategoryType.ByField) {
    items = convertFieldData(records?.[0], query, dataSourceId)
  }

  const x = categoryType === CategoryType.ByField ? ByFieldSeriesX : query?.groupByFieldsForStatistics?.[0]
  const y = categoryType === CategoryType.ByField ? ByFieldSeriesY : query?.outStatistics?.[0]?.outStatisticFieldName
  items = colorMatches ? items.map((item) => applyColorMatch(item, x, y, colorMatches)) : items
  return items
}

export default convertRecordsToInlineData
