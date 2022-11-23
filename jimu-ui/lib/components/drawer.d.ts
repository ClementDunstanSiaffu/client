/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { PaperProps } from './paper';
export declare function isHorizontal(anchor: string): boolean;
export declare function getAnchor(anchor: string, autoFlip: boolean): any;
export declare type AnchorDirection = 'left' | 'right' | 'top' | 'bottom' | 'full';
/**
 * The Drawer component props
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Side from which the drawer will appear.
     * @default left
     */
    anchor?: AnchorDirection;
    /**
     * The contents of the drawer.
     */
    children: any;
    /**
     * Function for toggling open in the controlling component.
     * @event
     */
    toggle?: () => void;
    /**
     * If `true`, the drawer is open.
     * @default false
     */
    open: boolean;
    /**
     * @ignore
     * Props applied to the `Paper` element.
     */
    paperProps?: PaperProps;
    /**
     * The variant to use.
     * @default temporary
     */
    variant?: 'permanent' | 'temporary';
    /**
     * @ignore
     * Flips the anchor automatically, if the locale is following right-to-left (RTL).
     */
    autoFlip?: boolean;
    /**
     * Define the `z-index` of the element.
     */
    zIndex?: number;
}
/**
 * Drawer are surfaces containing supplementary content that are anchored to the left or right edge of the screen.
 */
export declare const Drawer: (props: DrawerProps) => jsx.JSX.Element;
