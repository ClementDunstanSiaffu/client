import { AppConfig, IMSizeModeLayoutJson } from './app-config';
import { ImmutableObject } from 'seamless-immutable';
import { UrlParameters } from './url-parameters';
import { DataSourceStatus, QueryParams } from '../data-sources/data-source-interface';
import { AppMode, WidgetState, LayoutItemConstructorProps, BrowserSizeMode, PagePart, LoadingType } from './common';
import { Selection, ClipboardItem, LayoutInfo } from './layout';
import { IUser } from '@esri/arcgis-rest-types';
import { I18nMessages } from '../i18n';
import JimuConfig from './jimu-config';
import { AnimationPlayMode } from '../animation';
import { AppInfo } from './app-info';
import { BaseExtension, ExtensionPoints } from '../extension-spec/extension-spec';
/**
 * Widget runtime info.
 */
export interface RuntimeInfo {
    /** Indicator as to whether or not a widget class is loaded. */
    isClassLoaded?: boolean;
    /** Indicator as to whether or not a widget is in inline editing state. */
    isInlineEditing?: boolean;
    /**
     * The widget's state. Possible values of `OPENED`, `ACTIVE` or `CLOSED`.
     *
     * The `OPENED` and `CLOSED` state are valid only when a widget is put into a widget controller.
     * When a widget is not put into the widget controller, for performance reason, we don't switch the widget open/close state.
     *
     * For `ACTIVE` state, see {@link WidgetManifestProperties.needActiveState}
     * */
    state?: WidgetState;
    /** The window's state. Possible values of `normal`, `minimized` or `maximized`. */
    windowState?: 'normal' | 'minimized' | 'maximized';
}
export declare type IMRuntimeInfo = ImmutableObject<RuntimeInfo>;
export interface RuntimeInfos {
    [id: string]: RuntimeInfo;
}
export declare type IMRuntimeInfos = ImmutableObject<RuntimeInfos>;
/** @ignore */
export declare type IMLayoutState = ImmutableObject<{
    [clazz: string]: boolean;
}>;
/** This interface defines the properties that are not changed after the app loaded. */
export interface AppContext {
    /** @ignore */
    isInPortal: boolean;
    /** The locale that the experience will use. The user's profile is used for sign-in users, while the browser's locale is used for anonymous users. */
    locale: string;
    /** Whether the app is oriented right to left. */
    isRTL: boolean;
    /** The best match translation locale. All of the supported translations can be found this way:
     * ```
     * import {translatedLocales} from 'jimu-core'
     * ```
     * */
    translatedLocale: string;
    /** Indicates whether access is from a touch device.  */
    isTouchDevice: boolean;
    /** Indicates whether the app is builder. */
    /** @ignore */
    isBuilder: boolean;
    /** Indicates whether the app is loaded in builder. */
    isInBuilder: boolean;
    /** @ignore */
    isSite: boolean;
    jimuConfig: JimuConfig;
}
/**
 * The data source info which provides status, count, selected ids, widget queries and more.
 */
export interface DataSourceInfo {
    /** The `DataSourceInfo` `instanceStatus` property indicates the create status of the data source. The `instanceStatus`
     * is of type [`DataSourceStatus`](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/DataSourceStatus) enum.
     */
    instanceStatus: DataSourceStatus;
    status: DataSourceStatus;
    countStatus: DataSourceStatus;
    /** @ignore */
    saveStatus?: DataSourceStatus;
    /** An immutable array of selected `DataSource` ids. */
    selectedIds?: string[];
    /**
     * Whenever a data source is changed on the client side, the `version` is incremented +1. The `version` is 1 when the data is loaded for the first time.
     */
    version?: number;
    /**
     * Whenever the source of data source is changed, the `sourceVersion` is incremented +1. The `sourceVersion` is 1 when the data is loaded for the first time.
     */
    sourceVersion?: number;
    /**
     * The query parameters widgets applied to the `DataSource`.
     * The query does not have page info.
     */
    widgetQueries?: {
        [widgetId: string]: QueryParams;
    };
    /**
     * This property applies only to a `QueriableDataSource`.
     * For static data, the data does not need refresh.
     * For auto refresh data, the data requires a refresh on arrival of the refresh interval.
     */
    needRefresh?: boolean;
    /**
     * This property applies only to  `FeatureLayerDataSource`.
     * The `gdbVersion` applies to the gdb version used when querying/adding/updating a feature layer.
     * For additional information, please see:
     *  [Query (Feature Service/Layer)](https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm)
     *  [Version Management Service](https://developers.arcgis.com/rest/services-reference/version-management-service.htm)
     */
    gdbVersion?: string;
}
/** The `JimuMapViewStatus` enum provides values available to the status of the `JimuMapView`. */
export declare enum JimuMapViewStatus {
    Loading = "LOADING",
    Loaded = "LOADED",
    Failed = "FAILED"
}
/** The `JimuMapViewInfo` interface provides poperties relative to the `JimuMapView`. */
export interface JimuMapViewInfo {
    /** The `id` property provides the id of the `JimuMapView`. */
    id: string;
    /** The `mapWidgetId` property provides the id of the map widget that creates the `JimuMapView`. */
    mapWidgetId: string;
    /** The `isActive` property indicates whether the `JimuMapView` is active. */
    isActive?: boolean;
    /** The `dataSourceId` property provides the id related to the `DataSource` of the `JimuMapView`. */
    dataSourceId: string;
    /** The `status` property provides the `JimuMapViewStatus`. */
    status: JimuMapViewStatus;
}
export interface MapWidgetInfo {
    mapWidgetId?: string;
    autoControlWidgetId?: string;
}
export interface SectionNavInfo {
    visibleViews?: string[];
    currentViewId?: string;
    previousViewId?: string;
    progress?: number;
    useProgress?: boolean;
    useStep?: boolean;
    playId?: symbol;
    withOneByOne?: boolean;
}
export declare type IMJimuMapViewInfo = ImmutableObject<JimuMapViewInfo>;
export declare type IMMapWidgetInfo = ImmutableObject<MapWidgetInfo>;
export declare type IMDataSourceInfo = ImmutableObject<DataSourceInfo>;
export declare type IMUser = ImmutableObject<IUser>;
export declare type IMSelection = ImmutableObject<Selection>;
export declare type IMSectionNavInfo = ImmutableObject<SectionNavInfo>;
interface DialogInfo {
    canClose: boolean;
    checked?: boolean;
    isClosed: boolean;
    alertVersion?: number;
}
export interface DialogInfos {
    [dialogId: string]: DialogInfo;
}
export declare type IMDialogInfos = ImmutableObject<DialogInfos>;
export interface AppRuntimeInfo {
    appMode: AppMode;
    /** The current rendered page. */
    currentPageId: string;
    /** @ignore */
    currentDialogId: string;
    sectionNavInfos: {
        [sectionId: string]: IMSectionNavInfo;
    };
    /** active screen of each screenGroup */
    screenGroupNavInfos: {
        [screenGroupId: string]: {
            activeIndex: number;
            scrollIntoView: boolean;
        };
    };
    /** @ignore this is the layout being edited. */
    activeLayout?: IMSizeModeLayoutJson;
    /** @ignore the page part that is active, default value is 'body'. */
    activePagePart: PagePart;
    /** The current selection. */
    selection: IMSelection;
    clipboard: ClipboardItem;
    /** @ignore */
    draggingWidget?: LayoutItemConstructorProps;
    /** @ignore */
    dragoverLayoutId?: string;
    /** @ignore Show loading mask when isBusy is true. */
    isBusy?: boolean;
    loadingType?: LoadingType;
    /** @ignore */
    zoomScale?: number;
    /**
     * @ignore
     * Manage closed-releated info of all closed dialogs.
     * Purpose:
     *  splash and page dialogs should display once only when builder/app loads unless it is triggered by TOC.
     *  Confirmation checkbox should control all linked widgets.
     */
    dialogInfos: DialogInfos;
    animationPreview?: {
        pageId?: string;
        dialogId?: string;
        layoutInfo?: LayoutInfo;
        playMode?: AnimationPlayMode;
        id: symbol;
    };
    screenPanelStates?: {
        [key: string]: boolean;
    };
    /**
     * Indicate whether it's in print preview mode. User can use `?print_preview=true` or use a link to active to this mode.
     */
    isPrintPreview?: boolean;
}
export declare type IMAppRuntimeInfo = ImmutableObject<AppRuntimeInfo>;
export interface MutableStatePropsVersion {
    [propKey: string]: number;
}
export interface WidgetsMutableStateVersion {
    [widgetId: string]: MutableStatePropsVersion;
}
export interface PortalNeedToRegisterClinetId {
    portalUrl: string;
    needToSignIn: boolean;
    serviceUrl?: string;
}
/** The redux store state. */
export interface State {
    /**
     * The portal url that the app will connect to, not ending in a slash. It will look like:
     *  `http://esridevbeijing.maps.arcgis.com`
     *
     * If the `appConfig` has a `portalUrl`, it will be copied to this property, or we'll
     * get the `portalUrl` through other logic, such as via the browser URL, user input, etc.
     *
     * The `portalUrl` can have a `null`value. However, the `portalUrl` in `appConfig` will always be set via the builder.
     */
    portalUrl?: string;
    /** The OAuth2 app ID from the Portal specified in the `portalUrl`. */
    clientId?: string;
    /** The response of the portal self call, used to return the view of the
     * portal as seen by the current user, whether anonymous or signed in. More information on the `portalSelf` call
     * can be viewed via the [ArcGIS REST API](https://developers.arcgis.com/rest/users-groups-and-items/portal-self.htm).  */
    portalSelf: any;
    /** Whether the portal is a Webtier portal. */
    isWebTier?: boolean;
    /** Indicator as to whether network is offline. */
    isNetworkOffLine: boolean;
    browserSizeMode: BrowserSizeMode;
    /** The immutable `AppConfig` JSON object contains information about the app's configuration. For more information,
     * see the [AppConfig](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/AppConfig) Interface.
     */
    appConfig: AppConfig;
    /** The immutable `AppContext` JSON object contains information about the app's context. Form more information, see
     * [AppContext](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/AppContext) Interface.
     */
    appContext: AppContext;
    /** The immutable `AppRuntimeInfo` JSON object contains information about the app's mode ('Run'or 'Design'), the current rendered page, and others.  */
    appRuntimeInfo: AppRuntimeInfo;
    /** The immutable `AppInfo` JSON object contains information about the app including the name, a text description, a username, thumbnail, id, etc. */
    appInfo: AppInfo;
    hasNewVersion?: boolean;
    /**
     * The current path in the URL, which includes the page(p1).
     */
    appPath: string;
    /**
     * For the Experience Builder ArcGIS Online and Portal editions, `appId` is the `itemId`.
     * For the Experience Builder Dev Edition, the `appId` is a value as a string such as 1 , 2, 3, etc.
     * When the app is downloaded and deployed, the `appId` is `null`.
     * When using `?config=<>` to load app, the `appId` is the config url.
     */
    appId: string;
    /**
     * @ignore
     * widgetsRuntimeInfo
     */
    widgetsRuntimeInfo: RuntimeInfos;
    widgetsClassStatus: {
        [widgetUri: string]: boolean;
    };
    /**
     * @ignore
     * The properties returned by getPreloadPros.
     * We put the properties in state because when widget is rendered in server, we need to pass these properties to client.
     */
    widgetsPreloadProps: {
        [widgetId: string]: any;
    };
    /**
     * @ignore
     * The data here use jimuFieldName as key.
     */
    dataSourcesPreloadData: {
        [dsId: string]: any[];
    };
    /** The parsed object of the location.search. The immutable `UrlParameters` interface JSON object. This includes the `locale`, the app id, the page id, etc.   */
    queryObject: UrlParameters;
    appI18nMessages: I18nMessages;
    /** `dataSourcesInfo` is an immutable object containing the immutable `DataSourceInfo` for each data source within an experience.
     * See [`DatSourceInfo`](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/DataSourceInfo) for more information.
     */
    dataSourcesInfo: {
        [dsId: string]: DataSourceInfo;
    };
    /** `jimuMapViewsInfo` is an immutable object containing the immutable `JimuMapViewInfo` for each map view within an experince.
     * See [`JimuMapViewInfo`](https://developers.arcgis.com/experience-builder/api-reference/jimu-core/JimuMapViewInfo) for more information.
     */
    jimuMapViewsInfo: {
        [jimuMapViewId: string]: JimuMapViewInfo;
    };
    /**
     * @ignore
     */
    mapWidgetsInfo: {
        [mapWidgetId: string]: MapWidgetInfo;
    };
    /** `widgetsState` is an immutable object containing the widget id and its state. */
    widgetsState: {
        [widgetId: string]: any;
    };
    /**
     * @ignore
     * Only the version is stored here, the actual state object is saved in MutableStoreManager.
     */
    widgetsMutableStateVersion: WidgetsMutableStateVersion;
    token?: string;
    user?: IMUser;
    /** @ignore */
    overlays: string[];
    /**
     * To track the user's `locale` and refresh the app once it has changed.
     */
    userLocaleChanged: boolean;
    hasPrivilege: boolean;
    privilegeError: string;
    loadAppConfigError: string;
    portalsNeedToRegisterClinetId: PortalNeedToRegisterClinetId[];
    extensionsInfo: {
        [key in ExtensionPoints]?: BaseExtension[];
    };
}
export declare type IMState = ImmutableObject<State>;
/** @ignore */
interface StateHistory {
    past: IMState[];
    future: IMState[];
}
/** @ignore */
export declare type IMHistoryState = ImmutableObject<StateHistory>;
export {};
