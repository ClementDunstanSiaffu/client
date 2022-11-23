/// <reference types="react" />
import { React, IMThemeVariables } from 'jimu-core';
export interface ThemeProviderProps {
    /**
     * Theme variable for the current iframe.
     */
    theme: IMThemeVariables;
    /**
     * The theme variable for another iframe.
     * In the app-in-builder env, this variable points to the builder.
     * In the builder env, this variable points to the app.
     * In a single app env, this variable is null.
     */
    theme2?: IMThemeVariables;
    children: React.ReactNode;
}
export declare const UseTheme2Context: React.Context<boolean>;
export declare const Theme2Context: React.Context<IMThemeVariables>;
export declare const ThemeProvider: (props: ThemeProviderProps) => JSX.Element;
/**
 * Whether to use theme2.
 */
export declare const useUseTheme2: () => boolean;
/**
 * A React hook that provides the current theme as its value.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare const useTheme: () => IMThemeVariables;
/**
 * A React hook that provides the theme2 as its value.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare const useTheme2: () => IMThemeVariables;
