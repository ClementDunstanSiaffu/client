import { FeatureLayerDataSource, IMDataSourceInfo, FeatureLayerQueryParams, FeatureDataRecord } from 'jimu-core';
import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
/**
 * `JimuFeatureLayerViewOptions` provides information about the `JimuFeatureLayerView`.
 */
export interface JimuFeatureLayerViewOptions extends JimuLayerViewConstructorOptions {
    /**
     * The `view` is the [ArcGIS API for JavaScript `FeatureLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html).
     */
    view: __esri.FeatureLayerView;
}
/**
 * The JimuFeatureLayerView extends from the JimuLayerView.
 */
export declare class JimuFeatureLayerView extends JimuLayerView {
    /**
     * The `view` is the [ArcGIS API for JavaScript `FeatureLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html).
     * If the layer is from mapservice, view = null
     */
    view: __esri.FeatureLayerView;
    private highLightHandle;
    private updateWatchHandle;
    private features;
    private isReservePopup;
    /**
     * virtualLayer is used highlight layer in mapservice
     */
    private highlightFeatureLayer;
    private highlightFeatureLayerView;
    /** @ignore */
    private localDefinitionExpression;
    /** @ignore */
    private readonly originalGdbVersion;
    constructor(options: JimuFeatureLayerViewOptions);
    private getLayerFromFeature;
    /**
     * @ignore
     * this queries from client
     * @param query
     */
    doQuery(query: any): Promise<__esri.Graphic[]>;
    /** @ignore */
    doQueryById(id: string): Promise<__esri.Graphic>;
    private setRefreshIntervalForLayer;
    /** @ignore */
    private setDefinitionExpressionForLayer;
    /** @ignore */
    setLocalDefinitionExpression(localDefinitionExpression: string): void;
    private highLightSelectedFeatures;
    private createHighLightFeatureLayer;
    private addFeaturesToHighlightFeatureLayer;
    private removeFeaturesFromHighlightFeatureLayer;
    private isLayerVisible;
    /** @ignore */
    highLightFeatures(ids: number[]): Promise<void>;
    /** @ignore */
    clearHighLight(): void;
    selectFeatureById(id: string, record?: FeatureDataRecord): void;
    /**
     * Select features by IDs.
     * When select features by IDs, we can pass in the data source records. So when the selected records are not loaded in data source, we can add them in.
     */
    selectFeaturesByIds(ids: string[], records?: FeatureDataRecord[]): void;
    protected onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    /** @ignore */
    moveFeatureToCenter(id: string): Promise<void>;
    private getCenterPoint;
    private getSelectedRecordIds;
    getLayerDataSource(): FeatureLayerDataSource;
    /** @ignore */
    selectRecordsByQuery(query: FeatureLayerQueryParams): Promise<__esri.Graphic[]>;
    /** @ignore */
    private getObjectIdField;
    /** @ignore */
    private getRendererForVirtualLayer;
}
