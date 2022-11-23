/** @jsx jsx */
import { React, jsx, IntlShape, ThemeVariables, classNames, Immutable } from 'jimu-core'
import {
  Button, Icon, Popper, Select, Option, MultiSelect, Alert, Label, Checkbox, LoadingType, Loading,
  defaultMessages as jimuUIDefaultMessages
} from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { JimuMapView } from 'jimu-arcgis'
import { ButtonTriggerType } from '../../config'
import defaultMessages from '../translations/default'
import { getContainerStyle, geSettingsOptionsStyle, getChartStyle } from '../lib/style'
import { getRuntimeIcon, unitOptions } from '../constants'
import { getAllLayersFromDataSource, defaultSelectedUnits } from '../../common/utils'
import Portal from 'esri/portal/Portal'
import ProfileChart from './profile-chart'
import ProfileStatistics from './chart-statistics'
import GraphicsLayer from 'esri/layers/GraphicsLayer'

const { epIcon } = getRuntimeIcon()

interface Props {
  theme: ThemeVariables
  intl: IntlShape
  widgetId: string
  portalSelf: Portal
  displayLoadingIndicator: boolean
  activeDataSource: string
  commonDsGeneralSettings: any
  defaultConfig: any
  activeDatasourceConfig: any
  profileResult: any
  selectMode: boolean
  drawMode: boolean
  drawingOrSelectingComplete: boolean
  isNewSegmentsForSelection: boolean
  noGraphicAfterFirstSelection: boolean
  chartRender: boolean
  chartColorRender: string
  noFeaturesFoundError: boolean
  drawingLayer: GraphicsLayer
  jimuMapview: JimuMapView
  viewModelErrorState: boolean
  profileErrorMsg: string
  onNavBack: () => void
  doneClick: () => boolean
  activateDrawSelectToolForNewProfile: () => void
  selectabelLayersRuntime: (layersArray: string[]) => void
  chartPosition: (point: any) => void
  hideChartPosition: () => void
}

interface IState {
  chartResult: any
  initialEmptyState: boolean
  emptyStateIfDoneClick: boolean
  enableForNewProfile: boolean
  settingsOptionsOpen: boolean
  unitOptions: any
  isFlipChart: boolean
  selectedElevationUnit: string
  selectedLinearUnit: string
  selectedLayers: string[]
  profileLayers: any[]
  isAnyProfileLineLayers: boolean
  isAdvanceOptionEnabled: boolean
  noFeaturesError: boolean
  dismissInfoMsg: boolean
  dismissWarningMsg: boolean
  statisticsOpen: boolean
  legendStats: any
  showLegend: boolean
  displayStats: boolean
  selectedStatisticsList: boolean
  renderSeries: boolean
  toggledSeriesName: string
  isUniformScalingEnable: boolean
  isLayerSelected: boolean
  noValidInput: boolean
  viewModelErrorMsg: string
}

export default class ResultPane extends React.PureComponent<Props, IState> {
  private selectableLayers = []
  private chart: any
  private readonly alertElement = React.createRef<HTMLDivElement>()
  constructor (props) {
    super(props)
    const selectedUnit = defaultSelectedUnits(this.props.activeDatasourceConfig, this.props.portalSelf)
    this.chart = null
    this.state = {
      chartResult: this.props.profileResult,
      initialEmptyState: true,
      emptyStateIfDoneClick: false,
      enableForNewProfile: false,
      settingsOptionsOpen: false,
      unitOptions: unitOptions,
      isFlipChart: false,
      selectedElevationUnit: this.props.activeDatasourceConfig ? selectedUnit[0] : this.props.defaultConfig.profileChartSettings.elevationUnit,
      selectedLinearUnit: this.props.activeDatasourceConfig ? selectedUnit[1] : this.props.defaultConfig.profileChartSettings.linearUnit,
      selectedLayers: [],
      profileLayers: this.props.activeDatasourceConfig?.profileSettings.layers,
      isAnyProfileLineLayers: false,
      isAdvanceOptionEnabled: this.props.activeDatasourceConfig?.advanceOptions,
      noFeaturesError: this.props.noFeaturesFoundError,
      dismissInfoMsg: !this.props.drawingOrSelectingComplete,
      dismissWarningMsg: !this.props.isNewSegmentsForSelection && !this.props.noGraphicAfterFirstSelection && this.props.selectMode,
      statisticsOpen: false,
      legendStats: [],
      showLegend: this.props.commonDsGeneralSettings?.showLegend,
      displayStats: this.props.activeDatasourceConfig ? this.props.activeDatasourceConfig.profileChartSettings.displayStatistics : this.props.defaultConfig.profileChartSettings.displayStatistics,
      selectedStatisticsList: this.props.activeDatasourceConfig ? this.props.activeDatasourceConfig.profileChartSettings.selectedStatistics : this.props.defaultConfig.profileChartSettings.selectedStatistics,
      renderSeries: true,
      toggledSeriesName: '',
      isUniformScalingEnable: false,
      isLayerSelected: true,
      noValidInput: this.props.viewModelErrorState,
      viewModelErrorMsg: this.props.profileErrorMsg
    }

    this.selectableLayers = []
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
    this.getSelectableLayers(this.props.activeDataSource)
    if (this.props.selectMode || this.props.drawMode) {
      setTimeout(() => {
        this.alertElement?.current?.focus()
      }, 100)
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    const selectedUnit = defaultSelectedUnits(this.props.activeDatasourceConfig, this.props.portalSelf)
    if (prevProps.commonDsGeneralSettings.showLegend !== this.props.commonDsGeneralSettings?.showLegend ||
      prevProps.activeDatasourceConfig?.profileChartSettings.displayStatistics !== this.props.activeDatasourceConfig?.profileChartSettings.displayStatistics ||
      prevProps.profileResult !== this.props.profileResult ||
      this.didStatisticsListChanged(prevProps.activeDatasourceConfig?.profileChartSettings.selectedStatistics,
        this.props.activeDatasourceConfig?.profileChartSettings.selectedStatistics)
    ) {
      this.setState({
        showLegend: this.props.commonDsGeneralSettings?.showLegend,
        displayStats: this.props.activeDatasourceConfig?.profileChartSettings.displayStatistics,
        chartResult: this.props.profileResult,
        selectedStatisticsList: this.props.activeDatasourceConfig?.profileChartSettings.selectedStatistics
      }, () => {
        if (!this.state.displayStats) {
          this.setState({
            statisticsOpen: false
          })
        }
        this.displayStatisticsInfo(this.chart)
      })
    }

    if (prevProps.noFeaturesFoundError !== this.props.noFeaturesFoundError) {
      this.setState({
        noFeaturesError: this.props.noFeaturesFoundError
      })
    }

    if (prevProps.viewModelErrorState !== this.props.viewModelErrorState ||
      prevProps.profileErrorMsg !== this.props.profileErrorMsg) {
      this.setState({
        noValidInput: this.props.viewModelErrorState,
        viewModelErrorMsg: this.props.profileErrorMsg
      })
    }

    //for more options live update
    if (prevProps.activeDatasourceConfig?.profileChartSettings.elevationUnit !== this.props.activeDatasourceConfig?.profileChartSettings.elevationUnit ||
      prevProps.activeDatasourceConfig?.profileChartSettings.linearUnit !== this.props.activeDatasourceConfig?.profileChartSettings.linearUnit ||
      prevProps.activeDatasourceConfig?.advanceOptions !== this.props.activeDatasourceConfig?.advanceOptions
    ) {
      this.setState({
        selectedElevationUnit: this.props.activeDatasourceConfig?.profileChartSettings.elevationUnit ? this.props.activeDatasourceConfig.profileChartSettings.elevationUnit : selectedUnit[0],
        selectedLinearUnit: this.props.activeDatasourceConfig?.profileChartSettings.linearUnit ? this.props.activeDatasourceConfig.profileChartSettings.linearUnit : selectedUnit[1],
        isAdvanceOptionEnabled: this.props.activeDatasourceConfig?.advanceOptions,
        profileLayers: this.props.activeDatasourceConfig?.profileSettings.layers
      }, () => {
        this.displayStatisticsInfo(this.chart)
        this.getSelectableLayers(this.props.activeDataSource)
      })
    }

    //check if profile layers config are updated in live view mode
    if (this.didProfileLayersSettingsChanged(prevProps.activeDatasourceConfig?.profileSettings.layers,
      this.props.activeDatasourceConfig?.profileSettings.layers)) {
      this.setState({
        profileLayers: this.props.activeDatasourceConfig?.profileSettings.layers
      }, () => {
        this.getSelectableLayers(this.props.activeDataSource)
      })
    }

    if (prevProps.drawingOrSelectingComplete !== this.props.drawingOrSelectingComplete ||
      prevProps.isNewSegmentsForSelection !== this.props.isNewSegmentsForSelection ||
      prevProps.noGraphicAfterFirstSelection !== this.props.noGraphicAfterFirstSelection) {
      this.setState({
        dismissInfoMsg: !this.props.drawingOrSelectingComplete,
        dismissWarningMsg: !this.props.isNewSegmentsForSelection && !this.props.noGraphicAfterFirstSelection && this.props.selectMode
      })
    }
  }

  didStatisticsListChanged = (prevSettings, newSettings) => {
    let statsListChange = false
    //eslint-disable-next-line
    newSettings?.some((newStatsSettings, index) => {
      if (newStatsSettings.name !== prevSettings[index].name ||
        newStatsSettings.label !== prevSettings[index].label ||
        newStatsSettings.enabled !== prevSettings[index].enabled) {
        statsListChange = true
        return true
      }
    })
    return statsListChange
  }

  didProfileLayersSettingsChanged = (prevProfileLayers, currentProfileLayers) => {
    let profileSettingsChanged = false
    if (prevProfileLayers?.length !== currentProfileLayers?.length) {
      profileSettingsChanged = true
    }
    return profileSettingsChanged
  }

  getSelectableLayers = (activeDs: string) => {
    const dataSource: any = getAllLayersFromDataSource(activeDs)
    this.selectableLayers = []
    const selectedLayers = []
    let anyLineLayer = false
    dataSource?.forEach((layer) => {
      if (layer && layer.layerDefinition && layer.layerDefinition.geometryType) {
        //if advance option is enabled in config then display all the configured layers in layers dropdown
        if (this.state.isAdvanceOptionEnabled) {
          if (this.state.profileLayers.length === 0) {
            anyLineLayer = false
          } else {
            if (layer.layerDefinition.geometryType === 'esriGeometryPolyline') {
              this.state.profileLayers?.forEach((currentSetting) => {
                if (currentSetting.layerId === layer.id) {
                  this.selectableLayers.push({
                    label: layer.schema.label,
                    value: layer.id
                  })
                  selectedLayers.push(layer.id)
                  //update the flag to true if any line layers are configured
                  anyLineLayer = true
                }
              })
            }
          }
        } else { //display all the available line layers in layers dropdown available in map
          if (layer.layerDefinition.geometryType === 'esriGeometryPolyline') {
            this.selectableLayers.push({
              label: layer.schema.label,
              value: layer.id
            })
            selectedLayers.push(layer.id)
            //update the flag to true if any line layers are configured
            anyLineLayer = true
          }
        }
      }
    })
    this.props.selectabelLayersRuntime(selectedLayers)
    this.setState({
      selectedLayers: selectedLayers,
      isAnyProfileLineLayers: anyLineLayer
    })
  }

  onDoneClick = () => {
    const enableToShowNewProfile = this.props.doneClick()
    if (enableToShowNewProfile) {
      this.setState({
        enableForNewProfile: true
      })
    } else {
      //if empty state
      this.setState({
        enableForNewProfile: false,
        initialEmptyState: false,
        emptyStateIfDoneClick: true,
        noFeaturesError: false,
        noValidInput: false
      }, () => {
        setTimeout(() => {
          this.alertElement?.current?.focus()
        }, 100)
      })
    }
  }

  toggleStatistics = () => {
    this.setState({
      statisticsOpen: !this.state.statisticsOpen
    }, () => {
      this.displayStatisticsInfo(this.chart)
    })
  }

  toggleSettings = () => {
    this.setState({
      settingsOptionsOpen: !this.state.settingsOptionsOpen
    })
  }

  highlightChartPosition = (point) => {
    this.props.chartPosition(point)
  }

  hideChartPosition = () => {
    this.props.hideChartPosition()
  }

  onChartFlip = () => {
    this.setState({
      isFlipChart: !this.state.isFlipChart
    }, () => {
      this.displayStatisticsInfo(this.chart)
    })
  }

  onNewProfileClick = () => {
    this.createNewProfile()
    this.setState({
      enableForNewProfile: false
    })
  }

  onClearButtonClick = () => {
    this.createNewProfile()
  }

  createNewProfile = () => {
    this.props.activateDrawSelectToolForNewProfile()
    this.setState({
      initialEmptyState: true,
      emptyStateIfDoneClick: false,
      noFeaturesError: false,
      noValidInput: false,
      statisticsOpen: false
    }, () => {
      setTimeout(() => {
        this.alertElement?.current?.focus()
      }, 100)
    })
  }

  onElevationUnitChange = (evt) => {
    this.setState({
      selectedElevationUnit: evt.target.value
    }, () => {
      this.displayStatisticsInfo(this.chart)
    })
  }

  onLinearUnitChange = (evt) => {
    this.setState({
      selectedLinearUnit: evt.target.value
    }, () => {
      this.displayStatisticsInfo(this.chart)
    })
  }

  onLayerSelected = (evt, value, values) => {
    let isLayerEnable: boolean = true
    this.setState({
      selectedLayers: values
    })
    if (values.length === 0) {
      isLayerEnable = false
    }
    this.setState({
      isLayerSelected: isLayerEnable
    })
    this.props.selectabelLayersRuntime(values)
  }

  displaySelectedFields = (values) => {
    //display enabled layers count on dropdown
    let selectedLabel = this.nls('selectLayerLabel')
    if (values && values.length) {
      selectedLabel = this.props.intl.formatMessage({
        id: 'selectedLayerCount',
        defaultMessage: defaultMessages.selectedLayerCount
      }, { selectedLayerCount: values.length })
    }
    return selectedLabel
  }

  onUniformScalingChange = (evt) => {
    this.setState({
      isUniformScalingEnable: evt.target.checked
    })
  }

  displayStatisticsInfo = (chart) => {
    const items: JSX.Element[] = []
    this.setState({
      legendStats: []
    })
    let expandStats: boolean = false
    if (!chart?.series) {
      items.push(<Loading type={LoadingType.Secondary} />)
    } else {
      if (chart?.series?.values?.[0]) {
        expandStats = true
      }
      chart?.series?.values.forEach((series, index) => {
        if (index === 0) { //currently showing only ground profile statistics so checked with index 0
          items.push(<ProfileStatistics
            theme={this.props.theme}
            intl={this.props.intl}
            parentWidgetId={this.props.widgetId}
            index={index}
            key={series.name + index}
            singleSeriesExpandStat={expandStats}
            legendName={series.name}
            activeDsConfig={this.props.activeDatasourceConfig}
            selectedElevationUnit={this.state.selectedElevationUnit}
            selectedLinearUnit={this.state.selectedLinearUnit}
            chartProfileResult={this.props.profileResult}
            selectedStatsDisplay={this.state.selectedStatisticsList}
            renderSeries={this.state.renderSeries}
            toggledSeriesName={this.state.toggledSeriesName}
            isFlip={this.state.isFlipChart}
          />)
          return true //Remove once we show other series statistics
        }
      })
    }
    this.setState({
      legendStats: items
    })
  }

  statisticsDisplay = () => {
    return (<div>
      <Popper css={getChartStyle(this.props.theme, this.props.chartColorRender ? this.props.chartColorRender : '#b54900')}
        open={this.state.statisticsOpen}
        reference={'statistics' + this.props.widgetId}
        floating={true}
        headerTitle={this.nls('statisticsLabel')}
        placement={'auto'}
        version={0}
        offset={[0, 0]}
        onHeaderClose={() => { this.setState({ statisticsOpen: !this.state.statisticsOpen }) }}
        defaultSize={{ width: 400, height: 235 }}
      >
        {/* Show Statistics Info for each series*/}
        <div style={{ height: 'calc(100% - 15px)', overflow: 'auto' }} className={'pr-3 pl-3 pt-2 pb-3'}>
          {this.state.legendStats.map((statsComponent, index) => (
            <React.Fragment key={index}>
              {statsComponent}
            </React.Fragment>
          ))}
        </div>
      </Popper>
    </div>
    )
  }

  settingsOptionsRender = () => {
    return (<div>
      <Popper css={geSettingsOptionsStyle(this.props.theme)} open={this.state.settingsOptionsOpen}
        reference={'settingsOptions' + this.props.widgetId}
        placement='right-start'
        version={0}
        offset={[0, 0]}
        toggle={e => {
          this.setState({ settingsOptionsOpen: !this.state.settingsOptionsOpen })
        }}
      >
        <div tabIndex={-1} style={{ width: 175 }}>
          <div tabIndex={-1} className={'p-2'}>
            <Label aria-label={this.nls('elevationUnitLabel')} className={'settingsLabel text-break'}>
              {this.nls('elevationUnitLabel')}
            </Label>
            <Select menuRole={'menu'} aria-label={this.state.selectedElevationUnit} className={'pt-1'} name='elevationUnit'
              size={'sm'} onChange={this.onElevationUnitChange} value={this.state.selectedElevationUnit}>
              {unitOptions.map((unitOption) => {
                return <Option role={'option'} aria-label={unitOption.value} key={unitOption.value} value={unitOption.value}>{this.nls(unitOption.value)}</Option>
              })}
            </Select>
          </div>

          <div className={'p-2'}>
            <Label aria-label={this.nls('distanceUnitLabel')} className={'settingsLabel text-break'}>
              {this.nls('distanceUnitLabel')}
            </Label>
            <Select menuRole={'menu'} aria-label={this.state.selectedLinearUnit} className={'pt-1'} name='linearUnit'
              size={'sm'} onChange={this.onLinearUnitChange} value={this.state.selectedLinearUnit}>
              {unitOptions.map((unitOption) => {
                return <Option role={'option'} aria-label={unitOption.value} key={unitOption.value} value={unitOption.value}>{this.nls(unitOption.value)}</Option>
              })}
            </Select>
          </div>

          {this.props.selectMode && this.state.isAnyProfileLineLayers &&
            <React.Fragment>
              <div className={'p-2'}>
                <Label aria-label={this.nls('selectableLayersLabel')} className={'settingsLabel text-break'}>
                  {this.nls('selectableLayersLabel')}
                </Label>
                {!this.state.isLayerSelected &&
                  <Alert tabIndex={0} className={'w-100 selectLayerWarningMsg'}
                    onClose={function noRefCheck () { }}
                    open={!this.state.isLayerSelected}
                    text={this.nls('selectLayerWarning')}
                    type={'warning'}
                    withIcon
                  />
                }
                <MultiSelect
                  items={Immutable(this.selectableLayers)}
                  values={Immutable(this.state.selectedLayers)}
                  className='pt-1 custom-multiselect'
                  buttonProps={{ showDynamicTitle: true }}
                  size={'sm'}
                  fluid={true}
                  onClickItem={this.onLayerSelected}
                  displayByValues={this.displaySelectedFields} />
              </div>
            </React.Fragment>
          }

          <React.Fragment>
            <div className={'p-2'}>
              <Label className={'cursor-pointer settingsLabel text-break'} title={this.nls('uniformChartScalingInfo')}>
                <Checkbox role={'checkbox'} className={'mr-2 font-13'} aria-label={this.nls('uniformChartScaling')}
                  checked={this.state.isUniformScalingEnable} onChange={this.onUniformScalingChange.bind(this)}
                />
                {this.nls('uniformChartScaling')}
              </Label>
            </div>
          </React.Fragment>
        </div>
      </Popper>
    </div>
    )
  }

  dismissInfoMsg = () => {
    this.setState({ dismissInfoMsg: !this.state.dismissInfoMsg })
  }

  dismissWarningMsg = () => {
    this.setState({ dismissWarningMsg: !this.state.dismissWarningMsg })
  }

  getChartInfo = (chart: any) => {
    this.chart = chart
    setTimeout(() => {
      this.displayStatisticsInfo(this.chart)
    }, 50)
  }

  onToggleSeries = (hideSeries: boolean, seriesName: string) => {
    this.setState({
      renderSeries: hideSeries,
      toggledSeriesName: seriesName
    })
  }

  render () {
    let infoMessagesForSelectDraw = ''
    let warningMessagesForSelectDraw = ''
    let infoMsgWhileSelectingOrDrawing = ''
    if ((this.state.initialEmptyState && this.props.drawMode) || (this.state.emptyStateIfDoneClick && this.props.drawMode)) {
      infoMessagesForSelectDraw = this.nls('drawUserInfo')
    } else if ((this.state.initialEmptyState && this.props.selectMode) || (this.state.emptyStateIfDoneClick && this.props.selectMode)) {
      infoMessagesForSelectDraw = this.nls('selectUserInfo')
    }

    if (this.state.emptyStateIfDoneClick && this.props.drawMode) {
      warningMessagesForSelectDraw = this.nls('emptyDrawStateWarning')
    } else if (this.state.emptyStateIfDoneClick && this.props.selectMode) {
      warningMessagesForSelectDraw = this.nls('emptySelectStateWarning')
    }

    if (!this.props.drawingOrSelectingComplete && this.props.drawMode && this.props.chartRender) {
      infoMsgWhileSelectingOrDrawing = this.nls('infoMsgWhileDrawing')
    } else if (this.props.selectMode && this.props.chartRender) {
      infoMsgWhileSelectingOrDrawing = this.props.isNewSegmentsForSelection && this.props.noGraphicAfterFirstSelection ? this.nls('infoMsgWhileSelecting') : this.nls('addToSelectionWarning')
    }

    //display error message when no features found for selection
    const noFeaturesErrorDisplay = this.nls('noFeaturesFound')

    const settingsOptions = this.settingsOptionsRender()
    const statsRender = this.statisticsDisplay()

    return <div className={'h-100 w-100'} css={getContainerStyle(this.props.theme)}>
      <div style={{ height: 35 }} className={'ep-widget-header d-flex w-100'}>
        <div className={'align-items-center w-100 pt-1'} style={{ display: 'inline-block' }}>
          <Button role={'button'} aria-label={this.nls('settingsOptions')} aria-haspopup={'dialog'} title={this.nls('settingsOptions')} icon
            id={'settingsOptions' + this.props.widgetId} className={'chart-actions'} active={this.state.settingsOptionsOpen}
            size={'sm'} type='default' onClick={this.toggleSettings}>
            <Icon size={16} icon={epIcon.settingsIcon} />
          </Button>
          {this.props.chartRender &&
            <React.Fragment>
              <Button role={'button'} aria-label={this.nls('chartFlip')} title={this.nls('chartFlip')} icon
                className={'chart-actions'} active={this.state.isFlipChart}
                size={'sm'} type='default' onClick={this.onChartFlip}>
                <Icon size={16} icon={epIcon.flipIcon} />
              </Button>

            {this.state.displayStats &&
              <Button role={'button'} aria-label={this.nls('chartStatistics')} aria-haspopup={'dialog'} title={this.nls('chartStatistics')} icon
                id={'statistics' + this.props.widgetId} className={'chart-actions'} active={this.state.statisticsOpen}
                size={'sm'} type='default' onClick={this.toggleStatistics}>
                <Icon size={16} icon={epIcon.chartIcon} />
              </Button>
            }
            </React.Fragment>
          }

          {this.state.settingsOptionsOpen &&
            settingsOptions
          }

          {this.state.statisticsOpen &&
            statsRender
          }
        </div>
      </div>

      <div className={classNames('ep-widget-bodyContainer d-flex w-100', this.props.chartRender ? '' : 'align-items-center')}>
         {this.props.displayLoadingIndicator &&
            <React.Fragment>
              <Loading type={LoadingType.Secondary} />
            </React.Fragment>
          }
        <div className={classNames('w-100', this.props.chartRender ? '' : 'alignInfo align-items-center', this.props.noFeaturesFoundError ? 'alignInfo align-items-center' : '')}>
          {!this.props.chartRender && !this.state.noFeaturesError && !this.state.noValidInput &&
            <div tabIndex={0} ref={this.alertElement} aria-label={infoMessagesForSelectDraw}>
              <Alert className={'mb-3 w-100 userInfo'}
                onClose={function noRefCheck () { }}
                open={!this.props.chartRender && !this.state.noFeaturesError && !this.state.noValidInput}
                text={infoMessagesForSelectDraw}
                type={'info'}
                withIcon
              />
            </div>
          }
          {this.state.emptyStateIfDoneClick && !this.props.chartRender && !this.state.noFeaturesError && !this.state.noValidInput &&
            <Alert tabIndex={0} className={'w-100 userInfo'}
              onClose={function noRefCheck () { }}
              open={this.state.emptyStateIfDoneClick && !this.props.chartRender && !this.state.noFeaturesError && !this.state.noValidInput}
              text={warningMessagesForSelectDraw}
              type={'warning'}
              withIcon
            />
          }

          {this.state.noFeaturesError &&
            <Alert tabIndex={0} className={'w-100 userInfo'}
              onClose={function noRefCheck () { }}
              open={this.state.noFeaturesError}
              text={noFeaturesErrorDisplay}
              type={'warning'}
              withIcon
            />
          }

          {this.state.noValidInput &&
            <Alert tabIndex={0} className={'w-100 userInfo'}
              onClose={function noRefCheck () { }}
              open={this.state.noValidInput}
              text={this.state.viewModelErrorMsg}
              type={'warning'}
              withIcon
            />
          }

          {this.props.chartRender &&
            <ProfileChart
              ref={'chartObj'}
              intl={this.props.intl}
              parentWidgetId={this.props.widgetId}
              commonGeneralSettings={this.props.commonDsGeneralSettings}
              activeDs={this.props.activeDataSource}
              currentConfig={this.props.activeDatasourceConfig}
              theme={this.props.theme}
              selectedLinearUnit={this.state.selectedLinearUnit}
              selectedElevationUnit={this.state.selectedElevationUnit}
              profileResult={this.props.profileResult}
              unitOptions={this.state.unitOptions}
              highlightChartPositionOnMap={this.highlightChartPosition.bind(this)}
              hideChartPosition={this.hideChartPosition.bind(this)}
              chartInfo={this.getChartInfo.bind(this)}
              toggleLegendSeriesState={this.onToggleSeries}
              elevationGraphColor={this.props.chartColorRender}
              isFlip={this.state.isFlipChart}
              isUniformChartScalingEnable={this.state.isUniformScalingEnable}
              drawingLayer={this.props.drawingLayer}
              mapView={this.props.jimuMapview}
            />
          }
        </div>
      </div>

      <div className={'floatingInfoMsg'}>
        {!this.state.enableForNewProfile && this.props.chartRender &&
          <React.Fragment>
            <div title={infoMsgWhileSelectingOrDrawing}>
              <Alert tabIndex={0} className={classNames('alignDismissibleInfo', this.state.dismissInfoMsg ? 'showMessage' : 'hideMessage')}
                onClose={this.dismissInfoMsg}
                open={this.state.dismissInfoMsg}
                text={infoMsgWhileSelectingOrDrawing}
                type={'info'}
                withIcon
                closable
              />
            </div>
            <div title={infoMsgWhileSelectingOrDrawing}>
              <Alert tabIndex={0} className={classNames('alignDismissibleInfo', this.state.dismissWarningMsg ? 'showMessage' : 'hideMessage')}
                onClose={this.dismissWarningMsg}
                open={this.state.dismissWarningMsg}
                text={infoMsgWhileSelectingOrDrawing}
                type={'warning'}
                withIcon
                closable
              />
            </div>
          </React.Fragment>
        }
      </div>

      <div className={'ep-widget-footer'}>
        <SettingRow>
          <div className={'w-100 footer-display'}>
            <Button role={'button'} aria-label={this.nls('backButtonLabel')} title={this.nls('backButtonLabel')}
              className={'m-1 text-break'} size={'default'} type='tertiary' onClick={this.props.onNavBack}>
              <Icon size={16} autoFlip icon={epIcon.arrowNavBack} />
              {this.nls('backButtonLabel')}
            </Button>

            {this.props.commonDsGeneralSettings?.buttonStyle === ButtonTriggerType.IconText &&
              <Button role={'button'} aria-label={this.nls('doneButtonLabel')} title={this.nls('doneButtonLabel')}
                className={this.state.enableForNewProfile || this.props.drawingOrSelectingComplete || this.state.noValidInput || (this.props.selectMode && this.props.chartRender && !this.props.isNewSegmentsForSelection && !this.props.noGraphicAfterFirstSelection)
                  ? 'hidden'
                  : 'm-1 actionButton text-break'}
                size={'default'} type='primary' onClick={this.onDoneClick}>
                <React.Fragment>
                  <Icon size={16} icon={epIcon.doneIcon} />
                  {this.nls('doneButtonLabel')}
                </React.Fragment>
              </Button>
            }

            {this.props.chartRender && this.props.commonDsGeneralSettings?.buttonStyle === ButtonTriggerType.IconText &&
              <React.Fragment>
                <Button role={'button'} aria-label={this.nls('clearButtonLabel')} title={this.nls('clearButtonLabel')}
                  className={this.state.enableForNewProfile || this.props.drawingOrSelectingComplete || (this.props.selectMode && this.props.chartRender && !this.props.isNewSegmentsForSelection && !this.props.noGraphicAfterFirstSelection)
                    ? 'hidden'
                    : 'm-1 actionButton text-break'}
                  size={'default'} type='default' onClick={this.onClearButtonClick}>
                  <Icon size={16} icon={epIcon.clearIcon} />
                  {this.nls('clearButtonLabel')}
                </Button>
              </React.Fragment>
            }

            {(this.state.enableForNewProfile || this.props.drawingOrSelectingComplete || this.state.noValidInput ||
              (this.props.selectMode && this.props.chartRender && !this.props.isNewSegmentsForSelection && !this.props.noGraphicAfterFirstSelection)) &&
              this.props.commonDsGeneralSettings?.buttonStyle === ButtonTriggerType.IconText &&
              <Button role={'button'} aria-label={this.nls('newProfileButtonLabel')} title={this.nls('newProfileButtonLabel')}
                className={'m-1 actionButton text-break'} size={'default'} type='primary' onClick={this.onNewProfileClick}>
                <React.Fragment>
                  <Icon size={16} icon={this.props.drawMode ? epIcon.drawIcon : epIcon.selectIcon} />
                  {this.nls('newProfileButtonLabel')}
                </React.Fragment>
              </Button>
            }
          </div>
        </SettingRow>
      </div>
    </div>
  }
}
