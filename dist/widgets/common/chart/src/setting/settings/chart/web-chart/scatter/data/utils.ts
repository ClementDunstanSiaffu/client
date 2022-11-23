import { getFieldSchema } from '../../../../../../utils/common'
import { IMFeatureLayerQueryParams, Immutable, ImmutableArray } from 'jimu-core'
import { WebChartSeries } from '../../../../../../config'
import { createDefaultSerie, SelectedOption } from '../../common-sections/data'

export const createScatterPlotSeries = ({ x, y, propSeries }, dataSourceId): ImmutableArray<WebChartSeries> => {
  const seriesProps = propSeries[0]
  const serie = createDefaultSerie(seriesProps, 0)
  serie.x = x
  ;(serie as any).y = y
  const name = getFieldSchema(y, dataSourceId)?.alias || y
  serie.name = name
  serie.id = y
  return Immutable([serie])
}

export const createScatterPlotQuery = ({ x, y }, orderByFields, pageSize): IMFeatureLayerQueryParams => {
  const outFields = []
  if (x) {
    outFields[0] = x
  }
  if (y) {
    outFields[1] = y
  }
  return Immutable({ outFields, orderByFields, pageSize })
}

export const getScatterPlotOrderFields = (query: IMFeatureLayerQueryParams, dataSourceId: string): ImmutableArray<SelectedOption> => {
  const outFields = query?.outFields
  if (!outFields?.length) return Immutable([])

  const fields: ImmutableArray<SelectedOption> = outFields?.map((outField) => ({
    name: getFieldSchema(outField, dataSourceId)?.alias || outField,
    value: outField
  }))
  return fields
}
