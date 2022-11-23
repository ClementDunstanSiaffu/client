import { ImmutableObject, ThemeVariables, IMThemeVariables } from 'jimu-core';
import { ThemeModule } from '../type';
export declare function getBuilderThemeVariables(): IMThemeVariables;
/**
 * Get component variables from theme variables.
 * @param categoryName
 */
export declare function getComponentVariants(name: string): ImmutableObject<Record<string, any>>;
/**
 * Get components variables for navigation.
 * @returns
 */
export declare const getNavigationVariables: () => ImmutableObject<Record<string, Record<string, any>>>;
/**
 * Identify if a given string is a CSS variable.
 */
export declare const isCSSVariable: (variable: string) => boolean;
/**
 * Get value from a path to a theme color variable.
 * @param path - Path to the theme variable. There are two types of paths:
 * One is the path separated by dots,(e.g primary.200), the other is CSS variable(var(--primary-100))
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
export declare const getThemeColorValue: (path: string, variables?: Partial<ThemeVariables>) => string;
/**
 * Check whether a specific theme module is loaded.
 * @param uri
 */
export declare const isThemeLoaded: (uri?: string) => boolean;
/**
 * Get a specific theme module.
 * @param uri
 */
export declare const getThemeModule: (uri?: string, showWarning?: boolean) => ThemeModule;
/**
 * Update the currently used theme module.
 * Note: for components and widgets, this method should only be called during testing.
 */
export declare const setThemeModule: (module: ThemeModule) => void;
/**
 * Get the override style function of the specific component.
 * @param name
 * @param uri
 */
export declare const getThemeStyle: (name: string, uri?: string) => import("../type").StyleFunction;
/**
 * Get the override style function of the specific component for theme2.
 * @param name
 * @param uri
 */
export declare const getTheme2Style: (name: string) => import("../type").StyleFunction;
/**
 * Get the theme variable for the current iframe.
 */
export declare const getTheme: () => IMThemeVariables;
/**
 * Get the theme variable for another framework.
 * In the app-in-builder env, this variable points to the builder.
 * In the builder env, this variable points to the app.
 * In a single app env, this variable is null.
 */
export declare const getTheme2: () => IMThemeVariables;
