/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, jsx } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../../types';
declare class GridLayout extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof GridLayout, ReactRedux.Omit<React.ClassAttributes<GridLayout> & LayoutProps & StateToLayoutProps, "browserSizeMode" | "layout" | "mainSizeMode"> & LayoutProps>;
export default _default;
