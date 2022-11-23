/** @jsx jsx */
import {
  React, jsx, ThemeVariables, Immutable, IntlShape, DataSource, ImmutableObject, UseDataSource, ImmutableArray, dateUtils
} from 'jimu-core'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Label, NumericInput, Option, Radio, Select, Tooltip, Button } from 'jimu-ui'
import { AllDataSourceTypes, DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { DateTimeUnits, DateUnitInput, DateUnitInputValue } from 'jimu-ui/advanced/style-setting-components'

import { TimeDisplayStrategy, timeSettings } from '../config'
import { getStyleForTimePanel } from './style'
import { DatePicker } from 'jimu-ui/basic/date-picker'
import TimeSpan from './components/time-span'
import {
  DATE_PATTERN, DIVIDED_COUNT, getCalculatedTimeSettings, getInsideLayersFromWebmap,
  getStepLengthByAccuracy, getTimesByVirtualDate, MAX_DATE_TIME, MIN_DATE_TIME, SecondsForDateUnit, TIME_PATTERN,
  UnitSelectorDateWeekUnits, UnitSelectorTimeUnits
} from '../utils/utils'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { WarningCircleFilled } from 'jimu-icons/filled/suggested/warning-circle'

const SUPPORTED_TYPE = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.MapService])

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  i18nMessage: (id: string, values?: any) => string
  dataSources: { [dsId: string]: DataSource }
  dataSourceType: AllDataSourceTypes
  config: ImmutableObject<timeSettings>
  onChange: (config: ImmutableObject<timeSettings>) => void
  exactStartTime: number
  exactEndTime: number
  minAccuracy: string
  accuracyList: DateTimeUnits[]
}

interface State {
  // For DataSource selector
  supportedLayerIdsFromMap: ImmutableArray<string>
  selectedUseDataSources: ImmutableArray<UseDataSource>
  // For timeSpan
  selectedDataSources: { [dsId: string]: DataSource }
  isDateValid: boolean
}

const START_VIRTUAL_LIST = [dateUtils.VirtualDateType.Min, dateUtils.VirtualDateType.Today, dateUtils.VirtualDateType.Now]
const END_VIRTUAL_LIST = [dateUtils.VirtualDateType.Max, dateUtils.VirtualDateType.Today, dateUtils.VirtualDateType.Now]
export default class TimePanel extends React.PureComponent<Props, State> {
  allSupportedLayers: DataSource[] // MapServices and FeatureLayers which support time

  constructor (props) {
    super(props)
    this.allSupportedLayers = this.getAllSupportedLayersFromMap()
    this.state = {
      supportedLayerIdsFromMap: this.getSupportedLayerIdsFromMap(),
      selectedUseDataSources: this.getSelectedUseDataSources(),
      selectedDataSources: this.getSelectedDataSources(),
      isDateValid: props.exactStartTime <= props.exactEndTime
    }
  }

  componentDidUpdate (prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (this.props.config.layerList !== prevProps.config.layerList) {
      this.setState({
        selectedUseDataSources: this.getSelectedUseDataSources(),
        selectedDataSources: this.getSelectedDataSources()
      })
    }
  }

  timeSpanChanged = (start, end) => {
    const { config, dataSources, exactStartTime, exactEndTime } = this.props
    let newConfig
    if (exactStartTime !== start) {
      newConfig = config.set('startTime', { value: start })
      this.checkIfDatesInvalid({ value: start }, true)
    } else if (exactEndTime !== end) {
      newConfig = config.set('endTime', { value: end })
      this.checkIfDatesInvalid({ value: end }, false)
    } else {
      return
    }
    // Update accuracy and stepLengh if needed.
    if (config.stepLength) {
      const calcConfig = getCalculatedTimeSettings(newConfig, dataSources).config
      newConfig = newConfig.set('accuracy', calcConfig.accuracy).set('stepLength', calcConfig.stepLength)
    }
    this.props.onChange(newConfig)
  }

  onTimeChanged = (date, isStart: boolean) => {
    const { config, dataSources } = this.props
    const value = { value: date } as any
    if (date === dateUtils.VirtualDateType.Today) {
      value.offset = { val: 0, unit: 'day' }
    } else if (date === dateUtils.VirtualDateType.Now) {
      value.offset = { val: 0, unit: 'minute' }
    } else if (typeof date === 'number') {
      if (isStart) {
        value.value = Math.max(MIN_DATE_TIME, date)
      } else {
        value.value = Math.min(MAX_DATE_TIME, date)
      }
    }
    let newConfig = config.set(`${isStart ? 'start' : 'end'}Time`, value)
    this.checkIfDatesInvalid(value, isStart)
    // Update accuracy and stepLengh if needed.
    if (config.stepLength) {
      const calcConfig = getCalculatedTimeSettings(newConfig, dataSources).config
      newConfig = newConfig.set('accuracy', calcConfig.accuracy).set('stepLength', calcConfig.stepLength)
    }
    this.props.onChange(newConfig)
  }

  // Reset config when start is later than end.
  checkIfDatesInvalid = (value, isStart) => {
    const { exactStartTime, exactEndTime } = this.props
    let isValid = true
    const newDateTimes = getTimesByVirtualDate(value, isStart)
    if ((isStart && newDateTimes > exactEndTime) || (!isStart && newDateTimes < exactStartTime)) {
      isValid = false
    }
    this.setState({ isDateValid: isValid })
  }

  /**
   * Get offset units for start and end.
   * Today: min='day', Now: min='minute'
   * @param value
   * @returns
   */
  getOffsetUnits = (value) => {
    let list
    if (value === dateUtils.VirtualDateType.Today) {
      list = UnitSelectorDateWeekUnits
    } else {
      list = [...UnitSelectorDateWeekUnits, ...UnitSelectorTimeUnits]
    }
    return list
  }

  onDateOffsetChanged = (value: DateUnitInputValue, isStart = false) => {
    const key = isStart ? 'startTime' : 'endTime'
    const newConfig = this.props.config.setIn([key, 'offset'], value)
    // Reset config when start is later than end.
    this.checkIfDatesInvalid(newConfig[key], isStart)
    this.props.onChange(newConfig)
  }

  onAccuracyChanged = e => {
    const { config, exactStartTime, exactEndTime, accuracyList } = this.props
    const accuracy = e.target.value
    let newConfig = config.set('accuracy', accuracy)

    // Update stepLength if chosen accuracy is smaller than stepUnit.
    if (config.stepLength && accuracyList.indexOf(accuracy) < accuracyList.indexOf(config.stepLength.unit)) {
      const stepLenth = getStepLengthByAccuracy(exactStartTime, exactEndTime, accuracy)
      newConfig = newConfig.set('stepLength', stepLenth)
    }
    this.props.onChange(newConfig)
  }

  onStepChecked = () => {
    const { config, exactStartTime, exactEndTime } = this.props
    const stepLenth = getStepLengthByAccuracy(exactStartTime, exactEndTime, config.accuracy)
    this.props.onChange(this.props.config.set('stepLength', stepLenth).set('dividedCount', null))
  }

  onDividedChecked = () => {
    this.props.onChange(this.props.config.set('stepLength', null).set('dividedCount', DIVIDED_COUNT))
  }

  onStepLengthChanged = (value: DateUnitInputValue) => {
    this.props.onChange(this.props.config.set('stepLength', value).set('dividedCount', null))
  }

  onDividedCountChanged = (count: number) => {
    this.props.onChange(this.props.config.set('dividedCount', count || 2).set('stepLength', null))
  }

  onChange = (prop: string, value: any) => {
    this.props.onChange(this.props.config.set(prop, value))
  }

  getAllSupportedLayersFromMap = () => {
    const { dataSources, dataSourceType, config } = this.props
    if (dataSourceType === AllDataSourceTypes.WebMap) {
      return getInsideLayersFromWebmap(dataSources, config?.layerList)
    }
    return null
  }

  /**
   * Get all supported layers' ids.
   */
  getSupportedLayerIdsFromMap = () => {
    if (this.props.dataSourceType === AllDataSourceTypes.WebMap) {
      const idList = Object.keys(this.allSupportedLayers).map(layerId => layerId)
      return Immutable(idList)
    }
    return null
  }

  /**
   * For timeSpan
   */
  getSelectedDataSources = () => {
    const { dataSources, dataSourceType, config } = this.props
    let selectedLayers = {}
    if (dataSourceType === AllDataSourceTypes.WebMap) {
      Object.keys(this.allSupportedLayers).forEach(lyId => {
        if (
          config.layerList === null ||
          config.layerList.filter(useDS => useDS.dataSourceId === lyId).length > 0
        ) {
          selectedLayers[lyId] = this.allSupportedLayers[lyId]
        }
      })
    } else {
      selectedLayers = dataSources
    }
    return selectedLayers
  }

  /**
   * Used for DataSource selector when type is webmap.
   */
  getSelectedUseDataSources = () => {
    const { config, dataSourceType } = this.props
    if (dataSourceType === AllDataSourceTypes.WebMap) {
      if (config.layerList !== null) {
        return config.layerList
      }
      const useDs = []
      Object.keys(this.allSupportedLayers)?.forEach(lyId => {
        const ly = this.allSupportedLayers[lyId]
        useDs.push({
          rootDataSourceId: ly.getRootDataSource()?.id,
          dataSourceId: lyId,
          mainDataSourceId: ly.getMainDataSource()?.id
        })
      })
      return Immutable(useDs)
    }
    return null
  }

  dataSourceChange = ds => {
    // Reset to default settings with currrent layerList.
    const layers = getInsideLayersFromWebmap(this.props.dataSources, ds)
    const newConfig = getCalculatedTimeSettings(null, layers).config
    this.props.onChange(newConfig.set('layerList', ds))
  }

  getDateValue = date => {
    if (!date) {
      return null
    }
    if (typeof date === 'number') {
      date = new Date(date)
    }
    return date
  }

  isSelectionDisabled = () => {
    const { layerList } = this.props.config
    return layerList === null || layerList.length === this.state.supportedLayerIdsFromMap.length
  }

  render () {
    const { i18nMessage, config, dataSourceType, intl, theme, exactStartTime, exactEndTime, accuracyList } = this.props
    const { supportedLayerIdsFromMap, selectedUseDataSources, selectedDataSources } = this.state
    const { startTime, endTime, accuracy, timeDisplayStrategy, stepLength, dividedCount } = config

    const startDate = this.getDateValue(startTime?.value)
    const endDate = this.getDateValue(endTime?.value)

    const showStartOffset = typeof startTime?.value === 'string' && [dateUtils.VirtualDateType.Today, dateUtils.VirtualDateType.Now].includes(startTime?.value)
    const showEndOffset = typeof endTime?.value === 'string' && [dateUtils.VirtualDateType.Today, dateUtils.VirtualDateType.Now].includes(endTime?.value)

    return (
      <div className='time-panel w-100 h-100' css={getStyleForTimePanel(theme)}>
        {
          dataSourceType === AllDataSourceTypes.WebMap && <SettingSection className="pt-0" title={i18nMessage('enableTimeAnimation')}>
            <React.Fragment>
              <SettingRow>
                <DataSourceSelector
                  isMultiple
                  types={SUPPORTED_TYPE}
                  useDataSources={selectedUseDataSources}
                  mustUseDataSource
                  disableDataView
                  hideDataView
                  closeDataSourceListOnChange
                  disableRemove={() => selectedUseDataSources.length === 1}
                  onChange={this.dataSourceChange}
                  hideDs={dsJson => {
                    // check id from all supported ds list
                    return !supportedLayerIdsFromMap.includes(dsJson.id)
                  }}
                  disableSelection={this.isSelectionDisabled}
                />
              </SettingRow>
            </React.Fragment>
          </SettingSection>
        }
        <SettingSection className={`border-0 ${dataSourceType !== AllDataSourceTypes.WebMap ? 'pt-0' : ''}`} title={i18nMessage('timeSpan')}>
          <SettingRow>
            <TimeSpan
              intl={intl}
              theme={theme}
              dataSources={selectedDataSources}
              startTime={exactStartTime}
              endTime={exactEndTime}
              onChange={this.timeSpanChanged}
            />
          </SettingRow>
        </SettingSection>
        <SettingSection className='border-0 pt-0' title={i18nMessage('startTime')}>
          <SettingRow className='mt-2'>
            <DatePicker
              style={{ width: '226px' }}
              aria-label={i18nMessage('startTime')}
              disablePortal={false}
              selectedDate={startDate}
              format='shortDateLongTime'
              runtime={false}
              showDoneButton
              hideEmpty
              showTimeInput
              isTimeLong
              virtualDateListForSetting={START_VIRTUAL_LIST}
              onChange={date => this.onTimeChanged(date, true)}
            />
          </SettingRow>
          {
            typeof startTime?.value === 'string' && startTime.value === dateUtils.VirtualDateType.Min &&
            <SettingRow className='mt-1 date-label'>{dateUtils.formatDateLocally(exactStartTime, intl, DATE_PATTERN, TIME_PATTERN)}</SettingRow>
          }
          {
            showStartOffset && <SettingRow label={i18nMessage('offset')}>
              <DateUnitInput
                style={{ width: '125px' }}
                step={1}
                value={startTime.offset}
                units={this.getOffsetUnits(startTime.value)}
                onChange={value => this.onDateOffsetChanged(value, true)}
              />
            </SettingRow>
          }
        </SettingSection>
        <SettingSection className='border-0 pt-0' title={i18nMessage('endTime')}>
          <SettingRow className='mt-2'>
            <DatePicker
              style={{ width: '226px' }}
              aria-label={i18nMessage('endTime')}
              disablePortal={false}
              selectedDate={endDate}
              format='shortDateLongTime'
              runtime={false}
              showDoneButton
              hideEmpty
              showTimeInput
              isTimeLong
              virtualDateListForSetting={END_VIRTUAL_LIST}
              onChange={date => this.onTimeChanged(date, false)}
            />
          </SettingRow>
          {
            typeof endTime?.value === 'string' && endTime.value === dateUtils.VirtualDateType.Max &&
            <SettingRow className='mt-1 date-label'>{dateUtils.formatDateLocally(exactEndTime, intl, DATE_PATTERN, TIME_PATTERN)}</SettingRow>
          }
          {
            showEndOffset && <SettingRow label={i18nMessage('offset')}>
              <DateUnitInput
                style={{ width: '125px' }}
                step={1}
                value={endTime.offset}
                units={this.getOffsetUnits(endTime.value)}
                onChange={value => this.onDateOffsetChanged(value, false)}
              />
            </SettingRow>
          }
          {
            !this.state.isDateValid && <div
              className='d-flex mt-2 ml-1 mr-1'
              role='alert'
              aria-live='polite'
            >
              <WarningCircleFilled color={this.props.theme.colors.palette.danger[700]} className='mr-2' />
              <div className='flex-grow-1' style={{ color: theme.colors.palette.danger[700] }}>
                {'The start time should be no later than the end time.'}
              </div>
            </div>
          }
        </SettingSection>
        <SettingSection className='pt-0'>
          <SettingRow flow='wrap' label={
            <div className='m-0'>
              {i18nMessage('setMinTimeAccuracy')}
              <Tooltip title={i18nMessage('setMinTimeAccuracyTip')} showArrow placement='left'>
                <Button icon type='tertiary' size='sm' className='ml-2 p-0'>
                  <InfoOutlined />
                </Button>
              </Tooltip>
            </div>
          } />
          <SettingRow className='mt-1'>
            <Select onChange={this.onAccuracyChanged} value={accuracy}>
              {
                accuracyList.map(unit => {
                  return <Option key={unit} value={unit} active={unit === accuracy}>{i18nMessage(unit)}</Option>
                })
              }
            </Select>
          </SettingRow>
        </SettingSection>
        <SettingSection title={i18nMessage('timeStep')}>
          <SettingRow>
            <Label check>
              <Radio
                style={{ cursor: 'pointer' }}
                className='mr-2 align-text-bottom'
                checked={!!stepLength}
                onChange={this.onStepChecked}
              />
              {i18nMessage('lengthOfOneStep')}
            </Label>
          </SettingRow>
          {
            stepLength && <SettingRow className='time-step-details'>
              <DateUnitInput
                className='w-100'
                min={1}
                step={1}
                value={stepLength}
                units={accuracyList.filter(unit => SecondsForDateUnit[unit] >= SecondsForDateUnit[accuracy])}
                onChange={this.onStepLengthChanged}
              />
            </SettingRow>
          }
          <SettingRow>
            <Label check>
              <Radio
                style={{ cursor: 'pointer' }}
                className='mr-2 align-text-bottom'
                checked={dividedCount > 0}
                onChange={this.onDividedChecked}
              />
              {i18nMessage('totalTimeDividedIntoEqualSteps')}
            </Label>
          </SettingRow>
          {
            dividedCount && <SettingRow className='time-step-details' label={i18nMessage('count')}>
              <NumericInput
                aria-label={i18nMessage('count')}
                size='sm'
                min={2}
                showHandlers={false}
                value={dividedCount}
                onAcceptValue={this.onDividedCountChanged}
              />
            </SettingRow>
          }
        </SettingSection>
        <SettingSection title={i18nMessage('timeDisplay')}>
          <SettingRow>
            <Tooltip placement='bottom' title={i18nMessage('showCurrentWindowTip')} describeChild>
              <Label check>
                <Radio
                  style={{ cursor: 'pointer' }}
                  className='mr-2 align-text-bottom'
                  checked={timeDisplayStrategy === TimeDisplayStrategy.current}
                  onChange={() => this.onChange('timeDisplayStrategy', TimeDisplayStrategy.current)}
                />
                {i18nMessage('showCurrentWindow')}
              </Label>
            </Tooltip>
          </SettingRow>
          <SettingRow>
            <Tooltip placement='bottom' title={i18nMessage('showDataCumulativelyTip')} describeChild>
              <Label check>
                <Radio
                  style={{ cursor: 'pointer' }}
                  className='mr-2 align-text-bottom'
                  checked={timeDisplayStrategy === TimeDisplayStrategy.cumulatively}
                  onChange={() => this.onChange('timeDisplayStrategy', TimeDisplayStrategy.cumulatively)}
                />
                {i18nMessage('showDataCumulatively')}
              </Label>
            </Tooltip>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }
}
