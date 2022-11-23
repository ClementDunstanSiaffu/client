/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableObject, ReactRedux, IMThemeVariables } from 'jimu-core';
interface PageProps {
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
declare const _default: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}>, ReactRedux.Omit<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}, "footer" | "header" | "browserSizeMode" | "mainSizeMode" | "pages" | "isPrintPreview" | "dispatch" | "headerVisible" | "footerVisible" | "splashDialogJson" | "isSplashClosed" | "pageDialogId" | "pageDialogJson" | "isPageDlgClosed" | "urlDialogJson"> & PageProps>;
export default _default;
