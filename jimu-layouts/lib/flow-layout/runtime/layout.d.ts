/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, LayoutTransformFunc, IMLayoutItemJson } from 'jimu-core';
import { LayoutProps, StateToLayoutProps, FlowLayoutSetting } from '../../types';
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    layoutTransform: LayoutTransformFunc;
    constructor(props: any);
    _createItem(item: IMLayoutItemJson, index: number, layoutSetting: FlowLayoutSetting): jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, ReactRedux.Omit<any, "browserSizeMode" | "layout" | "mainSizeMode" | "dispatch"> & LayoutProps>;
export default _default;
