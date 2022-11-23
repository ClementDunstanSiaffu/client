/// <reference types="react" />
import { React } from 'jimu-core';
import { JimuSymbol, JimuSymbolType, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
export interface JimuSymbolsGroup {
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
}
export interface SymbolCallBacks {
    onPointSymbolChanged?: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged?: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged?: (symbol: JimuPolygonSymbol) => void;
}
export interface SymbolContextStates {
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
}
interface SymbolContexAction {
    type: string;
    payload: any;
}
export declare const actionType: {
    SymbolChanged: string;
    JimuSymbolTypeChanged: string;
    SymbolCallBacksChanged: string;
    DefaultSymbolsChanged: string;
    PointSymbolChanged: string;
    PolylineSymbolChanged: string;
    PolygonSymbolChanged: string;
};
export declare const SymbolChangedAction: (symbol: JimuSymbol) => {
    type: string;
    payload: JimuSymbol;
};
export declare const JimuSymbolTypeChangedAction: (jimuSymbolType: JimuSymbolType) => {
    type: string;
    payload: JimuSymbolType;
};
export declare const SymbolCallBacksChangedAction: (callBacks: SymbolCallBacks) => {
    type: string;
    payload: SymbolCallBacks;
};
export declare const DefaultSymbolsChangedAction: (defaultSymbols: JimuSymbolsGroup) => {
    type: string;
    payload: JimuSymbolsGroup;
};
export declare const PointSymbolChangedAction: (symbol: JimuPointSymbol) => {
    type: string;
    payload: JimuPointSymbol;
};
export declare const PolylineSymbolChangedAction: (symbol: JimuPolylineSymbol) => {
    type: string;
    payload: JimuPolylineSymbol;
};
export declare const PolygonSymbolChangedAction: (symbol: JimuPolygonSymbol) => {
    type: string;
    payload: JimuPolygonSymbol;
};
export declare const init: (defaultSymbols: JimuSymbolsGroup) => SymbolContextStates;
export declare const reducer: (state: SymbolContextStates, action: SymbolContexAction) => {
    symbol: any;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    defaultSymbols: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    callBacks: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    jimuSymbolType: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    pointSymbol: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    polylineSymbol: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polygonSymbol: JimuPolygonSymbol;
} | {
    polygonSymbol: any;
    symbol: JimuPointSymbol | JimuPolylineSymbol | JimuPolygonSymbol;
    jimuSymbolType: JimuSymbolType;
    defaultSymbols: JimuSymbolsGroup;
    callBacks: SymbolCallBacks;
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
};
export declare const SymbolContext: React.Context<{
    symbolContextStates: SymbolContextStates;
    dispatchSymbolActions: React.Dispatch<SymbolContexAction>;
}>;
export declare const SymbolContextProvider: (props: any) => JSX.Element;
export {};
