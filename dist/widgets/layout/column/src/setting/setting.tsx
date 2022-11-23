/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { LinearUnit, Select, Switch, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { ColumnLayoutSetting, utils } from 'jimu-layouts/layout-runtime'
import { IMFlexboxConfig } from '../config'
import { defaultConfig } from '../default-config'
import { Padding, InputUnit } from 'jimu-ui/advanced/style-setting-components'
import defaultMessages from './translations/default'

const messages = Object.assign(
  {},
  defaultMessages,
  jimuUIDefaultMessages
)

const inputStyle = { width: 110 }

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMFlexboxConfig>> {
  handleSpaceChange = (value: LinearUnit): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('space', value)
    })

    const appConfigAction = getAppConfigAction()
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { space: value.distance })
    })
    appConfigAction.exec()
  }

  handlePaddingChange = (value): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'padding'], value)
    })

    const appConfigAction = getAppConfigAction()
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { padding: value })
    })
    appConfigAction.exec()
  }

  handleJustifyContentChange = (e): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'justifyContent'], e.target.value)
    })

    const appConfigAction = getAppConfigAction()
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { justifyContent: e.target.value })
    })
    appConfigAction.exec()
  }

  handleScrollableChange = (e): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['style', 'overflowY'], e.target.checked)
    })
    const appConfigAction = getAppConfigAction()
    this.getLayoutIds().forEach(layoutId => {
      appConfigAction.editLayoutSetting({ layoutId }, { overflowY: e.target.checked })
    })
    appConfigAction.exec()
  }

  getLayoutIds (): string[] {
    const result = []

    const { layouts } = this.props
    if (layouts != null) {
      const layoutName = Object.keys(layouts)[0]
      const sizemodeLayouts = layouts[layoutName]
      Object.keys(sizemodeLayouts).forEach(sizemode => {
        result.push(sizemodeLayouts[sizemode])
      })
    }
    return result
  }

  getLayoutSetting (): ColumnLayoutSetting {
    const { layouts } = this.props
    if (layouts != null) {
      const layoutName = Object.keys(layouts)[0]
      const sizemodeLayouts = layouts[layoutName]
      const layoutId = sizemodeLayouts[utils.getCurrentSizeMode()]
      const appConfigAction = getAppConfigAction()
      return appConfigAction.appConfig.layouts[layoutId]?.setting
    }
  }

  formatMessage = (id: string): string => {
    return this.props.intl.formatMessage({ id, defaultMessage: messages[id] })
  }

  render (): JSX.Element {
    const layoutSetting = this.getLayoutSetting()

    return (
      <div className='flexbox-layout-setting'>
        <SettingSection title={this.formatMessage('layout')} role='group' aria-label={this.formatMessage('layout')}>
          <SettingRow label={this.formatMessage('verticalAlign')}>
            <Select
              aria-label={this.formatMessage('verticalAlign')}
              value={layoutSetting?.justifyContent ?? 'flex-start'}
              size='sm'
              onChange={this.handleJustifyContentChange}
              style={inputStyle}
            >
              <option value='flex-start'>{this.formatMessage('start')}</option>
              <option value='flex-end'>{this.formatMessage('end')}</option>
              <option value='center'>{this.formatMessage('center')}</option>
              <option value='space-around'>{this.formatMessage('spaceAround')}</option>
              <option value='space-between'>{this.formatMessage('spaceBetween')}</option>
              <option value='space-evenly'>{this.formatMessage('spaceEvenly')}</option>
            </Select>
          </SettingRow>
          <SettingRow label={this.formatMessage('scrollable')}>
            <Switch aria-label={this.formatMessage('scrollable')} checked={layoutSetting?.overflowY ?? true} onChange={this.handleScrollableChange} />
          </SettingRow>
          <SettingRow label={this.formatMessage('gap')}>
            <InputUnit
              aria-label={this.formatMessage('gap')}
              value={{ distance: layoutSetting?.space >= 0 ? layoutSetting.space : defaultConfig.space, unit: undefined }} min={0}
              onChange={this.handleSpaceChange} style={inputStyle}
            />
          </SettingRow>
          <SettingRow role='group' aria-label={this.formatMessage('padding')} label={this.formatMessage('padding')} flow='wrap'>
            <Padding value={layoutSetting?.padding as any} onChange={this.handlePaddingChange}/>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }
}
