/** @jsx jsx */
import {
  React,
  jsx,
  Immutable,
  UseDataSource,
  DataSourceManager,
  SceneLayerDataSource,
  FeatureLayerDataSource,
  ImmutableArray
} from 'jimu-core'
import { AllWidgetSettingProps, SettingChangeFunction, getAppConfigAction } from 'jimu-for-builder'
import {
  DataSourceRemoveWarningPopup,
  DataSourceRemoveWaringReason,
  dataComponentsUtils
} from 'jimu-ui/advanced/data-source-selector'
import { Select } from 'jimu-ui'
import { SettingRow, SettingSection, DirectionSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig, QueryArrangeType, QueryItemType, PagingType, ListDirection, FieldsType } from '../config'
import defaultMessages from './translations/default'
import { createGetI18nMessage } from '../common/utils'
import { ValueManSetByKeyType } from './setting-config'
import { getOutputJsonOriginDs } from './setting-utils'
import { QueryItemList } from './query-item-list'
import { Arrangement } from './arrangement'

export interface State {
  showRemoveQueryItemWarning: boolean
  indexOfQueryItemToRemove: number
  dsToRemove: string
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, State> {
  getI18nMessage = createGetI18nMessage({ intl: this.props.intl, defaultMessages })

  constructor (props) {
    super(props)
    this.state = {
      showRemoveQueryItemWarning: false,
      indexOfQueryItemToRemove: -1,
      dsToRemove: null
    }
  }

  updateWidgetJson: SettingChangeFunction = (...args) => {
    const [changedWidgetJson, ...restArgs] = args
    const widgetJson = Object.assign({ id: this.props.id, ...changedWidgetJson })
    this.props.onSettingChange(widgetJson, ...restArgs)
  }

  updateConfigForOptions = (...setByKeyPairs: ValueManSetByKeyType[]) => {
    let allDataSources = null
    const config = setByKeyPairs.reduce((config, [key, value, options]) => {
      if (key === 'queryItems' && options?.dsUpdateRequired) {
        allDataSources = this.getAllDataSources(value)
      }
      return config.set(key, value)
    }, this.props.config)
    if (allDataSources) {
      this.updateWidgetJson(
        {
          config,
          useDataSources: Object.values(allDataSources.useDataSourceMap)
        },
        allDataSources.outputDataSources
      )
    } else {
      this.updateWidgetJson({ config })
    }
  }

  handleArrangeTypeChange = (arrangeType: QueryArrangeType) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('arrangeType', arrangeType)
    })
  }

  handleArrangeWrapChange = (arrangeWrap: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('arrangeWrap', arrangeWrap)
    })
  }

  handleResultDirectionChange = (vertical: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('resultListDirection', vertical ? ListDirection.Vertical : ListDirection.Horizontal)
    })
  }

  handleResultPageStyleChange = (e) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('resultPagingStyle', e.target.value)
    })
  }

  tryRemoveQueryItem = (index: number) => {
    const queryItems = this.props.config.queryItems
    const currentQueryItem = queryItems[index]
    const appConfig = getAppConfigAction().appConfig
    const relatedWidgets = dataComponentsUtils.getWidgetsUsingDsOrItsDescendantDss(
      currentQueryItem.outputDataSourceId,
      appConfig.widgets
    )

    if (relatedWidgets.length === 0) {
      this.doRemoveQueryItem(index, true)
    } else {
      this.setState({
        showRemoveQueryItemWarning: true,
        indexOfQueryItemToRemove: index,
        dsToRemove: currentQueryItem.outputDataSourceId
      })
    }
  }

  beforeRemovingDataSource = () => {
    this.doRemoveQueryItem(this.state.indexOfQueryItemToRemove)
  }

  doRemoveQueryItem = (index: number, dsUpdateRequired = false) => {
    const configOptions = { dsUpdateRequired }
    const queryItems = this.props.config.queryItems.asMutable({ deep: true })
    queryItems.splice(index, 1)

    this.updateConfigForOptions(['queryItems', queryItems, configOptions])
  }

  afterRemovingDataSource = () => {
    this.setState({
      showRemoveQueryItemWarning: false,
      indexOfQueryItemToRemove: -1,
      dsToRemove: null
    })
  }

  addQueryItem = (queryItem) => {
    this.updateQueryItem(this.props.config.queryItems?.length ?? 0, queryItem, true)
  }

  updateQueryItem = (index: number, queryItem, dsUpdateRequired = false) => {
    let queryItems: ImmutableArray<QueryItemType> = this.props.config.queryItems ?? Immutable([])
    queryItems = Immutable.set(queryItems, index, queryItem)

    this.updateConfigForOptions(['queryItems', queryItems, { dsUpdateRequired }])
  }

  reOrderQueryItems = (queryItems) => {
    this.updateConfigForOptions(['queryItems', queryItems])
  }

  getAllDataSources = (queryItems: QueryItemType[]) => {
    const dsMap = Immutable(queryItems)
      .asMutable({ deep: true })
      .reduce(
        (currentDsMap, queryItem) => {
          // add useDataSource
          const sources = [queryItem.useDataSource, ...queryItem.spatialRelationUseDataSources]
          sources.forEach((useDs: UseDataSource) => {
            const dsId = useDs.dataSourceId
            currentDsMap.useDataSourceMap[dsId] = currentDsMap.useDataSourceMap[dsId] || useDs
            // const resultDisplayFields = useDs.
            const sortOptions = (queryItem.sortOptions || []).filter((i) => i.jimuFieldName)
            const sortFields = sortOptions.map((i) => i.jimuFieldName)
            currentDsMap.useDataSourceMap[dsId].fields = Array.from(
              new Set([
                ...(useDs.fields || []),
                ...(queryItem.resultFieldsType === FieldsType.SelectAttributes && queryItem.resultDisplayFields ? queryItem.resultDisplayFields : []),
                ...(sortFields)
              ])
            )
          })
          // add outputDataSource
          const originDs = DataSourceManager.getInstance().getDataSource(queryItem.useDataSource?.dataSourceId) as
            | FeatureLayerDataSource
            | SceneLayerDataSource
          if (originDs) {
            const originDataSourceJson = getOutputJsonOriginDs(originDs)?.getDataSourceJson()
            const outputDataSourceJson = {
              id: queryItem.outputDataSourceId,
              label: this.getI18nMessage('outputDsLabel', { values: { label: `${queryItem.name}` } }),
              type: originDataSourceJson?.type,
              geometryType: originDataSourceJson?.geometryType,
              url: originDataSourceJson?.url,
              itemId: originDataSourceJson?.itemId,
              portalUrl: originDataSourceJson?.portalUrl,
              originDataSources: [queryItem.useDataSource],
              layerId: originDataSourceJson?.layerId,
              isDataInDataSourceInstance: originDataSourceJson?.isDataInDataSourceInstance
            }
            currentDsMap.outputDataSources.push(outputDataSourceJson)
          }
          return currentDsMap
        },
        { useDataSourceMap: {}, outputDataSources: [] }
      )
    return dsMap
  }

  hideRemovePopup = () => {
    this.setState({ showRemoveQueryItemWarning: false })
  }

  render () {
    const { config } = this.props
    // use the first item's direction and paging style if they are not exist in the config
    let { resultListDirection, resultPagingStyle } = config
    if (!resultListDirection) {
      resultListDirection = config.queryItems?.[0]?.resultListDirection ?? ListDirection.Vertical
    }
    if (!resultPagingStyle) {
      resultPagingStyle = config.queryItems?.[0]?.resultPagingStyle ?? PagingType.MultiPage
    }
    return (
      <div className='setting-query h-100'>
        <div className='jimu-widget-setting setting-query__setting-content'>
          <QueryItemList
            widgetId={this.props.id}
            arrangeType={this.props.config.arrangeType}
            queryItems={this.props.config.queryItems}
            onNewQueryItemAdded={this.addQueryItem}
            onQueryItemRemoved={this.tryRemoveQueryItem}
            onQueryItemChanged={this.updateQueryItem}
            onOrderChanged={this.reOrderQueryItems}
          />
          {this.props.config.queryItems.length > 0 && (
            <Arrangement
              arrangeType={config.arrangeType}
              arrangeWrap={config.arrangeWrap}
              onArrangeTypeChanged={this.handleArrangeTypeChange}
              onArrangeWrapChanged={this.handleArrangeWrapChange}
            />
          )}
          {this.props.config.queryItems.length > 0 && (
            <SettingSection role='group' aria-label={this.getI18nMessage('resultStyle')} title={this.getI18nMessage('resultStyle')}>
              <SettingRow label={this.getI18nMessage('listDirection')}>
                <DirectionSelector
                  aria-label={this.getI18nMessage('listDirection')}
                  vertical={resultListDirection === ListDirection.Vertical}
                  onChange={this.handleResultDirectionChange}
                />
              </SettingRow>
              <SettingRow flow='wrap' label={this.getI18nMessage('pagingStyle')}>
                <Select
                  aria-label={this.getI18nMessage('pagingStyle')}
                  className='w-100'
                  size='sm'
                  value={resultPagingStyle}
                  onChange={this.handleResultPageStyleChange}
                >
                  <option value={PagingType.MultiPage}>{this.getI18nMessage('pagingStyle_MultiPage')}</option>
                  <option value={PagingType.LazyLoad}>{this.getI18nMessage('pagingStyle_LazyLoad')}</option>
                </Select>
              </SettingRow>
            </SettingSection>
          )}
        </div>
        <DataSourceRemoveWarningPopup
          dataSourceId={this.state.dsToRemove}
          isOpen={this.state.showRemoveQueryItemWarning}
          toggle={this.hideRemovePopup}
          reason={DataSourceRemoveWaringReason.DataSourceRemoved}
          afterRemove={this.afterRemovingDataSource}
          beforeRemove={this.beforeRemovingDataSource}
        />
      </div>
    )
  }
}
