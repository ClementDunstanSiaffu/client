/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, IntlShape, ThemeVariables } from 'jimu-core'
import { SettingSection } from 'jimu-ui/advanced/setting-components'
import { getInputSettingsStyle } from '../lib/style'
import { OutputSettings } from '../../config'
import EditCurrentPattern from './edit-current-pattern'

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  config: OutputSettings[]
  onSettingsUpdate: (prop: OutputSettings[]) => void
}

interface State {
  outputSettings: OutputSettings[]
}

export default class OutputSettingPopper extends React.PureComponent<Props, State> {
  items: JSX.Element[] = []
  constructor (props) {
    super(props)
    this.state = {
      outputSettings: this.props.config || []
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.isChange(prevProps)) {
      this.setState({
        outputSettings: this.props.config
      })
    }
  }

  isChange = (prevProps) => {
    let isChangeDone = false
    if (this.props.config.length !== prevProps.config.length) {
      return true
    }
    if (prevProps.config.length > 0) {
      // eslint-disable-next-line
      prevProps.config.some((format) => (
        // eslint-disable-next-line
        this.props.config.some((currentFormat) => {
          if (format.name === currentFormat.name) {
            if (format.currentPattern !== currentFormat.currentPattern ||
              format.enabled !== currentFormat.enabled) {
              isChangeDone = true
              return true
            }
          }
          return false
        })
      ))
    }
    return isChangeDone
  }

  updateItem = (formatIndex: number, itemAttributes: OutputSettings) => {
    const index = formatIndex
    if (index > -1) {
      this.setState({
        outputSettings: [
          ...this.state.outputSettings.slice(0, index),
          Object.assign({}, this.state.outputSettings[index], itemAttributes),
          ...this.state.outputSettings.slice(index + 1)
        ]
      }, () => {
        this.props.onSettingsUpdate(this.state.outputSettings)
      })
    }
  }

  updateCurrentPattern = (formatIndex: number, formatName: string, currentPattern: string) => {
    const outputSettings = this.props.config
    let updatedSettings: OutputSettings
    // eslint-disable-next-line
    outputSettings.some((coordinateSetting, index) => {
      if (coordinateSetting.name === formatName && index === formatIndex) {
        updatedSettings = {
          name: coordinateSetting.name,
          label: coordinateSetting.label,
          defaultPattern: coordinateSetting.defaultPattern,
          currentPattern: currentPattern,
          enabled: coordinateSetting.enabled,
          isCustom: coordinateSetting.isCustom
        }
        return true
      }
    })
    this.setState({
      outputSettings: this.props.config
    }, () => {
      this.updateItem(formatIndex, updatedSettings)
    })
  }

  onDeleteClick = (index) => {
    this.state.outputSettings.splice(index, 1)
    this.props.onSettingsUpdate(this.state.outputSettings)
  }

  renderFormatList = () => {
    this.items = []
    if (this.props.config && this.props.config.length > 0) {
      this.props.config.forEach((outputSetting, index) => {
        /* eslint-disable */
        {
          if (outputSetting.name !== 'address' && outputSetting.enabled) {
            this.items.push(<EditCurrentPattern
              intl={this.props.intl}
              index={index}
              key={index + Date.now()}
              config={outputSetting}
              onDelete={this.onDeleteClick.bind(this)}
              onPatternUpdate={this.updateCurrentPattern}
            ></EditCurrentPattern>)
          }
        }
        /* eslint-disable */
      })
    }
  }

  render () {
    this.renderFormatList()
    return <div css={getInputSettingsStyle(this.props.theme)} style={{ height: '100%' }}>
      <SettingSection className={'cursor-pointer'}>
        {this.items}
      </SettingSection>
    </div>
  }
}
