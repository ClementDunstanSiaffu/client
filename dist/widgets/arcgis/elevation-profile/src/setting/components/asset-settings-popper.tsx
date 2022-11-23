/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, IntlShape, ThemeVariables, Immutable, IMFieldSchema, JimuFieldType } from 'jimu-core'
import { FieldSelector } from 'jimu-ui/advanced/data-source-selector'
import { Switch, Label, Tooltip, TextInput, Select, Option, Icon, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'
import { AssetLayersSettings, ElevationType, Statistics } from '../../config'
import { elevationTypeOptions, elevationTypeOptionsWithoutZ, chartSymbolOptions, getConfigIcon, unitOptions } from '../constants'
import BulletStylePicker from './bullet-style-picker'
import { getAdvanceSettingsStyle } from '../lib/style'
import StatisticsList from './common-statistics-list'

const { epConfigIcon } = getConfigIcon()

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  config: AssetLayersSettings
  hasSupportForZValue: boolean
  selectedLayerDataSource: any
  availableStatsForDisplay: Statistics[]
  updateAssetSettings: (parentKey: string, childKey: string | null, value: any) => void
}

interface IState {
  isBulletStylePickerOpen: boolean
  oneFieldLabel: string
  twoFieldLabel: string
  elevationType: string
  unitsValue: string
  symbology: string
  oneFields: string[]
  twoFields: string[]
  displayStats: boolean
  statListUpdate: Statistics[]
}

export default class AssetSettingPopper extends React.PureComponent<Props, IState> {
  readonly elevationTypeOptions: ElevationType[]
  private readonly defaultSelectedItem = {
    name: ''
  }

  constructor (props) {
    super(props)

    //If layer does not support z value, removed this option from elevation drop down
    if (!this.props.hasSupportForZValue) {
      this.elevationTypeOptions = elevationTypeOptionsWithoutZ
    } else {
      //layer supports z value, include z value option from elevation drop down
      this.elevationTypeOptions = elevationTypeOptions
    }

    this.defaultSelectedItem.name = this.nls('noSelectionItemLabel')

    let isOpen: boolean = false
    if (this.props.config.style.type !== 'map') {
      isOpen = true
    }

    this.state = {
      isBulletStylePickerOpen: isOpen,
      oneFields: this.props.config.elevationSettings.field1 === '' ? [] : [this.props.config.elevationSettings.field1],
      twoFields: this.props.config.elevationSettings.field2 === '' ? [] : [this.props.config.elevationSettings.field2],
      oneFieldLabel: this.props.config.elevationSettings.oneFieldLabel,
      twoFieldLabel: this.props.config.elevationSettings.twoFieldLabel,
      elevationType: this.props.config.elevationSettings.type,
      unitsValue: this.props.config.elevationSettings.unit,
      symbology: this.props.config.style.type,
      displayStats: this.props.config.legend.displayStatistics,
      statListUpdate: this.props.config.legend.selectedStatistics.length > 0 ? this.props.config.legend.selectedStatistics : this.props.availableStatsForDisplay
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

  onElevationValueChange = (evt) => {
    this.setState({
      elevationType: evt.target.value
    }, () => {
      this.props.updateAssetSettings('elevationSettings', 'type', this.state.elevationType)
    })
  }

  onValueUnitChange = (evt) => {
    this.setState({
      unitsValue: evt.target.value
    }, () => {
      this.props.updateAssetSettings('elevationSettings', 'unit', this.state.unitsValue)
    })
  }

  onSymbologyChange = (evt) => {
    if (evt.target.value === 'map') {
      this.setState({
        isBulletStylePickerOpen: false
      })
    } else {
      this.setState({
        isBulletStylePickerOpen: true
      })
    }
    this.setState({
      symbology: evt.target.value
    }, () => {
      this.props.updateAssetSettings('style', 'type', this.state.symbology)
    })
  }

  onColorStyleChange = (object: string, property: string, value: any) => {
    this.props.updateAssetSettings(object, property, value)
  }

  onOneFieldSelect = (allSelectedFields: IMFieldSchema[]) => {
    if (allSelectedFields.length === 0) {
      this.setState({
        oneFields: []
      })
      this.props.updateAssetSettings('elevationSettings', 'field1', '')
    } else {
      this.setState({
        oneFields: [allSelectedFields[0].jimuName]
      })
      this.props.updateAssetSettings('elevationSettings', 'field1', allSelectedFields[0].jimuName)
    }
  }

  onTwoFieldSelect = (allSelectedFields: IMFieldSchema[]) => {
    if (allSelectedFields.length === 0) {
      this.setState({
        twoFields: []
      })
      this.props.updateAssetSettings('elevationSettings', 'field2', '')
    } else {
      this.setState({
        twoFields: [allSelectedFields[0].jimuName]
      })
      this.props.updateAssetSettings('elevationSettings', 'field2', allSelectedFields[0].jimuName)
    }
  }

  onOneFieldLabelChange = (event) => {
    if (event && event.target) {
      const value = event.target.value
      if (value === '') {
        return
      }
      this.setState({
        oneFieldLabel: value
      })
      this.props.updateAssetSettings('elevationSettings', 'oneFieldLabel', value)
    }
  }

  onTwoFieldLabelChange = (event) => {
    if (event && event.target) {
      const value = event.target.value
      if (value === '') {
        return
      }
      this.setState({
        twoFieldLabel: value
      })
      this.props.updateAssetSettings('elevationSettings', 'twoFieldLabel', value)
    }
  }

  ondisplayStatisticsChange = (evt: any) => {
    this.setState({
      displayStats: evt.currentTarget.checked
    }, () => {
      this.props.updateAssetSettings('legend', 'displayStatistics', this.state.displayStats)
    })
  }

  updateStatistics = (newStatistics: Statistics[]) => {
    this.setState({
      statListUpdate: newStatistics
    })
    this.props.updateAssetSettings('legend', 'selectedStatistics', newStatistics)
  }

  render () {
    return <div style={{ height: '100%', width: '100%' }} css={getAdvanceSettingsStyle(this.props.theme)}>
      <SettingSection>
        <SettingRow className={'pt-1'}>
          <Label tabIndex={0} aria-label={this.nls('elevationSettingLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('elevationSettingLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('elevationSettingTooltip')}
            title={this.nls('elevationSettingTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow>
          <Label tabIndex={0} aria-label={this.nls('valueType')} className='flex-grow-1 ep-label'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('valueType')}
            </div>
          </Label>
          <Select menuRole={'menu'} aria-label={this.state.elevationType} className={'selectOption'}
            size={'sm'} name={'elevationValueType'}
            value={this.state.elevationType}
            onChange={this.onElevationValueChange}>
            {this.elevationTypeOptions.map((option, index) => {
              return <Option role={'option'} aria-label={option.value} key={index} value={option.value}>
                {this.nls(option.name)}</Option>
            })}
          </Select>
        </SettingRow>

        <SettingRow className={this.state.elevationType === 'one' || this.state.elevationType === 'two' ? '' : 'hidden'}>
          <div className={'left-and-right d-flex justify-content-between w-100'}>
            <TextInput aria-label={this.state.oneFieldLabel} className={'fieldLabel'}
              size={'sm'} value={this.state.oneFieldLabel}
              spellCheck={false}
              onChange={evt => { this.onOneFieldLabelChange(evt) }}
            />
            <FieldSelector className={'fieldSelectorWidth'}
              dataSources={[this.props.selectedLayerDataSource.layer]}
              isSearchInputHidden={true}
              onChange={this.onOneFieldSelect.bind(this)}
              isDataSourceDropDownHidden={true}
              useDropdown={true}
              selectedFields={Immutable(this.state.oneFields)}
              types={Immutable([JimuFieldType.Number])}
              isMultiple={false}
              noSelectionItem={this.defaultSelectedItem}
            />
          </div>
        </SettingRow>

        <SettingRow className={this.state.elevationType === 'two' ? '' : 'hidden'}>
          <div className={'left-and-right d-flex justify-content-between w-100'}>
            <TextInput aria-label={this.state.twoFieldLabel} className={'fieldLabel'}
              size={'sm'} value={this.state.twoFieldLabel}
              spellCheck={false}
              onChange={evt => { this.onTwoFieldLabelChange(evt) }}
            />
            <FieldSelector className={'fieldSelectorWidth'}
              dataSources={[this.props.selectedLayerDataSource.layer]}
              isSearchInputHidden={true}
              onChange={this.onTwoFieldSelect.bind(this)}
              isDataSourceDropDownHidden={true}
              useDropdown={true}
              selectedFields={Immutable(this.state.twoFields)}
              types={Immutable([JimuFieldType.Number])}
              isMultiple={false}
              noSelectionItem={this.defaultSelectedItem}
            />
          </div>
        </SettingRow>

        <SettingRow className={this.state.elevationType === 'no elevation' ? 'hint' : 'hidden'}>
          <Label tabIndex={0} aria-label={this.nls('noElevationHint')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('noElevationHint')}
            </div>
          </Label>
        </SettingRow>

        <SettingRow className={this.state.elevationType === 'no elevation' ? 'hidden' : ''}>
          <Label tabIndex={0} aria-label={this.nls('valueUnit')} className='flex-grow-1 ep-label'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('valueUnit')}
            </div>
          </Label>
          <Select menuRole={'menu'} aria-label={this.state.unitsValue} className={'selectOption'}
            size={'sm'} name={'valueunit'}
            value={this.state.unitsValue}
            onChange={this.onValueUnitChange}>
            {unitOptions.map((option, index) => {
              return <Option role={'option'} key={index} aria-label={option.value} value={option.value}>
                {this.nls(option.value)}</Option>
            })}
          </Select>
        </SettingRow>

        <SettingRow className={'pt-3 ep-divider-top'}>
          <Label tabIndex={0} aria-label={this.nls('styleLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('styleLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('styleProfileGraphTooltip')}
            title={this.nls('styleProfileGraphTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow>
          <Label tabIndex={0} aria-label={this.nls('symbology')} className='flex-grow-1 ep-label'>
            <div className='flex-grow-1 text-break setting-text-level-3'>
              {this.nls('symbology')}
            </div>
          </Label>
          <Select menuRole={'menu'} aria-label={this.state.symbology} className={'selectOption'}
            size={'sm'} name={'symbology'}
            value={this.state.symbology}
            onChange={this.onSymbologyChange}>
            {chartSymbolOptions.map((option, index) => {
              return <Option role={'option'} aria-label={option.value} key={index} value={option.value}>
                {this.nls(option.name)}</Option>
            })}
          </Select>
        </SettingRow>

        {this.state.isBulletStylePickerOpen &&
          <BulletStylePicker
            intl={this.props.intl}
            isOpen={this.state.isBulletStylePickerOpen}
            bullItem={'style'}
            onBulletStyleChange={this.onColorStyleChange}
            config={this.props.config.style} />
        }

        <SettingRow className={'pt-3 ep-divider-top'}>
          <Label tabIndex={0} aria-label={this.nls('legendLabel')} className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label setting-text-level-1'>
              {this.nls('legendLabel')}
            </div>
          </Label>
          <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('legendTooltip')}
            title={this.nls('legendTooltip')} showArrow placement='top'>
            <div className='ml-2 d-inline ep-tooltip'>
              <Icon size={14} icon={epConfigIcon.infoIcon} />
            </div>
          </Tooltip>
        </SettingRow>

        <SettingRow className={'mb-3'}>
          <Label className='w-100 d-flex'>
            <div className='flex-grow-1 text-break color-label'>
              {this.nls('statsDisplayLabel')}
            </div>
          </Label>
          <Switch role={'switch'} aria-label={this.nls('statsDisplayLabel')}
            title={this.nls('statsDisplayLabel')}
            checked={this.state.displayStats}
            aria-expanded={this.state.displayStats}
            onChange={this.ondisplayStatisticsChange} />
        </SettingRow>

        {this.state.displayStats &&
          <div>
            <StatisticsList intl={this.props.intl} theme={this.props.theme}
              availableStatistics={this.state.statListUpdate}
              onStatsListUpdated={this.updateStatistics} />
          </div>
        }
      </SettingSection>
    </div>
  }
}
