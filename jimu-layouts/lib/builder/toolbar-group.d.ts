/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { ToolItemConfig, StateToLayoutProps } from '../types';
import { ToolbarContextProps } from './toolbar-context';
interface Props {
    uid: string;
    tools: ToolItemConfig[];
}
export declare class ToolbarGroup extends React.PureComponent<Props> {
    contextProps: ToolbarContextProps;
    dropdownBtnRef: React.RefObject<HTMLButtonElement>;
    constructor(props: any);
    getBaseStyle(): import("jimu-core").SerializedStyles;
    getValue(target: any, props: any): any;
    togglePopToolItems(e?: React.MouseEvent<HTMLDivElement>): void;
    onItemClick(toolConfig: ToolItemConfig, props: any): void;
    createToolItem(toolConfig: ToolItemConfig, props: StateToLayoutProps, index: number): jsx.JSX.Element;
    getGroupMenu(selectedTool: ToolItemConfig, visibleTools: ToolItemConfig[]): jsx.JSX.Element;
    tooltipStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
