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
    const currentSectionId = widgetMap?.[config?.data?.section]
    const sourceWidgetSectionView = appConfig?.sections?.[config?.data?.section]?.views
    const currentWidgetSectionView = appConfig?.sections?.[currentSectionId]?.views

    const displayViews = []
    sourceWidgetSectionView?.forEach((view, index) => {
      if (config?.data?.views?.includes(view)) {
        displayViews.push(currentWidgetSectionView[index])
      }
    })
    const newAppConfig = appConfig.setIn(['widgets', copiedWidgetId, 'config', 'data', 'section'], currentSectionId)
      .setIn(['widgets', copiedWidgetId, 'config', 'data', 'views'], displayViews)

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
