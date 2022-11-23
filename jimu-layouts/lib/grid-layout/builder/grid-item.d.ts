/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
interface Props {
    layoutId: string;
    layoutItemId: string;
    isLast?: boolean;
    onDragStart?: (id: string) => void;
    onDragging?: (id: string, dx: number, dy: number) => void;
    onDragEnd?: (id: string) => void;
}
export declare function GridItemComponent(props: Props & React.HTMLAttributes<HTMLDivElement>): jsx.JSX.Element;
export {};
