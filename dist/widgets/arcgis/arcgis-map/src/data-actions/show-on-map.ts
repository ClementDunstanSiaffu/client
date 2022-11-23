import {
  AbstractDataAction, DataRecordSet, getAppStore, ImmutableObject, JimuMapViewInfo,
  MutableStoreManager, utils, i18n, DataActionOptions
} from 'jimu-core'
import { MapViewManager, SHOW_ON_MAP_DATA_ID_PREFIX, ShowOnMapDataType, zoomToUtils, featureUtils } from 'jimu-arcgis'
import defaultMessages from '../runtime/translations/default'

export default class ShowOnMap extends AbstractDataAction {
  private readonly _viewManager = MapViewManager.getInstance()

  async isSupported (dataSet: DataRecordSet): Promise<boolean> {
    const { records } = dataSet
    // @ts-expect-error
    return records.length > 0 && records.some(record => record.feature?.geometry)
  }

  async onExecute (dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean> {
    const activeViewId = this._getActiveViewId(this.widgetId, getAppStore().getState().jimuMapViewsInfo)
    const showOnMapDatas = MutableStoreManager.getInstance().getStateValue([this.widgetId])?.showOnMapDatas || {}
    const intl = i18n.getIntl()
    const name = options?.dataName || intl.formatMessage({ id: 'showOnMapData', defaultMessage: defaultMessages.showOnMapData })
    // save action data
    const id = `${SHOW_ON_MAP_DATA_ID_PREFIX}dataAction_${utils.getUUID()}`
    showOnMapDatas[id] = {
      mapWidgetId: this.widgetId,
      jimuMapViewId: activeViewId,
      dataSet,
      type: ShowOnMapDataType.DataAction,
      // use code to maintain compatibility here
      // for 'symbolOption', the difference between the values 'undefined' and 'null':
      //   undefined: app was created before online10.1 (inlcude 10.1), use default symbol;
      //   null: app was created or saved after online10.1, use default renderer of layer.
      symbolOption: options?.actionConfig?.isUseCustomSymbol ? options.actionConfig.symbolOption : (options?.actionConfig?.isUseCustomSymbol === false ? null : undefined),
      title: name
    }
    MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'showOnMapDatas', showOnMapDatas)

    const jimuMapView = this._viewManager.getJimuMapViewById(activeViewId)
    const featureSet = await featureUtils.convertDataRecordSetToFeatureSet(dataSet)
    if (jimuMapView && featureSet?.features?.length > 0) {
      zoomToUtils.zoomTo(jimuMapView?.view, featureSet.features, null)
    }
    return await Promise.resolve(true)
  }

  private _getActiveViewId (mapWidgetId: string, infos: ImmutableObject<{[jimuMapViewId: string]: JimuMapViewInfo}>): string {
    let activeViewId = Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId && infos[viewId].isActive)
    // using a default map view as active map view if the widget hasn't been loaded.
    if (!activeViewId) {
      activeViewId = Object.keys(infos || {}).find(viewId => infos[viewId].mapWidgetId === mapWidgetId)
    }
    return activeViewId
  }
}
