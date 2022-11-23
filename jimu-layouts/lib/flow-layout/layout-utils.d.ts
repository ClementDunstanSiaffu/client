import { IMState, IMLayoutItemJson, LayoutItemJson, SerializedStyles } from 'jimu-core';
export interface StateToFlowItemProps {
    isEmpty: boolean;
    padding: number;
    selected: boolean;
}
export declare function mapStateToFlowItemProps(state: IMState, ownProps: {
    layoutItem: IMLayoutItemJson;
    layoutId: string;
}): StateToFlowItemProps;
export declare function getWidthFromSetting(setting: any): string;
export declare function calculateFloatingPosition(layoutItem: LayoutItemJson, resizingProps?: {
    dh: number;
    dw: number;
    isResizing: boolean;
    initWidth: number;
    initHeight: number;
}): SerializedStyles;
