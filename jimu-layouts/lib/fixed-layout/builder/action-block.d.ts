/** @jsx jsx */
import { jsx } from 'jimu-core';
import { PageContextProps } from 'jimu-layouts/layout-runtime';
export interface ActionBlockProps {
    pageContext: PageContextProps;
    onPageTemplateSelected: (templatePageJson: any) => void;
}
export declare function ActionBlock(props: ActionBlockProps): jsx.JSX.Element;
