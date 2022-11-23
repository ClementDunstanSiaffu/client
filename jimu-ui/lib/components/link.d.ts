/// <reference types="react" />
/** @jsx jsx */
import { IMUrlParameters, React, LinkTo } from 'jimu-core';
import { ButtonProps } from './button';
export * from './_link-tip';
export declare type LinkTarget = '_self' | '_blank' | '_parent' | '_top';
export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * If lacking, provide an aria-label.
     */
    'aria-label'?: string;
    /**
     * Custom html element to use as the link element.
     * `button` tag does not work when `to` property exists.
     * @default "a"
     */
    tag?: React.ElementType;
    /**
     * Callback fired when the root element is clicked.
     */
    onClick?: (evt: React.MouseEvent<HTMLLinkElement>) => void;
    /**
     * Sets the value of the native `target` property on the \<a\> element.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
     */
    target?: LinkTarget;
    /**
     * Whether to replace current url directly.
     * @default false
     */
    replace?: boolean;
    /**
     * The link result.
     */
    to?: LinkTo;
    /**
     * URL query paramaters.
     */
    queryObject?: IMUrlParameters;
    /**
     * Reference to the link element.
     */
    innerRef?: React.Ref<HTMLButtonElement>;
    /**
     * The title of link.
     */
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Custom style.
     */
    customStyle?: customStyle;
    /**
     * Theme style.
     */
    themeStyle?: ButtonProps;
}
interface customStyle {
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    visitedStyle?: React.CSSProperties;
}
export declare const isModifiedEvent: (event: any) => boolean;
/**
 * The `Link` component provides an interactive reference to an external or internal resource.
 *
 * ```ts
 * import { Link } from 'jimu-ui'
 * ```
 */
export declare const _Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * The `Link` component provides an interactive reference to an external or internal resource.
 *
 * ```ts
 * import { Link } from 'jimu-ui'
 * ```
 */
export declare const Link: import("@emotion/styled").StyledComponent<LinkProps & React.RefAttributes<HTMLButtonElement>, {}, {}>;
