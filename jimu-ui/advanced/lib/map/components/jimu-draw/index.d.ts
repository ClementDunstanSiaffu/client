/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, ThemeVariables } from 'jimu-core';
import type { JimuDrawProps } from './contexts-bridge';
import { Arrangement } from './components/layouts';
import { JimuDrawCreationMode, DrawingElevationMode3D } from './components/sketch';
import type { JimuDrawingOptions, JimuDrawCreatedDescriptor, DrawingUpdatedDescriptor } from './components/sketch';
import { useMeasurementsUnitsInfos } from './components/measurements';
import type { MeasurementsUnitsInfo, MeasurementsPropsInfo } from './components/measurements';
export { JimuDrawProps, JimuDrawingOptions, JimuDrawCreationMode, Arrangement, DrawingElevationMode3D, JimuDrawCreatedDescriptor, DrawingUpdatedDescriptor, useMeasurementsUnitsInfos };
export type { MeasurementsPropsInfo, MeasurementsUnitsInfo };
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
export declare const _JimuDraw: React.MemoExoticComponent<(props: JimuDrawProps & ExtraProps) => jsx.JSX.Element>;
export declare const JimuDraw: React.FC<import("react-intl").WithIntlProps<Pick<JimuDrawProps & ExtraProps, "intl" | "onPointSymbolChanged" | "onPolylineSymbolChanged" | "onPolygonSymbolChanged" | "jimuMapView" | "disableSymbolSelector" | "isDisplayCanvasLayer" | "drawingOptions" | "measurementsInfo" | "measurementsUnitsInfos" | "uiOptions" | "defaultSymbols" | "onJimuDrawCreated" | "onToolsActived" | "onDrawingStarted" | "onDrawingCanceled" | "onDrawingFinished" | "onDrawingUpdated" | "onDrawingCleared"> & {
    theme?: import("jimu-core").IMThemeVariables;
}>> & {
    WrappedComponent: React.ComponentType<Pick<JimuDrawProps & ExtraProps, "intl" | "onPointSymbolChanged" | "onPolylineSymbolChanged" | "onPolygonSymbolChanged" | "jimuMapView" | "disableSymbolSelector" | "isDisplayCanvasLayer" | "drawingOptions" | "measurementsInfo" | "measurementsUnitsInfos" | "uiOptions" | "defaultSymbols" | "onJimuDrawCreated" | "onToolsActived" | "onDrawingStarted" | "onDrawingCanceled" | "onDrawingFinished" | "onDrawingUpdated" | "onDrawingCleared"> & {
        theme?: import("jimu-core").IMThemeVariables;
    }>;
};
