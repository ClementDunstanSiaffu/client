/// <reference types="react" />
import { React } from 'jimu-core';
import { TextAlignValue } from '../types';
export declare type SubNavMode = 'static' | 'dropdown' | 'foldable';
/**
 * The Nav component props.
 */
export interface NavProps {
    /**
     * Indicates whether this is a part of a Navbar component.
     */
    navbar?: boolean;
    /**
     * If it is `true`, the component will show in a "tabs" style.
     */
    tabs?: boolean;
    /**
     * If it is `true`, the component will show in a "pills" style.
     */
    pills?: boolean;
    /**
     * If it is `true`, the component will show in an "underline" style.
     */
    underline?: boolean;
    /**
     * If it is `true`, the content (NavItems) will be positioned vertically.
     */
    vertical?: boolean | string;
    /**
     * If it is `true`, the content (NavItems) will be positioned vertically.
     */
    justified?: boolean;
    /**
     * If `true`, the component will fill the width of its parent container.
     */
    fill?: boolean;
    /**
     * HTML element used for the component.
     *
     * @default "ul"
     */
    tag?: React.ReactType;
    /**
     * CSS class names appended to the component container.
     */
    className?: string;
    /**
     * CSS style properties applied to the component container.
     */
    style?: React.CSSProperties;
    right?: boolean;
    /**
     * Defines the gap between NavItems.
     */
    gap?: string;
    /**
     * Defines text alignment for the content of NavItems.
     */
    textAlign?: TextAlignValue;
    /**
     * Defines how the submenu is opened:
     * - `static`: Directly show the content of the submenu after its parent nav item.
     * - `dropdown`: Open the submenu in a dropdown.
     * - `foldable`: Open the submenu in a expandable panel.
     *
     * @default "dropdown"
     */
    submenuMode?: SubNavMode;
    /**
     * Defines the action for opening the menu.
     *
     * @default "click"
     */
    menuOpenMode?: 'click' | 'hover';
    /**
     * The role attribute describes the role of an element in programs that can make use of it
     */
    role?: string;
}
/**
 * The `Nav` component is used to link to internal or external pages.
 *
 * Please use this component combining with NavItem, NavLink and NavMenu (if a sub menu is needed).
 *
 * ```ts
 * import { Nav } from 'jimu-ui'
 * ```
 */
export declare class _Nav extends React.PureComponent<NavProps> {
    static defaultProps: NavProps;
    render(): JSX.Element;
}
/**
 * The `Nav` component is used to link to internal or external pages.
 *
 * Please use this component combining with NavItem, NavLink and NavMenu (if a sub menu is needed).
 *
 * ```ts
 * import { Nav } from 'jimu-ui'
 * ```
 */
export declare const Nav: import("@emotion/styled").StyledComponent<NavProps, {}, {}>;
