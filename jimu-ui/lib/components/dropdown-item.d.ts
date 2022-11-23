/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * The DropdownItem component props
 *
 * Inherits properties from the `HTMLElement`.
 *
 * See [additional props available from HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
 */
export interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    [key: string]: any;
    /**
     * If `true`, the component will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, the component will be displayed as a horizontal divider,
     * `div` element will be used by default and `onClick` event will be ignored in this case.
     */
    divider?: boolean;
    /**
     * Custom html element to be used as a button.
     * @default button
     */
    tag?: React.ReactType;
    /**
     * If `true`, the component will be displayed as a static header,
     * `h6` element will be used by default and `onClick` event will be ignored in this case.
     */
    header?: boolean;
    /**
     * Fire callback when the root element is clicked.
     */
    onClick?: (event: React.MouseEvent<any>) => void;
    /**
     * Sets value for the native `href` property of the \<a\> element.
     * If this property is set, the `tag` property will be forced to use `a`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href).
     */
    href?: string;
    /**
     * If `true`, the dropdown item will toggle the parent dropdown automatically when clicked.
     * @default true
     */
    toggle?: boolean;
    /**
     * If `true`, the dropdown item will be highlighted as active.
     */
    active?: boolean;
    rootRef?: React.Ref<HTMLElement>;
    /**
     * Whether to focus back to dropdown button when clicking on dropdown item.
     * @default true
     */
    a11yFocusBack?: boolean;
}
/**
 * The `DropdownItem` component is a child element in a `DropdownMenu` component.
 *
 * Please use this component together with `Dropdown`, `DropdownButton`, and `DropdownMenu`.
 *
 * ```ts
 * import { DropdownItem } from 'jimu-ui'
 * ```
 */
export declare class _DropdownItem extends React.PureComponent<DropdownItemProps> {
    static contextType: React.Context<{}>;
    static defaultProps: {
        tag: string;
        toggle: boolean;
    };
    constructor(props: any);
    onClick: (e: any) => void;
    onKeyDown: (evt: any) => void;
    onKeyUp: (evt: any) => void;
    getTabIndex(): number;
    getItemRole(): any;
    render(): JSX.Element;
}
/**
 * The `DropdownItem` component is a child element in a `DropdownMenu` component.
 *
 * Please use this component together with `Dropdown`, `DropdownButton`, and `DropdownMenu`.
 *
 * ```ts
 * import { DropdownItem } from 'jimu-ui'
 * ```
 */
export declare const DropdownItem: import("@emotion/styled").StyledComponent<Pick<DropdownItemProps, keyof DropdownItemProps> & React.RefAttributes<HTMLElement>, {}, {}>;
