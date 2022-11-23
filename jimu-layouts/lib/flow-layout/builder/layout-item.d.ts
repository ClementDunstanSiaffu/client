/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, IMLayoutItemJson, IMSizeModeLayoutJson, IMThemeVariables, LayoutItemConstructorProps, SerializedStyles } from 'jimu-core';
import { LayoutItemProps, PageContextProps, ToolbarConfig } from 'jimu-layouts/layout-runtime';
import { FlowLayoutItemSetting } from '../../types';
import { StateToFlowItemProps } from '../layout-utils';
interface OwnProps {
    layouts: IMSizeModeLayoutJson;
    layoutItem: IMLayoutItemJson;
    builderTheme: IMThemeVariables;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    gutter: number;
    formatMessage: (id: string) => string;
    children?: any;
    onDropAtBoundary: (draggingItem: LayoutItemConstructorProps, itemRect: ClientRect, insertIndex: number) => void;
}
interface State {
    isResizing: boolean;
    dh: number;
    showBlockTemplatePopup: boolean;
    showScreenTemplatePopup: boolean;
    referenceElem: HTMLElement;
}
declare class FlowLayoutItem extends React.PureComponent<LayoutItemProps & StateToFlowItemProps & OwnProps, State> {
    state: State;
    fakeTopLayouts: IMSizeModeLayoutJson;
    fakeBottomLayouts: IMSizeModeLayoutJson;
    minHeight: number;
    initHeight: number;
    pageContext: PageContextProps;
    contextMenus: ToolbarConfig;
    reference: HTMLDivElement;
    constructor(props: any);
    onResizeStart: (id: string, initWidth: number, initHeight: number) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => void;
    calHeight(itemSetting: FlowLayoutItemSetting): string;
    toggleBlockTemplatePopup: () => void;
    toggleScreenTemplatePopup: () => void;
    removeLayoutItem: () => void;
    moveLayoutItemUp: () => void;
    moveLayoutItemDown: () => void;
    createContextMenu(): jsx.JSX.Element;
    switchSetting: () => void;
    onTemplateBlockSelected: (template: any) => void;
    onTemplateScreenGroupSelected: (template: any) => void;
    getStyle(itemSetting: FlowLayoutItemSetting): [SerializedStyles, string];
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof FlowLayoutItem, ReactRedux.Omit<any, "padding" | "selected" | "dispatch" | "isEmpty"> & LayoutItemProps & OwnProps>;
export default _default;
