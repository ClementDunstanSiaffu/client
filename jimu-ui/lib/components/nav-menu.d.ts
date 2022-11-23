/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
/**
 * The NavMenu component props.
 */
export interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Defines the target element that the menu should append to.
     *
     * @default "body"
     */
    appendToBody?: boolean;
    /**
     * Right align menu to its parent container.
     */
    right?: boolean;
    /**
     * `modifier` options from Popper.js.
     *
     * See [the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
     */
    modifiers?: any;
    /**
     * if it is `true`, the menu will be flipped to right-to-left (RTL) mode.
     *
     * @default true
     */
    flip?: boolean;
    /**
     * Custom html element used as the container of the menu.
     *
     * @default "ul"
     */
    tag?: React.ElementType;
}
/**
 * The `NavMenu` component is added to the `NavItem` component to show a sub menu.
 *
 * Please use this component combining with `NavItem`, `NavLink` and `NavMenu`.
 *
 * ```ts
 * import { NavMenu } from 'jimu-ui'
 * ```
 */
export declare class _NavMenu extends React.PureComponent<NavMenuProps> {
    static defaultProps: NavMenuProps;
    static contextType: React.Context<{
        ref?: HTMLElement;
        setRef?: (ref: HTMLElement) => void;
        toggle?: (e: any) => void;
        isOpen?: boolean;
        isDropdow?: boolean;
        direction?: string;
        menuOpenMode?: string;
        menuMode?: string;
        textAlign?: "left" | "center" | "right";
    }>;
    constructor(props: any);
    onClick(e: any): void;
    onLeave(e: any): void;
    render(): jsx.JSX.Element;
}
/**
 * The `NavMenu` component is added to the `NavItem` component to show a sub menu.
 *
 * Please use this component combining with `NavItem`, `NavLink` and `NavMenu`.
 *
 * ```ts
 * import { NavMenu } from 'jimu-ui'
 * ```
 */
export declare const NavMenu: import("@emotion/styled").StyledComponent<any, {}, {}>;
