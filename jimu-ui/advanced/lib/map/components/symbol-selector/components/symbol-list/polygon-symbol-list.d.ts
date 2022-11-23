/// <reference types="react" />
import { React, IntlShape, ThemeVariables } from 'jimu-core';
import { JimuSymbol, JimuPolygonSymbol } from 'jimu-ui/advanced/map';
interface Props {
    intl?: IntlShape;
    theme: ThemeVariables;
    symbol?: JimuPolygonSymbol;
    onSymbolChanged: (symbol: JimuSymbol) => void;
}
interface States {
    apiLoaded: boolean;
    currentIndex: number;
}
export declare class PolygonSymbolList extends React.PureComponent<Props, States> {
    jsonUtils: typeof __esri.jsonUtils;
    constructor(props: any);
    componentDidMount(): void;
    handleSymbolSelected: (index: number, symbol: any) => void;
    renderPolygonSymbolList: () => JSX.Element[];
    getPolygonSymbolParamsSetting: () => JSX.Element;
    updateSymbolOutLineWeight: (value: any) => void;
    updateSymbolOutLineColor: (color: string) => void;
    updateSymbolFillColor: (color: string) => void;
    getOpacityInSymbol: () => number;
    updateSymbolOpacity: (value: any) => void;
    render(): JSX.Element;
}
export {};
