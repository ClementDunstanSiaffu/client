/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * The ButtonGroup component props.
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Custom html element to be used as a button group.
     *
     * @default div
     */
    tag?: React.ElementType;
    /**
     * Defines the size of the button group.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * Display components vertically or not.
     */
    vertical?: boolean;
}
/**
 * The `ButtonGroup` component groups a series of buttons together on a single line with the button group.
 *
 * ```ts
 * import { ButtonGroup } from 'jimu-ui'
 * ```
 */
export declare const _ButtonGroup: (props: ButtonGroupProps) => JSX.Element;
/**
 * The `ButtonGroup` component groups a series of buttons together on a single line with the button group.
 *
 * ```ts
 * import { ButtonGroup } from 'jimu-ui'
 * ```
 */
export declare const ButtonGroup: import("@emotion/styled").StyledComponent<ButtonGroupProps, {}, {}>;
