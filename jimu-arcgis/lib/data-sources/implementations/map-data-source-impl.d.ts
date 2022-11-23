import { AbstractSetDataSource, DataSourceConstructorOptions, LayerFolderDataSourceConstructorOptions, DataSourceTypes as JimuCoreDataSourceTypes, FeatureLayerDataSourceConstructorOptions, SceneLayerDataSourceConstructorOptions } from 'jimu-core/data-source';
import { IMDataSourceJson, IMDataSourceSchema, DataSource } from 'jimu-core';
import { DataSourceTypes, MapDataSource, MapChildDataSource } from '../arcgis-data-source-interface';
export interface MapDataSourceConstructorOptions extends DataSourceConstructorOptions {
    map?: __esri.Map;
}
export declare class MapDataSourceImpl extends AbstractSetDataSource implements MapDataSource {
    type: DataSourceTypes.Map | DataSourceTypes.WebMap | DataSourceTypes.WebScene;
    map: __esri.Map;
    protected childDataSourcesPromise: Promise<MapChildDataSource[]>;
    Map: typeof __esri.Map;
    FeatureLayer: typeof __esri.FeatureLayer;
    constructor(options: MapDataSourceConstructorOptions);
    ready(): Promise<MapChildDataSource[]>;
    fetchSchema(): Promise<IMDataSourceSchema>;
    getDataSourceByLayer(subLayerId: number, layerId: string): DataSource;
    getDataSourceByLayer(layerId: string): DataSource;
    /**
     * Return all descendant data sources with specific data source type.
     */
    getDataSourcesByType(type: JimuCoreDataSourceTypes | DataSourceTypes): DataSource[];
    protected createChildDataSources(): Promise<MapChildDataSource[]>;
    private deepSearchDataSourceByLayer;
    private traverseToGetDataSourcesByType;
    private traverseToCreateLayerForDataSource;
    private getWhetherNeedToCreateLayer;
    private isDataSourceWithLayer;
    protected createMap(): void;
    /**
     * If get data source options from table, will not pass `layer`.
     */
    protected getDataSourceConstructorOptions(id: string, order: number, url: string, dsJsonInConfig: IMDataSourceJson, layer: __esri.Layer): Promise<Array<LayerFolderDataSourceConstructorOptions | FeatureLayerDataSourceConstructorOptions | SceneLayerDataSourceConstructorOptions>>;
}
