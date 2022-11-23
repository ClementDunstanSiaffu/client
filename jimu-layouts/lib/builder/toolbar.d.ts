/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, ThemeVariables, jsx, IMLayoutItemJson } from 'jimu-core';
import { ToolItemConfig } from '../types';
export interface ToolbarProps {
    tools: Array<ToolItemConfig | ToolItemConfig[]>;
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    parentRef: HTMLElement;
    theme: ThemeVariables;
    formatMessage: (id: string) => string;
}
interface StateToProps {
    isLockLayout: boolean;
}
interface State {
    activeItem?: string;
    toggleOn?: boolean;
}
declare class _Toolbar extends React.PureComponent<ToolbarProps & StateToProps, State> {
    state: State;
    constructor(props: any);
    onItemClick(value: string): void;
    onItemUnSelected(value: string): void;
    getStyle(): import("jimu-core").SerializedStyles;
    reOrganizeTools(): (ToolItemConfig | ToolItemConfig[])[];
    render(): jsx.JSX.Element;
}
export declare const Toolbar: ReactRedux.ConnectedComponent<typeof _Toolbar, ReactRedux.Omit<any, "dispatch" | "isLockLayout"> & ToolbarProps>;
export {};
