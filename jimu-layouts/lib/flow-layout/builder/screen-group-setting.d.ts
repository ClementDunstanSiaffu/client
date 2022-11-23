/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ReactRedux, ScreenTransitionType } from 'jimu-core';
import { LayoutItemSettingProps } from '../../builder/types';
interface StateToProps {
    transitionType: ScreenTransitionType;
    panelTransitionType: ScreenTransitionType;
}
interface State {
    showSidePanel: boolean;
}
declare class ScreenGroupSetting extends React.PureComponent<LayoutItemSettingProps & StateToProps, State> {
    sidePopperTrigger: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    onTransitionTypeChange: (type: ScreenTransitionType) => void;
    onPanelTransitionTypeChange: (type: ScreenTransitionType) => void;
    getAnimBoxStyle(): import("jimu-core").SerializedStyles;
    getSidePopperStyle(): import("jimu-core").SerializedStyles;
    toggleSidePanel: () => void;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof ScreenGroupSetting, ReactRedux.Omit<any, "dispatch" | "transitionType" | "panelTransitionType"> & LayoutItemSettingProps>;
export default _default;
