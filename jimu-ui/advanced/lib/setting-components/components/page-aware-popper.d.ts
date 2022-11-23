/// <reference types="react" />
/** @jsx jsx */
import { PopperProps } from 'jimu-ui';
import { React, ReactRedux, BrowserSizeMode, IMThemeVariables, jsx } from 'jimu-core';
interface StateToPopperProps {
    pageId: string;
    sizemode: BrowserSizeMode;
    dispatch?: any;
}
declare class PageAwarePopper extends React.PureComponent<PopperProps & StateToPopperProps & {
    theme?: IMThemeVariables;
}> {
    componentDidUpdate(prevProps: PopperProps & StateToPopperProps): void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof PageAwarePopper, ReactRedux.Omit<React.ClassAttributes<PageAwarePopper> & import("jimu-ui")._PopperProps & Omit<import("jimu-ui").PopperCoreProps, "version" | "children" | "reference"> & StateToPopperProps & {
    theme?: IMThemeVariables;
}, "dispatch" | "pageId" | "sizemode"> & import("jimu-ui")._PopperProps & Omit<import("jimu-ui").PopperCoreProps, "version" | "children" | "reference">>;
export default _default;
