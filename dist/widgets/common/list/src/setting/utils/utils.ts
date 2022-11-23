import { WidgetJson, ImmutableObject, IMAppConfig } from 'jimu-core'
import { getAppConfigAction } from 'jimu-for-builder'
import { ListLayout, Status, IMConfig } from '../../config'
export interface Option {
  layout: ListLayout
  config: IMConfig
  widgetId: string
  appConfig: IMAppConfig
  status: Status
  regularLayoutId?: string
  desLayoutId?: string
  label?: string
}
export const setLayoutAuto = (option: Option) => {
  const { layout, desLayoutId, config, widgetId, appConfig, status } = option
  const action = getAppConfigAction()
  const widgetJson = getWidgetJsonById(appConfig, widgetId)
  action.removeLayout(desLayoutId, false)
  const newConfig = config.setIn(['cardConfigs', status, 'listLayout'], layout)
  let udpateWidgetJson = widgetJson.setIn(['layouts', status], {})
  udpateWidgetJson = udpateWidgetJson.setIn(['config'], newConfig)
  action.editWidget(udpateWidgetJson?.asMutable({ deep: true })).exec()
}

export const setLayoutCustom = (option: Option) => {
  const { layout, regularLayoutId, config, widgetId, appConfig, status, label } = option
  const widgetJson = getWidgetJsonById(appConfig, widgetId)
  const action = getAppConfigAction()
  let newLayoutJson = action.duplicateLayout(regularLayoutId, false)
  newLayoutJson = newLayoutJson.set('label', status)
  action.editLayoutLabel({ layoutId: newLayoutJson.id }, label)
  const newConfig = config.setIn(['cardConfigs', status, 'listLayout'], layout)
  let udpateWidgetJson = widgetJson.setIn(['layouts', status, 'LARGE'], newLayoutJson.id)
  udpateWidgetJson = udpateWidgetJson.setIn(['config'], newConfig)
  action.editWidget(udpateWidgetJson?.asMutable({ deep: true })).exec()
}

export const getWidgetJsonById = (appConfig: IMAppConfig, widgetId: string): ImmutableObject<WidgetJson> => {
  const widgets = appConfig?.widgets
  const widgetJson = widgets?.[widgetId]
  return widgetJson
}
