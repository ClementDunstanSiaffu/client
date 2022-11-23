/** @jsx jsx */
import {
  React,
  css,
  jsx,
  ImmutableObject,
  SerializedStyles
} from 'jimu-core'
import {
  NumericInput,
  Checkbox,
  hooks,
  defaultMessages as jimuUiDefaultMessage,
  Label,
  Select
} from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../translations/default'
import { NumberFormatOptions } from 'jimu-ui/advanced/chart'
import { useTheme } from 'jimu-theme'

export interface NumericFormatSettingProps {
  value: ImmutableObject<NumberFormatOptions>
  onChange: (value: ImmutableObject<NumberFormatOptions>) => void
}

const useStyle = (): SerializedStyles => {
  const theme = useTheme()
  const dark400 = theme?.colors?.palette?.dark?.[400]

  return React.useMemo(() => {
    return css`
      width: 100%;
      .jimu-widget-setting--row-label {
        color: ${dark400};
      }
    `
  }, [dark400])
}

// More info about intl option: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
export const NumericFormatSetting = (props: NumericFormatSettingProps): React.ReactElement => {
  const { value, onChange } = props
  const style = useStyle()

  const intlOptions = (value as NumberFormatOptions)?.intlOptions
  const decimal = intlOptions?.minimumFractionDigits ?? 0
  const notation = (intlOptions as any)?.notation ?? 'standard'
  const useGrouping = intlOptions?.useGrouping ?? true
  const translate = hooks.useTranslate(defaultMessages, jimuUiDefaultMessage)

  const handleDecimalChange = (number: number): void => {
    const decimal = Math.floor(+number)
    onChange(value.setIn(['intlOptions', 'minimumFractionDigits'], decimal)
      .setIn(['intlOptions', 'maximumFractionDigits'], decimal)
    )
  }

  const handleShow1000SeperatorChange = (_, checked: boolean): void => {
    onChange(value.setIn(['intlOptions', 'useGrouping'], checked))
  }

  const handleNotationChange = (evt: React.MouseEvent<HTMLSelectElement>): void => {
    const notation = evt.currentTarget.value

    let option = value.setIn(['intlOptions', 'notation'], notation)
    if (notation !== 'standard') {
      option = option.set(
        'intlOptions',
        option.intlOptions.without('useGrouping')
      )
    }
    onChange(option)
  }

  return (
    <div className='numeric-format-setting' css={style}>
      <SettingRow label={translate('decimal')} flow='no-wrap' truncateLabel={true}>
        <NumericInput
          size='sm'
          min={0}
          step={1}
          max={15}
          showHandlers={false}
          value={decimal}
          className='w-50'
          onAcceptValue={handleDecimalChange}
        />
      </SettingRow>
      <SettingRow label={translate('notation')} flow='no-wrap' className='mt-2' truncateLabel={true}>
        <Select
          size='sm'
          value={notation}
          className='w-50'
          onChange={handleNotationChange}
        >
          <option value='standard'>
            {translate('standard')}
          </option>
          <option value='compact'>
            {translate('compact')}
          </option>
          <option value='scientific'>
            {translate('scientific')}
          </option>
          <option value='engineering'>
            {translate('engineering')}
          </option>
        </Select>
      </SettingRow>
      {notation === 'standard' && <Label check centric className='justify-content-start align-items-start mt-2 setting-text-level-3'>
        <Checkbox
          checked={useGrouping}
          onChange={handleShow1000SeperatorChange}
        />
        <span className='ml-2'>{translate('show1000Seperator')}</span>
      </Label>}
    </div>
  )
}
