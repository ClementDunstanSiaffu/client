/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { FixedLayoutItemSetting } from '../../types';
import { LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
interface State {
    enableToolbar: boolean;
}
export default class FloatingItemSetting extends React.PureComponent<LayoutItemSettingProps, State> {
    itemSetting: FixedLayoutItemSetting;
    flipLeftRight: boolean;
    ref: HTMLDivElement;
    constructor(props: any);
    componentDidMount(): void;
    updateBBox: (prop: string, value: LinearUnit) => void;
    updateMode: (prop: string, value: LayoutItemSizeModes) => void;
    updateLockParent: (e: any) => void;
    getSizeOfContainer(): ClientRect;
    getSizeOfItem(): ClientRect;
    querySelector(selector: string): HTMLElement;
    toggleHeightMode: () => void;
    updateAspectRatio: (newRatio: any) => void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
