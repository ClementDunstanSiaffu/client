/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, LayoutTransformFunc, IMLayoutJson } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../../types';
import { PageContextProps } from '../../builder/page-context';
declare class FixedLayoutViewer extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    layoutTransform: LayoutTransformFunc;
    pageContext: PageContextProps;
    createItem(layout: IMLayoutJson, itemId: string, index: number, transformed: boolean): jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FixedLayoutViewer, ReactRedux.Omit<React.ClassAttributes<FixedLayoutViewer> & LayoutProps & StateToLayoutProps, "browserSizeMode" | "layout" | "mainSizeMode"> & LayoutProps>;
export default _default;
