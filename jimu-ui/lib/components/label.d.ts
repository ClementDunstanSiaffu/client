/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * The Label component props.
 */
export interface LabelProps extends React.HtmlHTMLAttributes<HTMLLabelElement> {
    /**
     * Defines the size of the label.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * If `true`, label will be hidden and only used for screen reading.
     */
    hidden?: boolean;
    /**
     * If `true`, remove bottom margin.
     */
    check?: boolean;
    /**
     * If `true`, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * The id of a labelable form-related element in the same document as the <label> element.
     */
    for?: string;
    /**
     * Custom html element to be used as a label.
     *
     * @default label
     */
    tag?: React.ElementType;
    /**
     * Whether to center vertically.
     * @ignore
     * @default false
     * Note: if set `centric` as `true`, `display` will change from `inline-block` to `inline-flex`.
     */
    centric?: boolean;
}
/**
 * The `Label` component is used to represent a caption for an item in a user interface.
 *
 * ```ts
 * import { Label } from 'jimu-ui'
 * ```
 */
export declare const _Label: (props: LabelProps) => JSX.Element;
/**
 * The `Label` component is used to represent a caption for an item in a user interface.
 *
 * ```ts
 * import { Label } from 'jimu-ui'
 * ```
 */
export declare const Label: import("@emotion/styled").StyledComponent<LabelProps, {}, {}>;
