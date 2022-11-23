/// <reference types="react" />
import { React } from 'jimu-core';
import { LinkProps } from './link';
/**
 * The NavLink component props.
 */
export interface NavLinkProps extends LinkProps {
    /**
     * Custom html element to be used as the link element.
     *
     * @default "a"
     */
    tag?: React.ElementType;
    /**
     * If it is `true`, the component is disabled.
     */
    disabled?: boolean;
    /**
     * If it is `true`, the component will be highlighted to indicate an active state
     */
    active?: boolean;
    /**
     * Sets the value of the native `href` property on the \<a\> element, if this property is set, the `tag` property will be forced to use `a`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
     */
    href?: any;
    /**
     * Reference to the root html element.
     */
    innerRef?: React.Ref<HTMLButtonElement>;
    /**
     * Icon element to display in the content.
     */
    icon?: React.ComponentClass<React.SVGProps<SVGElement>> | string;
    /**
     * Defines the position of the icon element.
     */
    iconPosition?: 'start' | 'end' | 'above';
    /**
     * Defines the font-size of the icon element.
     */
    iconSize?: number;
    /**
     * If it is `true`, the component will show a pointer icon at the end of its content.
     */
    caret?: boolean;
    draggable?: boolean;
}
/**
 * The `NavLink` component is usually used to provide navigation capability, when combining with `NavItem` component.
 *
 * Please use this component together with `Nav`, `NavLink` and `NavMenu` (if a sub menu is needed).
 *
 * ```ts
 * import { NavLink } from 'jimu-ui'
 * ```
 */
export declare const _NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * The `NavLink` component is usually used to provide navigation capability, when combining with `NavItem` component.
 *
 * Please use this component together with `Nav`, `NavLink` and `NavMenu` (if a sub menu is needed).
 *
 * ```ts
 * import { NavLink } from 'jimu-ui'
 * ```
 */
export declare const NavLink: import("@emotion/styled").StyledComponent<NavLinkProps & React.RefAttributes<HTMLButtonElement>, {}, {}>;
