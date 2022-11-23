/// <reference types="react" />
/** @jsx jsx */
import { React, IMLayoutItemJson, jsx } from 'jimu-core';
import { LayoutItemProps } from '../../types';
interface OwnProps {
    index: number;
    layoutItem: IMLayoutItemJson;
    gutter: number;
}
export default class FloatingLayoutItem extends React.PureComponent<LayoutItemProps & OwnProps> {
    calculatePosition(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
