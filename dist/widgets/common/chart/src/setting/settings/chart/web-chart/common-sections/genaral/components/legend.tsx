import { React, ImmutableObject, Immutable } from 'jimu-core'
import { WebChartLegend, WebChartLegendPositions } from 'jimu-ui/advanced/chart'
import { TextInput, hooks, Select, Switch } from 'jimu-ui'
import { getDefaultLegend } from '../../../../../../../utils/default'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../../../translations/default'

interface LegendProps {
  disabled?: boolean
  value: ImmutableObject<WebChartLegend>
  onChange?: (value: ImmutableObject<WebChartLegend>) => void
}

const defaultValue = Immutable(getDefaultLegend())

export const Legend = (props: LegendProps): React.ReactElement => {
  const { disabled = false, value = defaultValue, onChange } = props

  const translate = hooks.useTranslate(defaultMessages)

  const handleTitleTextChange = (text: string): void => {
    onChange?.(value.setIn(['title', 'content', 'text'], text))
  }

  const handleVisibleChange = (_, visible: boolean): void => {
    onChange?.(value.set('visible', visible))
  }

  const handlePositionChange = (
    evt: React.MouseEvent<HTMLSelectElement>
  ): void => {
    const position = evt.currentTarget.value as WebChartLegendPositions
    onChange?.(value.set('position', position))
  }

  return (
    <>
      <SettingRow label={translate('LegendLabel')} flow='no-wrap'>
        <Switch
          disabled={disabled}
          checked={!disabled && value?.visible}
          onChange={handleVisibleChange}
        />
      </SettingRow>
      {value?.visible && (
        <>
          <SettingRow label={translate('legendTitle')} flow='wrap'>
            <TextInput
              size='sm'
              className='w-100'
              defaultValue={value.title?.content.text}
              onAcceptValue={handleTitleTextChange}
            />
          </SettingRow>
          <SettingRow label={translate('legendPosition')} flow='no-wrap'>
            <Select
              size='sm'
              value={value?.position}
              style={{ width: '88px' }}
              onChange={handlePositionChange}
            >
              <option value={WebChartLegendPositions.Left}>
                {translate(WebChartLegendPositions.Left)}
              </option>
              <option value={WebChartLegendPositions.Right}>
                {translate(WebChartLegendPositions.Right)}
              </option>
              <option value={WebChartLegendPositions.Top}>
                {translate(WebChartLegendPositions.Top)}
              </option>
              <option value={WebChartLegendPositions.Bottom}>
                {translate(WebChartLegendPositions.Bottom)}
              </option>
            </Select>
          </SettingRow>
        </>
      )}
    </>
  )
}
