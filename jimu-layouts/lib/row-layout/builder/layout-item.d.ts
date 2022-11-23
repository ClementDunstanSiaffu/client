/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutItemJson, IMLayoutItemJson, IMThemeVariables, LayoutItemConstructorProps, IMSizeModeLayoutJson, SerializedStyles } from 'jimu-core';
import { LayoutItemProps, RowLayoutItemSetting } from 'jimu-layouts/layout-runtime';
interface OwnProps {
    layoutItem: IMLayoutItemJson;
    isMultiRow: boolean;
    offset: number;
    span: number;
    order: number;
    gutter: number;
    alignItems?: string;
    builderTheme: IMThemeVariables;
    children?: any;
    onResizeStart: (id: string) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void;
}
interface State {
    isResizing: boolean;
    dh: number;
}
export default class RowItem extends React.PureComponent<LayoutItemProps & OwnProps, State> {
    initHeight: number;
    initWidth: number;
    fakeTopLayouts: IMSizeModeLayoutJson;
    fakeBottomLayouts: IMSizeModeLayoutJson;
    state: State;
    constructor(props: any);
    handleResizeStart: (id: string, initW: number, initH: number) => void;
    handleResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    handleResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    isFunctionalWidget(): boolean;
    handleDropAtTop: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
    handleDropAtBottom: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
    dropAtBoundary: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, side: 'top' | 'bottom') => void;
    pasteAtBoundary: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, side: 'top' | 'bottom') => void;
    getStyle(itemSetting: RowLayoutItemSetting): [SerializedStyles, string];
    render(): JSX.Element;
}
export {};
