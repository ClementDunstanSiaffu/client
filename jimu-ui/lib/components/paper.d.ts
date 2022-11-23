/// <reference types="react" />
import { React } from 'jimu-core';
export interface PaperProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    component?: React.ComponentClass<any>;
}
export declare const Paper: import("@emotion/styled").StyledComponent<PaperProps, {}, {}>;
