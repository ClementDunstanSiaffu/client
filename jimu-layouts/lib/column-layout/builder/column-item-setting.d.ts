/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
export default class ColumnItemSetting extends React.PureComponent<LayoutItemSettingProps> {
    updateBBox: (prop: string, value: LinearUnit) => void;
    toggleHeightMode: () => void;
    updateAlignSelf: (e: any) => void;
    updateHeightMode: (mode: LayoutItemSizeModes) => void;
    updateWidthMode: (mode: LayoutItemSizeModes) => void;
    updateAspectRatio: (newRatio: any) => void;
    getSizeOfContainer(): DOMRect;
    getSizeOfItem(): DOMRect;
    querySelector(selector: string): HTMLElement;
    formatMessage: (id: string) => string;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
