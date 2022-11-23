/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { Placement, PopperProps } from 'jimu-ui';
import { PickerBlockProps } from '../color-components';
import { SketchStandardProps } from './sketch-standard';
/**
 * The ColorPicker component props.
 */
export interface ColorPickerProps extends Omit<PickerBlockProps, 'onChange'>, Omit<SketchStandardProps, 'oldHue' | 'hsv'> {
    /**
     * The color value of this component.
     */
    color?: string;
    /**
     * @ignore
     */
    popperProps?: Partial<Omit<PopperProps, 'placement' | 'showArrow' | 'offset'>>;
    /**
     * The placement of the pop-up of this component.
     * @default bottom
     */
    placement?: Placement;
    /**
     * Whether to show arrow of popper
     * @default false
     */
    showArrow?: boolean;
    /**
     * The offset modifier can shift your popper on both its axes.
     */
    offset?: number[];
    /**
     * Callback fired when the color is changed.
     */
    onChange?: (color: string) => void;
    /**
     * Callback fired when a picker block is clicked.
     */
    onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * With this prop, it will be spliced with the value of the component as a accessible name.
     */
    'aria-label'?: string;
}
/**
 *  The `ColorPicker` component provides the user the ability to choose standard colors.
 *
 * ```ts
 * import { ColorPicker } from 'jimu-ui/basic/color-picker'
 * ```
 */
export declare const ColorPicker: React.ForwardRefExoticComponent<ColorPickerProps & React.RefAttributes<unknown>>;
