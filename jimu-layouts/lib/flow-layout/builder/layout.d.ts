/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, LayoutInfo, LayoutItemConstructorProps, IMThemeVariables, IMLayoutItemJson, IMAppConfig, LayoutTransformFunc, SerializedStyles } from 'jimu-core';
import { LayoutProps, StateToLayoutProps, PageContextProps, FlowLayoutSetting } from 'jimu-layouts/layout-runtime';
import { DropHandlers } from '../../builder/types';
import { CanvasPane } from '../../builder/interactive/canvas-pane';
interface State {
    isDragover: boolean;
    isLoadingTemplate: boolean;
}
declare class Layout extends React.PureComponent<LayoutProps & StateToLayoutProps, State> implements DropHandlers {
    ref: HTMLElement;
    widgetListBtnRef: HTMLElement;
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
    maxPageWidth: number;
    builderTheme: IMThemeVariables;
    pageContext: PageContextProps;
    layoutTransform: LayoutTransformFunc;
    state: State;
    blockReference: HTMLDivElement;
    blockReference2: HTMLDivElement;
    templateReference: HTMLDivElement;
    mousedownX: number;
    mousedownY: number;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    handleActivate: (e: React.MouseEvent) => void;
    handleMouseDown: (e: any) => void;
    handleDragOver(draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: Partial<ClientRect>, itemRect: Partial<ClientRect>, clientX: number, clientY: number): void;
    handleToggleDragoverEffect(value: boolean, draggingItem: LayoutItemConstructorProps): void;
    handleDragEnter(draggingItem: LayoutItemConstructorProps): void;
    handleDragLeave(): void;
    handleDrop(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect): void;
    addWidgetToLayout(draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect, width: number, insertIndex: number, appConfig?: IMAppConfig): void;
    handleDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
    collectBounds(layoutInfo: LayoutInfo): Array<ClientRect & {
        id: string;
    }>;
    createItem(item: IMLayoutItemJson, total: number, index: number, layoutSetting: FlowLayoutSetting): JSX.Element;
    onWidgetItemSelected: (item: LayoutItemConstructorProps) => void;
    handleBlockTemplateSelected: (template: any) => void;
    handleScreenTemplateSelected: (template: any) => void;
    handlePageTemplateSelected: (templatePageJson: any) => void;
    getActionStyle(): SerializedStyles;
    getStyle(): SerializedStyles;
    createActions(blockOnly: boolean): JSX.Element;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof Layout, ReactRedux.Omit<any, "browserSizeMode" | "layout" | "mainSizeMode" | "dispatch"> & LayoutProps>;
export default _default;
