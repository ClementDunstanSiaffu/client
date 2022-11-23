import { IMState, IMAppConfig } from 'jimu-core';
import * as mockData from './lib/mock-data';
export * from './lib/widget-wrapper';
export * from './lib/widget-setting-wrapper';
export * from './lib/test-utils';
export * from './lib/mock-service';
export * from './lib/mock-item';
export * from './lib/mock-get-selections';
export * from './lib/mock-systemjs-import';
export * from './lib/mock-window-location';
export * from './lib/mock-numeric-input';
export { mockData };
/**
 * Init globals to make test easy.
 */
export declare function initGlobal(): void;
/** Return an empty init state. */
export declare function getInitState(): IMState;
/** Get an empty default app config. */
export declare function getDefaultAppConfig(): IMAppConfig;
/**
 * Init extensions. Will init `DependencyDefine` and `DataSourceFactoryUri`.
 */
export declare function initExtensions(): void;
/** Init store with default app config. */
export declare function initStore(): void;
export { default as mockTheme } from './lib/theme-mock';
