/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { ColorItem } from '../../color-components';
interface ThemeColorProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    showSharedColors?: boolean;
    onChange?: (value: string) => void;
    recentColors?: ColorItem[];
    specificTheme?: ThemeVariables;
    onCustomizeClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    presetColors?: ColorItem[];
    disableReset?: boolean;
    customizeBtnRef?: React.Ref<HTMLButtonElement>;
}
export declare const ThemeColor: (props: ThemeColorProps) => React.ReactElement;
export {};
