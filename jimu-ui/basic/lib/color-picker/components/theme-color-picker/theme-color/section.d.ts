/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface ThemeColorSectionProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    label?: string;
    tooltip?: string;
}
export declare const ThemeColorSection: (props: ThemeColorSectionProps) => React.ReactElement;
