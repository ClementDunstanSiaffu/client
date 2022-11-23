/** @jsx jsx */
import {
  React,
  jsx,
  ThemeVariables,
  Immutable,
  IntlShape,
  IMUseDataSource,
  UseDataSource,
  SerializedStyles,
  polished,
  css,
  JimuFieldType,
  DataSourceComponent,
  QueriableDataSource,
  IMFieldSchema,
  FeatureLayerDataSource,
  DataSourceManager,
  CONSTANTS
} from 'jimu-core'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import {
  TextInput,
  Switch,
  defaultMessages as jimuUIMessages,
  Checkbox,
  MultiSelect,
  MultiSelectItem,
  Select,
  Label
} from 'jimu-ui'
import {
  DataSourceSelector,
  AllDataSourceTypes,
  FieldSelector,
  dataComponentsUtils
} from 'jimu-ui/advanced/data-source-selector'
import { LayersConfig, SelectionModeType } from '../config'
import defaultMessages from './translations/default'
import { Fragment } from 'react'
import { List, TreeItemActionType, TreeType } from 'jimu-ui/basic/list-tree'
import { builderAppSync } from 'jimu-for-builder'

const { OUTPUT_DATA_VIEW_ID } = CONSTANTS

interface Props {
  useDataSource: IMUseDataSource
  intl: IntlShape
  theme: ThemeVariables
  widgetId: string
  onClose?: () => void
  optionChange: (prop: string, value: any) => void
  multiOptionsChange: (options: any) => void
  dataSourceChange: (useDataSources: UseDataSource[]) => void
}

interface State {
  dataSource: QueriableDataSource
  itemLabel: string
  hasUncheck: boolean
}

export default class LayerConfig extends React.PureComponent<
Props & LayersConfig,
State
> {
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])
  colRef: React.RefObject<HTMLButtonElement>

  constructor (props) {
    super(props)

    this.state = {
      dataSource: undefined,
      itemLabel: props.name || '',
      hasUncheck: this.getUncheckState(props.tableFields, props.id)
    }
    this.colRef = React.createRef()
  }

  componentDidUpdate (preProps: Props & LayersConfig, preState: State) {
    if (this.props.name !== preProps.name) {
      this.setState({ itemLabel: this.props.name || '' })
    }
  }

  nameChange = event => {
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

  getUncheckState = (tableFields = [], dsConfigId?: string) => {
    let hasUncheck = false
    let currentDs
    if (this.state) {
      currentDs = this.state.dataSource
    } else {
      if (!dsConfigId) return hasUncheck
      const strIndex = dsConfigId.lastIndexOf('-')
      const dsId = dsConfigId.substr(0, strIndex)
      currentDs = DataSourceManager.getInstance().getDataSource(dsId)
    }
    const layerDefinition = (currentDs as FeatureLayerDataSource)?.getLayerDefinition()
    tableFields.forEach(item => {
      const editable = this.getFieldEditable(layerDefinition, item.jimuName)
      if (!item.editAuthority && editable) hasUncheck = true
    })
    return hasUncheck
  }

  handleCheckboxChange = evt => {
    const target = evt.currentTarget
    if (!target) return
    this.props.optionChange(target.dataset.field, target.checked)
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIMessages)
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: messages[id] },
      values
    )
  }

  displaySelectedFields = values => {
    return this.formatMessage('numSelected', { number: values.length })
  }

  filterSearchFields = (newTableFields) => {
    const { searchFields } = this.props
    const searchFieldsArray = searchFields.split(',')
    const tableFieldsNames = newTableFields.map(item => item.jimuName)
    const filteredSearchFields = searchFieldsArray.filter(field => tableFieldsNames.includes(field))
    return filteredSearchFields.join(',')
  }

  getFieldEditable = (layerDefinition, jimuName) => {
    const fieldsConfig = layerDefinition?.fields || []
    const orgField = fieldsConfig.find(config => config.name === jimuName)
    const fieldEditable = orgField ? orgField?.editable : true
    return fieldEditable
  }

  onFieldChange = (allSelectedFields: IMFieldSchema[]) => {
    if (!allSelectedFields) return
    const { dataSource } = this.state
    const { useDataSource } = this.props
    const layerDefinition = (dataSource as FeatureLayerDataSource)?.getLayerDefinition()
    const filteredFields = allSelectedFields.filter(ele => ele).map(item => {
      const editable = this.getFieldEditable(layerDefinition, item.jimuName)
      return { ...item, editAuthority: editable }
    })
    // update searchFields, tableFields and the fields used
    const filteredSearchFields = this.filterSearchFields(filteredFields)
    const usedFields = allSelectedFields.map(f => f.jimuName)
    this.props.multiOptionsChange({
      searchFields: filteredSearchFields,
      tableFields: filteredFields,
      ...(useDataSource ? { useDataSources: [Immutable(useDataSource).set('fields', usedFields).asMutable({ deep: true })] } : {})
    })
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.setState({ dataSource })
  }

  getSearchingFields = (): MultiSelectItem[] => {
    const res = []
    const { tableFields } = this.props
    if (tableFields.length > 0) {
      tableFields.forEach(item => {
        if (item.type === JimuFieldType.String) {
          res.push({
            value: item.jimuName || item.name,
            label: item.alias || item.name
          })
        }
      })
    }
    return res
  }

  handleChooseSearchingFieldsChange = (evt, value, values) => {
    const { widgetId } = this.props
    const fieldStr = values.join(',')
    if (!fieldStr) {
      builderAppSync.publishChangeWidgetStatePropToApp({ widgetId, propKey: 'optionChangeSuggestion', value: true })
    }
    this.props.optionChange('searchFields', fieldStr)
  }

  getSelectModeOptions = (): JSX.Element[] => {
    return [
      <option key={SelectionModeType.Single} value={SelectionModeType.Single}>
        {this.formatMessage('single')}
      </option>,
      <option
        key={SelectionModeType.Multiple}
        value={SelectionModeType.Multiple}
      >
        {this.formatMessage('multiple')}
      </option>
    ]
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .layer-config-panel {
        .panel-inner {
          .title {
            max-width: 70%;
          }
        }
        .setting-container {
          height: calc(100% - ${polished.rem(58)});
          overflow: auto;
          .fields-list-header {
            background: ${theme.colors.palette.light[200]};
            border-bottom: 1px solid ${theme.colors.palette.light[600]};
            height: 34px;
            width: 100%;
            flex-wrap: nowrap;
            .jimu-checkbox {
              margin-top: 2px;
            }
          }
          .selected-fields-con{
            margin-top: 0;
            .selected-fields-list {
              flex: 1;
              max-height: 265px;
              overflow-y: auto;
            }
            .jimu-tree-item{
              background: ${theme.colors.palette.light[200]};
              border-bottom: 1px solid ${theme.colors.palette.light[300]};
              .jimu-tree-item__content{
                div:first-of-type{
                  padding-left: 2px;
                }
                .jimu-tree-item__body{
                  background: ${theme.colors.palette.light[200]};
                }
              }
            }
          }
          .table-options {
            .table-options-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .select-option {
              margin-bottom: 8px;
            }
          }
          .ds-container {
            position: absolute;
            display: none;
          }
          .component-field-selector {
            .search-input {
              width: 100%;
            }
            .field-list {
              max-height: 300px;
            }
          }
          .config-word-break {
            word-wrap: break-word;
          }
        }
      }
    `
  }

  getFieldsFromDatasource = () => {
    const { useDataSource } = this.props
    const selectedDs = DataSourceManager.getInstance().getDataSource(useDataSource?.dataSourceId)
    const allFieldsSchema = selectedDs?.getSchema()
    const allFields = allFieldsSchema?.fields ? Object.values(allFieldsSchema?.fields) : []
    const defaultInvisible = [
      'CreationDate',
      'Creator',
      'EditDate',
      'Editor',
      'GlobalID'
    ]
    let tableFields = allFields.filter(
      item => !defaultInvisible.includes(item.jimuName)
    )
    // If there are too many columns, only the first 50 columns will be displayed by default
    if (tableFields?.length > 50) {
      tableFields = tableFields.slice(0, 50)
    }
    return { allFields, tableFields }
  }

  checkFieldsExist = (allFields, tableField) => {
    let exist = false
    for (const item of allFields) {
      if (item.jimuName === tableField.jimuName) {
        exist = true
        break
      }
    }
    return exist
  }

  handleListBoxAll = (hasUncheck) => {
    const { tableFields } = this.props
    const newTableFields = tableFields.map(item => {
      return {
        ...item,
        editAuthority: hasUncheck
      }
    })
    this.setState({ hasUncheck: !hasUncheck })
    this.props.optionChange('tableFields', newTableFields)
  }

  render () {
    const {
      useDataSource,
      optionChange,
      theme,
      tableFields,
      searchFields,
      enableEdit,
      widgetId
    } = this.props
    const { dataSource, itemLabel, hasUncheck } = this.state
    const layerDefinition =
      dataSource && (dataSource as FeatureLayerDataSource).getLayerDefinition()
    const optionsArray = ['enableSelect', 'enableRefresh'] // 'allowCsv',
    const allFieldsSchema = dataSource?.getSchema()
    const dsTableFields = tableFields?.map(item => {
      const newItem = allFieldsSchema?.fields?.[item.jimuName] || {}
      return {
        ...item,
        ...newItem
      }
    })
    const _tableFields: string[] = []
    if (tableFields && tableFields.length > 0) {
      tableFields.forEach(item => {
        _tableFields.push(item.jimuName)
      })
    }
    const { allFields } = this.getFieldsFromDatasource()
    // Can't edit Feature collection(dataSource.url is undefined) and output ds
    const capabilities = layerDefinition?.capabilities
    let editing = false
    if (capabilities) {
      editing = Array.isArray(capabilities)
        ? capabilities.join().toLowerCase().includes('editing')
        : layerDefinition?.capabilities.toLowerCase().includes('editing')
    }
    const editAble =
      dataSource?.url &&
      dataSource?.dataViewId !== OUTPUT_DATA_VIEW_ID &&
      editing
    const advancedActionMap = {
      overrideItemBlockInfo: ({ itemBlockInfo }, refComponent) => {
        return {
          name: TreeItemActionType.RenderOverrideItem,
          children: [{
            name: TreeItemActionType.RenderOverrideItemDroppableContainer,
            children: [{
              name: TreeItemActionType.RenderOverrideItemContent,
              children: [{
                name: TreeItemActionType.RenderOverrideItemBody,
                children: [{
                  name: TreeItemActionType.RenderOverrideItemMainLine,
                  children: [{
                    name: TreeItemActionType.RenderOverrideItemDraggableContainer,
                    children: [{
                      name: TreeItemActionType.RenderOverrideItemDragHandle
                    }, {
                      name: TreeItemActionType.RenderOverrideItemChildrenToggle
                    }, {
                      name: TreeItemActionType.RenderOverrideItemIcon
                    }, {
                      name: TreeItemActionType.RenderOverrideItemTitle
                    }, {
                      name: TreeItemActionType.RenderOverrideItemCommands
                    }]
                  }]
                }, {
                  name: TreeItemActionType.RenderOverrideItemDetailLine
                }]
              }]
            }]
          }]
        }
      }
    }
    let editCount = 0
    dsTableFields?.forEach(item => {
      if (item?.editAuthority) editCount++
    })

    return (
      <div className='w-100 h-100' css={this.getStyle(theme)}>
        <div className='w-100 h-100 layer-config-panel'>
          <div className='setting-container'>
            <SettingSection title={this.formatMessage('data')} className="pt-0">
              <SettingRow>
                <DataSourceSelector
                  types={this.supportedDsTypes}
                  disableRemove={() => true}
                  useDataSources={
                    useDataSource ? Immutable([useDataSource]) : Immutable([])
                  }
                  mustUseDataSource
                  onChange={this.props.dataSourceChange}
                  closeDataSourceListOnChange
                />
              </SettingRow>
            </SettingSection>

            {useDataSource &&
              <React.Fragment>
                <SettingSection title={this.formatMessage('label')}>
                  <SettingRow>
                    <TextInput
                      type='text'
                      size='sm'
                      className='w-100'
                      value={itemLabel}
                      onChange={this.nameChange}
                      onAcceptValue={this.nameAccept}
                      aria-label={this.formatMessage('label')}
                    />
                  </SettingRow>
                </SettingSection>

                <SettingSection title={this.formatMessage('configFields')}>
                  <SettingRow>{this.formatMessage('configTips')}</SettingRow>
                  <SettingRow>
                    <FieldSelector
                      useDataSources={
                        useDataSource ? Immutable([useDataSource]) : Immutable([])
                      }
                      onChange={this.onFieldChange}
                      selectedFields={Immutable(_tableFields)}
                      isMultiple
                      isSearchInputHidden={false}
                      isDataSourceDropDownHidden
                      useDropdown
                      useMultiDropdownBottomTools
                    />
                  </SettingRow>
                  <SettingRow flow='wrap' label={enableEdit && this.formatMessage('editableCount', { count: editCount })}>
                    <div className='fields-list-header form-inline'>
                      <div className='d-flex w-100 ml-4 fields-list-check'>
                        {enableEdit &&
                          <Checkbox
                            id='editAllField'
                            data-field='editAllField'
                            onClick={() => this.handleListBoxAll(hasUncheck)}
                            checked={!hasUncheck}
                            title={hasUncheck
                              ? `${this.formatMessage('editable')} (${this.formatMessage('checkAll')})`
                              : `${this.formatMessage('editable')} (${this.formatMessage('uncheckAll')})`}
                          />
                        }
                        <Label
                          for='editAllField'
                          style={{ cursor: 'pointer' }}
                          className='ml-2'
                          title={this.formatMessage('field')}
                        >
                          {this.formatMessage('field')}
                        </Label>
                      </div>
                    </div>
                  </SettingRow>
                  <SettingRow className='selected-fields-con'>
                    <List
                      size='sm'
                      className='selected-fields-list'
                      listType={TreeType.Intact}
                      itemsJson={Array.from(dsTableFields).map((item, index) => ({
                        itemStateDetailContent: item,
                        itemStateChecked: item?.editAuthority,
                        itemStateDisabled: !this.checkFieldsExist(allFields, item),
                        itemKey: `${index}`,
                        itemStateIcon: dataComponentsUtils.getIconFromFieldType(item.type, theme),
                        itemStateTitle: item.alias || item.jimuName || item.name,
                        isCheckboxDisabled: !this.getFieldEditable(layerDefinition, item.jimuName),
                        itemStateCommands: []
                      }))}
                      dndEnabled
                      showCheckbox={enableEdit}
                      onUpdateItem={(actionData, refComponent) => {
                        const { itemJsons } = actionData
                        const parentItemJson = itemJsons[itemJsons.length - 1]
                        const newTableFields = parentItemJson.map(item => {
                          return {
                            ...item.itemStateDetailContent,
                            editAuthority: item.itemStateChecked
                          }
                        })
                        this.props.optionChange('tableFields', newTableFields)
                        const hasUncheck = this.getUncheckState(newTableFields)
                        this.setState({ hasUncheck })
                      }}
                      isItemFocused={() => false}
                      {...advancedActionMap}
                    />
                  </SettingRow>
                  {/* {layerDefinition?.hasAttachments &&
                    <SettingRow>
                      <div className="d-flex w-100">
                        <Checkbox
                          data-field="enableAttachements"
                          onClick={this.handleCheckboxChange}
                          checked={this.props.enableAttachements} />
                        <div className="ml-2 config-word-break" title={this.formatMessage('enableAttachements')}>{this.formatMessage('enableAttachements')}</div>
                      </div>
                    </SettingRow>
                  } */}
                  {editAble && (
                    <SettingRow>
                      <div className='d-flex w-100'>
                        <Checkbox
                          id='editable-cb'
                          data-field='enableEdit'
                          onClick={this.handleCheckboxChange}
                          checked={this.props.enableEdit}
                        />
                        <Label
                          for='editable-cb'
                          style={{ cursor: 'pointer' }}
                          className='ml-2'
                          title={this.formatMessage('enableEdit')}
                        >
                          {this.formatMessage('enableEdit')}
                        </Label>
                      </div>
                    </SettingRow>
                  )}
                </SettingSection>

                <SettingSection title={this.formatMessage('tools')}>
                  <div className='w-100 table-options'>
                    <div className='table-options-item' key='enableSearch'>
                      <span className='text-break' style={{ width: '80%' }}>
                        {this.formatMessage('enableSearch')}
                      </span>
                      <Switch
                        className='can-x-switch'
                        checked={this.props.enableSearch || false}
                        onChange={evt => {
                          const checked = evt.target.checked
                          builderAppSync.publishChangeWidgetStatePropToApp({ widgetId, propKey: 'optionChangeSuggestion', value: true })
                          optionChange('enableSearch', checked)
                        }}
                      />
                    </div>
                  </div>
                  <div className='ds-container'>
                    <DataSourceComponent
                      useDataSource={Immutable(useDataSource)}
                      onDataSourceCreated={this.onDataSourceCreated}
                    />
                  </div>
                  {this.props.enableSearch && (
                    <SettingRow
                      flow='wrap'
                      label={this.formatMessage('searchFields')}
                    >
                      <div
                        className='d-flex w-100 search-container'
                        style={{ zIndex: 3 }}
                      >
                        <MultiSelect
                          size='sm'
                          items={Immutable(this.getSearchingFields())}
                          values={
                            searchFields ? Immutable(searchFields.split(',')) : Immutable([])
                          }
                          className='search-multi-select'
                          fluid
                          onClickItem={this.handleChooseSearchingFieldsChange}
                          displayByValues={this.displaySelectedFields}
                        />
                      </div>
                      <div className='d-flex w-100' style={{ marginTop: '10px' }}>
                        <Checkbox
                          id='fullMatch-cb'
                          data-field='searchExact'
                          onClick={this.handleCheckboxChange}
                          checked={this.props.searchExact}
                        />
                        <Label
                          for='fullMatch-cb'
                          style={{ cursor: 'pointer' }}
                          className='ml-2'
                          title={this.formatMessage('fullMatch')}
                        >
                          {this.formatMessage('fullMatch')}
                        </Label>
                      </div>
                    </SettingRow>
                  )}
                  <SettingRow>
                    <div className='w-100 table-options'>
                      {optionsArray.map((key, index) => {
                        return (
                          <Fragment key={index}>
                            <div className='table-options-item'>
                              <span
                                className='text-break'
                                style={{ width: '80%' }}
                              >
                                {this.formatMessage(key)}
                              </span>
                              <Switch
                                className='can-x-switch'
                                checked={this.props[key] || false}
                                onChange={evt => {
                                  optionChange(key, evt.target.checked)
                                }}
                              />
                            </div>
                            {key === 'enableSelect' && this.props[key] && (
                              <SettingRow
                                flow='wrap'
                                label={this.formatMessage('selectMode')}
                                className='select-option'
                              >
                                <Select
                                  size='sm'
                                  value={
                                    this.props.selectMode ||
                                    SelectionModeType.Multiple
                                  }
                                  onChange={evt => {
                                    optionChange('selectMode', evt.target.value)
                                  }}
                                >
                                  {this.getSelectModeOptions()}
                                </Select>
                              </SettingRow>
                            )}
                          </Fragment>
                        )
                      })}
                    </div>
                  </SettingRow>
                </SettingSection>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}
