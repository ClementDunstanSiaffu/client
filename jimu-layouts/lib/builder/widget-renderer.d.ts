/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { PageContextProps, LayoutItemProps, WidgetProps } from 'jimu-layouts/layout-runtime';
declare type Props = LayoutItemProps & WidgetProps;
export declare class WidgetRendererInBuilder extends React.PureComponent<Props> {
    pageContext: PageContextProps;
    mask(): jsx.JSX.Element;
    getStyle(): import("jimu-core").SerializedStyles;
    getPlaceholderStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
