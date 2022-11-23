import { IMThemeVariables } from 'jimu-core';
import { SerializedStyles } from '../../emotion';
export declare const getGlobalStyle: (theme: IMThemeVariables) => SerializedStyles;
/**
 * Generate the serialized styles for emotion.
 * @param styles
 */
export declare function toSerializedStyles(...styles: any[]): SerializedStyles;
