/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
import { JimuSymbolType } from 'jimu-ui/advanced/map';
import type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
import { MeasurementsRuntimeInfo, MeasurementsUnitsInfo } from '../../measurements/constraints';
export { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol };
export interface Props {
    theme: ThemeVariables;
    symbol: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    isShown: boolean;
    onPointSymbolChanged: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged: (symbol: JimuPolygonSymbol) => void;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
    handleMeasurementsInfoChanged: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => void;
}
export declare const SymbolsPanel: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
