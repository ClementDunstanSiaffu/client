/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { ButtonSize } from 'jimu-ui';
import { JimuSymbolType } from './components/symbol-list';
import type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from './components/symbol-list';
export { JimuSymbolType };
export type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol };
export interface SymbolSelectorCreatedDescriptor {
    symbol: JimuSymbol;
}
export interface SymbolSelectorProps {
    symbol: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    btnSize?: ButtonSize;
    className?: string;
    isShowPreviewBtn?: boolean;
    onCreated?: (symbolSelectorCreatedDescriptor: SymbolSelectorCreatedDescriptor) => void;
    onPointSymbolChanged?: (symbol: JimuPointSymbol) => void;
    onPolylineSymbolChanged?: (symbol: JimuPolylineSymbol) => void;
    onPolygonSymbolChanged?: (symbol: JimuPolygonSymbol) => void;
    onPopperToggle?: (isPopperOpen: any) => void;
}
export declare const _SymbolSelector: React.MemoExoticComponent<(props: SymbolSelectorProps) => jsx.JSX.Element>;
export declare const SymbolSelector: import("@emotion/styled").StyledComponent<Pick<SymbolSelectorProps, keyof SymbolSelectorProps> & {
    theme?: import("jimu-core").IMThemeVariables;
}, {}, {}>;
