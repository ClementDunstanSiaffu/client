/// <reference types="react" />
import { React } from 'jimu-core';
import { SwitchBaseProps } from './_switchBase';
/**
 * The Switch component props.
 */
export interface SwitchProps extends Omit<SwitchBaseProps, 'size' | 'indeterminate' | 'tag' | 'htmlSize' | 'innerRef'> {
}
/**
 * The `Switch` component provides the user the ability to toggle the state of a single setting on and off.
 *
 * ```ts
 * import { Switch } from 'jimu-ui'
 * ```
 */
export declare const _Switch: {
    (props: SwitchProps): JSX.Element;
    displayName: string;
};
/**
 * The `Switch` component provides the user the ability to toggle the state of a single setting on and off.
 *
 * ```ts
 * import { Switch } from 'jimu-ui'
 * ```
 */
export declare const Switch: import("@emotion/styled").StyledComponent<SwitchProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
