import { ServiceDefinition } from 'jimu-core';
import { FeatureLayerCapabilities, FeatureLayerQueryCapabilities } from '../data-source-interface';
export interface FeatureLayerCapabilitiesConstructorOptions {
    layerDefinition: ServiceDefinition;
    isDataInDataSourceInstance: boolean;
}
export declare class FeatureLayerCapabilitiesImpl implements FeatureLayerCapabilities {
    private readonly layerDefinition;
    private readonly isDataInDataSourceInstance;
    constructor(options: FeatureLayerCapabilitiesConstructorOptions);
    getQueryCapabilities(): FeatureLayerQueryCapabilities;
}
