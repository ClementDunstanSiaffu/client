/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { Checkbox, Label, Select } from 'jimu-ui'
import { MapWidgetSelector, SettingSection } from 'jimu-ui/advanced/setting-components'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { IMConfig } from '../config'
import i18n from './translations/default'
import './style.css'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any> {
  handleDisplayLabelChange = (evt: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (evt) {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('displayLabel', checked)
      })
    }
  }

  handleLongNamesChange = (evt: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    if (evt) {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('longNames', checked)
      })
    }
  }

  handleMapWidgetSelected = (useMapWidgetIds: string[]): void => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  handlePositionChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (evt) {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('position', evt.target.value)
      })
    }
  }

  nls = (id: string): string => {
    if (this.props.intl) {
      return this.props.intl.formatMessage({
        id: id,
        defaultMessage: i18n[id]
      })
    }
    return id
  }

  render (): any {
    const position = this.props.config.position || 'top-left'
    return (
      <SettingSection>
        <div className='widget-setting-floorfilter-section'>
          <Label className='widget-setting-floorfilter-label'>
            {this.nls('floorfilter_setting_selectMap')}
          </Label>
          <div>
            <MapWidgetSelector
              onSelect={this.handleMapWidgetSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </div>
        </div>
        <div className='widget-setting-floorfilter-section-b' style={{ display: 'none' }}>
          <Label>
            <Checkbox
              checked={!!this.props.config.displayLabel}
              onChange={this.handleDisplayLabelChange}
            />
            <span className='widget-setting-floorfilter-checkbox-label'>
              {this.nls('floorfilter_setting_displayLabel')}
            </span>
          </Label>
        </div>
        <div className='widget-setting-floorfilter-section-b'>
          <Label>
            <Checkbox
              checked={!!this.props.config.longNames}
              onChange={this.handleLongNamesChange}
            />
            <span className='widget-setting-floorfilter-checkbox-label'>
              {this.nls('floorfilter_setting_longNames')}
            </span>
          </Label>
        </div>
        <div className='widget-setting-floorfilter-section-b'>
          <Label className='widget-setting-floorfilter-label'>
            {this.nls('floorfilter_setting_positioned')}
          </Label>
          <div>
          <Select
              value={position}
              onChange={this.handlePositionChange}
            >
              <option key='top-left' value='top-left'>{this.nls('floorfilter_setting_topLeft')}</option>
              <option key='top-right' value='top-right'>{this.nls('floorfilter_setting_topRight')}</option>
              <option key='bottom-left' value='bottom-left'>{this.nls('floorfilter_setting_bottomLeft')}</option>
              <option key='bottom-right' value='bottom-right'>{this.nls('floorfilter_setting_bottomRight')}</option>
            </Select>
          </div>
        </div>
      </SettingSection>
    )
  }
}
