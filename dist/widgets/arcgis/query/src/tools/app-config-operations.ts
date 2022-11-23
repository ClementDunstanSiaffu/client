import { extensionSpec, IMAppConfig } from 'jimu-core'
import { IMConfig } from '../config'

export default class AppConfigOperation implements extensionSpec.AppConfigOperationsExtension {
  id = 'query-app-config-operation'
  widgetId: string

  afterWidgetCopied (copiedWidgetId: string, appConfig: IMAppConfig, widgetMap?: {[key: string]: string}): IMAppConfig {
    if (!widgetMap) { // no need to change widget linkage if it is not performed during a page copying
      return appConfig
    }

    const widgetJson = appConfig.widgets[this.widgetId]
    const config: IMConfig = widgetJson?.config
    let newAppConfig = appConfig

    config.queryItems?.forEach((queryItem, index) => {
      if (queryItem.spatialMapWidgetIds?.length > 0) {
        const newWidgetIds = queryItem.spatialMapWidgetIds.map(wId => widgetMap[wId])
        newAppConfig = appConfig.setIn(['widgets', copiedWidgetId, 'config', 'queryItems', index as any, 'spatialMapWidgetIds'], newWidgetIds)
      }
    })

    return newAppConfig
  }

  /**
   * Do some cleanup operations before current widget is removed.
   * @returns The updated appConfig
   */
  widgetWillRemove (appConfig: IMAppConfig): IMAppConfig {
    return appConfig
  }
}
