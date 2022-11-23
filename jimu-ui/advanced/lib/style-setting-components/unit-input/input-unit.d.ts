/// <reference types="react" />
import { React } from 'jimu-core';
import { BaseUnitInputProps } from './base-unit-input';
import { DistanceUnits } from './unit-selector';
import { LinearUnit } from 'jimu-ui';
export declare type InputUnitValue = LinearUnit | string;
/**
 * The `InputUnit` component props.
 */
export interface InputUnitProps extends Omit<BaseUnitInputProps, 'value'> {
    /**
     * Supported units for this component.
     * @default ['px']
     */
    units?: DistanceUnits[];
    /**
     * The value of component.
     * @default {distance:0,unit:px}
     */
    value?: InputUnitValue;
    /**
     * Invoked when the value changes.
     */
    onChange?: (value: LinearUnit, evt?: React.KeyboardEvent<HTMLInputElement>) => void;
}
/**
 * The `InputUnit` component allows users to set units and values.
 *
 * ```ts
 * import { InputUnit } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const InputUnit: (props: InputUnitProps) => JSX.Element;
