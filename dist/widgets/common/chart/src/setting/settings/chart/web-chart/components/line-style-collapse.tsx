import { ISimpleLineSymbol } from '@esri/arcgis-rest-types'
import { React, ImmutableObject, classNames } from 'jimu-core'
import { SettingCollapse } from '../../../components'
import { LineSymbolSetting } from './style-setting'

interface LineStyleCollapseProps {
  label: string
  className?: string
  value: ImmutableObject<ISimpleLineSymbol>
  defaultColor: string
  open: boolean
  baseline?: boolean
  toggle: (open: boolean) => void
  onChange: (value: ImmutableObject<ISimpleLineSymbol>) => void
}

export const LineStyleCollapse = (props: LineStyleCollapseProps): React.ReactElement => {
  const { className, open, baseline, toggle, label, value, defaultColor, onChange } = props

  return (
    <div className={classNames('single-line-style', className)}>
      <SettingCollapse
        label={label}
        level={1}
        isOpen={open}
        bottomLine={baseline}
        onRequestClose={() => toggle(false)}
        onRequestOpen={() => toggle(true)}>
        <LineSymbolSetting
          defaultColor={defaultColor}
          className='mt-2'
          value={value}
          onChange={onChange}
        />
      </SettingCollapse>
    </div>
  )
}
