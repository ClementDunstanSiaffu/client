/** @jsx jsx */
import { jsx, IMLayoutItemJson } from 'jimu-core';
import { LayoutItemProps } from '../../types';
interface OwnProps {
    itemIndex: number;
    layoutItem: IMLayoutItemJson;
}
export declare function ScreenGroup(props: LayoutItemProps & OwnProps): jsx.JSX.Element;
export {};
