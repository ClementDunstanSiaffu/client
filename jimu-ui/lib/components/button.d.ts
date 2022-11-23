/// <reference types="react" />
import { React } from 'jimu-core';
/** Type for the `size` prop of the Button component. */
export declare type ButtonSize = 'default' | 'sm' | 'lg';
/** Type for the `type` prop of the Button component. */
export declare type ButtonType = 'default' | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
/**
 * Get the icon size of different button sizes.
 * @param size button size
 * @returns icon size
 * @ignore
 */
export declare const getButtonIconSizeNumber: (size: ButtonSize) => number;
/**
 * The Button component props.
 *
 * Inherits properties from the `HTMLButtonElement`.
 *
 * See [additional props available from HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement).
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * If lacking, provide an aria-label.
     */
    'aria-label'?: string;
    /**
     * If `true`, the button will appear as active.
     */
    active?: boolean;
    /**
     * If `true`, the button will span the full width of its parent.
     */
    block?: boolean;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * Custom html element to be used as a button.
     *
     * @default button
     */
    tag?: React.ElementType;
    /**
     * Fire callback when the button is clicked.
     */
    onClick?: React.MouseEventHandler<any>;
    /**
     * Defines the size of the button. The button will take the default size if the value is `undefined`.
     * @default default
     */
    size?: ButtonSize;
    /**
     * Sets button type to one of the pre-defined button types that are used for different purposes, such as `default` and `primary`.
     * @default default
     */
    type?: ButtonType;
    /**
     * Sets value for the native `type` property of the `<button>` element when `tag` property is `button`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-value).
     */
    htmlType?: 'submit' | 'reset' | 'button';
    /**
     * Sets value for the native `href` property of the `<a>` element when `tag` property is `a`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href).
     */
    href?: string;
    /**
     * Sets value for the native `rel` property of the `<a>` element when `tag` property is `a`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-rel).
     */
    rel?: string;
    /**
     * Sets value for the native `target` property of the `<a>` element when `tag` property is `a`.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target).
     */
    target?: string;
    /**
     * If `true`, the button will be displayed as an icon button with custom styles applied to make the
     * width and height equal.
     */
    icon?: boolean;
    /**
     * If `true`, the content in the button will be displayed vertically.
     */
    vertical?: boolean;
}
/**
 * The `Button` component allows users to take actions, and make choices, with a single tap.
 *
 * ```ts
 * import { Button } from 'jimu-ui'
 * ```
 */
export declare const _Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * The `Button` component allows users to take actions, and make choices, with a single tap.
 *
 * ```ts
 * import { Button } from 'jimu-ui'
 * ```
 */
export declare const Button: import("@emotion/styled").StyledComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>, {}, {}>;
