/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
/**
 * The ButtonGroup component props.
 */
export interface AdvancedButtonGroupProps extends React.HTMLAttributes<HTMLElement> {
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
export declare const _AdvancedButtonGroup: (props: AdvancedButtonGroupProps) => jsx.JSX.Element;
/**
 * The `AdvancedButtonGroup` component groups a series of buttons together on a single line with the button group.
 *
 * ```ts
 * import { AdvancedButtonGroup } from 'jimu-ui'
 * ```
 */
export declare const AdvancedButtonGroup: import("@emotion/styled").StyledComponent<AdvancedButtonGroupProps, {}, {}>;
