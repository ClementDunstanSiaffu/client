import { ImmutableObject } from 'jimu-core';
import { FourSidesUnit } from 'jimu-ui';
import { FourEdgesProps } from './four-edges';
/**
 * The `Padding` component props.
 */
export interface PaddingProps extends Omit<FourEdgesProps, 'type' | 'value' | 'onChange' | 'unifiedAriaLabel' | 'unifiedTitle'> {
    /**
     * The value of this component.
     * @default {number:[0,0,0,0],unit:px}
     */
    value: ImmutableObject<FourSidesUnit>;
    /**
     * Invoked when the value changes.
     */
    onChange: (value: FourSidesUnit) => void;
}
/**
 * The `Padding` component allows users to set the padding of the box.
 *
 * ```ts
 * import { Padding } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const Padding: (props: PaddingProps) => JSX.Element;
