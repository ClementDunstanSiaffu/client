import { getFieldSchema, getFieldsSchema } from '../../../../../../utils/common'
import { IMFeatureLayerQueryParams, Immutable, ImmutableArray } from 'jimu-core'
import { WebChartSeries } from '../../../../../../config'
import { createDefaultSerie, SelectedOption } from '../../common-sections/data'

export const createHistogramSeries = (x, propSeries, dataSourceId): ImmutableArray<WebChartSeries> => {
  const seriesProps = propSeries[0]
  const serie = createDefaultSerie(seriesProps, 0)
  serie.x = x
  const name = getFieldSchema(x, dataSourceId)?.alias || x
  serie.name = name
  serie.id = x
  return Immutable([serie])
}

export const createHistogramQuery = (x, orderByFields, pageSize): IMFeatureLayerQueryParams => {
  const outFields = []
  if (x) {
    outFields[0] = x
  }
  return Immutable({ outFields, orderByFields, pageSize })
}

export const getHistogramOrderFields = (dataSourceId: string): ImmutableArray<SelectedOption> => {
  if (!dataSourceId) return Immutable([])

  const fieldsSchema = getFieldsSchema(dataSourceId)
  const fields: SelectedOption[] = Object.entries(fieldsSchema)?.map(([field, schema]) => ({
    name: schema?.alias || field,
    value: field
  }))
  return Immutable(fields)
}
