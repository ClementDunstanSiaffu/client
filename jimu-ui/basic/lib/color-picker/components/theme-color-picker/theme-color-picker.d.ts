/** @jsx jsx */
import { jsx, ThemeVariables } from 'jimu-core';
import { Placement, PopperProps } from 'jimu-ui';
import { ColorItem, PickerBlockProps } from '../color-components';
/**
 * The ThemeColorPicker component props.
 */
export interface ThemeColorPickerProps extends Omit<PickerBlockProps, 'onChange'> {
    /**
     * @deprecated The props in `pickerBlockProps` are expanded and can be used directly through the root props.
     * The props passes to `PickerBlock` component.
     * @ignore
     */
    pickerBlockProps?: Partial<PickerBlockProps>;
    /**
     * @ignore
     * Advanced customization of popper props.
     */
    popperProps?: Partial<Omit<PopperProps, 'placement' | 'showArrow' | 'offset'>>;
    /**
     * The color value of this component.
     */
    value?: string;
    /**
     * The placement of the pop-up of this component.
     * @default bottom
     */
    placement?: Placement;
    /**
     * Whether to show arrow of popper
     * @default true
     */
    showArrow?: boolean;
    /**
     * The offset modifier can shift your popper on both its axes.
     */
    offset?: number[];
    /**
     * Callback fired when the value is changed.
     * @event
     */
    onChange?: (color: string) => void;
    /**
     * Predefined standard colors.
     */
    presetColors?: ColorItem[];
    /**
     * Indicates whether to display the colors of the organization shared theme.
     * @default true
     */
    showSharedColors?: boolean;
    /**
     * The theme to get colors. The default value is the theme in the theme context.
     */
    specificTheme?: ThemeVariables;
    /**
     * If `true`, transparency is not allowed.
     * @default false
     */
    disableAlpha?: boolean;
    /**
     * If `true`, reset is not allowed.
     * @default false
     * @ignore
     */
    disableReset?: boolean;
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * With this prop, it will be spliced with the value of the component as a accessible name.
     */
    'aria-label'?: string;
}
/**
 * The `ThemeColorPicker` component provides the user the ability to choose standard colors and theme colors.
 *
 * ```ts
 * import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
 * ```
 */
export declare const ThemeColorPicker: (props: ThemeColorPickerProps) => jsx.JSX.Element;
