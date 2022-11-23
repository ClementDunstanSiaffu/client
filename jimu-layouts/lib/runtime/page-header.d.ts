/** @jsx jsx */
import { jsx, IMHeaderJson, BrowserSizeMode, IMThemeVariables } from 'jimu-core';
import { PageContextProps } from '../builder/page-context';
export interface PageHeaderProps {
    headerJson: IMHeaderJson;
    pageContext: PageContextProps;
    visible: boolean;
    browserSizeMode: BrowserSizeMode;
    mainSizeMode: BrowserSizeMode;
    theme: IMThemeVariables;
}
export declare function PageHeader(props: PageHeaderProps): jsx.JSX.Element;
