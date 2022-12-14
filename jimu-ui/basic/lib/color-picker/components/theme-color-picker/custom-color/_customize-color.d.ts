/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { SketchProps } from '../../color-picker';
interface CustomizeColorProps extends Omit<SketchProps, 'color'> {
    value?: string;
    onBack?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    specificTheme?: ThemeVariables;
    onRecentChange?: () => void;
    disableAlpha?: boolean;
    backBtnRef?: React.Ref<HTMLButtonElement>;
}
export declare const CustomizeColor: (props: CustomizeColorProps) => React.ReactElement;
export {};
