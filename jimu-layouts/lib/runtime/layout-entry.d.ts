/// <reference types="react" />
import { React, ReactRedux } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../types';
declare class LayoutEntry extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof LayoutEntry, ReactRedux.Omit<React.ClassAttributes<LayoutEntry> & LayoutProps & StateToLayoutProps, "browserSizeMode" | "layout" | "mainSizeMode"> & LayoutProps>;
export default _default;
