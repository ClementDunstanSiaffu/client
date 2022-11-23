/** @jsx jsx */
import { jsx, IMHeaderJson, BrowserSizeMode, IMThemeVariables } from 'jimu-core';
import { PageContextProps } from '../builder/page-context';
export interface PageFooterProps {
    footerJson: IMHeaderJson;
    pageContext: PageContextProps;
    visible: boolean;
    browserSizeMode: BrowserSizeMode;
    mainSizeMode: BrowserSizeMode;
    theme: IMThemeVariables;
}
export declare function PageFooter(props: PageFooterProps): jsx.JSX.Element;
