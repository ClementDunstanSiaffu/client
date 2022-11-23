import { ImmutableObject } from 'jimu-core';
import { FourSidesUnit } from 'jimu-ui';
import { FourEdgesProps } from './four-edges';
/**
 * The `BorderRadiusSetting` component props.
 */
export interface BorderRadiusSettingProps extends Omit<FourEdgesProps, 'type' | 'value' | 'onChange' | 'unifiedAriaLabel' | 'unifiedTitle'> {
    /**
     * The value of this component.
     * @default {number:[0,0,0,0],unit:px}
     */
    value: ImmutableObject<FourSidesUnit>;
    /**
     * Invoked when the value changes.
     */
    onChange: (value: ImmutableObject<FourSidesUnit>) => void;
}
/**
 * The `BorderRadiusSetting` component allows users to set the border radius of the box.
 *
 * ```ts
 * import { BorderRadiusSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const BorderRadiusSetting: (props: BorderRadiusSettingProps) => JSX.Element;
