/// <reference types="react" />
import { SwitchBaseProps } from './_switchBase';
import { React } from 'jimu-core';
/**
 * The Checkbox component props.
 */
export interface CheckboxProps extends Omit<SwitchBaseProps, 'size' | 'tag' | 'htmlSize' | 'innerRef'> {
}
/**
 * The `Checkbox` component allows the user to select one or more items from a set.
 *
 * ```ts
 * import { Checkbox } from 'jimu-ui'
 * ```
 */
export declare const _Checkbox: {
    (props: CheckboxProps): JSX.Element;
    displayName: string;
};
/**
 * The `Checkbox` component allows the user to select one or more items from a set.
 *
 * ```ts
 * import { Checkbox } from 'jimu-ui'
 * ```
 */
export declare const Checkbox: import("@emotion/styled").StyledComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
