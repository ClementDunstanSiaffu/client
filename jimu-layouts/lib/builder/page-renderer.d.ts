/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, PageJson, ReactRedux, ImmutableObject, BrowserSizeMode, PagePart, IMHeaderJson, IMFooterJson, LayoutInfo, IntlShape, ClipboardItem, DialogJson, IMDialogJson, IMThemeVariables } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
interface PageProps {
    intl: IntlShape;
    dialogId?: string;
    /**
     * store pages that have been rendered
     *
     * Only one page will be visible, all other pages will be hidden
     *  */
    pageStatus: ImmutableObject<{
        [pageId: string]: boolean;
    }>;
}
interface StateToProps {
    pages: ImmutableObject<{
        [pageId: string]: PageJson;
    }>;
    header: IMHeaderJson;
    headerVisible?: boolean;
    footer: IMFooterJson;
    footerVisible?: boolean;
    mainSizeMode: BrowserSizeMode;
    browserSizeMode: BrowserSizeMode;
    minHeight: number;
    activePagePart: PagePart;
    clipboardItem: ClipboardItem;
    dialogs: ImmutableObject<{
        [dlgId: string]: DialogJson;
    }>;
    currentDialogId?: string;
    splashDialogJson: IMDialogJson;
    isSplashClosed: boolean;
    pageDialogId: string;
    pageDialogJson: IMDialogJson;
    isPageDlgClosed: boolean;
    urlDialogJson: IMDialogJson;
}
export declare class PageRenderer extends React.PureComponent<PageProps & StateToProps & {
    theme: IMThemeVariables;
}> {
    static displayName: string;
    pageRef: HTMLElement;
    pageContext: ImmutableObject<PageContextProps>;
    activeLayoutInfo: LayoutInfo;
    keyBindings: {
        [key: string]: any;
    };
    constructor(props: any);
    startPaste: () => void;
    isMac: () => boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PageProps): void;
    clearSelection: (e: any) => void;
    formatMessage: (id: string, values?: any) => string;
    getPageStyle(): import("jimu-core").SerializedStyles;
    updatePageContext(): void;
    render(): jsx.JSX.Element;
    renderHeader(): jsx.JSX.Element;
    renderFooter(): jsx.JSX.Element;
    renderPageBody(renderedPageId: string): jsx.JSX.Element;
    isDialogViewOnly(dialogJson: any): boolean;
    renderDialog(): jsx.JSX.Element;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<ReactRedux.Omit<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}, "footer" | "header" | "browserSizeMode" | "minHeight" | "mainSizeMode" | "pages" | "dialogs" | "currentDialogId" | "activePagePart" | "dispatch" | "headerVisible" | "footerVisible" | "splashDialogJson" | "isSplashClosed" | "pageDialogId" | "pageDialogJson" | "isPageDlgClosed" | "urlDialogJson" | "clipboardItem"> & PageProps>> & {
    WrappedComponent: React.ComponentType<ReactRedux.Omit<Pick<any, string | number | symbol> & {
        theme?: IMThemeVariables;
    }, "footer" | "header" | "browserSizeMode" | "minHeight" | "mainSizeMode" | "pages" | "dialogs" | "currentDialogId" | "activePagePart" | "dispatch" | "headerVisible" | "footerVisible" | "splashDialogJson" | "isSplashClosed" | "pageDialogId" | "pageDialogJson" | "isPageDlgClosed" | "urlDialogJson" | "clipboardItem"> & PageProps>;
};
export default _default;
