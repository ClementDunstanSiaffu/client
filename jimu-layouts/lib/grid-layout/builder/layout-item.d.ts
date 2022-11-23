/** @jsx jsx */
import { jsx } from 'jimu-core';
import { LayoutItemProps } from '../../types';
export declare function GridLayoutItem(props: LayoutItemProps & {
    onDragStart: (id: string) => void;
    onDragging: (id: string, dx: number, dy: number) => void;
    onDragEnd: (id: string) => void;
}): jsx.JSX.Element;
