/** @jsx jsx */
import { React, jsx, IntlShape } from 'jimu-core'
import { Select, Option, NumericInput, Icon, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { ColorPicker } from 'jimu-ui/basic/color-picker'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { ProfileStyle } from '../../config'
import defaultMessages from '../translations/default'

interface Props {
  intl: IntlShape
  lineItem: string
  config: ProfileStyle
  onLineStyleChange: (objectKey: string, property: string, style: any) => void
}

interface IState {
  lineColor: string
  lineType: string
  lineThickness: number
}

export default class LineStylePicker extends React.PureComponent<Props, IState> {
  readonly lineTypeList = ['solid-line', 'dotted-line', 'dashed-line']

  constructor (props) {
    super(props)
    this.state = {
      lineColor: Object.prototype.hasOwnProperty.call(this.props.config, 'lineColor') ? this.props.config.lineColor : '#049546',
      lineType: Object.prototype.hasOwnProperty.call(this.props.config, 'lineType') ? this.props.config.lineType : 'dashed-line',
      lineThickness: Object.prototype.hasOwnProperty.call(this.props.config, 'lineThickness') ? this.props.config.lineThickness : 2
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  onLineColorChange = (color: string) => {
    this.setState({
      lineColor: color
    })
    this.props.onLineStyleChange(this.props.lineItem, 'lineColor', color)
  }

  onlineTypeChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      lineType: evt.currentTarget.value
    })
    this.props.onLineStyleChange(this.props.lineItem, 'lineType', evt.currentTarget.value)
  }

  onLineThicknessChange = (value: number) => {
    if (value === null) {
      return
    }

    this.setState({
      lineThickness: value
    })
    this.props.onLineStyleChange(this.props.lineItem, 'lineThickness', value)
  }

  render () {
    return <div>
      <SettingRow>
        <ColorPicker aria-label={this.nls('lineColor')} className={'mr-2'} width='54px' height='26px'
        offset={[0, 0]} placement={'top'} showArrow color={this.state.lineColor ? this.state.lineColor : '#FFFFFF'}
        onChange={this.onLineColorChange} />
        <Select menuRole={'menu'} aria-label={this.state.lineType} size={'sm'} name={'linePicker'} value={this.state.lineType}
          onChange={this.onlineTypeChange}>
          {this.lineTypeList.map((item, index) => {
            const iconComponent = require(`../assets/icons/${item}.svg`)
            return <Option role={'option'} aria-label={item} key={index} value={item}>
              {<Icon width={60} height={12} icon={iconComponent} />}
            </Option>
          })}
        </Select>
        <NumericInput aria-label={this.nls('lineThickness')} size={'sm'} className={'ml-2'} min={1} max={20} defaultValue={this.state.lineThickness} onChange={this.onLineThicknessChange} />
      </SettingRow>
    </div>
  }
}
