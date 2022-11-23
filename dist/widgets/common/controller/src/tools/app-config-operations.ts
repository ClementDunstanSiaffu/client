import { extensionSpec, IMAppConfig, ImmutableArray } from 'jimu-core'
import { IMConfig } from '../config'

export default class AppConfigOperation implements extensionSpec.AppConfigOperationsExtension {
  id = 'controller-app-config-operation'
  widgetId: string

  afterWidgetCopied (copiedWidgetId: string, appConfig: IMAppConfig, widgetMap?: {[key: string]: string}): IMAppConfig {
    const widgetJson = appConfig.widgets[this.widgetId]
    const copiedWidgetJson = appConfig.widgets[copiedWidgetId]
    const config: IMConfig = widgetJson?.config

    if (!config?.behavior?.openStarts || config?.behavior?.openStarts?.length <= 0) {
      return appConfig
    }

    const useWidgetIds: ImmutableArray<string> = config.behavior.openStarts
    const newUseWidgetIds: string[] = []

    if (widgetMap) {
      useWidgetIds.forEach(wId => {
        // widgetMap[wId] is the linked widget id after copying
        newUseWidgetIds.push(widgetMap[wId])
      })
    } else {
      useWidgetIds.forEach(wId => {
        // use large mode only here. all size mode should keep sync
        const oldLayoutJson = appConfig.layouts[widgetJson.layouts.controller.LARGE]
        const newLayoutJson = appConfig.layouts[copiedWidgetJson.layouts.controller.LARGE]

        oldLayoutJson?.order.forEach((itemId, i) => {
          if (oldLayoutJson.content[itemId].widgetId === wId) {
            const newWId = newLayoutJson.content[newLayoutJson.order[i]].widgetId
            newUseWidgetIds.push(newWId)
          }
        })
      })
    }

    return appConfig.setIn(['widgets', copiedWidgetId, 'config', 'behavior', 'openStarts'], newUseWidgetIds)
  }

  /**
   * Do some cleanup operations before current widget is removed.
   * @returns The updated appConfig
   */
  widgetWillRemove (appConfig: IMAppConfig): IMAppConfig {
    return appConfig
  }
}
