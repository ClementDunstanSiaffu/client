/**@jsx jsx */
import { jsx } from 'jimu-core';
import { FourSidesUnit, DistanceUnits } from 'jimu-ui';
export interface EdgesNumberProps {
    /**
      * The type of this component.
      * @default edge
      */
    type: 'edge' | 'corner';
    /**
     * The value of this component.
     * @default {number:[0,0,0,0],unit:px}
     */
    value: FourSidesUnit;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * If `true`, four values can be set separately.
     */
    detached?: boolean;
    /**
     * Call back the currently activated index.
     */
    onActivatedChange?: (activated: -1 | 0 | 1 | 2 | 3) => void;
    /**
     * The minimum value to accept for all the input boxes.
     * @default 0
     */
    min?: number;
    /**
     * The maximum value to accept for all the input boxes.
     * @default 100
     */
    max?: number;
    /**
     * Disable input and selection of all the input boxes.
     * @default false
     */
    disabled?: boolean;
    /**
     * Selectable units: px, rem, em, %.
     * @default ['px','%']
     */
    units?: DistanceUnits[];
    /**
     * Invoked when the value changes.
     */
    onChange?: (value: FourSidesUnit) => void;
    /**
     * Aria-label for unified mode (detached is false).
     * @ignore
     */
    unifiedAriaLabel?: string;
    /**
     * Title for for unified mode (detached is false).
     * @ignore
     */
    unifiedTitle?: string;
}
export declare const EdgesNumber: (props: EdgesNumberProps) => jsx.JSX.Element;
