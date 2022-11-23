/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, ThemeVariables, IntlShape, classNames } from 'jimu-core'
import { Label, AlertPopup, Button, Switch, Select, Option, Tooltip, Radio, Icon, TextArea, TextInput, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { getPopupStyle, getProfileChartStyle } from '../lib/style'
import defaultMessages from '../translations/default'
import { ColorPicker } from 'jimu-ui/basic/color-picker'
import { ProfileChart, Statistics } from '../../config'
import { unitOptions, getConfigIcon } from '../constants'
import StatisticsList from './common-statistics-list'
import Portal from 'esri/portal/Portal'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'

const { epConfigIcon } = getConfigIcon()

//regular expression for validating the elevation service url
const urlRegExString = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  currentDs: string
  config: ProfileChart
  portalSelf: Portal
  groundLayerInfo: any[]
  isRTL: boolean
  onProfileChartSettingsUpdated: (prop: string, value: string | boolean | Statistics[]) => void
}

interface IState {
  elevationLayerURL: string
  updateElevationLayerURL: string
  isGroundDisabled: boolean
  groundElevationLayer: string
  elevationUnit: string
  linearUnit: string
  isInvalidValue: boolean
  isAlertPopupOpen: boolean
  apiLoaded: boolean
}

export default class ProfileChartSettings extends React.PureComponent<Props, IState> {
  readonly elevationTextBox = React.createRef<HTMLInputElement>()
  esriRequest: typeof __esri.request
  constructor (props) {
    super(props)
    this.elevationTextBox = React.createRef<HTMLInputElement>()

    //get the configured units
    let configuredElevationUnit = this.props.config.elevationUnit
    let configuredLinearUnit = this.props.config.linearUnit
    //if configured units are empty set the units based on portal units
    if (this.props.config.elevationUnit === '') {
      if (this.props.portalSelf?.units === 'english') {
        configuredElevationUnit = 'feet'
      } else {
        configuredElevationUnit = 'meters'
      }
    }

    if (this.props.config.linearUnit === '') {
      if (this.props.portalSelf?.units === 'english') {
        configuredLinearUnit = 'miles'
      } else {
        configuredLinearUnit = 'kilometers'
      }
    }
    let groundDisabled: boolean = false
    let groundLayer: string = ''
    this.props.groundLayerInfo.forEach((data) => {
      if (data.dataSourceId === this.props.currentDs) {
        groundDisabled = data.isGroundElevationLayerExists
        groundLayer = data.groundElevationLayerUrl
      }
    })

    this.state = {
      apiLoaded: false,
      elevationLayerURL: this.props.config.elevationLayerURL,
      updateElevationLayerURL: this.props.config.elevationLayerURL,
      isGroundDisabled: !groundDisabled,
      groundElevationLayer: groundLayer,
      elevationUnit: configuredElevationUnit,
      linearUnit: configuredLinearUnit,
      isInvalidValue: false,
      isAlertPopupOpen: false
    }
  }

  setLinearUnit = (configuredLinearUnit: string) => {
    if (configuredLinearUnit === '') {
      if (this.props.portalSelf?.units === 'english') {
        configuredLinearUnit = 'miles'
      } else {
        configuredLinearUnit = 'kilometers'
      }
    }
    this.setState({
      linearUnit: configuredLinearUnit
    })
  }

  setElevationUnit = (configuredElevationUnit: string) => {
    if (configuredElevationUnit === '') {
      if (this.props.portalSelf?.units === 'english') {
        configuredElevationUnit = 'feet'
      } else {
        configuredElevationUnit = 'meters'
      }
    }
    this.setState({
      elevationUnit: configuredElevationUnit
    })
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

  componentDidMount = () => {
    if (!this.state.apiLoaded) {
      this.loadAPIModule()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.config.elevationUnit !== this.props.config.elevationUnit) {
      this.setElevationUnit(this.props.config.elevationUnit)
    }
    if (prevProps.config.linearUnit !== this.props.config.linearUnit) {
      this.setLinearUnit(this.props.config.linearUnit)
    }
  }

  loadAPIModule = async () => {
    if (!this.state.apiLoaded) {
      return await loadArcGISJSAPIModules([
        'esri/request'
      ]).then(modules => {
        [this.esriRequest] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
    return Promise.resolve()
  }

  //Update the config values when the values are modified
  onLinearUnitChange = (evt: any) => {
    this.setState({
      linearUnit: evt.target.value
    }, () => {
      this.props.onProfileChartSettingsUpdated('linearUnit', this.state.linearUnit)
    })
  }

  onElevationUnitChange = (evt: any) => {
    this.setState({
      elevationUnit: evt.target.value
    }, () => {
      this.props.onProfileChartSettingsUpdated('elevationUnit', this.state.elevationUnit)
    })
  }

  onSetButtonClicked = () => {
    this.setState({
      isAlertPopupOpen: true,
      isInvalidValue: false
    }, () => {
      setTimeout(() => {
        //for setting the cursor to the front of textbox
        const ua = window.jimuUA.browser ? (window.jimuUA.browser.name + '').toLowerCase() : ''
        if (ua === 'chrome' || ua === 'microsoft edge') {
          this.elevationTextBox.current.selectionStart = this.elevationTextBox.current.selectionEnd = 0
          this.elevationTextBox.current.focus()
        } else {
          if (this.props.isRTL) {
            this.elevationTextBox.current.focus()
          } else {
            this.elevationTextBox.current.selectionStart = this.elevationTextBox.current.selectionEnd = 0
            this.elevationTextBox.current.focus()
          }
        }
      }, 1000)
    })
    setTimeout(() => {
      const currValue = this.state.elevationLayerURL
      this.setState({
        updateElevationLayerURL: currValue
      })
    }, 500)
  }

  onAlertOkButtonClicked = () => {
    if (this.elevationTextBox.current.value === '') {
      return
    }
    //Check if valid url is entered, if not then don't hide the Alert popup on ok button
    if (!this.state.isInvalidValue) {
      this.setState({
        elevationLayerURL: this.elevationTextBox.current.value
      })
      this.props.onProfileChartSettingsUpdated('elevationLayerURL', this.elevationTextBox.current.value)
      this.onAlertCloseButtonClicked()
    }
  }

  onAlertCloseButtonClicked = () => {
    this.setState({
      isAlertPopupOpen: false
    })
  }

  onInputChange = (value: string) => {
    return new Promise((resolve) => {
      this.setState({
        updateElevationLayerURL: value
      })
      if (value && urlRegExString.test(value)) {
        // validate the elevation service url on change of user input url
        this._validateElevationService(value).then((isInvalidValue: boolean) => {
          this.setState({
            isInvalidValue: isInvalidValue
          }, () => {
            resolve(this.state.isInvalidValue)
          })
        })
      } else {
        this.setState({
          isInvalidValue: true
        }, () => {
          resolve(this.state.isInvalidValue)
        })
      }
    })
  }

  _validateElevationService = async (value: string) => {
    return new Promise((resolve) => {
      try {
        this.esriRequest(value, {
          query: {
            f: 'json'
          },
          responseType: 'json'
        }).then((result) => {
          let isInvalidValue = true
          //validate elevation layer with its type
          if (result?.data?.cacheType === 'Elevation') {
            isInvalidValue = false
          }
          resolve(isInvalidValue)
        }, (err) => {
          console.error(err)
          resolve(true)
        })
      } catch (e) {
        console.error(e)
        resolve(true)
      }
    })
  }

  ondisplayGroundProfileStatsChange = (evt: any) => {
    this.props.onProfileChartSettingsUpdated('displayStatistics', evt.target.checked)
  }

  onGroundColorChange = (color: string) => {
    this.props.onProfileChartSettingsUpdated('groundColor', color)
  }

  onHighlightGraphicsColorChange = (color: string) => {
    this.props.onProfileChartSettingsUpdated('graphicsHighlightColor', color)
  }

  handleIsUseCustomElevation = (isCustom: boolean) => {
    if (!isCustom) {
      setTimeout(() => {
        this.props.onProfileChartSettingsUpdated('elevationLayerURL', this.state.groundElevationLayer)
      }, 50)
    } else {
      setTimeout(() => {
        this.props.onProfileChartSettingsUpdated('elevationLayerURL', this.state.updateElevationLayerURL)
      }, 50)
    }
    this.props.onProfileChartSettingsUpdated('isCustomElevationLayer', isCustom)
  }

  updateStatistics = (newStatistics: Statistics[]) => {
    this.props.onProfileChartSettingsUpdated('selectedStatistics', newStatistics)
  }

  render () {
    return <div style={{ height: '100%', width: '100%', marginTop: 5 }} css={getProfileChartStyle(this.props.theme)}>
      <div>
        <SettingRow>
          <Label tabIndex={0} aria-label={this.nls('elevationLayerLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('elevationLayerLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('elevationLayerTooltip')}
            title={this.nls('elevationLayerTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            <div className='align-items-center d-flex'>
              <Radio role={'radio'} disabled={this.state.isGroundDisabled}
                className={'cursor-pointer'} onChange={() => this.handleIsUseCustomElevation(false)}
                checked={!this.props.config.isCustomElevationLayer}
                title={this.nls('useDefaultGround')}
                aria-label={this.nls('useDefaultGround')}
              />
              <label className={classNames('m-0 ml-2 text-break cursor-pointer', this.state.isGroundDisabled ? 'disabled-label' : ' color-label')}
                onClick={() => !this.state.isGroundDisabled && this.handleIsUseCustomElevation(false)}>
                {this.nls('useDefaultGround')}
              </label>
            </div>
          </div>
        </SettingRow>

        <SettingRow>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            <div className='align-items-center d-flex'>
              <Radio role={'radio'}
                className={'cursor-pointer'} onChange={() => this.handleIsUseCustomElevation(true)}
                checked={this.props.config.isCustomElevationLayer}
                aria-expanded={this.props.config.isCustomElevationLayer}
                title={this.nls('useCustomElevation')}
                aria-label={this.nls('useCustomElevation')}
              />
              <label className='m-0 ml-2 text-break cursor-pointer color-label' onClick={() => this.handleIsUseCustomElevation(true)}>
                {this.nls('useCustomElevation')}
              </label>
            </div>
          </div>
        </SettingRow>

        {this.props.config.isCustomElevationLayer &&
          <div className={'pb-3 pt-3'}>
            <SettingRow>
              <TextArea role={'textarea'} aria-label={this.state.elevationLayerURL}
                style={{ height: 76 }} className='w-100' spellCheck={false}
                value={this.state.elevationLayerURL}
                onClick={e => e.currentTarget.select()} readOnly
              />
            </SettingRow>

            <SettingRow>
              <Button role={'button'} aria-label={this.nls('setServiceLabel')} className={'w-100 text-dark text-break'}
                type={'primary'} onClick={this.onSetButtonClicked.bind(this)}>
                {this.nls('setServiceLabel')}
              </Button>
            </SettingRow>
          </div>
        }

        <SettingRow className={'pt-3 ep-divider-top'}>
          <Label tabIndex={0} aria-label={this.nls('measurementUnitsHeadingLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('measurementUnitsHeadingLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('measurementUnitsHeadingTooltip')}
            title={this.nls('measurementUnitsHeadingTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow>
          <Label tabIndex={0} aria-label={this.nls('elevationUnitLabel')} style={{ width: 108 }} className='d-flex'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('elevationUnitLabel')}
            </div>
          </Label>
          <Select menuRole={'menu'} aria-label={this.state.elevationUnit} className={'selectOption'} size={'sm'}
            name={'elevationUnit'} value={this.state.elevationUnit} onChange={this.onElevationUnitChange}>
            {unitOptions.map((option, index) => {
              return <Option role={'option'} aria-label={option.value} key={index} value={option.value}>{this.nls(option.value)}</Option>
            })}
          </Select>
        </SettingRow>

        <SettingRow>
          <Label tabIndex={0} aria-label={this.nls('distanceUnitLabel')} style={{ width: 108 }} className='d-flex'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('distanceUnitLabel')}
            </div>
          </Label>
          <Select menuRole={'menu'} aria-label={this.state.linearUnit} className={'selectOption'} size={'sm'}
            name={'linearUnit'} value={this.state.linearUnit} onChange={this.onLinearUnitChange}>
            {unitOptions.map((option, index) => {
              return <Option role={'option'} aria-label={option.value} key={index} value={option.value}>{this.nls(option.value)}</Option>
            })}
          </Select>
        </SettingRow>

        <SettingRow className={'pt-3 ep-divider-top'}>
          <Label tabIndex={0} aria-label={this.nls('styleLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('styleLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('styleGroundTooltip')}
            title={this.nls('styleGroundTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow label={this.nls('groundColor')}>
          <ColorPicker aria-label={this.nls('groundColor')} title={this.nls('groundColor')} placement={'top'}
            offset={[0, 0]} showArrow color={this.props.config.groundColor ? this.props.config.groundColor : '#b54900'}
            onChange={this.onGroundColorChange} />
        </SettingRow>

        {this.props.currentDs !== 'default' &&
          <SettingRow label={this.nls('chooseHighlightColor')}>
            <ColorPicker aria-label={this.nls('chooseHighlightColor')} title={this.nls('chooseHighlightColor')} placement={'top'}
              offset={[0, 0]} showArrow color={this.props.config.graphicsHighlightColor ? this.props.config.graphicsHighlightColor : '#b54900'}
              onChange={this.onHighlightGraphicsColorChange} />
          </SettingRow>
        }

        <SettingRow className={'pt-3 ep-divider-top'}>
          <Label tabIndex={0} aria-label={this.nls('displayGroundProfileStatsLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('displayGroundProfileStatsLabel')}
            </div>
          </Label>
          <Switch role={'switch'} aria-label={this.nls('displayGroundProfileStatsLabel')}
            title={this.nls('displayGroundProfileStatsLabel')}
            checked={this.props.config.displayStatistics}
            onChange={this.ondisplayGroundProfileStatsChange} />
        </SettingRow>

        {this.props.config.displayStatistics &&
          <div>
            <StatisticsList intl={this.props.intl} theme={this.props.theme}
              availableStatistics={this.props.config.selectedStatistics}
              onStatsListUpdated={this.updateStatistics} />
          </div>
        }
      </div>

      {/* Popup dialog for selecting the valid elevation layer */}
      <AlertPopup isOpen={this.state.isAlertPopupOpen} css={getPopupStyle(this.props.theme)}
        onClickOk={this.onAlertOkButtonClicked.bind(this)} onClickClose={this.onAlertCloseButtonClicked}
        title={this.props.intl ? this.nls('alertPopupTitle') : ''}>
        <div className={'popupContents'}>
          <div className={'alertValidationContent'}>
            <TextInput className={this.state.isInvalidValue ? 'elevationUrlTextInput w-100 is-invalid' : 'elevationUrlTextInput w-100 is-valid'}
              size={'sm'} type='text' ref={this.elevationTextBox}
              value={this.state.updateElevationLayerURL} onChange={(evt: any) => this.onInputChange(evt.currentTarget.value)} />
            <div className={this.state.isInvalidValue ? 'invalidServiceURL elevationErrorMessage text-truncate' : 'validServiceURL text-truncate'}>
              {this.nls('invalidElevationLayerURL')}
            </div>
          </div>
        </div>
      </AlertPopup>
    </div>
  }
}
