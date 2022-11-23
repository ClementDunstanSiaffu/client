import { React, Immutable, ImmutableObject, classNames } from 'jimu-core'
import { FontFamilyValue, defaultMessages, hooks } from 'jimu-ui'
import { IFont } from '@esri/arcgis-rest-types'
import { FontFamily } from 'jimu-ui/advanced/rich-text-editor'
import {
  InputUnit,
  FontStyle,
  FontStyles
} from 'jimu-ui/advanced/style-setting-components'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { getFont } from '../../../../../../utils/default'

const FontStyleTypes = ['bold', 'italic', 'underline'] as FontStyles[]

export interface FontSettingProps {
  className?: string
  value: ImmutableObject<IFont>
  onChange: (value: IFont) => void
}

export const FontSetting = (props: FontSettingProps): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages)

  const {
    className,
    value: propValue = Immutable(getFont()),
    onChange
  } = props
  const family = propValue.family as FontFamilyValue
  const size = `${propValue.size ?? 14}px`
  const bold = propValue?.weight === 'bold'
  const italic = propValue?.style === 'italic'
  const underline = propValue?.decoration === 'underline'

  const handleChange = (key: string, value: any): void => {
    onChange?.(propValue.set(key, value))
  }

  const handleFontStyleChange = (_key: string, selected: boolean): void => {
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
    handleChange(key, value)
  }

  return (
    <div className={classNames(className, 'font-setting w-100')}>
      <SettingRow flow='no-wrap' label={translate('font')}>
        <FontFamily
          className='w-50'
          font={family}
          onChange={value => handleChange('family', value)}
        />
      </SettingRow>
      <SettingRow flow='no-wrap' label={translate('fontSize')}>
        <InputUnit
          className='w-50'
          value={size}
          onChange={value => handleChange('size', value.distance)}
        />
      </SettingRow>
      <SettingRow flow='no-wrap' label={translate('fontStyle')}>
        <FontStyle
          onChange={handleFontStyleChange}
          types={FontStyleTypes}
          bold={bold}
          italic={italic}
          underline={underline}
        />
      </SettingRow>
    </div>
  )
}
