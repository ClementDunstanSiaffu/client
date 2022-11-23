/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { InjectedColorProps } from './core';
interface _RgbaProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    disableAlpha?: boolean;
}
export declare type RgbaProps = _RgbaProps & InjectedColorProps;
export declare class Rgba extends React.PureComponent<RgbaProps> {
    handleChange: (data: any) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export {};
