/// <reference types="react" />
import { ThemeProvider as _ThemeProvider, useTheme as _useTheme, withTheme as _withTheme, Global as _Global, jsx, css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
/**
 * @deprecated
 * `ThemeContext` was transferred to `jimu-theme`.
 */
declare const ThemeContext: import("react").Context<object>;
/**
 * @deprecated
 * `ThemeProvider` was transferred to `jimu-theme`.
 */
declare const ThemeProvider: _ThemeProvider;
/**
 * @deprecated
 * `useTheme` was transferred to `jimu-theme`.
 */
declare const useTheme: typeof _useTheme;
/**
 * @deprecated
 * `withTheme` was transferred to `jimu-theme`.
 */
declare const withTheme: _withTheme;
/**
 * @deprecated
 * `styled` was transferred to `jimu-theme`.
 */
declare const styled: import("@emotion/styled").CreateStyled;
/**
 * @deprecated
 * `CacheProvider` was transferred to `jimu-theme`.
 */
declare const CacheProvider: import("react").Provider<import("@emotion/utils").EmotionCache>;
/**
 * @deprecated
 * `Global` was transferred to `jimu-theme`.
 */
declare const Global: typeof _Global;
export { ThemeProvider, ThemeContext, CacheProvider, useTheme, withTheme, styled, jsx, css, Global };
export type { SerializedStyles };
