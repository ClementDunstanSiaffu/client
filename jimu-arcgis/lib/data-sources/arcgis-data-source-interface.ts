import type {
  IMDataSourceSchema, DataSource, FeatureLayerDataSource, MapServiceDataSource, FeatureDataRecord, GroupLayerDataSource,
  SceneLayerDataSource, ItemMixin
} from 'jimu-core'

/**
 * The data source types that `jimu-arcgis` supports.
 * For additional data source types, please see `DataSourceTypes` from the `jimu-core` package.
 */
export enum DataSourceTypes{
  Map = 'MAP',
  WebMap = 'WEB_MAP',
  WebScene = 'WEB_SCENE',
}

/**
 * @ignore
 * JS API layer types.
 */
export enum LayerTypes{
  BaseDynamicLayer = 'base-dynamic',
  BaseElevationLayer = 'base-elevation',
  BaseTileLayer = 'base-tile',
  BuildingSceneLayer = 'building-scene',
  CSVLayer = 'csv',
  ElevationLayer = 'elevation',
  FeatureLayer = 'feature',
  GeoJSONLayer = 'geojson',
  GeoRSSLayer = 'geo-rss',
  GraphicsLayer = 'graphics',
  GroupLayer = 'group',
  ImageryLayer = 'imagery',
  IntegratedMeshLayer = 'integrated-mesh',
  KMLLayer = 'kml',
  MapImageLayer = 'map-image',
  MapNotesLayer = 'map-notes',
  PointCloudLayer = 'point-cloud',
  SceneLayer = 'scene',
  TileLayer = 'tile',
  UnknownLayer = 'unknown',
  UnsupportedLayer = 'unsupported',
  VectorTileLayer = 'vector-tile',
  WMSLayer = 'wms',
  WMTSLayer = 'wmts',
  WebTileLayer = 'web-tile'
}

export type MapChildDataSource = FeatureLayerDataSource | MapServiceDataSource | GroupLayerDataSource | SceneLayerDataSource

/**
 * Interface for map related data sources.
 * It contains a JS API Map instance.
 */
export interface MapDataSource extends DataSource{
  type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene
  map: __esri.Map
  ready: () => Promise<MapChildDataSource[]>
  fetchSchema: () => Promise<IMDataSourceSchema>
  /**
   * Find data source with a specific layer.
   * The specific layer can be direct child layer of the map or descendant layer of the map.
   *
   * @param layerId layer id of the specific layer, the specific layer may be a layer or a sublayer
   * @param layerOfSubLayerId if the specific layer is sublayer, should passed in id of the sublayer's layer.
   *
   * For example, we have a map which has a map service layer A and we want to get the data source with feature layer B (B is a sublayer of the map service layer),
   * we should call `mapDataSource.getDataSourceByLayer(idOfLayerB, idOfLayerA)`.
   *
   * The reason why need to pass in `layerOfSubLayerId` is that:
   * Id of JSAPI layer is unique in its map and id of JSAPI sublayer is unique in its layer. However, id of sublayer is not unique in map.
   * In the case that want to use the method to get layer data source matching a JSAPI sublayer, need to check sublayer id and its layer id to determine a specific node in the data source tree.
   *
   * For example, we have a JSAPI map with the following structure:
   * - map
   *  - 1 group layer (id is l1)
   *    - 1.1 map service layer (id is l2)
   *      - 1.1.1 sub layer (id is 0)
   *      - 1.1.2 sub layer (id is 1)
   *    - 1.2 map service layer (id is l3)
   *      - 1.2.1 sub layer (id is 0)
   * 1. Assume we want to find sublayer 1.2.1, if only pass in the sublayer id (0), will find two layer 1.1.1 and 1.2.1.
   *    To determine unique sublayer 1.2.1, need to pass in the sublayer id (0) and its layer id (l3).
   * 2. Assume we want to find layer 1.2, only need to pass in the layer id (l3).
   */
  getDataSourceByLayer: (layerId: string | number, layerOfSubLayerId?: string) => DataSource
}

/**
 * Web map data source is created from a webmap.
 * It may have child data sources (such as feature layer data source, group layer data source and so on).
 */
export interface WebMapDataSource extends MapDataSource, ItemMixin {
  type: DataSourceTypes.WebMap
  map: __esri.WebMap
}

/**
 * Web scene data source is created from a webscene.
 * It may have child data sources (such as feature layer data source, scene layer data source and so on).
 */
export interface WebSceneDataSource extends MapDataSource, ItemMixin {
  type: DataSourceTypes.WebScene
  map: __esri.WebScene
}

/**
 * The data source types that `jimu-arcgis` supports.
 * For additional data source types, please see `DataSourceTypes` from the `jimu-core` package.
 * See {@link DataSourceTypes} for details.
 */
export { DataSourceTypes as ArcGISDataSourceTypes }

export { FeatureLayerDataSource, FeatureDataRecord }
