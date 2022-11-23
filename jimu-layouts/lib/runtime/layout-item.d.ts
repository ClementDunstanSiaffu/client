/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { LayoutItemProps } from '../types';
interface ChildEmement {
    children?: Element | React.ReactNode;
}
export interface OwnProps {
    id?: string;
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    isParentEnableScroll?: boolean;
    parentAnimationStyle?: any;
    parentPlayId?: symbol;
}
export default function LayoutItem(props: LayoutItemProps & OwnProps & ChildEmement): jsx.JSX.Element;
export {};
