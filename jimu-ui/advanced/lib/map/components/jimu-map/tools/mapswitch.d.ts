/// <reference types="react" />
/** @jsx jsx */
import { jsx } from 'jimu-core';
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class MapSwitch extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    static getIsNeedSetting(): boolean;
    getStyle(): import("jimu-core").SerializedStyles;
    getTitle(): string;
    getIcon(): IconType;
    switchMap: () => void;
    getExpandPanel(): JSX.Element;
    getContent: (isShowMapSwitchBtn: boolean, dataSourceIds: string[], activeDataSourceId: string, switchMap: any, mapComponentId: any) => jsx.JSX.Element;
    getIconContent: (isShowMapSwitchBtn: boolean, dataSourceIds: string[], activeDataSourceId: string, switchMap: any) => jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
