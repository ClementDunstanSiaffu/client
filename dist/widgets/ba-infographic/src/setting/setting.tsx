/** @jsx jsx */
import { React, jsx, css } from 'jimu-core'
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder'
import { SettingSection, SettingRow, MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { TextInput, Select, Switch, Label, Radio, Button } from 'jimu-ui'
import defaultMessages from './translations/default'
import { getStyle } from './lib/style'
import { ReportListAccordion } from '../business-analyst-components/components.js'
import { ColorPicker, ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import '../business-analyst-components/stencil-components/dist/assets/css/calcite.css'
import { RefreshOutlined } from 'jimu-icons/outlined/editor/refresh'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<any>, any> {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
      showAccordian: false,
      infographicLatitude: props.config.infographicLatitude,
      infographicLongitude: props.config.infographicLongitude,
      langCode: props.config.langCode,
      runReportOnClick: props.config.runReportOnClick,
      showSearch: props.config.showSearch,
      zoomLevel: props.config.zoomLevel,
      country: props.config.country,
      bufferType: props.config.bufferType,
      bufferSize1: props.config.bufferSize1,
      bufferSize2: props.config.bufferSize2,
      bufferSize3: props.config.bufferSize3,
      bufferUnits: props.config.bufferUnits,
      displayHeader: props.config.displayHeader,
      viewMode: props.config.viewMode,
      selectedReport: props.config.selectedReport,
      backgroundColor: props.config.backgroundColor,
      headerColor: props.config.headerColor,
      imageExport: props.config.imageExport,
      pdf: props.config.pdf,
      dynamicHtml: props.config.dynamicHtml,
      print: props.config.print,
      excel: props.config.excel,
      fullscreen: props.config.fullscreen,
      countries: null,
      error: null,
      showHeaderSettings: typeof this.props.config.displayHeader !== 'undefined' ? this.props.config.displayHeader : true
    }
  }

  presetColors = [
    { label: '#525659', value: '#525659', color: '#525659' },
    { label: '#0079C1', value: '#0079C1', color: '#0079C1' },
    { label: '#FFFFFF', value: '#FFFFFF', color: '#FFFFFF' }
  ]

  componentWillMount (): void {
    if (typeof this.props.config.bufferType === 'undefined') {
      this.initSettings('bufferType', 'miles')
    }
    if (typeof this.props.config.viewMode === 'undefined') {
      this.initSettings('viewMode', 'full')
    }
    if (typeof this.props.config.infographicLatitude === 'undefined') {
      this.initSettings('infographicLatitude', '34.057170')
    }
    if (typeof this.props.config.infographicLongitude === 'undefined') {
      this.initSettings('infographicLongitude', '-117.194150')
    }
    if (typeof this.props.config.bufferSize1 === 'undefined' && typeof this.props.config.bufferSize2 === 'undefined' && typeof this.props.config.infographicLongitude === 'undefined') {
      this.initSettings('bufferSize1', '1')
      this.initSettings('bufferSize2', '3')
      this.initSettings('bufferSize3', '5')
    }
    if (typeof this.props.config.bufferType === 'undefined') {
      this.initSettings('bufferType', 'ring')
    }
    if (typeof this.props.config.bufferUnits === 'undefined') {
      this.initSettings('bufferUnits', 'miles')
    }
    if (typeof this.props.config.langCode === 'undefined') {
      this.initSettings('langCode', 'US')
    }
    if (typeof this.props.config.backgroundColor === 'undefined') {
      this.initSettings('backgroundColor', '#525659')
    }
    if (typeof this.props.config.selectedReport === 'undefined') {
      this.initSettings('selectedReport', 'b737042ee11d4d19ba938a3ca333e673')
    }
    if (typeof this.props.config.selectedReport === 'undefined') {
      this.initSettings('selectedReport', 'b737042ee11d4d19ba938a3ca333e673')
    }
    if (typeof this.props.config.runReportOnClick === 'undefined') {
      this.initSettings('runReportOnClick', true)
    }
    if (typeof this.props.config.showSearch === 'undefined') {
      this.initSettings('showSearch', true)
    }
    if (typeof this.props.config.displayHeader === 'undefined') {
      this.initSettings('displayHeader', true)
    }
    if (typeof this.props.config.headerColor === 'undefined') {
      this.initSettings('headerColor', '#0079C1')
    }
    if (typeof this.props.config.headerTextColor === 'undefined') {
      this.initSettings('headerTextColor', '#FFFFFF')
    }
    if (typeof this.props.config.imageExport === 'undefined') {
      this.initSettings('imageExport', true)
    }
    if (typeof this.props.config.pdf === 'undefined') {
      this.initSettings('pdf', true)
    }
    if (typeof this.props.config.dynamicHtml === 'undefined') {
      this.initSettings('dynamicHtml', true)
    }
    if (typeof this.props.config.excel === 'undefined') {
      this.initSettings('excel', true)
    }
    if (typeof this.props.config.print === 'undefined') {
      this.initSettings('print', true)
    }
    if (typeof this.props.config.fullscreen === 'undefined') {
      this.initSettings('fullscreen', true)
    }
    if (typeof this.props.config.zoomLevel === 'undefined') {
      this.initSettings('zoomLevel', false)
    }
  }

  componentDidMount () {
    this.updatePlaceholders()

    window.addEventListener('reportSelected', (e: any) => {
      if (this.props.id && (this.props.id === e.detail.id)) {
        this.onChangeReport(e.detail.value)
        this.onPreviewClick()
      }
    })

    const loadScript = function (src) {
      const tag = document.createElement('script')
      tag.async = false
      tag.src = src
      tag.type = 'module'
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(tag)
    }

    loadScript('https://js.arcgis.com/calcite-components/1.0.0-beta.69/calcite.esm.js')

    fetch('https://geoenrich.arcgis.com/arcgis/rest/services/World/GeoEnrichmentServer/Geoenrichment/countries?f=pjson')
      .then((response) => response.json()) //2
      .then(
        (data: any) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true,
            countries: data.countries
          }))
        },
        (error) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true,
            error
          }))
        }
      )
  }

  onPreviewClick = () => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.state
    })
  }

  initSettings = (name, value) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  handleSettingChange = (e: any) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // onBufferSizeChange = (e: any) => {
  //   const name = e.currentTarget.name
  //   const value = e.currentTarget.value
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }))
  //   this.updatePlaceholders()
  // }

  showAccordian = () => {
    this.setState((prevState) => ({
      ...prevState,
      showAccordian: !this.state.showAccordian
    }))
  }

  updatePlaceholders = () => {
    const bufferSizes = document.querySelectorAll('.bufferInput')
    let showPlaceholders = true
    for (let i = 0; i < bufferSizes.length; i++) {
      const bufferInput = bufferSizes[i].firstChild.firstChild
      // @ts-expect-error
      bufferInput.placeholder = ''
      // @ts-expect-error
      if (bufferInput.value !== '') { showPlaceholders = false }
    }
    if (showPlaceholders) {
      const defaultBuffers = '1,3,5'
      for (let i = 0; i < bufferSizes.length; i++) {
        const bufferInput = bufferSizes[i].firstChild.firstChild
        // @ts-expect-error
        bufferInput.placeholder = defaultBuffers.split(',')[i]
      }
    }
  }

  onToggleChanged = (checked: any, name: any): void => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: checked
    }))
    if (name === 'displayHeader') {
      this.setState((prevState) => ({
        ...prevState,
        showHeaderSettings: !this.state.showHeaderSettings
      }))
    }
  }

  handleBufferTypeChange = (e: any): void => {
    const value = e.target.id
    this.setState((prevState) => ({
      ...prevState,
      bufferType: value
    }))
  }

  changeBufferUnit = (unit) => {
    this.setState((prevState) => ({
      ...prevState,
      bufferUnits: unit
    }))
  }

  onBufferUnitSelectChanged = (e: any) => {
    const selectedValue = e.currentTarget.value
    this.changeBufferUnit(selectedValue)
  }

  onCountrySelectChanged = (e: any) => {
    const value = e.target.value
    this.setState((prevState) => ({
      ...prevState,
      langCode: value,
      showAccordian: false
    }))
  }

  onViewModeChange = (e: any) => {
    const value = e.target.value
    this.setState((prevState) => ({
      ...prevState,
      viewMode: value
    }))
  }

  updateBackgroundColor = (color: string) => {
    this.setState((prevState) => ({
      ...prevState,
      backgroundColor: color
    }))
  }

  updateHeaderColor = (color: string) => {
    this.setState((prevState) => ({
      ...prevState,
      headerColor: color
    }))
  }

  updateHeaderTextColor = (color: string) => {
    this.setState((prevState) => ({
      ...prevState,
      headerTextColor: color
    }))
  }

  // onMapWidgetSelected = (useMapWidgetIds: string[]) => {
  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     useMapWidgetIds: useMapWidgetIds
  //   })
  // }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    const self = this
    self.props.onSettingChange({
      id: self.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
    if (useMapWidgetIds.length) {
      const mapWidget = useMapWidgetIds.toString()
      const appConfigActions = getAppConfigAction()
      const appConfig = appConfigActions.appConfig
      const widgetConfig = appConfig.widgets[useMapWidgetIds[0]].config
      self.props.onSettingChange({
        id: mapWidget,
        config: {
          ...widgetConfig,
          toolConifg: {
            ...widgetConfig.toolConifg,
            canSearch: false
          }
        }
      })
    }
  }

  // onMapWidgetSelected = (useMapWidgetIds: string[]) => {
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     useMapWidgetIds: useMapWidgetIds
  //   }))
  // }

  onChangeReport = (selectedValue: string) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedReport: selectedValue
    }))
  }

  localeString = (s) => {
    // Get the thousands and decimal separator characters used in the locale.
    return s
    // if (s && (s.length > 0)) {
    //   if (s === '-') {
    //     return s
    //   }
    //   const locale = this.state.langCode
    //   const [,thousandsSeparator,,,,decimalSeparator] = 1111.1.toLocaleString(locale)
    //   // Remove thousand separators, and put a point where the decimal separator occurs
    //   s = Array.from(s, c => c === thousandsSeparator
    //     ? ''
    //     : c === decimalSeparator ? '.' : c).join('')
    //   // Now it can be parsed
    //   s = parseFloat(s)
    //   if (!isNaN(s)) {
    //     return s
    //   } else {
    //     return ''
    //   }
    // } else {
    //   return ''
    // }
  }

  stringifyTheme = () => {
    // Theme colors should match ExB
    const themeString = {
      brand: 'rgba(0, 170, 187,1)',
      foreground: 'rgba(24, 24, 24, 1)',
      text1: 'rgba(0, 170, 187,1)',
      text2: 'rgba(168,168,168,1)',
      text3: 'rgba(255,255,255,1)',
      border: 'rgba(106, 106, 106, 1)'
    }
    return JSON.stringify(themeString)
  }

  render () {
    const style = css`
      .widget-setting-get-map-coordinates {
        .checkbox-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
      }
    `
    return (

      <div css={getStyle(this.props.theme)}>
        <div className='widget-setting-bao' style={{ display: 'relative' }}>
          <SettingSection
            className='map-selector-section'
            title={this.props.intl.formatMessage({
              id: 'selectMapWidget',
              defaultMessage: defaultMessages.selectMapWidget
            })}
          >
            <div css={style}>
              <div className='widget-setting-get-map-coordinates'>
                <SettingRow>
                  <MapWidgetSelector
                    onSelect={this.onMapWidgetSelected}
                    useMapWidgetIds={this.props.useMapWidgetIds}
                  />
                </SettingRow>
              </div>
            </div>
          </SettingSection>
          <SettingSection title={<div className='w-100 d-flex' style={{ height: '23px', flexFlow: 'column wrap', alignContent: 'space-between' }}>
            <div className='text-truncate py-1'>
              {this.props.intl.formatMessage({ id: 'locationSettings', defaultMessage: defaultMessages.locationSettings })}
            </div>
          </div>}>
            {/* Default Lat/Long is Esri Headquarters */}
            <SettingRow flow='no-wrap' label={this.props.intl.formatMessage({ id: 'latitude', defaultMessage: defaultMessages.latitude })}>
              <TextInput name='infographicLatitude' data-key='infographicLatitude' style={{ width: '50%' }} className='cursor-pointer inline' size='sm' value={this.localeString(this.state.infographicLatitude)} onChange={this.handleSettingChange} />
            </SettingRow>
            <SettingRow flow='no-wrap' label={this.props.intl.formatMessage({ id: 'longitude', defaultMessage: defaultMessages.longitude })}>
              <TextInput name='infographicLongitude' data-key='infographicLongitude' style={{ width: '50%' }} className='cursor-pointer inline' size='sm' value={this.localeString(this.state.infographicLongitude)} onChange={this.handleSettingChange} />
            </SettingRow>
            <SettingRow flow='wrap' label={this.props.intl.formatMessage({ id: 'selectCountry', defaultMessage: defaultMessages.selectCountry })}>
              {/* {(!this.state.showAccordian) && (
                <React.Fragment>
                  {this.state.country} <Button onClick={this.showAccordian} style={{ marginLeft: '20px' }}>Change</Button>
                </React.Fragment>
              )}
              {(this.state.showAccordian) && ( */}
                {/* <React.Fragment> */}
                  <Select name='langCode' size='sm' value={this.state.langCode} onChange={this.onCountrySelectChanged}>
                    {this.state.countries && this.state.countries.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>{country.name}</option>
                      )
                    })}
                  </Select>
                {/* </React.Fragment> */}
              {/* )} */}
            </SettingRow>
          </SettingSection>
          <SettingSection title={<div className='w-100 d-flex' style={{ height: '23px', flexFlow: 'column wrap', alignContent: 'space-between' }}>
            <div className='text-truncate py-1'>
              {this.props.intl.formatMessage({ id: 'bufferType', defaultMessage: defaultMessages.bufferType })}
            </div>
          </div>}>
            <SettingRow className='mt-2'>
              <Radio checked={!this.state.bufferType || this.state.bufferType === 'ring'} id='ring' style={{ cursor: 'pointer' }} onChange={(e) => { this.handleBufferTypeChange(e); this.changeBufferUnit('miles') }} />
              <Label style={{ cursor: 'pointer' }} for='ring' className='ml-1 text-break'>{this.props.intl.formatMessage({ id: 'rings', defaultMessage: defaultMessages.rings })}</Label>
            </SettingRow>
            <SettingRow className='mt-2'>
              <Radio checked={this.state.bufferType === 'drivetime'} id='drivetime' style={{ cursor: 'pointer' }} onChange={(e) => { this.handleBufferTypeChange(e); this.changeBufferUnit('minutes') }} />
              <Label style={{ cursor: 'pointer' }} for='drivetime' className='ml-1 text-break'>{this.props.intl.formatMessage({ id: 'driveTime', defaultMessage: defaultMessages.driveTime })}</Label>
            </SettingRow>
            <SettingRow className='mt-2'>
              <Radio checked={this.state.bufferType === 'walktime'} id='walktime' style={{ cursor: 'pointer' }} onChange={(e) => { this.handleBufferTypeChange(e); this.changeBufferUnit('minutes') }} />
              <Label style={{ cursor: 'pointer' }} for='walktime' className='ml-1 text-break'>{this.props.intl.formatMessage({ id: 'walkTime', defaultMessage: defaultMessages.walkTime })}</Label>
            </SettingRow>
            <SettingRow flow='no-wrap' className='w-100 d-flex'>
              <TextInput name='bufferSize1' data-key='bufferSize1' className='bufferInput' size='sm' value={this.localeString(this.state.bufferSize1)} onChange={(e) => { this.handleSettingChange(e); this.updatePlaceholders() }} />
              <TextInput name='bufferSize2' data-key='bufferSize2' className='bufferInput mx-1' size='sm' value={this.localeString(this.state.bufferSize2)} onChange={(e) => { this.handleSettingChange(e); this.updatePlaceholders() }} />
              <TextInput name='bufferSize3' data-key='bufferSize3' className='bufferInput' size='sm' value={this.localeString(this.state.bufferSize3)} onChange={(e) => { this.handleSettingChange(e); this.updatePlaceholders() }} />

              {(!this.state.bufferType || this.state.bufferType === 'ring') && (
                <React.Fragment>
                  <Select name='bufferUnits' className='bufferUnits ml-1' size='sm' value={this.state.bufferUnits} onChange={this.onBufferUnitSelectChanged}>
                    <option value='miles'>{this.props.intl.formatMessage({ id: 'miles', defaultMessage: defaultMessages.milesLow })}</option>
                    <option value='kilometers'>{this.props.intl.formatMessage({ id: 'kilometerLow', defaultMessage: defaultMessages.kilometerLow })}</option>
                  </Select>
                </React.Fragment>
              )}
              {this.state.bufferType && this.state.bufferType !== 'ring' && (
                <React.Fragment>
                  <Select name='bufferUnits' className='bufferUnits ml-1' size='sm' value={this.state.bufferUnits} onChange={this.onBufferUnitSelectChanged}>
                      <option value='minutes'>{this.props.intl.formatMessage({ id: 'minuteLow', defaultMessage: defaultMessages.minuteLow })}</option>
                      <option value='miles'>{this.props.intl.formatMessage({ id: 'miles', defaultMessage: defaultMessages.milesLow })}</option>
                      <option value='kilometers'>{this.props.intl.formatMessage({ id: 'kilometerLow', defaultMessage: defaultMessages.kilometerLow })}</option>
                  </Select>
                </React.Fragment>
              )}
            </SettingRow>
          </SettingSection>
          <SettingSection title={<div className='w-100 d-flex' style={{ height: '23px', flexFlow: 'column wrap', alignContent: 'space-between' }}>
            <div className='text-truncate py-1'>
              {this.props.intl.formatMessage({ id: 'selectInfographic', defaultMessage: defaultMessages.selectInfographic })}
            </div>
          </div>}>
            <SettingRow flow='wrap'>
              <ReportListAccordion d
                env={window.jimuConfig.hostEnv}
                listInstanceId={this.props.id}
                username={this.props.user.username}
                token={this.props.token}
                theme={this.stringifyTheme()}
                selectedReportId={this.state.selectedReport}
                langCode={this.state.langCode}
                style={{ width: '100%' }}>
              </ReportListAccordion>
            </SettingRow>
            <div className='pt-2 text-sm-right'>
              <a href='https://doc.arcgis.com/en/arcgis-online/administer/credits.htm' target='_blank'>{this.props.intl.formatMessage({ id: 'creditUsage', defaultMessage: defaultMessages.creditUsage })}</a>
            </div>
          </SettingSection>
          <div style={{ paddingBottom: '25px' }}>
          <SettingSection title={<div className='w-100 d-flex' style={{ height: '23px', flexFlow: 'column wrap', alignContent: 'space-between' }}>
            <div className='text-truncate py-1'>
              {this.props.intl.formatMessage({ id: 'infographicSettings', defaultMessage: defaultMessages.infographicSettings })}
            </div>
          </div>}>
            <SettingRow flow='no-wrap' label={this.props.intl.formatMessage({ id: 'viewMode', defaultMessage: defaultMessages.viewMode })}>
              <Select className='w-50' name='viewMode' size='sm' value={this.state.viewMode} onChange={this.onViewModeChange}>
                <option key='full' value='full'>{this.props.intl.formatMessage({ id: 'fullPages', defaultMessage: defaultMessages.fullPages })}</option>
                <option key='stack' value='stack'>{this.props.intl.formatMessage({ id: 'panelsInStack', defaultMessage: defaultMessages.panelsInStack })}</option>
                <option key='slides' value='slides'>{this.props.intl.formatMessage({ id: 'panelsInSlides', defaultMessage: defaultMessages.panelsInSlides })}</option>
                <option key='stack-all' value='stack-all'>{this.props.intl.formatMessage({ id: 'panelsInStackAll', defaultMessage: defaultMessages.panelsInStackAll })}</option>
              </Select>
            </SettingRow>
            <SettingRow label={this.props.intl.formatMessage({ id: 'backgroundColor', defaultMessage: defaultMessages.backgroundColor })}>
              <ThemeColorPicker specificTheme={this.props.theme} value={this.state.backgroundColor} onChange={this.updateBackgroundColor} presetColors={this.presetColors}/>
              {/* <ColorPicker
                style={{ padding: '0' }} width={26} height={14} disableAlpha
                color={this.state.backgroundColor}
                onChange={this.updateBackgroundColor}
                presetColors={this.presetColors}
              /> */}
            </SettingRow>

            <SettingRow label={this.props.intl.formatMessage({ id: 'runReportOnClick', defaultMessage: defaultMessages.runReportOnClick })}>
              <Switch className='can-x-switch' data-key='runReportOnClick' checked={this.state.runReportOnClick} onChange={e => { this.onToggleChanged(e.target.checked, 'runReportOnClick') }} />
            </SettingRow>
            {/* <SettingRow label={this.props.intl.formatMessage({ id: 'showSearch', defaultMessage: defaultMessages.showSearch })}>
              <Switch className='can-x-switch' data-key='showSearch' checked={this.state.showSearch} onChange={e => { this.onToggleChanged(e.target.checked, 'showSearch') }} />
            </SettingRow> */}
            <SettingRow label={this.props.intl.formatMessage({ id: 'displayHeader', defaultMessage: defaultMessages.displayHeader })}>
              <Switch className='can-x-switch' data-key='displayHeader' checked={this.state.displayHeader} onChange={e => { this.onToggleChanged(e.target.checked, 'displayHeader') }} />
            </SettingRow>
            {this.state.showHeaderSettings && (
              <React.Fragment>
                <SettingRow label={this.props.intl.formatMessage({ id: 'headerColor', defaultMessage: defaultMessages.headerColor })}>
                  <ColorPicker
                    style={{ padding: '0' }} width={26} height={14} disableAlpha
                    color={this.state.headerColor}
                    onChange={this.updateHeaderColor}
                    presetColors={this.presetColors}
                  />
                </SettingRow>
                <SettingRow label={this.props.intl.formatMessage({ id: 'headerTextColor', defaultMessage: defaultMessages.headerTextColor })}>
                  <ColorPicker
                    style={{ padding: '0' }} width={26} height={14} disableAlpha
                    color={this.state.headerTextColor}
                    onChange={this.updateHeaderTextColor}
                    presetColors={this.presetColors}
                  />
                </SettingRow>
                <SettingRow label={this.props.intl.formatMessage({ id: 'imageExport', defaultMessage: defaultMessages.imageExport })}>
                  <Switch className='can-x-switch' data-key='imageExport' checked={this.state.imageExport} onChange={e => { this.onToggleChanged(e.target.checked, 'imageExport') }} />
                </SettingRow>
                {/* <SettingRow label={this.props.intl.formatMessage({ id: 'pdf', defaultMessage: defaultMessages.pdf })}>
                  <Switch className='can-x-switch' data-key='pdf' checked={this.state.pdf} onChange={e => { this.onToggleChanged(e.target.checked, 'pdf') }} />
                </SettingRow> */}
                <SettingRow label={this.props.intl.formatMessage({ id: 'dynamicHtml', defaultMessage: defaultMessages.dynamicHtml })}>
                  <Switch className='can-x-switch' data-key='dynamicHtml' checked={this.state.dynamicHtml} onChange={e => { this.onToggleChanged(e.target.checked, 'dynamicHtml') }} />
                </SettingRow>
                <SettingRow label={this.props.intl.formatMessage({ id: 'excel', defaultMessage: defaultMessages.excel })}>
                  <Switch className='can-x-switch' data-key='excel' checked={this.state.excel} onChange={e => { this.onToggleChanged(e.target.checked, 'excel') }} />
                </SettingRow>
                <SettingRow label={this.props.intl.formatMessage({ id: 'printButton', defaultMessage: defaultMessages.printButton })}>
                  <Switch className='can-x-switch' data-key='print' checked={this.state.print} onChange={e => { this.onToggleChanged(e.target.checked, 'print') }} />
                </SettingRow>
                <SettingRow label={this.props.intl.formatMessage({ id: 'fullscreen', defaultMessage: defaultMessages.fullscreen })}>
                  <Switch className='can-x-switch' data-key='fullscreen' checked={this.state.fullscreen} onChange={e => { this.onToggleChanged(e.target.checked, 'fullscreen') }} />
                </SettingRow>
                {this.state.viewMode && this.state.viewMode !== 'slides' && (
                  <SettingRow label={this.props.intl.formatMessage({ id: 'zoomLevel', defaultMessage: defaultMessages.zoomLevel })}>
                    <Switch className='can-x-switch' data-key='zoomLevel' checked={this.state.zoomLevel} onChange={e => { this.onToggleChanged(e.target.checked, 'zoomLevel') }} />
                  </SettingRow>
                )}
              </React.Fragment>
            )}
          </SettingSection>
          </div>
          <div className='d-flex' style={{ width: '252px', height: '55px', position: 'sticky', bottom: '0px', borderTop: '1px solid rgba(106, 106, 106, 1)', backgroundColor: '#282828', flexFlow: 'column wrap', alignContent: 'center' }}>
            <Button type='tertiary' title={this.props.intl.formatMessage({ id: 'updateInfographic', defaultMessage: defaultMessages.updateInfographic })} onClick={this.onPreviewClick} style={{ margin: 'auto' }}><RefreshOutlined size={20}/>{this.props.intl.formatMessage({ id: 'updateInfographic', defaultMessage: defaultMessages.updateInfographic })}</Button>
          </div>
        </div>
      </div>
    )
  }
}
