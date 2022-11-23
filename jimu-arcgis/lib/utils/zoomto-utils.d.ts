export declare function zoomTo(view: __esri.View, target: any, options: any): Promise<any>;
export interface ViewSize {
    width: number;
    height: number;
}
export declare function getExtentFromScale(viewSize: ViewSize, extent: __esri.Extent, scale: number, needToAdjustHeightToAspectRatio?: boolean): Promise<__esri.Extent>;
export declare function projectToSpatialReference(geometries: __esri.Geometry[], spatialReference: __esri.SpatialReference): Promise<__esri.Geometry[]>;
