/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, IntlShape, urlUtils, ThemeVariables, defaultMessages as jimuCoreDefaultMessages } from 'jimu-core'
import { SidePopper, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Button, Icon } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { getOutputSettingsStyle, getStyleForEditHeader } from '../lib/style'
import CoordinateTable from './coordinate-table'
import OutputSettingPopper from './output-settings-popper'
import { OutputSettings } from '../../config'
import AddPopper from '../components/add-popper'

const IconClose = require('jimu-ui/lib/icons/close-16.svg')
const IconAdd = require('../assets/add.svg')

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  allSupportedFormats: OutputSettings[]
  config: OutputSettings[]
  onOutputSettingsUpdated: (prop: string, value: OutputSettings[]) => void
}

interface State {
  newAddedConversions: OutputSettings[]
  isAddConversionPopupOpen: boolean
  showOutputSettingsPopper: boolean
  outputSettingsTable: OutputSettings[]
}

export default class OutputSetting extends React.PureComponent<Props, State> {
  sidePopperTrigger = React.createRef<HTMLDivElement>()
  constructor (props) {
    super(props)
    this.state = {
      newAddedConversions: this.props.config.length > 0 ? this.props.config : this.props.allSupportedFormats,
      isAddConversionPopupOpen: false,
      showOutputSettingsPopper: false,
      outputSettingsTable: null
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuCoreDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  componentDidUpdate = (prevProps) => {

  }

  onEditButtonClicked = (): void => {
    this.setState({
      showOutputSettingsPopper: !this.state.showOutputSettingsPopper
    })
  }

  closeOutputSettingPopper = () => {
    this.setState({
      showOutputSettingsPopper: false
    })
  }

  onSettingsUpdate = (outputSettings) => {
    this.setState({
      outputSettingsTable: outputSettings,
      newAddedConversions: outputSettings
    })
    this.props.onOutputSettingsUpdated('outputSettings', outputSettings)
  }

  onAddClick = () => {
    this.setState({
      isAddConversionPopupOpen: true
    })
  }

  addNewConversion = (formatName: string, label: string, currentPattern: string, addAtTheTop: boolean) => {
    const newFormatParams: OutputSettings = {
      name: formatName,
      label: label,
      defaultPattern: currentPattern,
      currentPattern: currentPattern,
      enabled: true,
      isCustom: true
    }

    if (addAtTheTop) {
      this.setState({
        newAddedConversions: [newFormatParams, ...this.state.newAddedConversions]
      }, () => {
        this.setState({
          outputSettingsTable: this.state.newAddedConversions
        })
        this.props.onOutputSettingsUpdated('outputSettings', this.state.newAddedConversions)
      })
    } else {
      this.setState({
        newAddedConversions: [...this.state.newAddedConversions, newFormatParams]
      }, () => {
        this.setState({
          outputSettingsTable: this.state.newAddedConversions
        })
        this.props.onOutputSettingsUpdated('outputSettings', this.state.newAddedConversions)
      })
    }
  }

  onAddPopperClose = () => {
    this.setState({
      isAddConversionPopupOpen: false
    })
  }

  render () {
    return <div css={getOutputSettingsStyle(this.props.theme)} style={{ height: '100%', width: '100%', marginTop: '5px' }}>
      <SettingRow>
        <div title={this.nls('addNewLabels')} className=" d-flex align-items-center add-conversion"
          onClick={this.onAddClick.bind(this)}>
          <div className="add-conversion-icon-container d-flex align-items-center justify-content-center mr-2">
            <Icon icon={IconAdd} size={12} />
          </div>
          <div className="text-truncate flex-grow-1">{this.nls('addNewLabels')}</div></div>
      </SettingRow>

      {this.state.newAddedConversions &&
        <div ref={this.sidePopperTrigger}>
          <CoordinateTable
            allSupportedFormats={this.state.newAddedConversions}
            intl={this.props.intl}
            theme={this.props.theme}
            onEditClick={this.onEditButtonClicked.bind(this)}
            onSettingsUpdate={this.onSettingsUpdate.bind(this)}
          />
        </div>
      }
      {
        <SidePopper isOpen={this.state.showOutputSettingsPopper && !urlUtils.getAppIdPageIdFromUrl().pageId} position={'right'} toggle={this.closeOutputSettingPopper.bind(this)}
          trigger={this.sidePopperTrigger?.current}
        >
          <div className={'w-100 h-100'} css={getStyleForEditHeader(this.props.theme)}>
            <div className={'w-100 h-100 layer-item-panel'}>
              <div className={'w-100 d-flex align-items-center justify-content-between setting-header setting-title pb-2'}>
                <h5 tabIndex={0} title={this.nls('editOutputFormats')} className={'text-truncate layer-item-label mt-2'}>{this.nls('editOutputFormats')}</h5>
                <Button role={'button'} aria-label={this.nls('close')} className={'ml-2'} icon type={'tertiary'} size={'sm'} onClick={this.closeOutputSettingPopper.bind(this)}>
                  <Icon icon={IconClose} size={16} /></Button>
              </div>
              <div className={'setting-container'}>
                <OutputSettingPopper
                  intl={this.props.intl}
                  theme={this.props.theme}
                  config={this.state.outputSettingsTable}
                  onSettingsUpdate={this.onSettingsUpdate.bind(this)}
                />
              </div>
            </div>
          </div>
        </SidePopper>
      }

      {/* Dialog for selecting new format to be added */}
      {this.state.isAddConversionPopupOpen && this.props.allSupportedFormats && this.props.allSupportedFormats.length > 0 &&
        <AddPopper
          supportedFormats={this.props.allSupportedFormats.filter((format) => { return format.name !== 'address' })}
          theme={this.props.theme}
          intl={this.props.intl}
          isOpen={this.state.isAddConversionPopupOpen}
          onOkClick={this.addNewConversion.bind(this)}
          onClose={this.onAddPopperClose.bind(this)}>
        </AddPopper>
      }
    </div>
  }
}
