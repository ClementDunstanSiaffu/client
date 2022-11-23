/// <reference types="react" />
import { React } from 'jimu-core';
/** Type for the `direction` prop of the Dropdown component. */
export declare type Direction = 'up' | 'down' | 'left' | 'right';
/**
 * The Dropdown component props.
 *
 * Inherits properties from the `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /**
     * A callback function when the dropdown is toggled.
     */
    toggle?: (e: any) => void;
    /**
     * If `true`, the dropdown will span the full width of its parent container.
     */
    fluid?: boolean;
    /**
     * If `true`, the dropdown will appear as opened.
     * Utilize this property to make the dropdown as a controlled component.
     */
    isOpen?: boolean;
    /**
     * Tells the dropdown that it is wrapped within a `Nav` component.
     * If `true`, `\<li\>` element will be used as the container of the component.
     */
    nav?: boolean;
    /**
     * Tells the dropdown that it is wrapped within a `Navbar` component.
     */
    inNavbar?: boolean;
    /**
     * Tells the dropdown that it is wrapped within a `DropdownMenu` component as a sub-menu item.
     */
    isSubMenuItem?: boolean;
    /**
     * If `true`, the dropdown will be disabled.
     */
    disabled?: boolean;
    /**
     * Determines the direction and location of the dropdown menu according to its anchor (dropdown button).
     */
    direction?: Direction;
    /**
     * Defines the size of the dropdown button. The button will take the default size if the value is `undefined`.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * The role of dropdown menu: `listbox`, or `menu`
     * @default menu
     */
    menuRole?: 'menu' | 'listbox';
    /**
     * Custom html element to be used for the container.
     * @default div
     */
    tag?: React.ReactType;
    /**
     * If `true`,
     * the min-width of the dropdown menu will be automatically calculated to equal the `width of the container`.
     * the max-width of the dropdown menu will be automatically calculated to equal the smaller of `100vw` and `2 * width of the container`.
     */
    autoWidth?: boolean;
    /**
     * If `true` or defined, the active dropdown item in the dropdown menu will show a check icon in front of the text.
     * The icon can be customized by providing with a different element, such as:
     * `<Icon icon={require('path.to.icon.svg')}/>` or `<span>⭐️</span>`.
     */
    activeIcon?: boolean | React.ReactElement;
    /**
     * Check mode for inside items.
     * Valid only when menuRole is 'menu'.
     * By default, items can't be selected or checked.
     * For 'singleCheck', role=`menuitemcheckbox` will be added for each item.
     * For 'multiCheck', role=`menuitemradio` will be added for each item.
     * @default `default`
     */
    menuItemCheckMode?: 'default' | 'singleCheck' | 'multiCheck';
    /**
     * Whether to trigger click event in onkeyUp stage for `DropdownButton` and `DropdownItem`. Default stage is onKeyDown.
     * It is not recommended to use it with the onKeyDown event.
     * @default false
     * @ignore
     */
    useKeyUpEvent?: boolean;
    /**
     * Handle tab event for menu item, only for accessiblity.
     * Used for case: there are other focusable elements before or after menu item list.
     * @ignore
     */
    handelTabEvent?: (evt: any) => boolean;
    /**
     * Whether the interactive Nodes inside dropdown item can be accessible by keyboard, only for accessiblity.
     * @default false
     */
    supportInsideNodesAccessible?: boolean;
}
interface DropdownState {
    isOpen: boolean;
}
/**
 * The `Dropdown` component displays a list of choices on temporary surfaces.
 *
 * Please use this component together with `DropdownButton`, `DropdownMenu` and `DropdownItem`.
 *
 * ```ts
 * import { Dropdown } from 'jimu-ui'
 * ```
 */
export declare class _Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
    containerRef: React.RefObject<HTMLElement>;
    menuRef: React.RefObject<HTMLElement>;
    _menuCtrl: any;
    private _minMenuWidth;
    static defaultProps: Partial<DropdownProps>;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: DropdownProps): void;
    componentWillUnmount(): void;
    handleProps(isOpen?: boolean): void;
    getContainer(): HTMLElement;
    getMenu(): HTMLElement;
    getMenuCtrl(): any;
    getItemRole(): string;
    getMenuItems(): any;
    addEvents(): void;
    removeEvents(): void;
    handleDocumentClick(e: any): void;
    handleTabEvent(e: any): void;
    handleEscEvent(e: any): void;
    handleKeyDown(e: any): void;
    toggle(e: any, a11yFocusBack?: boolean): any;
    render(): JSX.Element;
}
/**
 * The `Dropdown` component displays a list of choices on temporary surfaces.
 * Please use this component together with DropdownButton, DropdownMenu and DropdownItem.
 *
 * ```ts
 * import { Dropdown } from 'jimu-ui'
 * ```
 */
export declare const Dropdown: import("@emotion/styled").StyledComponent<any, {}, {}>;
export declare class _DropdownSubMenuItem extends _Dropdown {
}
export declare const DropdownSubMenuItem: import("@emotion/styled").StyledComponent<any, {}, {}>;
export {};
