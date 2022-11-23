import { React } from 'jimu-core'
import { hooks, NumericInput } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../../../translations/default'

interface InnerRadiusProps {
  value: number
  onChange?: (value: number) => void
}

export const InnerRadius = (props: InnerRadiusProps): React.ReactElement => {
  const { value = 0, onChange } = props

  const translate = hooks.useTranslate(defaultMessages)

  const handleChange = (value: number): void => {
    const radius = Math.floor(+value)
    onChange?.(radius)
  }

  return (
    <SettingRow label={translate('innerRadius')} flow='no-wrap'>
      <NumericInput
        className='w-50'
        size='sm'
        min={0}
        step={1}
        max={100}
        defaultValue={value}
        onAcceptValue={handleChange}
      />
    </SettingRow>
  )
}
