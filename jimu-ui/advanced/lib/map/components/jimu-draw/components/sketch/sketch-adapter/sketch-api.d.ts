/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
import { JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol, JimuSymbol, JimuSymbolType, DrawingElevationMode3D } from 'jimu-ui/advanced/map';
import { JimuMapView } from 'jimu-arcgis';
import { CreatToolActions, JimuDrawCreatedDescriptor, DrawingUpdatedDescriptor } from '../constraints';
import { JimuDrawCreationMode, JimuSymbolsGroup } from '../';
import { JimuDrawUIOptions } from '../../layouts';
import { MeasurementsRuntimeInfo } from '../../measurements/constraints';
export interface SketchAPIProps {
    jimuMapView: JimuMapView;
    isDisplayCanvasLayer: boolean;
    theme: ThemeVariables;
    creationMode?: JimuDrawCreationMode;
    visibleElements?: __esri.SketchVisibleElements;
    updateOnGraphicClick?: boolean;
    defaultCreateOptions?: __esri.SketchViewModelDefaultCreateOptions;
    defaultUpdateOptions?: __esri.SketchViewModelDefaultUpdateOptions;
    snappingOptions?: __esri.SnappingOptionsProperties;
    elevationInfo?: DrawingElevationMode3D;
    disableSymbolSelector?: boolean;
    defaultSymbols?: JimuSymbolsGroup;
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
    onJimuDrawCreated?: (jimuDrawCreatedDescriptor: JimuDrawCreatedDescriptor) => void;
    onToolsActived?: (drawingMode: string) => void;
    onDrawingCleared?: () => void;
    onDrawingStarted?: () => void;
    onDrawingCanceled?: () => void;
    onDrawingFinished?: (graphic: __esri.Graphic) => void;
    onDrawingUpdated?: (result: DrawingUpdatedDescriptor) => void;
    currentSymbolChanged: (symbol: JimuSymbol) => void;
    currentSymbolTypeChanged: (jimuSymbolType: JimuSymbolType) => void;
    currentActiveToolChanged: (type: CreatToolActions) => void;
    uiOptions: JimuDrawUIOptions;
    currentActiveBtnChanged: (ref: Element) => void;
    isExpandSymbolList: boolean;
    setIsExpandSymbolList: (isExpand: boolean) => void;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
}
export interface ApiModulesTypes {
    Sketch: __esri.SketchConstructor;
    SketchViewModel: __esri.SketchViewModelConstructor;
    GraphicsLayer: __esri.GraphicsLayerConstructor;
    Graphic: __esri.GraphicConstructor;
    jsonUtils: __esri.jsonUtils;
    geometryEngine: __esri.geometryEngine;
    coordinateFormatter: __esri.coordinateFormatter;
    TextSymbol: __esri.TextSymbol;
    FeatureLayer: __esri.FeatureLayerConstructor;
}
export declare const SketchAPI: React.MemoExoticComponent<(props: SketchAPIProps) => jsx.JSX.Element>;
