/** @jsx jsx */
import {
  React, jsx, ThemeVariables, Immutable, IntlShape, DataSourceManager, IMSqlExpression,
  IMIconResult, defaultMessages as defaultMsgsCore, UseDataSource, DataSource
} from 'jimu-core'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { TextInput, TextArea, Button, Switch, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'
import { SqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder'
import { filterItemConfig } from '../config'
import defaultMessages from './translations/default'
import { getStyleForFI } from './style'
import { IconPicker } from 'jimu-ui/advanced/resource-selector'

interface Props {
  dataSource: DataSource
  intl: IntlShape
  theme: ThemeVariables
  optionChange: (prop: string, value: string | boolean | IMIconResult) => void
  dataSourceChange: (useDataSources: UseDataSource[]) => void
  onSqlExprBuilderChange: (sqlExprObj: IMSqlExpression) => void
}

interface State {
  isSqlExprShow: boolean
  itemLabel: string
}

export default class FilterItem extends React.PureComponent<Props & filterItemConfig, State> {
  dsManager: DataSourceManager = window && window.jimuConfig && window.jimuConfig.isBuilder
    ? DataSourceManager.getInstance()
    : DataSourceManager.getInstance()

  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])

  constructor (props) {
    super(props)

    this.state = {
      isSqlExprShow: false,
      itemLabel: this.props.name || ''
    }
  }

  componentDidUpdate (preProps: Props & filterItemConfig, preState: State) {
    if (this.props.name !== preProps.name) {
      this.setState({ itemLabel: this.props.name || '' })
    }
  }

  showSqlExprPopup = () => {
    this.setState({ isSqlExprShow: true })
  }

  toggleSqlExprPopup = () => {
    this.setState({ isSqlExprShow: !this.state.isSqlExprShow })
  }

  nameChange = (event) => {
    const value = event.target.value
    this.setState({ itemLabel: value })
  }

  nameAccept = (value) => {
    value = value?.trim()
    value = value === '' ? this.props.name : value
    if (value !== this.state.itemLabel) {
      this.setState({ itemLabel: value })
    }
    this.props.optionChange('name', value)
  }

  autoApplyChange = () => {
    this.props.optionChange('autoApplyWhenWidgetOpen', !this.props.autoApplyWhenWidgetOpen)
  }

  collapseChange = () => {
    this.props.optionChange('collapseFilterExprs', !this.props.collapseFilterExprs)
  }

  i18nMessage = (id: string, messages?: any) => {
    messages = messages || defaultMessages
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
  }

  render () {
    const { useDataSource, dataSource, sqlExprObj } = this.props
    const isDisabled = !dataSource
    return (
      <div className='w-100 h-100' css={getStyleForFI(this.props.theme)}>
        <div className='w-100 h-100 filter-item-panel'>
          <div className='setting-container'>
            <SettingSection title={this.i18nMessage('data')} className="pt-0">
              <SettingRow>
                <DataSourceSelector
                  types={this.supportedDsTypes} disableRemove={() => true}
                  useDataSources={useDataSource && dataSource ? Immutable([useDataSource]) : Immutable([])}
                  mustUseDataSource onChange={this.props.dataSourceChange} closeDataSourceListOnChange
                />
              </SettingRow>
            </SettingSection>

            <SettingSection title={this.i18nMessage('label', jimuUIMessages)}>
              <SettingRow>
                <TextInput
                  size='sm'
                  type='text' className='w-100'
                  value={this.state.itemLabel}
                  onChange={this.nameChange}
                  onAcceptValue={this.nameAccept}
                  aria-label={this.i18nMessage('label', jimuUIMessages)}
                />
              </SettingRow>
            </SettingSection>

            <SettingSection>
              <SettingRow
                role='group'
                label={this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMsgsCore.icon })}
                aria-label={this.props.intl.formatMessage({ id: 'icon', defaultMessage: defaultMsgsCore.icon })}
              >
                <IconPicker
                  icon={this.props.icon ? (this.props.icon as any) : null}
                  onChange={(icon) => this.props.optionChange('icon', icon)} configurableOption='none'
                />
              </SettingRow>
            </SettingSection>

            <SettingSection title={this.i18nMessage('sqlExpr')} role='group' aria-label={this.i18nMessage('sqlExpr')}>
              <SettingRow label={this.i18nMessage('sqlExprDesc')} flow='wrap' />
              <div id='sql-expr-desc' className='sr-only'>{this.i18nMessage('sqlExprDesc')}</div>
              <SettingRow>
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <Button
                    className='w-100 text-dark set-link-btn'
                    type={isDisabled ? 'secondary' : 'primary'}
                    disabled={isDisabled}
                    onClick={this.showSqlExprPopup}
                    title={this.i18nMessage('openFilterBuilder')}
                    aria-describedby={'sql-expr-desc'}
                  >
                    <div className='w-100 px-2 text-truncate'>
                      {this.i18nMessage('openFilterBuilder')}
                    </div>
                  </Button>
                </div>
              </SettingRow>
              <SettingRow>
                <TextArea
                  style={{ height: '80px' }} className='w-100' spellCheck={false} placeholder={this.i18nMessage('setExprTips')}
                  value={(sqlExprObj && sqlExprObj.displaySQL) ? sqlExprObj.displaySQL : ''}
                  onClick={e => e.currentTarget.select()} readOnly
                />
              </SettingRow>
            </SettingSection>

            <SettingSection
              role='grpup'
              className='border-0'
              title={this.i18nMessage('options')}
              aria-label={this.i18nMessage('options')}
            >
              <SettingRow label={this.i18nMessage('autoApplyWhenWidgetOpen')}>
                <Switch
                  checked={!!this.props.autoApplyWhenWidgetOpen}
                  onChange={this.autoApplyChange}
                  aria-label={this.i18nMessage('autoApplyWhenWidgetOpen')}
                />
              </SettingRow>
              <SettingRow label={this.i18nMessage('collapseFilterExprs')}>
                <Switch
                  checked={!!this.props.collapseFilterExprs}
                  onChange={this.collapseChange}
                  aria-label={this.i18nMessage('collapseFilterExprs')}
                />
              </SettingRow>
            </SettingSection>

            {!isDisabled &&
              <SqlExpressionBuilderPopup
                dataSource={dataSource}
                isOpen={this.state.isSqlExprShow} toggle={this.toggleSqlExprPopup}
                expression={sqlExprObj} onChange={this.props.onSqlExprBuilderChange}
              />}
          </div>
        </div>
      </div>
    )
  }
}
