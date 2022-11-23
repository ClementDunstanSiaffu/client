import { React, Immutable, ImmutableObject, classNames } from 'jimu-core'
import { ITextSymbol } from '@esri/arcgis-rest-types'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { getTextSymbol } from '../../../../../../utils/default'
import { FontFamily } from 'jimu-ui/advanced/rich-text-editor'
import { FontFamilyValue, FontStyle, FontStyles, InputUnit } from 'jimu-ui/advanced/style-setting-components'
import { LinearUnit } from 'jimu-ui'
import { getTheme2 } from 'jimu-theme'

export type TextSymbol = Pick<ITextSymbol, 'color' | 'font' | 'text'>

interface TextSymbolSettingProps {
  className?: string
  value: ImmutableObject<TextSymbol>
  defaultColor: string
  onChange?: (value: ImmutableObject<TextSymbol>) => void
  onColorChange?: (color: string) => void
  onFontChange?: (key: string, value: any) => void
}

export const TextSymbolSetting = (props: TextSymbolSettingProps): React.ReactElement => {
  const appTheme = getTheme2()
  const {
    className,
    value: propValue = Immutable(getTextSymbol()),
    defaultColor,
    onChange,
    onColorChange,
    onFontChange
  } = props

  const family = propValue?.font?.family as FontFamilyValue
  const size = propValue?.font?.size != null ? `${propValue?.font.size ?? 14}px` : ''
  const bold = propValue?.font?.weight === 'bold'
  const italic = propValue?.font?.style === 'italic'
  const underline = propValue?.font?.decoration === 'underline'
  const strike = propValue?.font?.decoration === 'line-through'

  const color = propValue?.color as unknown as string

  const handleColorChange = (color: string): void => {
    color = color || defaultColor
    onColorChange?.(color)
    onChange?.(propValue.set('color', color))
  }

  const handleFontStyleChange = (_key: FontStyles, selected: boolean): void => {
    let key = ''
    let value
    if (_key === 'bold') {
      key = 'weight'
      value = selected ? 'bold' : 'normal'
    }
    if (_key === 'italic') {
      key = 'style'
      value = selected ? 'italic' : 'normal'
    }
    if (_key === 'underline') {
      key = 'decoration'
      value = selected ? 'underline' : 'none'
    }
    if (_key === 'strike') {
      key = 'decoration'
      value = selected ? 'line-through' : 'none'
    }
    onFontChange?.(key, value)
    onChange?.(propValue.setIn(['font', key], value))
  }

  const handleFontChange = (family: FontFamilyValue): void => {
    onFontChange?.('family', family)
    onChange?.(propValue.setIn(['font', 'family'], family))
  }

  const handleFontSizeChange = (value: LinearUnit): void => {
    if (value.distance == null) return
    onFontChange?.('size', value.distance)
    onChange?.(propValue.setIn(['font', 'size'], value.distance))
  }

  return (
    <div className={classNames('text-symbol-setting w-100', className)}>
      <FontFamily className='w-100' font={family} onChange={handleFontChange} />
      <div className='d-flex justify-content-between mt-2'>
        <FontStyle
          style={{ width: '45%' }}
          onChange={handleFontStyleChange}
          bold={bold}
          italic={italic}
          underline={underline}
          strike={strike}
        />
        <ThemeColorPicker
          style={{ width: '11%' }}
          specificTheme={appTheme}
          value={color}
          onChange={handleColorChange}
        />
        <InputUnit
          style={{ width: '35%' }}
          value={size}
          onChange={handleFontSizeChange}
        />
      </div>
    </div>
  )
}
