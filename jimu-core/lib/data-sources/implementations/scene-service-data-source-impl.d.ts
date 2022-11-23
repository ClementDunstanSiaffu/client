import { ServiceDefinition } from 'jimu-core';
import { AbstractLayerFolderDataSource } from '../ds-base-types/abstract-layer-folder-data-source';
import { DataSourceTypes, SceneServiceDataSource, SceneLayerDataSource } from '../data-source-interface';
/**
 * Data source from a scene service, which may contain multiple child data sources.
 */
export declare class SceneServiceDataSourceImpl extends AbstractLayerFolderDataSource implements SceneServiceDataSource {
    type: DataSourceTypes.SceneService;
    fetchServiceDefinition(): Promise<ServiceDefinition>;
    createChildDataSources(): Promise<SceneLayerDataSource[]>;
}
