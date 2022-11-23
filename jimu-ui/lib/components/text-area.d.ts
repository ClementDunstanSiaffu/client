/// <reference types="react" />
import { React } from 'jimu-core';
import { InputProps } from './types';
/**
 * The TextArea component props.
 *
 * Inherits properties from the `HTMLInputElement`, only text related types are accepted for the `type` prop.
 *
 * See [additional props available from HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 */
export interface TextAreaProps extends Omit<InputProps, 'type' | 'size' | 'tag'> {
    /**
     * Callback fires when the text box is blurred or the `enter` key is pressed,
     * which is considered to be the complete of the editing process.
     */
    onAcceptValue?: (value: string) => void;
}
/**
 * The `TextArea` input component is similar to the `TextInput` component, but creates a large input area and is intended to be used for longer texts, like messages.
 *
 * ```ts
 * import { TextArea } from 'jimu-ui'
 * ```
 */
export declare const _TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLInputElement>>;
/**
 * The `TextArea` input component is similar to the `TextInput` component, but creates a large input area and is intended to be used for longer texts, like messages.
 *
 * ```ts
 * import { TextArea } from 'jimu-ui'
 * ```
 */
export declare const TextArea: import("@emotion/styled").StyledComponent<TextAreaProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
