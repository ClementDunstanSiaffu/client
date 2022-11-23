import { IMThemeManifest, IMThemeVariables } from 'jimu-core';
import { FunctionInterpolation } from '../emotion';
/**
 * A function to return the serialized style of emotion.
 */
export declare type StyleFunction = FunctionInterpolation<{
    theme?: IMThemeVariables;
    [x: string]: any;
}>;
/**
 * A set of functions to return the serialized style of emotion.
 */
export interface StyleFunctions {
    [name: string]: StyleFunction;
}
/**
 * The theme in ExB is defined as a theme module.
 */
export interface ThemeModule {
    uri: string;
    manifest: IMThemeManifest;
    styles?: StyleFunctions;
    variables?: IMThemeVariables;
    /**
     * The final theme variable, which is generated dynamically at run time
     * based on overridden theme variables and custom theme variables.
     */
    theme?: IMThemeVariables;
}
declare enum NormalLineType {
    SOLID = "solid",
    DASHED = "dashed",
    DOTTED = "dotted",
    DOUBLE = "double"
}
export interface BorderStyle {
    type?: NormalLineType;
    color?: string;
    width?: string | number;
}
export {};
