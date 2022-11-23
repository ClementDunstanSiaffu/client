import { AbstractDataAction, DataRecordSet, MutableStoreManager, FeatureDataRecord } from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { handleFeature } from '../runtime/utils'

export default class ZoomTo extends AbstractDataAction {
  async isSupported (dataSet: DataRecordSet): Promise<boolean> {
    const { records } = dataSet
    // @ts-expect-error
    return records.length > 0 && records.some(record => record.feature?.geometry)
  }

  async onExecute (dataSet: DataRecordSet): Promise<boolean> {
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: __esri.GraphicConstructor = null;
      [Graphic] = modules
      const featureSet = {
        features: dataSet.records.map(record => handleFeature((record as FeatureDataRecord).feature, Graphic)),
        // @ts-expect-error
        layerId: dataSet.dataSource?.layer?.id || null,
        zoomToOption: {},
        type: 'zoom-to-graphics'
      }
      MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', featureSet)
      return true
    })
  }
}
