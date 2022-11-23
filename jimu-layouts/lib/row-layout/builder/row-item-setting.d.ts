/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles } from 'jimu-core';
import { LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
import { LayoutItemSettingProps } from '../../builder/types';
export default class RowItemSetting extends React.PureComponent<LayoutItemSettingProps> {
    updateStyle(key: any, value: any): void;
    handleAlignChange: (e: any) => void;
    handleHeightChange: (value: LinearUnit) => void;
    handleHeightModeChange: (mode: LayoutItemSizeModes) => void;
    updateAspectSetting: (heightMode?: string) => void;
    handleAspectRatioChange: (newRatio: any) => void;
    handleOffsetXChange: (value: number) => void;
    handleOffsetYChange: (value: number) => void;
    formatMessage: (id: string) => string;
    getSizeOfContainer(): ClientRect;
    getSizeOfItem(): ClientRect;
    querySelector(selector: string): HTMLElement;
    getStyle(): SerializedStyles;
    render(): JSX.Element;
}
