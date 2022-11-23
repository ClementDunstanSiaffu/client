/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, ThemeVariables } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { /*JimuSymbolType, JimuSymbol,*/ JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
import { JimuDrawUIOptions } from './components/layouts';
import { JimuDrawingOptions, JimuDrawCreatedDescriptor, DrawingUpdatedDescriptor, JimuSymbolsGroup } from './components/sketch';
import { MeasurementsPropsInfo, MeasurementsUnitsInfo } from './components/measurements/constraints';
export interface JimuDrawProps {
    jimuMapView: JimuMapView;
    theme: ThemeVariables;
    intl: IntlShape;
    isDisplayCanvasLayer?: boolean;
    drawingOptions?: JimuDrawingOptions;
    measurementsInfo?: MeasurementsPropsInfo;
    measurementsUnitsInfos?: MeasurementsUnitsInfo[];
    uiOptions?: JimuDrawUIOptions;
    disableSymbolSelector?: boolean;
    defaultSymbols?: JimuSymbolsGroup;
    onPointSymbolChanged?: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged?: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged?: (symbol: JimuPolygonSymbol) => void;
    onJimuDrawCreated?: (jimuDrawCreatedDescriptor: JimuDrawCreatedDescriptor) => void;
    onToolsActived?: (drawingMode: string) => void;
    onDrawingStarted?: () => void;
    onDrawingCanceled?: () => void;
    onDrawingFinished?: (graphic: __esri.Graphic) => void;
    onDrawingUpdated?: (res: DrawingUpdatedDescriptor) => void;
    onDrawingCleared?: () => void;
}
export declare const ContextsBridge: React.MemoExoticComponent<(props: JimuDrawProps) => jsx.JSX.Element>;
