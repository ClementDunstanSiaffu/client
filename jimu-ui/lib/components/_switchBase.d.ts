/// <reference types="react" />
import { React } from 'jimu-core';
import { InputProps } from './types';
/**
 * The common props for the 'switch' type components, such as Radio, Checkbox, and Switch.
 *
 * Inherits properties from `HTMLInputElement`. `type` prop is automatically handled by the component.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface SwitchBaseProps extends Omit<InputProps, 'checked' | 'disabled' | 'onChange' | 'type' | 'valid' | 'invalid'> {
    /**
     * To provide a label for interactive components for accessibility purposes,
     * if the label is next to this component DOM node, use <label /> with the original component to bind them automatically;
     * if there is no available label next to this DOM node, you should pass the aria-label to it.
     */
    'aria-label'?: string;
    /**
     * The type of `SwitchBaseComponent`
     * @ignore
     * @default checkbox
     */
    type?: 'checkbox' | 'radio';
    /**
     * If true, the component is checked.
     */
    checked?: boolean;
    /**
     * If true, the component will be disabled.
     */
    disabled?: boolean;
    /**
     * The `ref` that is forwarded to the input element.
     */
    forwardedRef?: React.Ref<HTMLInputElement>;
    /**
     * If `true`, the component is focused.
     * @ignore
     */
    focus?: boolean;
    /**
     * Callback fires when the `checked` state is changed.
     * @event
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    /**
     * If `true`, the component is indeterminate, regardless of `checked`.
     */
    indeterminate?: boolean;
}
/**
 * The base component that provides the common methods and UI for Checkbox, Radio and Switch components.
 */
export declare const SwitchBase: (props: SwitchBaseProps) => JSX.Element;
