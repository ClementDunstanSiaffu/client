/// <reference types="react" />
/** @jsx jsx */
import { React, IMBoundingBox, IMLayoutItemJson, SerializedStyles } from 'jimu-core';
import { LayoutItemProps, FixedLayoutItemSetting } from '../../types';
interface OwnProps {
    transformedBBox?: IMBoundingBox;
    index: number;
    layoutItem: IMLayoutItemJson;
}
export default class FixedLayoutItem extends React.PureComponent<LayoutItemProps & OwnProps> {
    getPositionStyle(itemSetting: FixedLayoutItemSetting): [SerializedStyles, string];
    render(): JSX.Element;
}
export {};
