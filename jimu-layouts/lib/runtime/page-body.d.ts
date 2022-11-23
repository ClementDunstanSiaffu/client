/** @jsx jsx */
import { jsx, IMPageJson, BrowserSizeMode } from 'jimu-core';
import { PageContextProps } from '../builder/page-context';
export interface PageBodyProps {
    pageJson: IMPageJson;
    pageContext: PageContextProps;
    visible: boolean;
    browserSizeMode: BrowserSizeMode;
    isPrintPreview: boolean;
}
export declare function PageBody(props: PageBodyProps): jsx.JSX.Element;
