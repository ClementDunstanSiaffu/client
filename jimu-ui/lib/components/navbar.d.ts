/// <reference types="react" />
import { React } from 'jimu-core';
import { NavbarProps as BSNavbarProps } from 'reactstrap/lib/Navbar';
export interface NavbarProps extends BSNavbarProps {
    /**
     * If `true`, the component has borders on four sides.
     */
    border?: boolean;
    /**
     * If `true`, the component has top border.
     */
    borderTop?: boolean;
    /**
     * If `true`, the component has bottom border.
     */
    borderBottom?: boolean;
    /**
     * If `true`, the component has left border.
     */
    borderLeft?: boolean;
    /**
     * If `true`, the component has right border.
     */
    borderRight?: boolean;
}
/**
 * The `Navbar` component is a powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more.
 *
 * Please use this component combining with `Nav`, `NavItem` and `NavLink`.
 *
 * ```ts
 * import { Navbar } from 'jimu-ui'
 * ```
 */
export declare class _Navbar extends React.PureComponent<NavbarProps> {
    render(): JSX.Element;
}
/**
 * The `Navbar` component is a powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more.
 *
 * Please use this component combining with `Nav`, `NavItem` and `NavLink`.
 *
 * ```ts
 * import { Navbar } from 'jimu-ui'
 * ```
 */
export declare const Navbar: import("@emotion/styled").StyledComponent<NavbarProps, {}, {}>;
