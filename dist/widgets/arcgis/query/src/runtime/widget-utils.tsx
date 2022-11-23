/** @jsx jsx */
import { dataSourceUtils } from 'jimu-core'
import { FeatureDataRecord } from 'jimu-arcgis'

// getFeatureLayer logic duplicated from '../../../feature-info/src/runtime/components/data-loader'
export const getFeatureLayerFromDataSource = (dataSource, FeatureLayer, widgetId) => {
  let featureLayer
  const notToLoad = dataSource?.getDataSourceJson()?.isDataInDataSourceInstance
  if (notToLoad) {
    // chart output and selected features need load
    return dataSource
      .load({ returnGeometry: true }, { widgetId })
      .then(async (records) => {
        const dataRecords = (await Promise.resolve(records)) as FeatureDataRecord[]
        return await dataSourceUtils.createFeatureLayerByRecords(dataSource, dataRecords)
      })
      .catch(() => {
        return null
      })
  }
  if (dataSource.layer) {
    featureLayer = dataSource.layer
  } else {
    if (dataSource.itemId) {
      featureLayer = new FeatureLayer({
        ...(dataSource.url ? { url: dataSource.url } : {}),
        portalItem: {
          id: dataSource.itemId,
          portal: {
            url: dataSource.portalUrl
          }
        }
      })
    } else {
      featureLayer = new FeatureLayer({
        url: dataSource.url
      })
    }
  }

  // Bug: js-api does not enter the when callback if there is no load method here.
  return featureLayer.load().then(async () => {
    return await Promise.resolve(featureLayer)
  })
}
