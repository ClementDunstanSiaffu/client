import { AbstractLayerFolderDataSource } from '../ds-base-types';
import { DataSourceTypes, FeatureLayerDataSource, GroupLayerDataSource, MapServiceDataSource, SceneLayerDataSource } from '../data-source-interface';
import { ServiceDefinition } from 'jimu-core';
declare type GroupLayerChildDataSource = FeatureLayerDataSource | MapServiceDataSource | GroupLayerDataSource | SceneLayerDataSource;
/**
 * Data source from group layer in a map service, or group in map viewer/scene viewer, or feature collection item which contains multiple layers.
 * Group layer data source may contain multiple child data sources.
 */
export declare class GroupLayerDataSourceImpl extends AbstractLayerFolderDataSource implements GroupLayerDataSource {
    type: DataSourceTypes.GroupLayer;
    /**
     * If is from map service, will be __esri.Sublayer,
     * if is group in map viewer/scene viewer or feature collection which contains multiple layers, will be __esri.GroupLayer.
     */
    layer?: __esri.GroupLayer | __esri.Sublayer;
    protected childDataSourcesPromise: Promise<GroupLayerChildDataSource[]>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSources(): Promise<GroupLayerChildDataSource[]>;
    private createChildDataSourcesByLayer;
    private createChildDataSourcesByItem;
    private updateServiceDefinitionByLayer;
    private fetchServiceDefnitionByItem;
    private getLayerDefinitionFromLayer;
    private getDsJsons;
    private getDsJsonsFromSingleLayer;
}
export {};
