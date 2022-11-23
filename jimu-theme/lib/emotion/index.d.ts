/// <reference types="react" />
import { React, IMThemeVariables } from 'jimu-core';
import type { StyledComponent } from '@emotion/styled';
import type { DistributiveOmit, FunctionInterpolation, Interpolation, PropsOf, SerializedStyles } from '@emotion/react';
/**
 * It can be useful to customize emotion’s options - i.e. to add custom Stylis plugins,
 * customize prefix of inserted class names, render style tags into specific element and more.
 */
export declare const CacheProvider: React.Provider<import("@emotion/utils").EmotionCache>;
/**
 * A react context holds the theme context.
 */
export declare const ThemeContext: React.Context<object>;
/**
 * `styled` is a way to create React components that have styles attached to them.
 */
export declare const styled: import("@emotion/styled").CreateStyled;
/**
 * Sometimes you might want to insert global css like resets or font faces.
 * You can use the Global component to do this.
 */
export declare const Global: typeof import("@emotion/react").Global;
export interface ThemeProviderProps {
    theme: Partial<IMThemeVariables> | ((outerTheme: IMThemeVariables) => IMThemeVariables);
    children?: React.ReactNode;
}
/**
 * A React component that passes the theme object down the component tree via context.
 */
export declare const ThemeProvider: (props: ThemeProviderProps) => JSX.Element;
export * from './cache';
export type { StyledComponent, FunctionInterpolation, Interpolation, DistributiveOmit, PropsOf, SerializedStyles };
