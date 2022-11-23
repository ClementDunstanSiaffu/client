import { BorderStyle } from '../../type';
export interface ArrowStyle {
    background?: string;
    border?: BorderStyle;
    size?: number;
}
export declare function popperPointer(arrowStyle?: ArrowStyle): import("jimu-core").SerializedStyles;
