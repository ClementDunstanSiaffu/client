import { DataRecord, IMFeatureLayerQueryParams, IntlShape, ImmutableArray } from 'jimu-core'
import { WebChartDataItem, WebChartSortOrderKinds } from 'jimu-ui/advanced/chart'
import { ColorMatches, ConfigFields } from '../../../../../../config'
import { ObjectIdField } from '../../../../../../constants'
import { getFieldSchema } from '../../../../../../utils/common'
import { parseOrderByField } from '../../../../../../utils/common/serial'
import { ByFieldSeriesX, ByFieldSeriesY } from 'jimu-ui/advanced/setting-components'

/**
 * Convert to formatted and coloring data for `by-field` mode.
 * In order for the series to know which data is to used in the global chart array (through valueY), need to convert the data,
 * transforming data into web chart data for `ByField` mode.
 *
 * In case of non-aggregated type bar chart, we rename the category names by adding a suffix, in order
 * to avoid multiple identical values (they are switched back to their original value when displayed).
 * @param record
 * @param query
 * @param dataSourceId
 */
export const convertFieldData = (
  record: DataRecord,
  query: IMFeatureLayerQueryParams,
  dataSourceId: string
): WebChartDataItem[] => {
  if (!record) return []
  const orderByFields = query?.orderByFields
  const outStatistics = query?.outStatistics
  const numericFields = outStatistics
    ?.map((statics) => statics.onStatisticField)
    ?.filter((field) => !!field)
  const x = ByFieldSeriesX
  const y = ByFieldSeriesY

  const data =
    numericFields?.asMutable()?.map((field, index) => {
      const value = record.getFieldValue(field)
      const item = {
        [ObjectIdField]: index,
        [x]: field,
        [y]: value ?? 0
      } as WebChartDataItem

      const alias = getFieldSchema(field, dataSourceId)?.alias ?? field
      if (alias !== field) {
        item[x] = alias
        item[x + '_original'] = field
      }
      return item
    }) ?? []

  sortWebChartData(data, orderByFields)

  return data
}

/**
 * Convert to formatted and coloring data for `by-group` mode.
 * @param records
 * @param x
 * @param intl
 */
export const convertGroupData = (
  records: DataRecord[],
  query: IMFeatureLayerQueryParams,
  intl: IntlShape
): any[] => {
  const result = []
  const x = query?.groupByFieldsForStatistics?.[0]
  records?.forEach((record) => {
    const data = record.getData()
    // Null category value will affect the calculation of value axis range,
    // and it will not be displayed on the chart by default, so we filter it out. #7607
    let item = { ...data }
    if (x && item[x] == null) return
    //Now only formatted the value of x
    item = formatFieldValue(item, record, x, intl)
    result.push(item)
  })
  return result
}

/**
 * Format the specific field value by its record.
 * @param item
 * @param record
 * @param field
 */
export const formatFieldValue = (
  item: WebChartDataItem,
  record: DataRecord,
  field: string,
  intl
) => {
  const xValue = record.getFieldValue(field)
  const xFormattedValue = record.getFormattedFieldValue(field, intl)
  if (xFormattedValue !== xValue) {
    item[field] = xFormattedValue
    item[field + '_original'] = xValue
  }
  return item
}

/**
 * Apple `colorMatch` to the data item.
 * @param field
 * @param item
 * @param colorMatches
 */
export const applyColorMatch = (
  item: WebChartDataItem,
  x: string,
  y: string,
  colorMatches: ColorMatches
): WebChartDataItem => {
  if (!colorMatches) return item

  const value = item?.[x] as string
  const original = item?.[x + '_original'] as string
  if (value != null) {
    const match = colorMatches[value] ?? colorMatches[original]
    if (match) {
      const _fillColor = match._fillColor
      const fillColor = `${ConfigFields.fillColor}_${y}`
      return {
        ...item,
        [fillColor]: _fillColor
      }
    } else {
      return item
    }
  }
  return item
}

/**
 * Sorting an array WebChartDataItem following the orderByFields instructions.
 * @param props
 */
export function sortWebChartData (
  data: WebChartDataItem[],
  orderByFields: ImmutableArray<string>,
  forceAscendingOrder: boolean = false
): void {
  if (data == null || orderByFields == null) return
  data.sort(
    (dataItemA: WebChartDataItem, dataItemB: WebChartDataItem): number => {
      // Default sort decision = 0 (equal values)
      let sortDecision = 0

      // Using all the fields from orderByFields to proceed to the comparison
      for (let idx = 0; idx < orderByFields.length; idx += 1) {
        //`orderByField` must has `ASC` or `DESC` in it, e.g. 'field ASC', 'field name DESC'
        const [field, sortOrder] = parseOrderByField(orderByFields[idx])

        const descOrder: boolean =
          sortOrder === WebChartSortOrderKinds.Descending &&
          !forceAscendingOrder
        /**
         * We set the sortDecision only if one of the values is greater than the other one.
         * Otherwise it continues to the next value in the `orderByFields` array.
         */
        const firstEntry = dataItemA[field]
        const secondEntry = dataItemB[field]

        // In case of string values, we perform a natural sort using the native `localeCompare`
        if (typeof firstEntry === 'string' && typeof secondEntry === 'string') {
          sortDecision = firstEntry.localeCompare(secondEntry, undefined, {
            numeric: true
          })
          if (descOrder) sortDecision *= -1
        } else if (firstEntry === undefined || firstEntry === null) {
          sortDecision = !descOrder ? 1 : -1
        } else if (secondEntry === undefined || secondEntry === null) {
          sortDecision = !descOrder ? -1 : 1
        } else if (firstEntry > secondEntry) {
          sortDecision = !descOrder ? 1 : -1
          break
        } else if (firstEntry < secondEntry) {
          sortDecision = !descOrder ? -1 : 1
          break
        }
      }

      return sortDecision
    }
  )
}
