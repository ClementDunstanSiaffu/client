import { ImmutableArray, ImmutableObject } from 'jimu-core'
import { DataRecord, FeatureLayerQueryParams } from 'jimu-core/data-source'
import { getSeriesType } from 'jimu-ui/advanced/chart'
import { ObjectIdField } from '../../../../../constants'
import { WebChartSeries } from '../../../../../config'
import { isSerialSeries } from '../../../../../utils/default'

export const getSourceRecords = (records: DataRecord[], dataSource) => {
  const rs = records?.map((record, i) => {
    if (dataSource && record.dataSource !== dataSource) {
      const attributes = record.getData()
      const feature = { attributes: { [ObjectIdField]: i, ...attributes } }
      return dataSource.buildRecord(feature)
    } else {
      return record
    }
  })

  return rs
}

const translations = {
  sum: 'sumOf',
  avg: 'meanOf',
  min: 'minOf',
  max: 'maxOf',
  count: 'count',
  percentile_cont: 'medianOf'
}

export const getReadableSeriesName = (propsSeries: ImmutableArray<WebChartSeries>, query: ImmutableObject<FeatureLayerQueryParams>, translate) => {
  const type = getSeriesType(propsSeries as any)
  const statisticType = query?.outStatistics?.[0]?.statisticType
  let series = propsSeries
  if (!statisticType) return series
  if (isSerialSeries(type) || type === 'pieSeries') {
    series = propsSeries.map(serie => {
      const alias = serie.name
      const name = translate(translations[statisticType], { field: alias })
      return serie.set('name', name)
    }) as any
  }
  return series
}
