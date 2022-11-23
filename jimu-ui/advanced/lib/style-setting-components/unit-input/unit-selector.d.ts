import { DistanceUnits as _DistanceUnits } from 'jimu-ui';
export declare type DateUnits = 'year' | 'month' | 'day';
export declare type DateWeekUnits = 'year' | 'month' | 'week' | 'day';
export declare type TimeUnits = 'hour' | 'minute' | 'second';
export declare type DateTimeUnits = DateWeekUnits | TimeUnits;
export declare type DistanceUnits = `${_DistanceUnits}`;
export declare type SupportedUnits = DistanceUnits | DateTimeUnits;
export declare const UnitSelectorDateUnits: DateUnits[];
export declare const UnitSelectorDateWeekUnits: DateWeekUnits[];
export declare const UnitSelectorTimeUnits: TimeUnits[];
export interface UnitSelectorProps {
    /**
     * The unit displayed.
     * @deprecated use `value` instead.
     */
    unit?: SupportedUnits;
    /**
     * The value for this component.
     */
    value?: SupportedUnits;
    /**
     * Supported units for this component.
     * @default ['px']
     */
    units?: SupportedUnits[];
    /**
     * Involked when the value changes.
     */
    onChange?: (unit: SupportedUnits) => void;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Defines the style added to the element.
     */
    style?: any;
    /**
     * The title of the component.
     */
    title?: string;
    /**
     * If `true`, the component will be disabled.
     * @default false
     */
    disabled?: boolean;
}
export declare const UnitSelector: (props: UnitSelectorProps) => JSX.Element;
