import { SceneLayerDataSource, FeatureLayerDataSource, DataSourceTypes } from 'jimu-core'

export const getOutputJsonOriginDs = (ds: SceneLayerDataSource | FeatureLayerDataSource): FeatureLayerDataSource => {
  if (!ds) {
    return null
  }

  if (ds.type === DataSourceTypes.SceneLayer) {
    /**
     * If is scene layer data source, will use associated feature layer data source to generate output data source.
     */
    return ds.getAssociatedDataSource()
  } else {
    return ds
  }
}
