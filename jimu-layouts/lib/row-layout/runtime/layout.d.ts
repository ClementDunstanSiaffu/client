/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutTransformFunc, IMLayoutJson } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../../types';
declare type FlexboxLayoutProps = LayoutProps & {
    widgetId: string;
};
declare class RowLayout extends React.PureComponent<FlexboxLayoutProps & StateToLayoutProps> {
    finalLayout: IMLayoutJson;
    layoutTransform: LayoutTransformFunc;
    handleDebounceResize: any;
    constructor(props: any);
    findExtension(): void;
    transform(): void;
    createRow(): JSX.Element;
    onResize: (width: number, height: number) => void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof RowLayout, ReactRedux.Omit<any, "browserSizeMode" | "layout" | "mainSizeMode" | "dispatch"> & LayoutProps & {
    widgetId: string;
}>;
export default _default;
