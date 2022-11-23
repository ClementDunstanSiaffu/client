import { JimuMapViewStatus, DataRecordSet } from 'jimu-core';
import { JimuLayerView } from './layers/jimu-layer-view';
import { MapViewManager } from '../mapview-manager';
import { JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
export declare enum ShowOnMapDataType {
    DataAction = "DATA_ACTION",
    MessageAction = "MESSAGE_ACTION"
}
export interface SymbolOption {
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
}
export interface ShowOnMapData {
    mapWidgetId: string;
    messageWidgetId: string;
    jimuMapViewId: string;
    dataSet: DataRecordSet;
    title: string;
    type: ShowOnMapDataType;
    symbolOption?: SymbolOption;
}
export interface ShowOnMapDatas {
    [id: string]: ShowOnMapData;
}
export declare const SHOW_ON_MAP_DATA_ID_PREFIX = "layer_of_showOnMap_action_";
/**
 * A MapTool is a ArcGIS JavaScript API widget instance used in map widget.
 */
export interface JimuMapTool {
    /** The tool name, use the ArcGIS JavaScript API class name. */
    name: string;
    /** The instance of ArcGIS JavaScript API class */
    instance: __esri.Widget;
}
/**
 * `JimuMapViewConstructorOptions` is used in the constructor of the `JimuMapView`, to initiate a `JimuMapView` instance.
 */
export interface JimuMapViewConstructorOptions {
    /**
     * The widget id to create the `JimuMapView` instance.
     */
    mapWidgetId: string;
    /**
     * The `isActive` property indicates whether the map in the map widget is accessible.
     * For example, for a single-source map, there is a single `JimuMapView` instance, therefore, the `isActive` is always true.
     * With a multi-source map, there are two JimuMapView instances. In the multi-source map, the property `isActive` is true for the top `JimuMapView` instance,
     * and false for the one beneath. Upon clicking the switch map tool, the `isActive` properties will switch.
     */
    isActive?: boolean;
    /**
     * The `dataSourceId` is the id of the datasource selected to create the map.
     */
    dataSourceId: string;
    /**
     * The `view` is the [ArcGIS API for JavaScript View](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html), including a
     * [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) or a
     * [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html). In the ArcGIS API for JavaScript,
     * the `MapView` and `SceneView` are part of the `__esri` namespace types. Thus, their types are `__esri.MapView` and `__esri.SceneView`.
     */
    view: __esri.MapView | __esri.SceneView;
    /**
     * The `isEnablePopup` property indicates whether to display popups when features in the `view` are clicked.
     */
    isEnablePopup?: boolean;
    /** Pass MapViewManager in to avoid circular dependency. */
    mapViewManager: MapViewManager;
}
/**
 * `JimuMapView` is the `view` for developers to develop the map-related functions.
 * For example, developers can use the `view` property of the `JimuMapView` instance to get the original
 *  <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html" target="_blank">ArcGIS API for JavaScript `View`</a>,
 * then use the original `view` to develop the map-related functions. At the same time, `JimuMapView` also provides
 * properties such as `isActive` and `status` to indicate the current status in the map widget.
 *
 * `JimuMapView` is a wrapper class for the ArcGIS API for JavaScript [`View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html).
 * It is created by a map widget using a map [`DataSource`](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/DataSource).
 *
 * ```typescript
 * import { JimuMapView } from 'jimu-arcgis';
 *
 * // Add the State interface
 * interface State {
 *  extent: __esri.Extent
 * }
 *
 * // On an active view change, set the extent State property
 * onActiveViewChange = (jimuMapView: JimuMapView) => {
 *  if(!this.extentWatch){
 *   this.extentWatch = jimuMapView.view.watch('extent', extent => {
 *     this.setState({
 *       extent
 *     })
 *   });
 *  }
 * }
 *
 * // Use the `JimuMapView` instance from the map widget through the `JimuMapViewComponent` React component
<JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds[0]} onActiveViewChange={this.onActiveViewChange}></JimuMapViewComponent>
 * ```
 *
 */
export declare class JimuMapView {
    /**
     * The id of the `JimuMapView` instance.
     */
    id: string;
    /**
     * The id of the widget creating the `JimuMapView` instance.
     */
    mapWidgetId: string;
    /**
     * The `isActive` property indicates whether the map in the map widget is accessible.
     * For example, for a single-source map, there is a single `JimuMapView` instance, therefore, the `isActive` is always true.
     * With a multi-source map, there are two `JimuMapView` instances. In the multi-source map, the property `isActive` is true for the top `JimuMapView` instance,
     * and false for the one beneath. Upon clicking the switch map tool, the `isActive` properties will switch.
     */
    isActive?: boolean;
    /**
     * The id of the `DataSource` selected to create the map.
     */
    dataSourceId: string;
    /**
     * The `view` is the [ArcGIS API for JavaScript `View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html), including a
     * [`MapView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) or a
     * [`SceneView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html). In the ArcGIS API for JavaScript,
     * the `MapView` and `SceneView` are part of the `__esri` namespace types. Thus, their types are `__esri.MapView` and `__esri.SceneView`.
     */
    view: __esri.MapView | __esri.SceneView;
    /**
     * The status of the `JimuMapView` instance. `JimuMapViewStatus` enumeration members include `"LOADING"`, `"LOADED"` and `"FAILED"`.
     */
    status: JimuMapViewStatus;
    /**
     * The union for all `JimuLayerView` instances and the layer view object wrapper.
     */
    jimuLayerViews?: {
        [jimuLayerViewId: string]: JimuLayerView;
    };
    /** The created map tools (ArcGIS JavaScript API widgets) for this view. */
    jimuMapTools: JimuMapTool[];
    /**
     * The maximum layer index in the `JimuMapView`.
     */
    maxLayerIndex?: number;
    private jimuLayerViewLoadPromises;
    private clickHighlightEnabled;
    private jimuMapViewLoadPromise;
    private showOnMapDatas;
    private readonly mapViewManager;
    constructor(options: JimuMapViewConstructorOptions);
    addJimuMapTool(tool: JimuMapTool): void;
    deleteJimuMapTool(toolName: string): void;
    enableClickOpenPopup(): void;
    disableClickOpenPopup(): void;
    isClickOpenPopupEnabled(): boolean;
    enableClickHighlight(): void;
    disableClickHighlight(): void;
    isClickHighlightEnabled(): boolean;
    setIsActive(isActive: boolean): void;
    private initView;
    private onClick;
    private selectDataSourceByFeatures;
    private tryIdentifyClickedFeature;
    private readonly getJimuLayerViewIdByLayerId;
    private clearAllJimuLayerViewsSelectRecord;
    private createJimuLayerViews;
    private addJimuLayerView;
    /**
     * Resolve the JimuMapView when it is loaded.
     */
    whenJimuMapViewLoaded(): Promise<JimuMapView>;
    private whenAllJimuLayerViewsLoaded;
    /**
     * Return all parent JimuLayerViews.
     */
    getParentJimuLayerViews(jimuLayerViewId: string): JimuLayerView[];
    /**
     * Return all child JimuLayerViews.
     */
    getChildJimuLayerViews(jimuLayerViewId: any): JimuLayerView[];
    private findChildLayerView;
    private updateMaxLayerIndex;
    private createJimuLayerViewInlayersOfGroupLayer;
    private createJimuLayerViewInSublayersOfImageLayer;
    /**
     * Clear the selected features.
     */
    clearSelectedFeatures(): void;
    /** @ignore */
    selectFeaturesByGraphic(graphic: __esri.Graphic, spatialRelationship: string): Promise<any>;
    private getSelectRecordsByQueryPromise;
    /**
     * Destroy the `JimuMapView` instance and the [ArcGIS API for Javascript `View`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html) at the same time.
     */
    destroy(): void;
    private _getDefaultJimuMapViewId;
    /**
     * Draw data on the map, using a dedicated [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html)
     * for every data entry. This will clear the layers drawn previously.
     */
    drawDataOnMap(newShowOnMapDatas: ShowOnMapDatas): void;
    /**
     * Draw the features in a [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html).
     */
    drawDataRecordSet(dataSet: DataRecordSet, targetLayerId: string, title?: string, symbolOption?: SymbolOption): Promise<__esri.Graphic[]>;
    /**
     * Update the drawn [`GraphicsLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html).
     */
    updateDrawnDataRecordSet(dataSet: DataRecordSet, targetLayerId: string, title?: string, symbolOption?: SymbolOption): Promise<__esri.Graphic[]>;
    /**
     * Get the graphics from `dataRecords`
     */
    private getGraphicsFromRecords;
    /**
     * get symbol
     */
    private getSymbol;
    /**
     * get default symbol
     */
    private getDefaultSymbol;
    /** jimu-map-view
     * get default symbol from renderer
     */
    private getDefaultSymbolByRenderer;
}
