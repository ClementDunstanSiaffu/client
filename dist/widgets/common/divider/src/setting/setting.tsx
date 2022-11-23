/** @jsx jsx */
import {
  React,
  classNames,
  ThemeVariables,
  css,
  jsx,
  polished
} from 'jimu-core'
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder'
import {
  SettingSection,
  SettingRow,
  DirectionSelector
} from 'jimu-ui/advanced/setting-components'
import { InputUnit } from 'jimu-ui/advanced/style-setting-components'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import {
  defaultMessages as jimuUIDefaultMessages,
  DistanceUnits,
  LinearUnit
} from 'jimu-ui'
import {
  IMConfig,
  Direction,
  LineStyle,
  PointStyle,
  QuickStyleType
} from '../config'
import defaultMessages from './translations/default'
import { RangeInput } from './components/range-input'
import { PointStyleSelector } from './components/point-select'
import { LineStyleSelector } from './components/line-select'

const prefix = 'jimu-widget-'

interface State {
  isLinkSettingShown: boolean
  isAdvance: boolean
  strokeSize: string
}

export default class Setting extends React.PureComponent<
AllWidgetSettingProps<IMConfig>,
State
> {
  hasSetLineSize = false
  units = [DistanceUnits.PIXEL]

  constructor (props) {
    super(props)
    this.state = {
      isLinkSettingShown: false,
      isAdvance: false,
      strokeSize: props?.config?.strokeStyle?.size
    }
  }

  getStyle = (theme: ThemeVariables) => {
    return css`
      .padding-top-0 {
        padding-top: 0;
      }
      .unit-width {
        width: ${polished.rem(60)};
        min-width: ${polished.rem(60)};
      }
      .start-end-point .jimu-widget-setting--section-header h6 {
        font-size: ${polished.rem(13)};
        color: ${theme?.colors?.palette?.dark[400]};
      }
    `
  }

  onSettingChange = (key: string | string[], value: any) => {
    let config = this.props.config
    if (Array.isArray(key)) {
      config = config.setIn(key, value)
    } else {
      config = config.set(key, value)
    }
    if (config.themeStyle.quickStyleType !== QuickStyleType.None) {
      config = config.setIn(
        ['themeStyle', 'quickStyleType'],
        QuickStyleType.None
      )
    }
    this.props.onSettingChange({
      id: this.props.id,
      config
    })
  }

  onRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    value: any
  ) => {
    const checked = e.currentTarget.checked
    if (!checked) {
      return
    }
    this.onSettingChange(key, value)
    getAppConfigAction()
      .exchangeWidthAndHeight()
      .exec()
  }

  onDirectionChange = (vertical?: boolean) => {
    const newDirection = vertical ? Direction.Vertical : Direction.Horizontal
    const { direction } = this.props.config
    if (newDirection === direction) {
      return false
    }
    this.onSettingChange('direction', newDirection)
    getAppConfigAction()
      .exchangeWidthAndHeight()
      .exec()
  }

  translate = (id: string, jimu?: boolean, values?: any) => {
    const message = jimu ? jimuUIDefaultMessages : defaultMessages
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: message[id] },
      values
    )
  }

  onDividerLineStyleChange = (key, value) => {
    this.onSettingChange(['dividerStyle', key], value)
  }

  onLineStyleChange = (value: LineStyle) => {
    const { config, id } = this.props
    if (value === this?.props?.config?.strokeStyle?.type) {
      return false
    }

    let newConfig = config.setIn(['strokeStyle', 'type'], value)
    const isThickLine = value === LineStyle.Style7 || value === LineStyle.Style8 || value === LineStyle.Style9 || value === LineStyle.Style10
    const lineSize = config?.strokeStyle?.size?.split('px')[0]

    if (!this.hasSetLineSize) {
      if (isThickLine && Number(lineSize) < 8) {
        newConfig = newConfig.setIn(['strokeStyle', 'size'], '8px')
      }
      if (!isThickLine && Number(lineSize) > 2) {
        newConfig = newConfig.setIn(['strokeStyle', 'size'], '2px')
      }
    }

    this.props.onSettingChange({
      id: id,
      config: newConfig
    })
  }

  onStrokeSizeChange = (value: LinearUnit) => {
    const size = `${value.distance}${value.unit}`
    if (size === this?.props?.config?.strokeStyle?.size || value.distance < 1) {
      return false
    }
    this.onSettingChange(['strokeStyle', 'size'], size)
    this.hasSetLineSize = true
  }

  onStrokeSizeAccepct= (value: LinearUnit) => {
    const size = `${value.distance}${value.unit}`
    if (size === this?.props?.config?.strokeStyle?.size || value.distance < 1) {
      return false
    }
    this.onSettingChange(['strokeStyle', 'size'], size)
    this.hasSetLineSize = true
  }

  onColorChange = (value: string) => {
    if (value === this?.props?.config?.strokeStyle?.color) {
      return false
    }
    this.onSettingChange(['strokeStyle', 'color'], value)
  }

  onPointStyleChange = (key: string, value: PointStyle) => {
    const prePointStyle = this?.props?.config[key]?.pointStyle
    if (value === prePointStyle) return false
    this.onSettingChange([key, 'pointStyle'], value)
  }

  onPointSizeChange = (key: string, value: number) => {
    const prePointStyle = this?.props?.config[key]?.pointSize
    if (value === prePointStyle) return false
    this.onSettingChange([key, 'pointSize'], value)
  }

  render () {
    const { config, theme, theme2, intl } = this.props
    const { direction, strokeStyle, pointEnd, pointStart } = config
    return (
      <div
        className={classNames(`${prefix}card-setting`, `${prefix}setting`)}
        css={this.getStyle(this.props.theme)}
      >
        <SettingSection>
          <SettingRow role='group' label={this.translate('direction', true)} aria-label={this.translate('direction', true)}>
            <DirectionSelector
              vertical={direction === Direction.Vertical}
              onChange={this.onDirectionChange}
              aria-pressed={true}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection
          title={this.translate('style', true)}
          className='border-bottom-0'
        >
          <SettingRow role='group' label={this.translate('color')} aria-label={this.translate('color')}>
            <ThemeColorPicker
              value={strokeStyle?.color}
              specificTheme={theme2}
              onChange={this.onColorChange}
            />
          </SettingRow>
          <SettingRow role='group' label={this.translate('stroke')} aria-label={this.translate('stroke')}>
            <LineStyleSelector
              intl={intl}
              value={strokeStyle?.type || null}
              onChange={this.onLineStyleChange}
              className='mr-2 f-grow-1'
            />
            <div className='unit-width'>
              <InputUnit
                units={this.units}
                value={strokeStyle?.size}
                onChange={this.onStrokeSizeChange}
                className='item'
              />
            </div>
          </SettingRow>
        </SettingSection>

        <SettingSection className='pt-0 start-end-point'>
          {/* <SettingRow label={this.translate('startpoints')}>
              <div className="d-flex align-items-center">
                <PointStyleSelector intl={intl} value={pointStart?.pointStyle} isPointStart={true} onChange={(value: PointStyle) => {this.onPointStyleChange('pointStart', value)}} />
              </div>
            </SettingRow>
            {(pointStart?.pointStyle !== PointStyle.None) && <SettingRow label={this.translate('dividerSize')}>
              <RangeInput theme={theme} pointStyle={pointStart?.pointStyle} value={pointStart?.pointSize} onChange={value => {this.onPointSizeChange('pointStart', value)}}/>
            </SettingRow>}

            <SettingRow label={this.translate('endpoints')} >
              <PointStyleSelector intl={intl} value={pointEnd?.pointStyle} isPointStart={false} onChange={(value: PointStyle) => {this.onPointStyleChange('pointEnd', value)}}  />
            </SettingRow>
            {(pointEnd?.pointStyle !== PointStyle.None) && <SettingRow label={this.translate('dividerSize')} >
              <RangeInput theme={theme} pointStyle={pointEnd?.pointStyle} value={pointEnd?.pointSize} onChange={value => {this.onPointSizeChange('pointEnd', value)}}/>
            </SettingRow>} */}

          <SettingRow role='group' label={this.translate('startpoints')} aria-label={this.translate('startpoints')}>
            <div className='d-flex align-items-center'>
              <PointStyleSelector
                intl={intl}
                value={pointStart?.pointStyle}
                isPointStart
                onChange={(value: PointStyle) => {
                  this.onPointStyleChange('pointStart', value)
                }}
              />
            </div>
          </SettingRow>
          {pointStart?.pointStyle !== PointStyle.None && <SettingRow role='group' aria-label={this.translate('startpoints')}>
            <RangeInput
              theme={theme}
              pointStyle={pointStart?.pointStyle}
              value={pointStart?.pointSize}
              intl={this.translate}
              onChange={value => {
                this.onPointSizeChange('pointStart', value)
              }}
            />
          </SettingRow>}

          <SettingRow role='group' label={this.translate('endpoints')} aria-label={this.translate('endpoints')}>
            <div className='d-flex align-items-center'>
              <PointStyleSelector
                intl={intl}
                value={pointEnd?.pointStyle}
                isPointStart={false}
                onChange={(value: PointStyle) => {
                  this.onPointStyleChange('pointEnd', value)
                }}
              />
            </div>
          </SettingRow>
          {pointEnd?.pointStyle !== PointStyle.None && <SettingRow role='group'aria-label={this.translate('endpoints')}>
              <RangeInput
                theme={theme}
                pointStyle={pointEnd?.pointStyle}
                value={pointEnd?.pointSize}
                intl={this.translate}
                onChange={value => {
                  this.onPointSizeChange('pointEnd', value)
                }}
              />
          </SettingRow>}
        </SettingSection>
      </div>
    )
  }
}
