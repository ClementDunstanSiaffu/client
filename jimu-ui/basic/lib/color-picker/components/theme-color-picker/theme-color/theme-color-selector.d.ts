/// <reference types="react" />
import { React, ThemeAllColors } from 'jimu-core';
interface Props {
    value?: string;
    className?: string;
    'aria-label'?: string;
    style?: React.CSSProperties;
    colors?: ThemeAllColors;
    onChange: (value: string) => void;
}
export declare const ThemeColorSelector: import("@emotion/styled").StyledComponent<Props, {}, {}>;
export {};
