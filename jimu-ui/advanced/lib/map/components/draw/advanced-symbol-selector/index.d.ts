/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuSymbolType } from '../../../components/symbol-selector/components/symbol-list';
import type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from '../../../components/symbol-selector/components/symbol-list';
export { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol };
export interface Props {
    symbol: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    popperPositionRef: any;
    popperIsVisible: boolean;
    popperVersion: number;
    onPointSymbolChanged?: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged?: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged?: (symbol: JimuPolygonSymbol) => void;
    onPopperToggle?: (isPopperOpen: any) => void;
}
export declare const _AdvancedSymbolSelector: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
export declare const AdvancedSymbolSelector: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
