/// <reference types="react" />
/** @jsx jsx */
import { jsx, React, IntlShape, ThemeVariables } from 'jimu-core';
import { JimuSymbol, JimuPolylineSymbol } from 'jimu-ui/advanced/map';
interface Props {
    intl?: IntlShape;
    theme: ThemeVariables;
    symbol?: JimuPolylineSymbol;
    onSymbolChanged: (symbol: JimuSymbol) => void;
}
interface States {
    apiLoaded: boolean;
    currentIndex: number;
}
export declare class PolylineSymbolList extends React.PureComponent<Props, States> {
    jsonUtils: typeof __esri.jsonUtils;
    constructor(props: any);
    componentDidMount(): void;
    handleSymbolSelected: (index: number, symbol: any) => void;
    onSelectChanged: (e: any) => void;
    updateSymbolLineWidth: (value: any) => void;
    getOpacityInSymbol: () => number;
    updateSymbolOpacity: (value: any) => void;
    updateSymbolFillColor: (color: string) => void;
    renderPolylineSymbolList: () => jsx.JSX.Element[];
    getPolylineSymbolParamsSetting: () => jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
export {};
