/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
export { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol };
export interface Props {
    isShown: boolean;
}
export declare const SymbolListWithMeasurements: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
