import { ServiceDefinition } from 'jimu-core';
import { AbstractLayerFolderDataSource } from '../ds-base-types';
import { DataSourceTypes, MapServiceDataSource, FeatureLayerDataSource, GroupLayerDataSource, TimeInfo, TimeExtent } from '../data-source-interface';
declare type MapServiceChildDataSource = FeatureLayerDataSource | GroupLayerDataSource;
/**
 * Data source from a map service, which may contain multiple child data sources.
 */
export declare class MapServiceDataSourceImpl extends AbstractLayerFolderDataSource implements MapServiceDataSource {
    type: DataSourceTypes.MapService;
    layer?: __esri.MapImageLayer | __esri.TileLayer;
    protected childDataSourcesPromise: Promise<MapServiceChildDataSource[]>;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSources(): Promise<MapServiceChildDataSource[]>;
    supportTime(): boolean;
    getTimeInfo(): TimeInfo;
    getTimeExtent(): TimeExtent;
    changeTimeExtent(time: TimeExtent, widgetId: string): void;
    private createChildDataSourcesByLayer;
    private updateServiceDefinitionByLayer;
    private getLayerDefinitionFromSubLayer;
}
export {};
