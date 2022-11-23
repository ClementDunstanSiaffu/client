/// <reference types="react" />
import { React } from 'jimu-core';
import { FontFamilyValue } from 'jimu-ui';
interface Props {
    className?: string;
    style?: React.CSSProperties;
    font?: FontFamilyValue;
    onChange?: (font: string) => void;
}
export declare const FontFamily: ({ font, onChange, style, className }: Props) => React.ReactElement;
export {};
