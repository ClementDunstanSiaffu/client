import { React, ImmutableObject } from 'jimu-core'
import { WebChartGuide } from 'jimu-ui/advanced/chart'
import { hooks, defaultMessages as jimuiDefaultMessage, NumericInput, TextInput, AdvancedButtonGroup, Button } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import GuideCollapse from './collapse'
import { FillSymbolSetting, LineSymbolSetting } from '../../../components'
import { ISimpleFillSymbol, ISimpleLineSymbol } from '@esri/arcgis-rest-types'
import defaultMessages from '../../../../../../translations/default'
import { DefaultGuideFillColor, DefaultGuideLineColor, DefaultLineColor, getFillSymbol, getLineSymbol } from '../../../../../../../utils/default'
import { parseNumber } from './utils'
import { ArrowDownOutlined } from 'jimu-icons/outlined/directional/arrow-down'
import { ArrowUpOutlined } from 'jimu-icons/outlined/directional/arrow-up'

interface GuideProps {
  className?: string
  value: ImmutableObject<WebChartGuide>
  onChange: (value: ImmutableObject<WebChartGuide>) => void
  onDelete: () => void
  bottomLine?: boolean
  defaultIsOpen?: boolean
  isHorizontal?: boolean
}

const Guide = (props: GuideProps) => {
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)

  const { className, value: propValue, onChange, onDelete, bottomLine, defaultIsOpen, isHorizontal } = props

  const name = propValue.name
  const label = propValue.label.text ?? ''
  const start = propValue.start as number
  const end = propValue.end as number
  const valid = start != null
  const isLineType = end == null

  let style = null
  if (isLineType) {
    style = propValue.style as ImmutableObject<ISimpleLineSymbol>
  } else {
    style = propValue.style as ImmutableObject<ISimpleFillSymbol>
  }

  const above = propValue.above ?? false

  const handleNameChange = (name: string) => {
    const value = propValue.set('name', name)
    onChange(value)
  }

  const handleStartChange = (val: string, evt): void => {
    // means it a invalid value
    if (val === null && evt.target.value !== '') {
      return
    }
    const value = propValue.set('start', parseNumber(val))
    onChange?.(value)
  }

  const handleEndChange = (val: string, evt): void => {
    // means it a invalid value
    if (val === null && evt.target.value !== '') {
      return
    }
    let value = propValue.set('end', parseNumber(val))

    const isFillType = val != null && val !== ''
    const typeChanged = isLineType === isFillType
    if (typeChanged) {
      const color = style?.color
      if (isFillType) {
        const style = getFillSymbol(color || DefaultGuideFillColor, 0, DefaultLineColor)
        value = value.set('style', style)
        value = value.setIn(['label', 'horizontalAlignment'], 'center')
          .setIn(['label', 'verticalAlignment'], 'middle')
      } else {
        const style = getLineSymbol(1, color || DefaultGuideLineColor)
        value = value.set('style', style)
        const horizontalAlignment = isHorizontal ? 'center' : 'right'
        const verticalAlignment = isHorizontal ? 'top' : 'middle'
        value = value.setIn(['label', 'horizontalAlignment'], horizontalAlignment)
          .setIn(['label', 'verticalAlignment'], verticalAlignment)
      }
    }
    onChange?.(value)
  }

  const handleStyleChange = (style: ImmutableObject<ISimpleLineSymbol> | ImmutableObject<ISimpleFillSymbol>) => {
    onChange?.(propValue.set('style', style))
  }

  const handleLabelTextChange = (value: string): void => {
    onChange?.(propValue.setIn(['label', 'text'], value))
  }

  const handleAboveChange = (above: boolean): void => {
    onChange?.(propValue.set('above', above))
  }

  return (<GuideCollapse
    className={className}
    name={name}
    onChange={handleNameChange}
    onDelete={onDelete}
    bottomLine={bottomLine}
    defaultIsOpen={defaultIsOpen}>
    <div className='d-flex align-items-center justify-content-between mt-2 px-1'>
      <NumericInput
        size='sm'
        showHandlers={false}
        defaultValue={start}
        required={true}
        style={{ width: '40%' }}
        title={translate('start')}
        placeholder={translate('start')}
        onAcceptValue={handleStartChange}
      />
      <span className='text-truncate'>{translate('to')}</span>
      <NumericInput
        disabled={!valid}
        size='sm'
        showHandlers={false}
        defaultValue={end}
        style={{ width: '40%' }}
        title={translate('end')}
        placeholder={translate('end')}
        onAcceptValue={handleEndChange}
      />
    </div>
    <div className='symbol-setting my-3'>
      {!isLineType && <FillSymbolSetting
        defaultFillColor={DefaultGuideFillColor}
        defaultLineColor={DefaultLineColor}
        value={style as ImmutableObject<ISimpleFillSymbol>}
        onChange={handleStyleChange}
      />
      }
      {
        isLineType && <LineSymbolSetting
          defaultColor={DefaultGuideLineColor}
          value={style as ImmutableObject<ISimpleLineSymbol>}
          onChange={handleStyleChange}
        />
      }
    </div>
    <SettingRow level={3} label={translate('label')} flow='no-wrap' truncateLabel={true}>
      <TextInput
        size='sm'
        defaultValue={label}
        className='w-50'
        onAcceptValue={handleLabelTextChange}
      />
    </SettingRow>
    <SettingRow level={3} label={translate('render')} flow='no-wrap' truncateLabel={true}>
      <AdvancedButtonGroup size='sm'>
        <Button icon active={!above} title={translate('behindChart')} onClick={() => handleAboveChange(false)}><ArrowDownOutlined></ArrowDownOutlined></Button>
        <Button icon active={above} title={translate('aboveChart')} onClick={() => handleAboveChange(true)}><ArrowUpOutlined></ArrowUpOutlined></Button>
      </AdvancedButtonGroup>
    </SettingRow>
  </GuideCollapse>)
}

export default Guide
