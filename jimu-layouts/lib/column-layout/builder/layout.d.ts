/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutItemJson, LayoutItemConstructorProps, IMThemeVariables } from 'jimu-core';
import { DropHandlers } from '../../builder/types';
import { LayoutProps, StateToLayoutProps } from 'jimu-layouts/layout-runtime';
import { CanvasPane } from '../../builder/interactive/canvas-pane';
interface State {
    isDragover: boolean;
}
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps, State> implements DropHandlers {
    ref: HTMLElement;
    canvasRef: HTMLCanvasElement;
    canvasPane: CanvasPane;
    boundingRect: ClientRect;
    isDragging: boolean;
    childRects: Array<ClientRect & {
        id: string;
    }>;
    domRect: ClientRect;
    resizingRect: ClientRect;
    referenceId: string;
    theme: IMThemeVariables;
    builderTheme: IMThemeVariables;
    state: State;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    handleItemResizeStart(id: string): void;
    handleItemResizing: () => void;
    handleItemResizeEnd(id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson): void;
    handleDragOver(draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>): void;
    handleToggleDragoverEffect(value: boolean): void;
    handleDragEnter(): void;
    handleDragLeave(): void;
    handleDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): void;
    collectBounds(id: string): Array<ClientRect & {
        id: string;
    }>;
    createItem(itemId: string, index: number, layoutSetting: any): JSX.Element;
    isEmpty(): boolean;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, ReactRedux.Omit<any, "browserSizeMode" | "layout" | "mainSizeMode" | "dispatch"> & LayoutProps>;
export default _default;
