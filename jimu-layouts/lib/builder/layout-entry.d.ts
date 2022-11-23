/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from 'jimu-layouts/layout-runtime';
declare const enum LayoutEntryMode {
    ChooseLayoutType = 0,
    RenderLayout = 1
}
interface State {
    mode: LayoutEntryMode;
}
declare class LayoutEntry extends React.Component<LayoutProps & StateToLayoutProps, State> {
    state: State;
    shouldComponentUpdate(nextProps: LayoutProps): boolean;
    onLayoutTypeSelected: () => void;
    switchToChoosingMobe: () => void;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof LayoutEntry, ReactRedux.Omit<React.ClassAttributes<LayoutEntry> & LayoutProps & StateToLayoutProps, "browserSizeMode" | "layout" | "mainSizeMode"> & LayoutProps>;
export default _default;
export declare function defaultWidetFilter(item: LayoutItemConstructorProps, isPlaceholder: boolean): boolean;
