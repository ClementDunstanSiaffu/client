/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { NavButtonGroupProps } from '../nav-button-group';
interface _ScrollListProps extends NavButtonGroupProps {
    /**
     * The duration of the animation when scrolling.
     * @default 300
     */
    duration?: number;
    /**
     * If `true`, hide scroll arrows on both sides.
     * @default false
     */
    hideArrow?: boolean;
    /**
     * If `true`, when scrolling to the start or end point, hide the corresponding arrow.
     * @default true
     */
    autoArrow?: boolean;
    /**
     * A set of react elements that need to be scrolled.
     */
    items: React.ReactElement[];
    /**
     * Whether to use the wheel to scroll.
     * @default false
     */
    useWhell?: boolean;
}
export declare type ScrollListProps = Omit<_ScrollListProps, 'hideArrow'>;
export declare const _ScrollList: (props: _ScrollListProps) => jsx.JSX.Element;
export declare const ScrollList: (props: ScrollListProps) => jsx.JSX.Element;
export {};
