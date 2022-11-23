import { getAppStore, DataSourceTypes, DataSourceManager, DataSource } from 'jimu-core'
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source'

export function getMapAllLayers (useMapWidgetId: string) {
  let allLayers: DataSource[] = []
  if (!useMapWidgetId) return allLayers
  const isBuilder = window?.jimuConfig?.isBuilder
  const appConfig = isBuilder ? getAppStore().getState()?.appStateInBuilder?.appConfig : getAppStore().getState()?.appConfig
  if (!appConfig) return allLayers
  const mapUseDataSources = appConfig.widgets[useMapWidgetId]?.useDataSources
  if (typeof mapUseDataSources !== 'undefined') {
    const mapUseDataSourcesIds = mapUseDataSources.map(item => item.dataSourceId)
    mapUseDataSourcesIds.forEach(dsId => {
      const currentDs = DataSourceManager.getInstance().getDataSource(dsId)
      const layers = (currentDs as MapDataSourceImpl)?.getDataSourcesByType(DataSourceTypes.FeatureLayer)
      if (layers) {
        allLayers = allLayers.concat(layers)
      }
    })
  }
  return allLayers
}
