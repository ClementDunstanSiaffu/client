/// <reference types="react" />
/// <reference types="cheerio" />
/// <reference types="jest" />
import { RenderOptions, queries as _queries, RenderResult as _RenderResult } from '@testing-library/react';
import { React, IMState, I18nMessages, IMThemeVariables } from 'jimu-core';
import { Store } from 'redux';
import { MockItemData } from './mock-item';
declare const queries: {
    queryAllBySelector: (...args: any[]) => HTMLElement[];
    queryBySelector: import("@testing-library/react").QueryBy<any[]>;
    getAllBySelector: import("@testing-library/react").GetAllBy<any[]>;
    getBySelector: import("@testing-library/react").GetBy<any[]>;
    findBySelector: import("@testing-library/react").FindAllBy<any[]>;
    getByLabelText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T;
    getAllByLabelText<T_1 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_1[];
    queryByLabelText<T_2 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_2;
    queryAllByLabelText<T_3 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_3[];
    findByLabelText<T_4 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_4>;
    findAllByLabelText<T_5 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_5[]>;
    getByPlaceholderText<T_6 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_6;
    getAllByPlaceholderText<T_7 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_7[];
    queryByPlaceholderText<T_8 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_8;
    queryAllByPlaceholderText<T_9 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_9[];
    findByPlaceholderText<T_10 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_10>;
    findAllByPlaceholderText<T_11 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_11[]>;
    /**
     * Create a custom render function with `ReactRedux.Provider` and `ThemeProvider`.
     * @param store
     * @param theme
     */
    getByText<T_12 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_12;
    getAllByText<T_13 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_13[];
    queryByText<T_14 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_14;
    queryAllByText<T_15 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): T_15[];
    findByText<T_16 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_16>;
    findAllByText<T_17 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_17[]>;
    getByAltText<T_18 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_18;
    getAllByAltText<T_19 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_19[];
    queryByAltText<T_20 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_20;
    queryAllByAltText<T_21 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_21[];
    findByAltText<T_22 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_22>;
    findAllByAltText<T_23 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_23[]>;
    getByTitle<T_24 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_24;
    getAllByTitle<T_25 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_25[];
    queryByTitle<T_26 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_26;
    queryAllByTitle<T_27 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_27[];
    findByTitle<T_28 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_28>;
    findAllByTitle<T_29 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_29[]>;
    getByDisplayValue<T_30 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_30;
    getAllByDisplayValue<T_31 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_31[];
    queryByDisplayValue<T_32 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_32;
    queryAllByDisplayValue<T_33 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_33[]; /**
     * Update the currently used theme for getTheme.
     * @param theme
     */
    findByDisplayValue<T_34 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_34>;
    findAllByDisplayValue<T_35 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_35[]>;
    getByRole<T_36 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions): T_36;
    getAllByRole<T_37 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions): T_37[];
    queryByRole<T_38 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions): T_38;
    queryAllByRole<T_39 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions): T_39[];
    findByRole<T_40 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_40>;
    findAllByRole<T_41 extends HTMLElement = HTMLElement>(container: HTMLElement, role: import("@testing-library/react").ByRoleMatcher, options?: _queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_41[]>;
    getByTestId<T_42 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_42;
    getAllByTestId<T_43 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_43[];
    queryByTestId<T_44 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_44;
    queryAllByTestId<T_45 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): T_45[];
    findByTestId<T_46 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_46>;
    findAllByTestId<T_47 extends HTMLElement = HTMLElement>(container: HTMLElement, id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): Promise<T_47[]>;
};
/** The RenderResult type */
export declare type RenderResult = _RenderResult<typeof queries>;
/** The render result type */
export declare type WithRenderResult = (ui: any, options?: RenderOptions<typeof queries>) => RenderResult;
/** The render method used to render components. */
export declare const render: WithRenderResult;
/**
 * Create a wrapper with `ThemeProvider` and `IntlProvider`.
 * @param theme
 * @param locale
 * @param messages
 */
export declare const ThemeIntlWrapper: (theme: IMThemeVariables, locale: string, messages: I18nMessages, theme2?: IMThemeVariables) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `ThemeProvider`.
 * @param theme
 */
export declare const ThemeWrapper: (theme: IMThemeVariables, theme2?: IMThemeVariables) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `IntlProvider`.
 * @param locale
 * @param messages
 */
export declare const IntlWrapper: (locale: string, messages: I18nMessages) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `ReactRedux.Provider`.
 * @param store
 */
export declare const StoreWrapper: (store: Store<IMState>) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `ReactRedux.Provider` and `IntlProvider`.
 * @param store
 * @param locale
 * @param messages
 */
export declare const StoreIntlWrapper: (store: Store<IMState>, locale: string, messages: I18nMessages) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `ReactRedux.Provider` and `ThemeProvider`.
 * @param store
 * @param theme
 */
export declare const StoreThemeWrapper: (store: Store<IMState>, theme: IMThemeVariables, theme2?: IMThemeVariables) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a wrapper with `ReactRedux.Provider`, `ThemeProvider` and `IntlProvider`.
 * @param store
 * @param theme
 * @param locale
 * @param messages
 */
export declare const StoreThemeIntlWrapper: (store: Store<IMState>, theme: IMThemeVariables, locale: string, messages: I18nMessages, theme2?: IMThemeVariables) => ({ children }: {
    children: any;
}) => JSX.Element;
/**
 * Create a custom render function with `ThemeProvider` and `IntlProvider`.
 * @param theme
 * @param locale
 * @param messages
 */
export declare const withThemeIntlRender: (theme?: IMThemeVariables, locale?: string, messages?: I18nMessages, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * Create a custom render function with `ThemeProvider`.
 * @param theme
 */
export declare const withThemeRender: (theme?: IMThemeVariables, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * Create a custom render function with `IntlProvider`.
 * @param locale
 * @param messages
 */
export declare const withIntlRender: (locale?: string, messages?: {}) => WithRenderResult;
/**
 * Create a custom render function with `ReactRedux.Provider`.
 * @param store
 */
export declare const withStoreRender: (store?: Store<IMState>) => WithRenderResult;
/**
 * Create a custom render function with `ReactRedux.Provider` and `IntlProvider`.
 * @param store
 * @param locale
 * @param messages
 */
export declare const withStoreIntlRender: (store?: Store<IMState>, locale?: string, messages?: I18nMessages) => WithRenderResult;
/**
 * Create a custom render function with `ReactRedux.Provider` and `ThemeProvider`.
 * @param store
 * @param theme
 */
export declare const withStoreThemeRender: (store?: Store<IMState>, theme?: IMThemeVariables, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * Create a custom render function with `ReactRedux.Provider`, `ThemeProvider` and `IntlProvider`.
 * @param store
 * @param theme
 * @param locale
 * @param messages
 */
export declare const withStoreThemeIntlRender: (store?: Store<IMState>, theme?: IMThemeVariables, locale?: string, messages?: I18nMessages, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * Used to render a widget component.
 */
export declare const widgetRender: (store?: Store<IMState>, theme?: IMThemeVariables, locale?: string, messages?: I18nMessages, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * Used to render a widget setting component.
 */
export declare const widgetSettingRender: (store?: Store<IMState>, theme?: IMThemeVariables, locale?: string, messages?: I18nMessages, theme2?: IMThemeVariables) => WithRenderResult;
/**
 * @ignore
 * Full DOM rendering component with `ReactRedux.Provider`.
 * @param store
 * @param children
 */
export declare const mountWithStoreEnzyme: (store: Store<IMState>, children: any) => import("enzyme").ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
/**
 * @ignore
 * Shallow rendering component with `ReactRedux.Provider`.
 * @param store
 * @param children
 */
export declare const renderWithStoreEnzyme: (store: Store<IMState>, children: any) => cheerio.Cheerio;
/**
 * Create a function to run the passed function asynchronously.
 * @param timeout
 * @param useFakeTimers
 */
export declare const runFuncAsync: (timeout?: number, useFakeTimers?: boolean) => (callback: any, ...args: any[]) => Promise<unknown>;
/**
 * Return a promise to resolve a value after waiting a certain number of milliseconds.
 * @param milliseconds
 * @param value
 */
export declare const waitForMilliseconds: (milliseconds?: number, value?: any) => Promise<unknown>;
/**
 * Determine whether a component is a Class component.
 */
export declare function isClassComponent(component: any): boolean;
/**
 * Update the currently used theme for getTheme.
 * @param theme
 */
export declare const setTheme: (theme: IMThemeVariables) => void;
/**
* Update the currently used theme2 for getTheme2.
* @ignore
* @param theme
*/
export declare const setTheme2: (theme: IMThemeVariables) => void;
export declare function mockJSAPIMap(needToMockMapItems: {
    [itemId: string]: MockItemData;
}): jest.Mock<any, any>;
/**
 * @param needToMockLayers key is layer id, value is operational layer of map item data
 */
export declare function mockJSAPILayer(needToMockLayers: {
    [layerId: string]: any;
}): jest.Mock<any, any>;
export {};
