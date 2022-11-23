import { ImmutableObject, React } from 'jimu-core'
import { LineSymbolSetting } from '../../components'
import { ISimpleLineSymbol } from '@esri/arcgis-rest-types'
import { WebChartOverlay } from 'jimu-ui/advanced/chart'

interface HistogramOverlaysSettingProps {
  defaultColor: string
  value: ImmutableObject<WebChartOverlay>
  onChange: (value: ImmutableObject<WebChartOverlay>) => void
}

export const HistogramOverlaySetting = (
  props: HistogramOverlaysSettingProps
) => {
  const { defaultColor, value: propValue, onChange } = props

  const handleSymbolChange = (symbol: ImmutableObject<ISimpleLineSymbol>) => {
    const value = propValue.set('symbol', symbol)
    onChange(value)
  }

  return (
    <LineSymbolSetting
      value={propValue.symbol}
      onChange={handleSymbolChange}
      defaultColor={defaultColor}
    />
  )
}
