import { ImmutableObject, UseDataSource, DataSource, appConfigUtils, getAppStore } from 'jimu-core'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import { isSerialSeries } from '../../../utils/default'
import { SourceStatus } from '../chart'

/**
 *  Get the warning message translation.
 * @param type
 * @param sourceStatus
 */
export const getWarningMessageTranslation = (type: ChartTypes, sourceStatus: SourceStatus): string => {
  let translation = ''
  if (sourceStatus === 'exceed') {
    if (isSerialSeries(type)) {
      translation = 'datalimitedTip'
    } else if (type === 'pieSeries') {
      translation = 'pieDatalimitedTip'
    }
  } else if (sourceStatus === 'empty') {
    translation = 'dataEmptyTip'
  } else if (sourceStatus === 'error') {
    translation = 'widgetLoadError'
  }
  return translation
}

/**
 * Get the warning message translation of not-ready data source.
 * @param useDataSource
 * @returns
 */
export const getNotReadyTranslation = (useDataSource: ImmutableObject<UseDataSource>, dataSource: DataSource): [string, Record<string, any>] => {
  if (!useDataSource || !dataSource) return null
  const labels = getDataSourceLabels(useDataSource, dataSource)
  const translation = ['outputDataIsNotGenerated', { outputDsLabel: labels.dataSourceLabel, sourceWidgetName: labels.widgetLabel }] as [string, Record<string, any>]
  return translation
}

/**
 * Get the label of the widget that outputs the data source
 * @param useDataSource
 */
export const getWidgetLabelFromUseDataSource = (useDataSource: ImmutableObject<UseDataSource>) => {
  const widgetId = appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
  const widgetLabel = getAppStore().getState()?.appConfig.widgets?.[widgetId]?.label

  return widgetLabel
}
/**
 * Get the label of the data source and the label of the widget that outputs the data source
 * @param useDataSource
 * @param dataSource
 * @returns
 */
export const getDataSourceLabels = (
  useDataSource: ImmutableObject<UseDataSource>,
  dataSource: DataSource
): { dataSourceLabel: string, widgetLabel: string } => {
  const dataSourceLabel = dataSource?.getLabel()
  const widgetLabel = getWidgetLabelFromUseDataSource(useDataSource)
  return { dataSourceLabel, widgetLabel }
}
