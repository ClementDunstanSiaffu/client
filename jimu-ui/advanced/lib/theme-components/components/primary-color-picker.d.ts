import { ColorPickerProps } from 'jimu-ui/basic/color-picker';
interface PrimaryColorPickerProps extends Omit<ColorPickerProps, 'icon' | 'type'> {
}
export declare const PrimaryColorPicker: (props: PrimaryColorPickerProps) => JSX.Element;
export {};
