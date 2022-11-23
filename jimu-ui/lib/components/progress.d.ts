/// <reference types="react" />
import { React } from 'jimu-core';
export interface ProgressProps {
    /**
     * Defines color of the progress bar based on theme variables.
     * @default default
     */
    color?: 'primary' | 'secondary' | 'light' | 'dark' | 'success' | 'info' | 'warning' | 'danger';
    /**
     * UI types of progress, including 'linear' or 'circular'
     * @default default
     */
    type?: 'linear' | 'circular';
    /**
     * Whether to show the number corresponding to the progress.
     */
    showProgress?: boolean;
    /**
     * CSS class names appended to the component container.
     */
    className?: string;
    /**
     * The number value corresponding to the progress.
     */
    value?: number;
    /**
     * Defines the inline CSS style properties.
     */
    style?: React.CSSProperties;
    /**
     * Defines the size of the circular progress. The default size is 100.
     * @default default
     */
    circleSize?: number;
    [key: string]: any;
}
/**
 * `Progress` expresses an unspecified wait time or displays the length of a process.
 * There are two visual styles of progress indicators: linear and circular.
 *
 * ```ts
 * import { Progress } from 'jimu-ui'
 * ```
 */
export declare const _Progress: (props: ProgressProps) => JSX.Element;
export declare const Progress: import("@emotion/styled").StyledComponent<ProgressProps, {}, {}>;
