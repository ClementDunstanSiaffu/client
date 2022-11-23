/// <reference types="react" />
import { React } from 'jimu-core';
export interface CollapsableLabelProps {
    /**
    * Defines the class name of the component.
    */
    className?: string;
    /**
     * The left icon displayed before the label.
     */
    leftIcon?: any;
    /**
     * The label displayed in the header of the component.
     */
    label?: React.ReactNode;
    /**
     * Reduce the maximum width of the label.
     */
    padded?: boolean;
    /**
     * Whether to wrap the label.
     * @default false
     */
    wrap?: boolean;
}
declare const CollapsbleLabel: (props: CollapsableLabelProps) => JSX.Element;
export default CollapsbleLabel;
