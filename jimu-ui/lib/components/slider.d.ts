/// <reference types="react" />
/** @jsx jsx */
import { InputProps } from './types';
import { React, jsx } from 'jimu-core';
/**
 * The Slider component props.
 *
 * Inherits properties from `HTMLInputElement`.
 * The `type` prop cannot be changed and is set as 'range' by default.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface SliderProps extends Omit<InputProps, 'size' | 'type' | 'htmlSize' | 'valid' | 'invalid' | 'tag'> {
    /**
     * To provide a label for interactive components for accessibility purposes
     */
    'aria-label'?: string;
    /**
     * A string value that provides a user-friendly name for the current value of the slider.
     * For the temperature slider, is the value of the slider appended with the text  degrees.
     */
    'aria-valuetext'?: string;
    /**
     * Whether to hide the thubm
     */
    hideThumb?: boolean;
    /**
     * To define the size of the button.
     * @default default
     */
    size?: 'sm' | 'default' | 'lg';
    /**
     * The default element value. Use when the component is not controlled.
     */
    defaultValue?: number;
    /**
     * The value of the slider.
     */
    value?: number;
    /**
     * The minimum allowed value of the slider. Should not be equal to max.
     * @default 0
     */
    min?: number;
    /**
     * The maximum allowed value of the slider. Should not be equal to min.
     * @default 100
     */
    max?: number;
    /**
     * The granularity with which the slider can step through values.
     * @default 1
     */
    step?: number;
    /**
     * Callback function that is fired when the slider's value changed.
     * @event
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
interface SliderStates {
    value: number;
}
/**
 * The `Slider` component is provided to the user for selection of a number, or a range of numbers, within a bounded range.
 *
 * ```ts
 * import { Slider } from 'jimu-ui'
 * ```
 */
export declare class _Slider extends React.PureComponent<SliderProps, SliderStates> {
    static defauptProps: Partial<SliderProps>;
    constructor(props: SliderProps);
    onChange(evt: any): void;
    private calcRatio;
    private isValid;
    componentDidUpdate(prevProps: SliderProps): void;
    render(): jsx.JSX.Element;
}
/**
 * The `Slider` component is provided to the user for selection of a number, or a range of numbers, within a bounded range.
 *
 * ```ts
 * import { Slider } from 'jimu-ui'
 * ```
 */
export declare const Slider: import("@emotion/styled").StyledComponent<SliderProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
export {};
