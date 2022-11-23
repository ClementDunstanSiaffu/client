import { React, ImmutableObject, classNames } from 'jimu-core'
import { SettingCollapse } from '../../../components'
import { TextSymbolSetting, TextSymbol } from './style-setting'

export interface TextStyleCollapseProps {
  label: string
  value: ImmutableObject<TextSymbol>
  className?: string
  defaultColor: string
  open: boolean
  baseline?: boolean
  toggle: (open: boolean) => void
  onChange: (value: ImmutableObject<TextSymbol>) => void
}

export const TextStyleCollapse = (props: TextStyleCollapseProps): React.ReactElement => {
  const { className, open, baseline, toggle, label, value, defaultColor, onChange } = props

  return (
    <div className={classNames('single-text-style', className)}>
      <SettingCollapse
        label={label}
        level={1}
        isOpen={open}
        bottomLine={baseline}
        onRequestClose={() => toggle(false)}
        onRequestOpen={() => toggle(true)}>
        <TextSymbolSetting
          defaultColor={defaultColor}
          className='mt-2'
          value={value}
          onChange={onChange}
        />
      </SettingCollapse>
    </div>
  )
}
