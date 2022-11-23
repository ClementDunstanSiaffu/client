/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles } from 'jimu-core';
import { RowLayoutItemSetting, LayoutItemProps, StateToLayoutItemProps } from '../../types';
interface OwnProps {
    offset: number;
    span: number;
    gutter: number;
    isMultiRow: boolean;
    alignItems?: string;
    children?: any;
}
export default class RowItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps> {
    getStyle(itemSetting: RowLayoutItemSetting): [SerializedStyles, string];
    render(): JSX.Element;
}
export {};
