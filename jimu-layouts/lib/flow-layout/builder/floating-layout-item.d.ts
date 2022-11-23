/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, IMLayoutItemJson, IMSizeModeLayoutJson, IMThemeVariables, LayoutItemConstructorProps } from 'jimu-core';
import { LayoutItemProps, PageContextProps, StateToLayoutItemProps } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    layouts: IMSizeModeLayoutJson;
    layoutItem: IMLayoutItemJson;
    builderTheme: IMThemeVariables;
    index: number;
    total: number;
    gutter: number;
    formatMessage: (id: string) => string;
    children?: any;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
}
interface State {
    isResizing: boolean;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
}
declare class FloatingLayoutItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps, State> {
    domRect: ClientRect;
    state: State;
    pageContext: PageContextProps;
    initWidth: number;
    initHeight: number;
    onResizeStart: (id: string, initWidth: number, initHeight: number) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    calculatePosition(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FloatingLayoutItem, ReactRedux.Omit<React.ClassAttributes<FloatingLayoutItem> & LayoutItemProps & StateToLayoutItemProps & OwnProps, "animationPreview" | "selected" | "watchViewportVisibility" | "autoScroll" | "playMode" | "layoutItem" | "previewId"> & LayoutItemProps & OwnProps>;
export default _default;
