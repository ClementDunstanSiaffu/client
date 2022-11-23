/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, ThemeVariables, IntlShape } from 'jimu-core'
import { Label, Switch, Tooltip, Icon, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { getGeneralSettingsStyle } from '../lib/style'
import defaultMessages from '../translations/default'
import { GeneralSetting } from '../../config'
import { getConfigIcon } from '../constants'

const { epConfigIcon } = getConfigIcon()

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  currentDs: string
  config: GeneralSetting
  onGeneralSettingsUpdated: (prop: string, value: string | boolean) => void
}

interface IState {
  selectToggleTool: boolean
  drawToggleTool: boolean
  isAppearanceSettingsOpen: boolean
}

export default class GeneralSettings extends React.PureComponent<Props, IState> {
  constructor (props) {
    super(props)

    this.state = {
      selectToggleTool: this.props.config.isSelectToolActive,
      drawToggleTool: this.props.config.isDrawToolActive,
      isAppearanceSettingsOpen: false
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

  //Update the select/draw tool states
  //one of them can be active at a time
  componentDidUpdate = (prevProps) => {
    if (prevProps.config.isSelectToolActive !== this.props.config.isSelectToolActive) {
      this.setSelectTool(this.props.config.isSelectToolActive)
    }
    if (prevProps.config.isDrawToolActive !== this.props.config.isDrawToolActive) {
      this.setDrawTool(this.props.config.isDrawToolActive)
    }
  }

  setSelectTool = (selectTool: boolean) => {
    this.setState({
      selectToggleTool: selectTool
    }, () => {
      this.props.onGeneralSettingsUpdated('isDrawToolActive', this.state.drawToggleTool)
    })
  }

  setDrawTool = (drawTool: boolean) => {
    this.setState({
      drawToggleTool: drawTool
    }, () => {
      this.props.onGeneralSettingsUpdated('isSelectToolActive', this.state.selectToggleTool)
    })
  }

  selectToolStateChange = (evt: any) => {
    if (evt.target.checked) {
      this.setState({
        drawToggleTool: false,
        selectToggleTool: true
      }, () => {
        this.props.onGeneralSettingsUpdated('isSelectToolActive', this.state.selectToggleTool)
      })
    } else {
      this.setState({
        drawToggleTool: this.state.drawToggleTool,
        selectToggleTool: false
      }, () => {
        this.props.onGeneralSettingsUpdated('isSelectToolActive', this.state.selectToggleTool)
      })
    }
  }

  drawToolStateChange = (evt: any) => {
    if (evt.target.checked) {
      this.setState({
        selectToggleTool: false,
        drawToggleTool: true
      }, () => {
        this.props.onGeneralSettingsUpdated('isDrawToolActive', this.state.drawToggleTool)
      })
    } else {
      this.setState({
        drawToggleTool: false,
        selectToggleTool: this.state.selectToggleTool
      }, () => {
        this.props.onGeneralSettingsUpdated('isDrawToolActive', this.state.drawToggleTool)
      })
    }
  }

  onToggleAppearance = () => {
    this.setState({
      isAppearanceSettingsOpen: !this.state.isAppearanceSettingsOpen
    })
  }

  onShowGridChange = (evt: any) => {
    this.props.onGeneralSettingsUpdated('showGridAxis', evt.target.checked)
  }

  onShowAxisTitlesChange = (evt: any) => {
    this.props.onGeneralSettingsUpdated('showAxisTitles', evt.target.checked)
  }

  legendStateChange = (evt: any) => {
    this.props.onGeneralSettingsUpdated('showLegend', evt.target.checked)
  }

  render () {
    return <div style={{ height: '100%', width: '100%', marginTop: 5 }} css={getGeneralSettingsStyle(this.props.theme)}>
      <SettingRow>
        <Label tabIndex={0} aria-label={this.nls('activateToolOnLoadLabel')} className='w-100 d-flex' >
          <div className='flex-grow-1 text-break'>
            {this.nls('activateToolOnLoadLabel')}
          </div>
        </Label>
        <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('activateToolOnLoadTooltip')}
          title={this.nls('activateToolOnLoadTooltip')} showArrow placement='top'>
          <div className='ml-2 d-inline ep-tooltip'>
            <Icon size={14} icon={epConfigIcon.infoIcon} />
          </div>
        </Tooltip>
      </SettingRow>

      {this.props.currentDs !== 'default' &&
        <SettingRow label={this.nls('selectTool')}>
          <Switch role={'switch'} aria-label={this.nls('selectTool')} title={this.nls('selectTool')}
            checked={this.state.selectToggleTool} onChange={this.selectToolStateChange} />
        </SettingRow>
      }

      <SettingRow label={this.nls('drawTool')}>
        <Switch role={'switch'} aria-label={this.nls('drawTool')} title={this.nls('drawTool')}
         checked={this.state.drawToggleTool} onChange={this.drawToolStateChange} />
      </SettingRow>

      <SettingRow>
        <SettingCollapse
          label={this.nls('appearanceCollapsible')}
          isOpen={this.state.isAppearanceSettingsOpen}
          onRequestOpen={() => this.onToggleAppearance()}
          onRequestClose={() => this.onToggleAppearance()}>
          <div style={{ height: '100%', marginTop: 10 }}>

            <SettingRow label={this.nls('showChartGridsLabel')}>
              <Switch role={'switch'} aria-label={this.nls('showChartGridsLabel')}
                title={this.nls('showChartGridsLabel')}
                checked={this.props.config.showGridAxis}
                onChange={this.onShowGridChange} />
            </SettingRow>

            <SettingRow label={this.nls('showChartAxisTitlesLabel')}>
              <Switch role={'switch'} aria-label={this.nls('showChartAxisTitlesLabel')}
                title={this.nls('showChartAxisTitlesLabel')}
                checked={this.props.config.showAxisTitles}
                onChange={this.onShowAxisTitlesChange} />
            </SettingRow>

            <SettingRow label={this.nls('showLegend')}>
              <Switch role={'switch'} aria-label={this.nls('showLegend')}
                title={this.nls('showLegend')}
                checked={this.props.config.showLegend}
                onChange={this.legendStateChange} />
            </SettingRow>
          </div>
        </SettingCollapse>
      </SettingRow>
    </div>
  }
}
