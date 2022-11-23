import { React } from 'jimu-core'
import { hooks, NumericInput } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../../../translations/default'

interface AngleProps {
  value: number
  onChange?: (start: number, end: number) => void
}

export const Angle = (props: AngleProps): React.ReactElement => {
  const { value = 0, onChange } = props

  const translate = hooks.useTranslate(defaultMessages)

  const handleChange = (value: number): void => {
    const start = Math.floor(+value)
    const end = start + 360
    onChange?.(start, end)
  }

  return (
    <SettingRow label={translate('startAngle')} flow='no-wrap'>
      <NumericInput
        className='w-50'
        size='sm'
        min={0}
        step={1}
        max={360}
        defaultValue={value}
        onAcceptValue={handleChange}
      />
    </SettingRow>
  )
}
