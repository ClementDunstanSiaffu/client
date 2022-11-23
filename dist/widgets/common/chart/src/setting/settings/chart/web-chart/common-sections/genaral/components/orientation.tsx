import { React } from 'jimu-core'
import { hooks } from 'jimu-ui'
import { DirectionSelector, SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../../../translations/default'

interface OrientationProps {
  value: boolean
  onChange?: (value: boolean) => void
}

export const Orientation = (props: OrientationProps): React.ReactElement => {
  const { value = false, onChange } = props

  const translate = hooks.useTranslate(defaultMessages)

  const handleChange = (vertical: boolean): void => {
    onChange?.(!vertical)
  }

  return (
    <SettingRow label={translate('chartOrientation')} flow='no-wrap'>
      <DirectionSelector
        size='sm'
        vertical={!value}
        onChange={handleChange}
      />
    </SettingRow>
  )
}
