/** @jsx jsx */
import { React, IntlShape, ThemeVariables } from 'jimu-core';
export declare type JimuSymbol = JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
export declare type JimuPointSymbol = (__esri.SimpleMarkerSymbol | __esri.PictureMarkerSymbol | __esri.PointSymbol3D);
export declare type JimuPolylineSymbol = (__esri.SimpleLineSymbol | __esri.LineSymbol3D);
export declare type JimuPolygonSymbol = (__esri.SimpleFillSymbol | __esri.PolygonSymbol3D);
export declare enum JimuSymbolType {
    Point = "Point",
    Polyline = "Polyline",
    Polygon = "Polygon"
}
interface Props {
    className?: string;
    symbol?: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    onPointSymbolChanged?: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged?: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged?: (symbol: JimuPolygonSymbol) => void;
    isShown?: boolean;
    onA11yReFocus?: () => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
export declare const SymbolList: React.ForwardRefExoticComponent<Pick<Omit<Props & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof Props> & {
    theme?: import("jimu-core").IMThemeVariables;
}>;
export {};
