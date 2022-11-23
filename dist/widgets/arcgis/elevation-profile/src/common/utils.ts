import { DataSourceManager } from 'jimu-core'

export function getAllLayersFromDataSource (dataSource: string) {
  const dsManager = DataSourceManager.getInstance()
  const dataSources: any = dsManager?.getDataSource(dataSource)?.getChildDataSources()
  const allLayerSources = []
  dataSources?.forEach((layer) => {
    if (layer.type === 'GROUP_LAYER') {
      const subLayers = layer.getChildDataSources()
      if (subLayers) {
        subLayers.forEach(subLayer => {
          allLayerSources.push(subLayer)
        })
      }
    } else {
      allLayerSources.push(layer)
    }
  })
  return allLayerSources
}

export function defaultSelectedUnits (activeDsConfig, portalSelf): any {
  //get the configured units
  let configuredElevationUnit = activeDsConfig?.profileChartSettings.elevationUnit
  let configuredLinearUnit = activeDsConfig?.profileChartSettings.linearUnit
  //if configured units are empty set the units based on portal units
  if (!activeDsConfig?.profileChartSettings.elevationUnit) {
    if (portalSelf?.units === 'english') {
      configuredElevationUnit = 'feet'
    } else {
      configuredElevationUnit = 'meters'
    }
  }

  if (!activeDsConfig?.profileChartSettings.linearUnit) {
    if (portalSelf?.units === 'english') {
      configuredLinearUnit = 'miles'
    } else {
      configuredLinearUnit = 'kilometers'
    }
  }
  return [configuredElevationUnit, configuredLinearUnit]
}

export function getRandomHexColor (): string {
  const randomHexColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  return '#' + randomHexColor
}
