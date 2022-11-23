import { CustomPicker } from 'react-color';
import * as color from 'react-color/lib/helpers/color';
import type { InjectedColorProps, ExportedColorProps } from 'react-color/lib/components/common/ColorWrap';
import { Checkboard } from 'react-color/lib/components/common';
declare const Saturation: any;
declare const Hue: any;
declare const Alpha: any;
interface ColorItem {
    label: string;
    value: string;
    color?: string;
}
interface HSLColor {
    a?: number;
    h: number;
    l: number;
    s: number;
}
interface RGBColor {
    a?: number;
    b: number;
    g: number;
    r: number;
}
interface ColorResult {
    hex: string;
    hsl: HSLColor;
    rgb: RGBColor;
}
export { ColorResult, RGBColor, color, InjectedColorProps, ExportedColorProps, CustomPicker, Saturation, Hue, Alpha, Checkboard, ColorItem };
