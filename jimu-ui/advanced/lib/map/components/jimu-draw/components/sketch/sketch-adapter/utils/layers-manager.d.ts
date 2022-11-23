import { JimuMapView } from 'jimu-arcgis';
import { DrawingElevationMode3D } from 'jimu-ui/advanced/map';
import { MeasurementsRuntimeInfo } from '../../../measurements/constraints';
import type { ApiModulesTypes } from '../sketch-api';
export interface LayersGroupForJimuMapView {
    canvasLayer: __esri.GraphicsLayer;
    measurementsLayer: __esri.FeatureLayer;
}
export interface LayersManagerProps {
    jimuMapView: JimuMapView;
    apiModules: ApiModulesTypes;
    elevationInfo: DrawingElevationMode3D;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
}
export declare const useLayersManager: (props: LayersManagerProps) => {
    getLayersGroupByJimuMapId: (jimuMapId?: string) => LayersGroupForJimuMapView;
    addLayersToMap: () => LayersGroupForJimuMapView;
    changeLayerElev: () => void;
    removeAllLayersFromMap: (jimuMapWidgetId?: string) => void;
};
