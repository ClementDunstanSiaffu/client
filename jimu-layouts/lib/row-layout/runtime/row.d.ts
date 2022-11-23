/// <reference types="react" />
/** @jsx jsx */
import { React, IMLayoutJson } from 'jimu-core';
import { LayoutProps, RowLayoutSetting } from '../../types';
import { ChildRect } from '../types';
declare type RowLayoutProps = LayoutProps & {
    layout: IMLayoutJson;
    transformedLayout: IMLayoutJson;
    isMultiRow: boolean;
};
export declare class Row extends React.PureComponent<RowLayoutProps> {
    childRects: ChildRect[];
    flipLeftRight: boolean;
    constructor(props: any);
    collectBounds(): ChildRect[];
    getConfig(): RowLayoutSetting;
    createItem(childRects: ChildRect[], index: number, layoutStyle: any): JSX.Element;
    render(): JSX.Element;
}
export {};
