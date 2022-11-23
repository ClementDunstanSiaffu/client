import * as React from 'react';
import { IMWidgetJson, WidgetJson, AppConfig } from './types/app-config';
import { WidgetManifest } from './types/manifest';
import { WidgetProps } from './types/props';
import { WrappedWidgetType } from './base-widget';
import DataSourceManager from './data-source-manager';
import { I18nMessages } from './i18n';
import { LayoutItemConstructorProps } from './types/common';
export declare class WidgetManager {
    private static instance;
    /** Return the singleton `WidgetManager` instance. */
    static getInstance(): WidgetManager;
    dsManager: DataSourceManager;
    constructor();
    private widgets;
    updateWidgetCache(uri: string, obj: any): void;
    widgetListInfo: LayoutItemConstructorProps[];
    getWidgetListInfo(): Promise<LayoutItemConstructorProps[]>;
    getWidgetClass(widgetId: string): React.ComponentType<WidgetProps>;
    getWidgetClassByUri(widgetUri: string): React.ComponentType<WidgetProps>;
    destroyWidget(widgetId: string): void;
    destroyWidgetByUri(uri: string): void;
    destroyAllWidgets(): void;
    private checkWidgetUriInConfig;
    /** Load the widget class by widget id. A widget class is loaded only one time. */
    loadWidgetClass(widgetId: string): Promise<React.ComponentType<WidgetProps>>;
    loadWidgetClassByUri(widgetUri: string): Promise<React.ComponentType<WidgetProps>>;
    loadRawClass(uri: string): Promise<React.ComponentType<WidgetProps>>;
    /**
     * @ignore
     * Do not load the default string messages
     */
    loadWidgetTranslation(uri: string, manifest: WidgetManifest): Promise<I18nMessages>;
    openWidget(widgetId: string): void;
    closeWidget(widgetId: string): void;
    appWidgetClassWrapperExtension(WidgetClass: React.ComponentType<WidgetProps>, manifest: WidgetManifest): React.ComponentType<WidgetProps>;
    /**
     * @ignore
     * @param widgetJson Only `uri` is required
     */
    handleNewWidgetJson(widgetJson: WidgetJson): Promise<WidgetJson>;
    getWidgetUriByItemId(itemId: string): Promise<string>;
    /**
     * Load widget manifest is the first step to load a widget.
     * If a widget has an itemId instead of an uri, need to call `getWidgetUriByItemId` first.
     *
     * @param uri The uri used to load widget
     * @param checkUri If a widget has an itemId, the uri has been checked in `getWidgetUriByItemId`, so there is no need to check here.
     *                 If a widget has an uri, we need to check it here.
     */
    loadWidgetManifest(uri: string, checkUri: boolean): Promise<WidgetManifest>;
    processWidgetManifest(widgetJson: WidgetJson): Promise<WidgetManifest>;
    /**
     * @ignore
     * Register widget message actions, data actions and extensions declared in the widget manifest.
     * @param widgetJson
     * @param appConfig Pass appConfig only when the first time load. For the later added widgets, we don't need to upgrade the config
     */
    registerManifestProps(widgetJson: IMWidgetJson, appConfig?: AppConfig): Promise<void>;
    unRegisterManifestProps(widgetId: string): void;
    loadWidgetDefaultConfig(uri: string): Promise<any>;
    loadWidgetDependency(uri: string): Promise<void>;
    injectWidgetProps(uri: string): Promise<WrappedWidgetType>;
    private loadWidgetBuilderSupportModules;
    private onStoreChange;
}
/**
 * The `WidgetManager` is used to manage the widget.
 */
export default WidgetManager;
