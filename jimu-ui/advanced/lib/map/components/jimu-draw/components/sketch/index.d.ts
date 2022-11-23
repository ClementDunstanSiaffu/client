/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { JimuDrawingOptions } from './context/sketch-context';
import { JimuSymbolsGroup } from '../symbols/context/symbol-context';
import { JimuDrawCreatedDescriptor } from './sketch-adapter';
import { JimuDrawCreationMode, DrawingElevationMode3D, DrawingUpdatedModes, DrawingUpdatedDescriptor } from './constraints';
export type { JimuDrawCreatedDescriptor, JimuDrawingOptions, DrawingUpdatedModes, DrawingUpdatedDescriptor, JimuSymbolsGroup };
export { JimuDrawCreationMode, DrawingElevationMode3D };
export interface JimuSketchProps {
    className?: string;
    jimuMapView: JimuMapView;
    theme?: ThemeVariables;
    onJimuDrawCreated?: (drawTool: JimuDrawCreatedDescriptor) => void;
    onToolsActived?: (drawingMode: string) => void;
    onDrawingCleared?: () => void;
    onDrawingStarted?: () => void;
    onDrawingCanceled?: () => void;
    onDrawingFinished?: (graphic: __esri.Graphic) => void;
    onDrawingUpdated?: (res: DrawingUpdatedDescriptor) => void;
}
export declare const Sketch: React.MemoExoticComponent<(props: JimuSketchProps) => jsx.JSX.Element>;
