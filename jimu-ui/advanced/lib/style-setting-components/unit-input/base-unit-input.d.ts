/// <reference types="react" />
import { React } from 'jimu-core';
import { InputGroupProps } from 'jimu-ui';
import { SupportedUnits } from './unit-selector';
export interface UnitValue {
    val: number;
    unit: SupportedUnits;
}
export declare type BaseUnitValue = UnitValue | string;
/**
 * The `BaseUnitInput` component props.
 */
export interface BaseUnitInputProps extends Omit<InputGroupProps, 'value'> {
    /**
     * To provide a label for interactive components for accessibility purposes.
     */
    'aria-label'?: string;
    /**
     * Supported units for this component.
     * @default ['px']
     */
    units?: SupportedUnits[];
    /**
     * The value of component.
     * @default {val:0,unit:px}
     */
    value?: BaseUnitValue;
    /**
     * Disable input and selection of units.
     * @default false
     */
    disabled?: boolean;
    /**
     * The minimum value to accept for the input component.
     */
    min?: number;
    /**
     * The maximum value to accept for the input component.
     */
    max?: number;
    /**
     * Invoked when the value changes.
     */
    onChange?: (value: UnitValue, evt?: React.KeyboardEvent<HTMLInputElement>) => void;
}
/**
 * The `BaseUnitInput` component allows users to set units and values.
 *
 * ```ts
 * import { BaseUnitInput } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const BaseUnitInput: (props: BaseUnitInputProps) => JSX.Element;
