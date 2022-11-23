import { React, Immutable, ImmutableObject, QueryScope, IMFeatureLayerQueryParams, QueriableDataSource, ImmutableArray } from 'jimu-core'
import { ColorMatch, ColorMatches } from '../../../../../../../config'

export const getByFieldColorMatches = (numericFields: ImmutableArray<string>, colors: string[]): ColorMatches => {
  const colorMatches = {}
  numericFields.forEach((value, index) => {
    if (value != null) {
      const colorMatch = getColorMatch(index, colors)
      colorMatches[value] = colorMatch
    }
  })
  return colorMatches
}

export const getColorMatchColor = (colors: string[], index: number = 0): string => {
  if (!colors?.length) return
  const idx = index % colors.length
  const color = colors[idx]
  return color
}

export const getColorMatch = (index: number, colors: string[]): ColorMatch => {
  const _fillColor = getColorMatchColor(colors, index)
  return { _fillColor }
}

export const convertStripColors = (colors: string[]) => {
  return colors.map((color) => ({
    label: color,
    value: color,
    color: color
  }))
}

export const applyColorMatchColors = (_colorMatches: ImmutableObject<ColorMatches>, colors: string[]): ImmutableObject<ColorMatches> => {
  if (!colors) return
  let colorMatches = Immutable({}) as ImmutableObject<ColorMatches>
  Object.entries(_colorMatches).forEach(([name, _match], index) => {
    let match = _match
    const color = getColorMatchColor(colors, index)
    match = _match.set('_fillColor', color)
    colorMatches = colorMatches.set(name, match)
  })
  return colorMatches
}

const defaultColorMatches = Immutable({}) as ImmutableObject<ColorMatches>
export const useLoadingColorMatch = (
  dataSource: QueriableDataSource,
  query: IMFeatureLayerQueryParams,
  propColorMatches: ImmutableObject<ColorMatches> = defaultColorMatches,
  colors: string[],
  numberLimit: number = 50
): [(count: number) => Promise<{ value: ImmutableObject<ColorMatches>, loadout: boolean, exceed: boolean }>, boolean] => {
  const recordNumberRef = React.useRef(0)
  const numberPerLoadRef = React.useRef(0)

  const [loading, setLoading] = React.useState(false)

  const categoryField = query?.groupByFieldsForStatistics?.[0] ?? ''

  const loadColorMatches = (count: number) => {
    const exceed = Object.keys(propColorMatches).length >= numberLimit
    if (exceed) return Promise.resolve({ value: propColorMatches, loadout: false, exceed: true })
    setLoading(true)
    return dataSource.query(query, { scope: QueryScope.InConfigView }).then((result) => {
      const records = result.records
      let colorMatches = propColorMatches
      records.some((record) => {
        recordNumberRef.current++
        const value = record.getFieldValue(categoryField)
        if (value == null) return false
        if (colorMatches[value]) return false
        const colorMatch = getColorMatch(numberPerLoadRef.current, colors)
        colorMatches = colorMatches.set(value, colorMatch)
        numberPerLoadRef.current++
        return numberPerLoadRef.current >= count
      })
      const loadout = recordNumberRef.current >= records.length
      const exceed = Object.keys(colorMatches).length >= numberLimit
      recordNumberRef.current = 0
      numberPerLoadRef.current = 0
      setLoading(false)
      return { value: colorMatches, loadout, exceed }
    }, (error) => {
      console.error(error)
      setLoading(false)
      return undefined
    })
  }

  return [loadColorMatches, loading]
}
