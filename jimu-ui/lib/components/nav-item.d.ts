/// <reference types="react" />
import { React } from 'jimu-core';
import { NavItemProps as BSNavItemProps } from 'reactstrap/lib/NavItem';
import { SubNavMode } from './nav';
/**
 * The NavItem component props.
 */
export interface NavItemProps extends BSNavItemProps {
    /**
     * If it is `true`, its submenu will be opened if any.
     */
    isOpen?: boolean;
    /**
     * Callback fired when the submenu is toggled.
     */
    onToggle?: (isOpen: boolean) => unknown;
    /**
     * Defines the opening direction of the submenu.
     */
    direction?: 'up' | 'down' | 'left' | 'right';
    /**
     * If it is `true`, the component is disabled.
     */
    disabled?: boolean;
}
interface NavItemState {
    isOpen?: boolean;
    anchor?: HTMLElement;
}
/**
 * The `NavItem` component is the child element of a `Nav` component.
 *
 * Please use this component combining with `Nav`, `NavLink` and `NavMenu` (if a sub menu is needed).
 *
 * ```ts
 * import { NavItem } from 'jimu-ui'
 * ```
 */
export declare class NavItem extends React.PureComponent<NavItemProps, NavItemState> {
    static contextType: React.Context<{}>;
    state: {
        isOpen: boolean;
        anchor: any;
    };
    constructor(props: any);
    toggle(e: any): void;
    setRef: (ref: HTMLElement) => void;
    getContextValue(): {
        ref: any;
        setRef: (ref: HTMLElement) => void;
        toggle: (e: any) => void;
        isOpen: boolean;
        isDropdown: any;
        direction: "left" | "right" | "up" | "down";
        textAlign: any;
        menuOpenMode: any;
        menuMode: SubNavMode;
    };
    render(): JSX.Element;
}
export {};
