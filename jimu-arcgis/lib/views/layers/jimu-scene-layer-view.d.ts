import { SceneLayerDataSource, IMDataSourceInfo, FeatureLayerQueryParams, FeatureDataRecord } from 'jimu-core';
import { JimuLayerView, JimuLayerViewConstructorOptions } from './jimu-layer-view';
/**
 * `JimuSceneLayerViewOptions` provides information about the `JimuSceneLayerView`.
 */
export interface JimuSceneLayerViewOptions extends JimuLayerViewConstructorOptions {
    /**
     * The `view` is the [ArcGIS API for JavaScript `SceneLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-SceneLayerView.html).
     */
    view: __esri.SceneLayerView;
}
/**
 * The JimuSceneLayerView extends from the JimuLayerView.
 */
export declare class JimuSceneLayerView extends JimuLayerView {
    /**
     * The `view` is the [ArcGIS API for JavaScript `SceneLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-SceneLayerView.html).
     */
    view: __esri.SceneLayerView;
    private highLightHandle;
    private updateWatchHandle;
    private features;
    private isReservePopup;
    private localDefinitionExpression;
    constructor(options: JimuSceneLayerViewOptions);
    /**
     * @ignore
     * this queries from client
     * @param query
     */
    doQuery(query: any): Promise<__esri.Graphic[]>;
    /** @ignore */
    doQueryById(id: string): Promise<__esri.Graphic>;
    private setRefreshIntervalForLayer;
    private setDefinitionExpressionForLayer;
    /** @ignore */
    setLocalDefinitionExpression(localDefinitionExpression: string): void;
    private highLightSelectedFeatures;
    private highLightFeatures;
    private clearHighLight;
    selectFeatureById(id: string, record?: FeatureDataRecord): void;
    selectFeaturesByIds(ids: string[], records?: FeatureDataRecord[]): void;
    protected onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    private moveFeatureToCenter;
    private getCenterPoint;
    private getSelectedRecordIds;
    getLayerDataSource(): SceneLayerDataSource;
    /** @ignore */
    selectRecordsByQuery(query: FeatureLayerQueryParams): Promise<__esri.Graphic[]>;
}
