import { ImmutableObject } from 'seamless-immutable';
import { MessageDescription, MessageType } from '../message/message-base-types';
import { Size, WidgetType } from './common';
import { ExtensionPoints } from '../extension-spec/extension-spec';
import { ThemeThemeColors } from './theme';
import { IconResult } from './app-config';
/** The base interface for both widgets and themes. */
export interface Manifest {
    /** The name must be unique and same as folder name. */
    name: string;
    /** This should be same as the `_widgetLabel` value in translation/default.ts */
    label: string;
    /** The widget/theme version. */
    version: string;
    /**
     * A widget may only support certain framework versions due to breaking API changes, so
     * this property allows the widget/theme to define the framework version that it supports.
     * This version check is not currently enforced, but will be enforced in the future.
     * */
    exbVersion: string;
    /**
     * You don't need to add this property in your code, this property is added at runtime.
     *
     * Save the current locale only, but not the default locale.
     * The default string should be written in manifest.
     * There are some conventional keys:
     * _widgetLabel: the widget label.
     * _action_<action name>_label: the action label.
     * _ext_<extension name>_label: the extension label.
     * _layout_<layout name>_label: the layout label.
     *  */
    i18nMessages: any;
    author?: string;
    description?: string;
    copyright?: string;
    license?: string;
}
export interface BaseActionProperty {
    name: string;
    /** The action class uri, relative to `src` folder. */
    uri: string;
    /**
     * The action setting class uri, relative to `src` folder.
     * Webpack uses this property to create an entry.
     * In builder setting, the action may require setting or may not require setting depends on the message or data source,
     * in this case, the action should define `getSettingComponentUri()` method to return the setting uri or return null.
     * */
    settingUri?: string;
    label: string;
}
export declare type MessageActionProperty = BaseActionProperty;
/** @ignore */
export interface DataActionProperty extends BaseActionProperty {
    icon: IconResult | string;
}
/** The widget manifest */
export interface WidgetManifest extends Manifest {
    /** Widget manifest properties */
    properties?: WidgetManifestProperties;
    /** Extensions provided by the widget. */
    extensions?: ExtensionProperties[];
    /** The message types published by the widget. */
    publishMessages?: Array<MessageType | MessageDescription>;
    /** The message actions provided by the widget.  */
    messageActions?: MessageActionProperty[];
    /** The data actions provided by the widget */
    dataActions?: DataActionProperty[];
    /** Exclude those data actions in setting and runtime */
    excludeDataActions?: string[];
    /**
     * The translated locales the widget provides. Each entry should be a string representing the language version as defined in [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt). Examples of valid language codes include "en", "en-US", "fr", "fr-FR", "es-ES", etc.
     * By convention, the default locale is listed first.
     **/
    translatedLocales?: string[];
    /**
     * Use this property to load third-party libraries. Pass an absolute URL to a library.
     * See the Using third-party libraries guide for more information.
     *
     * Alternatively, a widget can define its own dependencies by providing a
     * `DependencyDefine` extension.
     *
     * Pre-defined dependencies:
     * - **jimu-arcgis**: will load the `jimu-arcgis` package that will load the ArcGIS API for JavaScript.
     */
    dependency?: string | string[];
    /**
     * Dependency for setting component. See {@link WidgetManifest.dependency}
     */
    settingDependency?: string | string[];
    /** The initial size the widget will be when added into an app. */
    defaultSize?: Size & {
        autoWidth?: boolean;
        autoHeight?: boolean;
    };
    widgetType?: WidgetType;
    /** Valid only when the `hasEmbeddedLayout` is true. */
    layouts?: Array<{
        name: string;
        label: string;
        type?: string;
    }>;
    /** Default value is false. If true, the widget requires an ArcGIS Enterprise subscription. */
    requireEnterprise?: boolean;
    requiredUserTypeExtensions?: UserTypeExtension[];
}
/**
 * The extension definition.
 */
export interface ExtensionProperties {
    /** The extension point that the extension extends. */
    point: ExtensionPoints;
    /** The extension class URI, relative to `src` folder. */
    uri: string;
    /** The extension name. */
    name: string;
    label: string;
}
/**
 * Properties that declare the widget capability.
 * Some properties are automatically generated on compilation, and some need to be set in the `manifest.json`.
 */
export interface WidgetManifestProperties {
    /** This property is automatically set. If `runtime/widget.tsx` exists, this property is true. */
    hasMainClass: boolean;
    /** This property is automatically set. If `config.json` exists, this property is true. */
    hasConfig: boolean;
    /** This property is automatically set. If `setting/setting.tsx` exists, this property is true. */
    hasSettingPage: boolean;
    /** @ignore */
    hasLayoutItemSettingPage: boolean;
    /** This property is automatically set. If `runtime/builder-support.tsx` exists, this property is true. */
    hasBuilderSupportModule: boolean;
    /**
     * Default value is true.
     * If false, the builder will not load the setting page.
     * One use case of setting the value to `false` is when a widget supports inline editing, as it does not need to show the setting page even though it has config.
     */
    hasConfigInSettingPage: boolean;
    /** Default value is false. If true, an edit button will show when widget is selected. */
    supportInlineEditing: boolean;
    /** Default value is false. If true, the widget can be put in a list. */
    supportRepeat: boolean;
    /** Default value is true. If true, the height/width of the widget can be set to auto. */
    supportAutoSize: boolean;
    /** Default value is false. If true, the framework will create the layouts for the widget, see `layouts` property. */
    hasEmbeddedLayout: boolean;
    /** Default value is true. If true, the children layout items are constrained in the widget. */
    lockChildren: boolean;
    /** @ignore */
    passDataSourceToChildren: boolean;
    /** Default value is false. If true, the widget will be shown in the `MapWidgetSelector`. */
    canCreateMapView: boolean;
    /** Default value is false. By default, a widget is constrained in the layout. Set this property as true will make the widget overflow out of the layout. */
    canCrossLayoutBoundary?: boolean;
    /** Default value is false. If true, the widget can provide some data records to the data action. */
    canConsumeDataAction?: boolean;
    /** Default value is false. If true, the widget can provide a repeat data source. */
    canProvideRepeatDataSource?: boolean;
    /** Default value is false. By default, a widget does not have background and the background set in the layout style will take effect.
     *  If it is true, the background setting in the layout style will be hidden.
     */
    coverLayoutBackground?: boolean;
    /** Default value is false. If true, flips the icon on RTL. */
    flipIcon?: boolean;
    /**
     * Default value is false.
     *
     * When user click a widget, we can activate the widget (change the widget state to active), but not all widget needs this active state.
     * So, for performance reason, we do not activate a widget by default.
     *
     * When this property is true, and when a widget is activated, we'll use `deactivateOtherWidgets` to check whether deactivate other widgets.
     */
    needActiveState?: boolean;
    /**
     * Default value is true.
     *
     * For map widget, we can set this as false to enable other widgets to interact with map.
     * True, means when this widget is activated, all other widgets will be deactivated.
     * False, means when this widget is activated, will not change other widget's state.
     *
     * This means there may be more than one active widgets.
     */
    deactivateOtherWidgets?: boolean;
    /**
     * @ignore
     * This indicates whether a step-by-step guide is available for the widget.
     * If true, the help tooltip for the widget will include a button to start the guide.
     * The steps of the guide should be defined in widget's `builder-support.tsx` file as a component named and exported as: "WidgetGuide".
     */
    hasGuide?: boolean;
    /**
     * Default value is false.
     * Set this property to true, the widget can use `<ViewportVisibilityContext.Consumer>` to get whether the widget is in the browser viewport.
     */
    watchViewportVisibility?: boolean;
}
export declare type IMWidgetManifest = ImmutableObject<WidgetManifest>;
export interface ThemeStyleFilesProperty {
    /** Whether the theme has css style. */
    css: boolean;
    /** Whether the theme has CSS-in-JS style. */
    js: boolean;
}
export interface ThemeManifest extends Manifest {
    /** The theme's theme color. */
    colors?: ThemeThemeColors;
    styleFiles?: ThemeStyleFilesProperty;
}
export declare type IMThemeManifest = ImmutableObject<ThemeManifest>;
export declare enum UserTypeExtension {
    ArcGISIPS = "ArcGIS IPS",
    ArcGISKnowledge = "ArcGIS Knowledge",
    ArcGISParcelFabric = "ArcGIS Parcel Fabric",
    ArcGISTraceNetwork = "ArcGIS Trace Network",
    ArcGISUtilityNetwork = "ArcGIS Utility Network",
    ArcGISWorkflowManager = "ArcGIS Workflow Manager"
}
