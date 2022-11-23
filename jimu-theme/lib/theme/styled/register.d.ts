import { StyleFunction, StyleFunctions } from '../../type';
/**
 * Register the style function of the component, it will be used with `withStyles`.
 * @param name
 * @param style
 */
export declare const registerComponentBasicStyle: (name: string, style: StyleFunction) => void;
/**
 * Register the style function of the components in one entry, it will be used with `withStyles`.
 * @param entry
 */
export declare const registerComponentBasicStyles: (entry: string, styles: StyleFunctions) => void;
/**
 * Register the style function of the components in one entry, it will be used with `withStyles`.
 * @param entry
 */
export declare const registerStyles: (entry: string, styles: StyleFunctions) => void;
/**
 * Get the basic style function of the specified component.
 * @param name
 * @param useTheme2
 */
export declare const getComponentBasicStyle: (name: string, showWarning?: boolean) => StyleFunction;
