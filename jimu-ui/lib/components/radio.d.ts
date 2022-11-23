/// <reference types="react" />
import { SwitchBaseProps } from './_switchBase';
import { React } from 'jimu-core';
/**
 * The Radio component props.
 */
export interface RadioProps extends Omit<SwitchBaseProps, 'size' | 'tag' | 'htmlSize' | 'innerRef' | 'indeterminate'> {
}
/**
 * The `Radio` component provides the user the option to select a singular option from a set.
 *
 * Wrap `Radio` and `Label` in back-ticks.
 *
 * ```ts
 * import { Radio } from 'jimu-ui'
 * ```
 */
export declare const _Radio: {
    (props: RadioProps): JSX.Element;
    displayName: string;
};
/**
 * The `Radio` component provides the user the option to select a singular option from a set.
 *
 * Wrap `Radio` and `Label` in back-ticks.
 *
 * ```ts
 * import { Radio } from 'jimu-ui'
 * ```
 */
export declare const Radio: import("@emotion/styled").StyledComponent<RadioProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
