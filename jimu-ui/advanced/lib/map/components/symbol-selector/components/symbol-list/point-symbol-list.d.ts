/// <reference types="react" />
import { React, IntlShape, ThemeVariables } from 'jimu-core';
import { JimuSymbol, JimuPointSymbol } from 'jimu-ui/advanced/map';
interface Props {
    intl?: IntlShape;
    theme: ThemeVariables;
    symbol?: JimuPointSymbol;
    onSymbolChanged: (symbol: JimuSymbol) => void;
}
interface SymbolSetInfo {
    name: string;
    id: string;
    title: string;
    keywords: string[];
    dataUrl: string;
    defaultType?: boolean;
}
interface States {
    apiLoaded: boolean;
    symbolSetInfos: SymbolSetInfo[];
    pointSymbolList: [];
    currentPointSymbolListItemId: string;
    symbolSelectedInfo: SymbolSelectedInfo;
    showLoadingUI: boolean;
    doLazyLoad: boolean;
}
interface SymbolSelectedInfo {
    listItemId: string;
    symbolIdx: number;
}
export declare class PointSymbolList extends React.PureComponent<Props, States> {
    jsonUtils: typeof __esri.jsonUtils;
    Portal: typeof __esri.Portal;
    portal: __esri.Portal;
    portalUrl: string;
    allPointSymbolList: any;
    IS_LAZY_LOADED_FLAG: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: States): void;
    setInitialPointSymbolList: (symbolSetInfos: SymbolSetInfo[]) => void;
    handleSymbolSelected: (index: number, symbol: any) => void;
    _isSymbolItemSelected: (index: number) => boolean;
    renderPointSymbolList: () => JSX.Element | JSX.Element[];
    fetchSymbolSetInfos: () => Promise<any>;
    getSymbolSetGroupId: () => Promise<any>;
    getSymbolSetInfos: (groupId: any) => Promise<any>;
    onSelectChanged: (e: any) => void;
    fetchPointSymbolListByItemId: (itemId: string) => void;
    requestPointSymJson: (itemId: any) => void;
    getItemUrl: (portalUrl: any, _itemId: any) => string;
    getBaseItemUrl: (_portalUrl: any) => string;
    getPointSymbolParamsSetting: () => JSX.Element;
    updateSymbolSize: (value: any) => void;
    updateSymbolFillColor: (color: string) => void;
    updateSymbolOutLineColor: (color: string) => void;
    updateSymbolOutLineWeight: (value: any) => void;
    updateSymbolOpacity: (value: any) => void;
    getOpacityInSymbol: () => number;
    getPointSymbolParamsSettingForSimpleMarker: () => JSX.Element;
    getPointSymbolParamsSettingForPictureMarker: () => JSX.Element;
    render(): JSX.Element;
}
export {};
