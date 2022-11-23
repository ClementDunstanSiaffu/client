import { ThemeVariables } from 'jimu-core';
export declare const useColorValue: (value: string, specificTheme?: ThemeVariables) => string;
/**
 * Get the title of theme color variable
 * @ignore
 */
export declare const useColorVariableTitle: (variable: string, presetTitle?: string) => string;
export declare const useTranslategetVariableColor: () => (name: string) => string;
export declare const useTranslategetSharedOrgVariableColor: () => (name: string) => string;
/**
 * Check whether is's a theme color variable
 * @param color
 */
export declare const isThemeColorVariable: (color: string) => boolean;
/**
 * Parse theme color variable
 * @param color e.g. var(--primary-100) var(--org-header-bg)
 * @returns e.g. ['primary', '100'] ['org-header-bg']
 */
export declare const parseThemeColor: (color: string) => [string, string?];
