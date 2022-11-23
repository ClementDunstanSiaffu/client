/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
import { ButtonSize } from 'jimu-ui';
import { JimuSymbol, JimuSymbolType } from 'jimu-ui/advanced/map';
interface SymbolItemProps {
    theme: ThemeVariables;
    symbol?: JimuSymbol;
    index?: number;
    isActive?: boolean;
    onClick?: (index: number, symbol?: JimuSymbol) => void;
    jimuSymbolType: JimuSymbolType;
    isSelectorPreview?: boolean;
    isInnerPreviewBtn?: boolean;
    className?: string;
    btnSize?: ButtonSize;
    a11yNeedFocus?: boolean;
    btnRef?: any;
}
interface States {
    symbolLoading: boolean;
    apiLoaded: boolean;
}
export declare class _SymbolItem extends React.PureComponent<SymbolItemProps, States> {
    btnContainerRef: HTMLElement;
    btnRef: HTMLElement;
    symbolUtils: typeof __esri.symbolUtils;
    ApiSyncRenderSymbolFlag: boolean;
    renderPreviewHTMLPromise: Promise<HTMLElement>;
    innerIconWH: number;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SymbolItemProps, prevState: unknown): void;
    onHandleSymbolClick: () => void;
    render(): jsx.JSX.Element;
}
export declare const SymbolItem: typeof _SymbolItem;
declare const _default: React.ForwardRefExoticComponent<SymbolItemProps & React.RefAttributes<unknown>>;
export default _default;
