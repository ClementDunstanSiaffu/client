/// <reference types="react" />
import { React } from 'jimu-core';
export interface ColorBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The color of this component
     */
    color?: string;
    /**
     * The value of this component
     */
    value?: string;
    /**
     * The width of this component
     */
    width?: number | string;
    /**
     * The height of this component
     */
    height?: number | string;
    /**
     * Whether this component is disabled
     */
    disabled?: boolean;
    /**
     * Whether this component is actived
     */
    active?: boolean;
    /**
     * @ignore
     */
    outline?: boolean;
}
export declare const ColorBlock: import("@emotion/styled").StyledComponent<ColorBlockProps & React.RefAttributes<HTMLDivElement>, {}, {}>;
