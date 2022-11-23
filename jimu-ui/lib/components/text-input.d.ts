/// <reference types="react" />
import { React } from 'jimu-core';
import { InputProps } from './types';
import { ValidityResult } from '../types';
export declare type TextInputType = 'text' | 'email' | 'select' | 'file' | 'date' | 'datetime-local' | 'month' | 'search' | 'tel' | 'url' | 'week' | 'password' | 'datetime' | 'time';
/**
 * The TextInput component props.
 *
 * Inherits properties from the `HTMLInputElement`, only text related types are accepted for the `type` prop.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface TextInputProps extends Omit<InputProps, 'type' | 'size' | 'valid' | 'invalid' | 'prefix'> {
    /**
     * The type attribute applied to the root input element.
     */
    type?: TextInputType;
    /**
     * Defines the size of the component. The component will take the default size if the value is `undefined`.
     */
    size?: 'lg' | 'sm' | 'default';
    /**
     * If allow a clear icon to clear the input content.
     */
    allowClear?: boolean;
    /**
     * An optional suffix node append to the start of the input
     */
    prefix?: React.ReactNode;
    /**
     * An optional suffix node append to the end of the input
     */
    suffix?: React.ReactNode;
    /**
     * If the text input has no border.
     */
    borderless?: boolean;
    /**
     * A function to check if the text is valid during typing.
     */
    checkValidityOnChange?: (text: string) => ValidityResult | Promise<ValidityResult>;
    /**
     * A function to check if the text is valid when it is accepted (onBlur or press enter key).
     */
    checkValidityOnAccept?: (text: string) => ValidityResult | Promise<ValidityResult>;
    /**
     * Callback fires when the text box is blurred or the `enter` key is pressed,
     * which is considered to be the complete of the editing process.
     */
    onAcceptValue?: (value: string) => void;
}
/**
 * The `TextInput` component provides the user with a text field to input string content.
 *
 * ```ts
 * import { TextInput } from 'jimu-ui'
 * ```
 */
export declare const _TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
/**
 * The `TextInput` component provides the user with a text field to input string content.
 *
 * ```ts
 * import { TextInput } from 'jimu-ui'
 * ```
 */
export declare const TextInput: import("@emotion/styled").StyledComponent<TextInputProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
