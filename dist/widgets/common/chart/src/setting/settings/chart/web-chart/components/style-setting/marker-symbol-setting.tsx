/** @jsx jsx */
import {
  ImmutableObject,
  Immutable,
  classNames,
  React,
  css,
  jsx
} from 'jimu-core'
import { ISimpleMarkerSymbol } from '@esri/arcgis-rest-types'
import { ColorItem, ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { getCircleMarkerSymbol } from '../../../../../../utils/default'
import { LineSymbolSetting } from './line-symbol-setting'
import { Slider } from 'jimu-ui'
import { useTheme2 } from 'jimu-theme'

export interface MarkSymbolSettingProps {
  className?: string
  presetFillColors?: ColorItem[]
  presetLineColors?: ColorItem[]
  value: ImmutableObject<ISimpleMarkerSymbol>
  defaultFillColor: string
  defaultLineColor: string
  onChange: (value: ImmutableObject<ISimpleMarkerSymbol>) => void
}

const cssStyle = css`
  .divid-line {
    height: 25px;
    width: 2px;
  }
  .jimu-slider {
    flex-shrink: 1;
  }
`

export const MarkSymbolSetting = (props: MarkSymbolSettingProps): React.ReactElement => {
  const {
    className,
    presetFillColors,
    presetLineColors,
    value: propValue = Immutable(getCircleMarkerSymbol()),
    defaultFillColor,
    defaultLineColor,
    onChange
  } = props
  const appTheme = useTheme2()
  const color = (propValue?.color as unknown) as string
  const size = propValue.size ?? 0
  const outline = propValue?.outline

  const handleChange = (key: string, value: any): void => {
    onChange?.(propValue.set(key, value))
  }

  const handleFillColorChange = (value: string): void => {
    value = value || defaultFillColor
    handleChange('color', value)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value) || 0
    handleChange('size', value)
  }

  return (
    <div className={classNames('marker-symbol-setting', className)} css={cssStyle}>
      <div className='d-flex justify-content-between align-items-center'>
        <ThemeColorPicker
          presetColors={presetFillColors}
          specificTheme={appTheme}
          className='item flex-shrink-0'
          onChange={handleFillColorChange}
          value={color}
        />
        <div className='divid-line bg-secondary ml-2 mr-2' />
        <Slider
          min={0}
          step={1}
          max={25}
          style={{ width: '80%' }}
          value={size}
          onChange={handleSizeChange}
        />
      </div>
      <LineSymbolSetting
        className='mt-2'
        presetColors={presetLineColors}
        outlineColorPicker={true}
        defaultColor={defaultLineColor}
        value={outline}
        onChange={value => handleChange('outline', value)}
      />
    </div>
  )
}
