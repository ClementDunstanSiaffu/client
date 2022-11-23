/// <reference types="react" />
import { React } from 'jimu-core';
export declare enum ToastType {
    Info = "INFO",
    Error = "ERROR"
}
/**
 * The Toast component props.
 */
export interface ToastProps {
    /**
     * The type of `Toast`, which will represent different meanings, such as 'info' and 'error'.
     * @default INFO
     */
    type: ToastType;
    /**
     * The text displays in the `Toast`.
     */
    text: string;
    /**
     * If `true`, the `Toast` is open.
     * @default false
     */
    open: boolean;
    /**
     * The className property is used to set the custom className of this component.
     */
    className?: string;
    /**
     * The style property is used to set the custom style of this component.
     */
    style?: React.CSSProperties;
}
/**
 * The `Toast` component is used to display a notification message globally.
 *
 * ```ts
 * import { Toast } from 'jimu-ui'
 * ```
 */
export declare const _Toast: (props: ToastProps) => React.ReactPortal;
/**
 * The `Toast` component is used to display a notification message globally.
 *
 * ```ts
 * import { Toast } from 'jimu-ui'
 * ```
 */
export declare const Toast: import("@emotion/styled").StyledComponent<ToastProps, {}, {}>;
