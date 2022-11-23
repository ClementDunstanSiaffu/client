/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
interface Props {
    layoutId: string;
    layoutItemId: string;
    isLast?: boolean;
}
export declare function GridItemComponent(props: Props & React.HTMLAttributes<HTMLDivElement>): jsx.JSX.Element;
export {};
