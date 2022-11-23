import { ImmutableObject } from 'seamless-immutable';
import { WidgetManifest, ThemeManifest } from './manifest';
import { JimuFieldType, BoundingBox, Size, BrowserSizeMode, EsriFieldType } from './common';
import { LayoutItemType, LayoutType } from './layout';
import { Analytics } from './tracking-manager';
import { GeometryType } from '@esri/arcgis-rest-types';
import { SharedThemeVariables, ThemeVariables } from './theme';
import { MessageType } from '../message/message-base-types';
import { SqlExpression, OrderByOption } from './sql-expression';
import { AnimationSetting } from '../animation';
import type { LayoutInfo } from './layout';
import { ImageParam, BackgroundStyle, BorderStyle, BoxShadowStyle, FourSidesUnit } from 'jimu-ui';
/**
 * @ignore
 * This is an internal concept. A container has a layout object (size mode layout) to hold widget/widget.
 *
 * A widget has layout/layout widget is not a container, it's a parent widget of the widget in it's layout.
 */
export declare enum ContainerType {
    Page = "pages",
    View = "views",
    ScreenPanel = "screens_panel",
    ScreenMain = "screens_main",
    Dialog = "dialogs",
    Header = "header",
    Footer = "footer"
}
/**
 * @ignore
 * The plural of element will be the key in appConfig
 */
export declare type ElementType = 'page' | 'view' | 'section' | 'widget' | 'screen' | 'screenGroup' | 'layout' | 'dialog' | 'dataSource' | 'messageConfig' | 'appProxy' | 'utility';
/**
 * @ignore
 * When manage multiple size mode, we manage the root container only.
 * Other containers will follow root container's setting
 */
export declare enum RootContainerType {
    Page = "pages",
    Dialog = "dialogs",
    Header = "header",
    Footer = "footer"
}
/**
 * These elements can have layout. The layout will use its parent type to find the correct element.
 */
export declare enum LayoutParentType {
    Page = "pages",
    View = "view",
    Widget = "widget",
    Screen = "screen",
    Dialog = "dialog",
    Header = "header",
    Footer = "footer"
}
export interface WidgetContext {
    /**
    * Absolute URL points to widget folder, like this: http://.../widgets/abc/.
    *
    * If you need to use fetch to load something in widget, you can use this *folderUrl*.
    * If you need to use systemjs to load some modules, please use *uri*.
    */
    folderUrl: string;
    /** @ignore */
    isRemote: boolean;
}
export interface IconProps {
    filename: string;
    originalName?: string;
    path?: string[] | string;
    size?: number;
    color?: string;
    inlineSvg?: boolean;
}
export declare type IMIconProps = ImmutableObject<IconProps>;
export interface IconResult {
    svg: string;
    properties?: IconProps;
}
export declare type IMIconResult = ImmutableObject<IconResult>;
/** Layout item is used to hold widget and section in layout. */
export interface LayoutItemJson {
    id?: string;
    bbox?: BoundingBox;
    type?: LayoutItemType;
    setting?: any;
    widgetId?: string;
    sectionId?: string;
    screenGroupId?: string;
    isPlaceholder?: boolean;
    isPending?: boolean;
    parent?: string;
}
export declare type IMLayoutItemJson = ImmutableObject<LayoutItemJson>;
export interface LayoutJson {
    id: string;
    label?: string;
    order?: string[];
    type?: LayoutType;
    content?: {
        [layoutItemId: string]: LayoutItemJson;
    };
    setting?: any;
    parent?: {
        type: LayoutParentType;
        id: string;
    };
}
export interface AppLayouts {
    [layoutId: string]: LayoutJson;
}
export declare type IMAppLayouts = ImmutableObject<AppLayouts>;
export declare type IMLayoutJson = ImmutableObject<LayoutJson>;
export interface LayoutsJson {
    [layoutId: string]: LayoutJson;
}
export declare type IMLayoutsJson = ImmutableObject<LayoutsJson>;
export declare type IMWidgetContext = ImmutableObject<WidgetContext>;
export interface UseDataSource {
    /**
     * This is the real data source id a widget is using, the id can be:
     *    * mainDataSourceId, when the widget uses main data source directly.
     *    * `${mainDataSourceId}-${dataViewId}`, when the widget uses a data view.
     * Please use this id to call `dataSourceManager.getDataSource()`.
     */
    dataSourceId: string;
    /**
     * Main data source is user configued data source or widget output data source.
     * If the data source is in a data source set, need to use rootDataSourceId to get dataSourceJson.
     */
    mainDataSourceId: string;
    dataViewId?: string;
    /**
     * The data source a widget uses may be a child data source of another data source,
     * so we save the root data source id here so we can create data source easily.
     */
    rootDataSourceId?: string;
    /**
     * jimu field name array.
     * If no fields, means the widget can work with any field.
     */
    fields?: string[];
}
export declare type IMUseDataSource = ImmutableObject<UseDataSource>;
export interface UseUtility {
    utilityId: string;
    /** Task name to use if the referce utility is an online item group */
    task?: string;
}
export declare type IMUseUtility = ImmutableObject<UseUtility>;
export interface WidgetDataActionConfig {
    [actionName: string]: {
        enabled: boolean;
        config?: any;
        actions: {
            [widgetId: string]: DataActionJson;
        };
    };
}
export declare type IMWidgetDataActionConfig = ImmutableObject<WidgetDataActionConfig>;
export interface WidgetJson {
    id: string;
    icon: IconResult | string;
    label: string;
    visible: boolean;
    index?: number;
    /** The widget's config is saved here */
    config: any;
    uri: string;
    itemId?: string;
    context: WidgetContext;
    /**
     * The manifest is added in runtime, will not be saved in the config json.
     */
    manifest: WidgetManifest;
    /** @ignore */
    _originManifest: WidgetManifest;
    version: string;
    useDataSources?: UseDataSource[];
    useUtilities?: UseUtility[];
    useMapWidgetIds?: string[];
    useDataSourcesEnabled?: boolean;
    outputDataSources?: string[];
    widgets?: string[];
    /**
    * For widget that has an embedded layout, the name is declared in manifest.json.
    * If there is no layouts declared in manifest, the name is default.
    *
    * If the name starts with "_", the layout will not be displayed in TOC.
    */
    layouts?: {
        [name: string]: SizeModeLayoutJson;
    };
    /**
     * A widget can be contained in multiple layout under a centain size mode.
     * The key is the name of the size mode.
     */
    parent?: {
        [key: string]: LayoutInfo[];
    };
    style?: {
        border?: any;
        borderRadius?: any;
        boxShadow?: any;
    };
    enableDataAction?: boolean;
    dataActions?: WidgetDataActionConfig;
}
export declare type IMWidgetJson = ImmutableObject<WidgetJson>;
export interface WidgetsJson {
    [widgetId: string]: WidgetJson;
}
export declare type IMWidgetsJson = ImmutableObject<WidgetsJson>;
export interface SizeModeLayoutJson {
    [sizeMode: string]: string;
}
export declare type IMSizeModeLayoutJson = ImmutableObject<SizeModeLayoutJson>;
/**
 * @ignore
 */
export interface AbstractContainerJson {
    layout: SizeModeLayoutJson;
    backgroundColor?: string;
    backgroundIMage?: string | ImageParam;
    backgroundPosition?: string;
    oneByOneEffect?: AnimationSetting;
}
/** @ignore */
export declare type IMAbstractContainerJson = ImmutableObject<AbstractContainerJson>;
export interface SectionJson {
    id: string;
    visible?: boolean;
    label: string;
    icon: IconResult | string;
    views: string[];
    style?: {
        border?: any;
        borderRadius?: any;
        boxShadow?: any;
    };
    transition?: {
        type: string;
        direction?: string;
    };
    focusable?: boolean;
    autoPlay?: boolean;
    interval?: number;
    loop?: boolean;
    arrowsNav?: {
        visible: boolean;
        direction: 'v' | 'h';
        size: number;
        offset: number;
    };
    dotsNav?: {
        visible: boolean;
        position: 'l' | 'r' | 't' | 'b';
        size: number;
        offset: number;
        spacing: number;
    };
    parent?: {
        [key: string]: LayoutInfo[];
    };
}
export declare type IMSectionJson = ImmutableObject<SectionJson>;
export interface SectionsJson {
    [sectionId: string]: SectionJson;
}
export declare type IMSectionsJson = ImmutableObject<SectionsJson>;
export interface ViewJson extends AbstractContainerJson {
    id: string;
    label: string;
    lazyLoad?: boolean;
    parent?: string;
    transition?: {
        type: string;
        direction?: string;
    };
}
export declare type IMViewJson = ImmutableObject<ViewJson>;
export interface ViewsJson {
    [viewId: string]: ViewJson;
}
export declare type IMViewsJson = ImmutableObject<ViewsJson>;
export declare enum ScreenTransitionType {
    Fade = "FADE",
    Cover = "COVER",
    Push = "PUSH"
}
export declare enum ScreenTriggerType {
    Top = "TOP",
    Upper = "UPPER",
    Lower = "LOWER",
    Bottom = "BOTTOM"
}
export interface ScreenGroupJson {
    id: string;
    label: string;
    icon: IconResult | string;
    transitionType?: ScreenTransitionType;
    panelTransitionType?: ScreenTransitionType;
    stretchPanel?: boolean;
    triggerType?: ScreenTriggerType;
    screens: string[];
    verticalSpace?: string;
    /**
     * A screen group can only be contained in one layout under certain size mode.
     * The key is the name of the size mode.
     */
    parent?: {
        [key: string]: LayoutInfo;
    };
}
export declare type IMScreenGroupJson = ImmutableObject<ScreenGroupJson>;
export interface ScreenGroupsJson {
    [screenGroupId: string]: ScreenGroupJson;
}
export declare type IMScreenGroupsJson = ImmutableObject<ScreenGroupsJson>;
export interface ScreenJson {
    id: string;
    label: string;
    parent?: string;
    panel?: {
        layout: SizeModeLayoutJson;
        side: 'left' | 'right' | 'center' | 'none';
        size?: string;
        offset?: string;
        overlay?: boolean;
        padding?: any;
        gap?: number;
        background?: BackgroundStyle;
    };
    main: {
        layout: SizeModeLayoutJson;
        background?: BackgroundStyle;
    };
}
export declare type IMScreenJson = ImmutableObject<ScreenJson>;
export interface ScreensJson {
    [screenId: string]: ScreenJson;
}
export declare type IMScreensJson = ImmutableObject<ScreensJson>;
export interface SizeModePageHeightInBuilder {
    [sizeMode: string]: number;
}
/**
 * The page type.
 */
export declare enum PageType {
    Normal = "NORMAL",
    Folder = "FOLDER",
    Link = "LINK"
}
/**
 * The page mode.
 */
export declare enum PageMode {
    /**
     * width, height = 100%
     */
    FitWindow = "FIT_WINDOW",
    /**
     * width = <>px | 100%,
     * height = auto
     */
    AutoScroll = "AUTO_SCROLL"
}
/**
 * The dialog mode.
 */
export declare enum DialogMode {
    /**
     * Dialog position is configured with these options: center, left, right, top, bottom.
     */
    Fixed = "FIXED",
    /**
     * Dialog position follows the opener that it links to.
     */
    Anchored = "ANCHORED"
}
/**
 * The position for fixed position dialog.
 * Center: both width and height are valid.
 * Left/Right: only width is valid, height is 100%.
 * Top/Bottom: only height is valid, width is 100%.
 */
export declare enum DialogPosition {
    Center = "CENTER",
    Left = "LEFT",
    Right = "RIGHT",
    Top = "TOP",
    Bottom = "BOTTOM"
}
/**
 * The dialog interaction type.
 */
export declare enum DialogInteractionType {
    NoButton = "NO_BUTTON",
    ButtonInline = "BUTTON_INLINE",
    ButtonBlock = "BUTTON_BLOCK"
}
/**
 * The page json.
 */
export interface PageJson extends AbstractContainerJson {
    /** The page id. */
    id: string;
    /** The page label. */
    label: string;
    /** The page type. */
    type: PageType;
    /** The page icon. */
    icon: IconResult | string;
    /** The page header. */
    header: boolean;
    /** The page footer. */
    footer: boolean;
    /** The page mode. */
    mode: PageMode;
    /**
     * The maximum width of a page.
     * Pixel width, only valid for the auto-scrolling page mode.
     */
    maxWidth?: number;
    /** @ignore */
    heightInBuilder?: SizeModePageHeightInBuilder;
    /** The link URL. */
    linkUrl?: string;
    /** The open target: _blank, _top.  */
    openTarget?: string;
    /** Whether the page is visible. */
    isVisible: boolean;
    /** Whether it is the home page. */
    isDefault: boolean;
    /** Open dialog when page starts. */
    autoOpenDialogId: string;
    /**
     * The body background color, only valid for fixed-width pages.
     */
    bodyBackgroundColor?: string;
    /**
     * The body background image, only valid for fixed-width pages.
     */
    bodyBackgroundIMage?: string;
    /**
     * The body background position, only valid for fixed-width pages.
     */
    bodyBackgroundPosition?: string;
}
/** The type of immutable page json. */
export declare type IMPageJson = ImmutableObject<PageJson>;
export interface PagesJson {
    [pageId: string]: PageJson;
}
export declare type IMPagesJson = ImmutableObject<PagesJson>;
/**
 * The dialog size mode.
 */
export interface DialogSizeMode {
    /**
     * Valid when the dialog mode is `FIXED`.
     */
    position?: DialogPosition;
    /** The dialog width. */
    width?: string;
    /** The dialog height. */
    height?: string;
    /** Whether the dialog has an aspect ratio (width vs. height). */
    aspectRatio?: boolean;
}
export declare type IMDialogSizeMode = ImmutableObject<DialogSizeMode>;
/**
 * The dialog json.
 * Dialog is the synonym of the Window in UI.
 *  */
export interface DialogJson extends AbstractContainerJson {
    /** The dialog id. */
    id: string;
    /** The dialog label. */
    label: string;
    /** The dialog icon. */
    icon: IconResult | string;
    /** The dialog mode. */
    mode: DialogMode;
    /**
     * To distinct the display order for dialog list.
     * Each mode, Fixed and Anchored, has its own order list starting with 0.
     */
    index?: number;
    /** The dialog size mode. */
    sizeMode: {
        [sizeMode in BrowserSizeMode]?: DialogSizeMode;
    };
    /**
     * If a dialog is a splash, the dialog will open automatically when the app get loaded.
     * Only one fixed dialog can be set as splash.
     *
     * The splash dialog id is not put in the URL, and can't be set as page dialog or link dialog.
     */
    isSplash: boolean;
    /**
     * Interaction is valid when the dialog mode is FIXED.
     */
    interactionType: DialogInteractionType;
    /**
     * Details for interaction: checkbox text and font-size, button text and font-size.
     */
    interactionStyles: any;
    /**
     * Two interactions.
     * Confirmation: true. Users must check the confirmation box before closing the dialog.
     * "Don't show this again" option: false. It is optional. If checked, the window will not display again.
     * */
    confirmBeforeClose: boolean;
    /**
     * Valid when confirmBeforeClose is true.
     * Whether the confirmation window displays again or not after it is checked.
     */
    alwaysShowConfirmation: boolean;
    /**
     * The other interaction. Valid when dialog's mode is FIXED.
     * Users must check the checkbox box before closing the dialog. The window will never display again */
    preventDisplayAgain: boolean;
    /**
     * Close dialog when clicking outside.
     */
    closeWhenClickOverlay: boolean;
    /** The dialog overlay color. */
    overlayColor?: any;
    /** The dialog background. */
    dialogBackground?: BackgroundStyle;
    /** The dialog border style. */
    border?: BorderStyle;
    /** The dialog border radius. */
    borderRadius?: FourSidesUnit;
    /** The dialog box shadow. */
    boxShadow?: BoxShadowStyle;
    /**
     * The animation for the entire dialog.
     */
    effect?: AnimationSetting;
    /**
     * The animation for all widgets inside the dialog.
     */
    oneByOneEffect?: AnimationSetting;
}
/** Type of the immutable dialog json. */
export declare type IMDialogJson = ImmutableObject<DialogJson>;
export interface DialogsJson {
    [dialogId: string]: DialogJson;
}
export declare type IMDialogsJson = ImmutableObject<DialogsJson>;
export interface HeaderJson extends AbstractContainerJson {
    height: {
        [sizeMode: string]: number | string;
    };
    sticky?: boolean;
}
export declare type IMHeaderJson = ImmutableObject<HeaderJson>;
export interface FooterJson extends AbstractContainerJson {
    height: {
        [sizeMode: string]: number | string;
    };
}
export declare type IMFooterJson = ImmutableObject<FooterJson>;
/**
 * @ignore
 */
export declare type DateFormat = 'shortDate' | 'shortDateLE' | 'longMonthDayYear' | 'dayShortMonthYear' | 'longDate' | 'shortDateShortTime' | 'shortDateLEShortTime' | 'shortDateShortTime24' | 'shortDateLEShortTime24' | 'shortDateLongTime' | 'shortDateLELongTime' | 'shortDateLongTime24' | 'shortDateLELongTime24' | 'longMonthYear' | 'shortMonthYear' | 'year';
export interface FieldFormatSchema {
    dateFormat?: DateFormat;
    digitSeparator?: boolean;
    places?: number;
}
export declare type IMFieldFormatSchema = ImmutableObject<FieldFormatSchema>;
export interface FieldSchema {
    /**
     * Widget should use this name to read data.
     * In fact, the jimuName is the field name when the first mapping is configured.
     */
    jimuName: string;
    type: JimuFieldType;
    esriType?: EsriFieldType;
    /**
     * this is the actual field name of the current data service.
     */
    name: string;
    alias?: string;
    description?: string;
    format?: FieldFormatSchema;
    /**
     * @ignore
     * valid for output data source only. We'll use this info to refer to the original data source when mapping. The field name in the array is jimuFieldName.
     *    * If the data source has only one original data source, the array contains field names.
     *    * If the data source has more than one original data sources, the array contains "dsId.fieldName".
     */
    originFields?: string[];
}
export declare type IMFieldSchema = ImmutableObject<FieldSchema>;
export interface DataSourceSchema {
    label?: string;
    childId?: string;
    jimuChildId?: string;
    idField?: string;
    fields?: {
        [jimuName: string]: FieldSchema;
    };
    filter?: string;
    refreshInterval?: number;
    /**
     * For dataset data source.
     * In fact, the jimuChildId is the child id when the first mapping is configured.
     */
    childSchemas?: {
        [jimuChildId: string]: DataSourceSchema;
    };
}
export declare type IMDataSourceSchema = ImmutableObject<DataSourceSchema>;
/** @ignore */
export interface ReversedDataSourceSchema {
    label?: string;
    childId?: string;
    jimuChildId?: string;
    fields?: {
        [fieldName: string]: FieldSchema[];
    };
    childSchemas?: {
        [childId: string]: ReversedDataSourceSchema[];
    };
}
/** @ignore */
export declare type IMReversedDataSourceSchema = ImmutableObject<ReversedDataSourceSchema>;
export interface DataSourceJson {
    id: string;
    /**
     * If user renamed the data source, will save the new name here.
     */
    label?: string;
    /**
     * Label of source (e.g. AGOL/portal item or a remote database) of the data source.
     * For root data source, will keep `sourceLabel` newest.
     * For exmaple, if the AGOL/portal item is renamed, `sourceLabel` will be updated next time the app is saved.
     *
     * If data source instance is not created, will use `label` (if user renamed the data soruce) or `sourceLabel` as data source label.
     * If data source instance is created, should call `ds.getLabel` to get data source label.
     */
    sourceLabel?: string;
    type?: string;
    url?: string;
    /**
    * @ignore
    * For statistic data source, we must save the schema in the configuration.
    */
    isStatistic?: boolean;
    portalUrl?: string;
    itemId?: string;
    layerId?: string;
    layers?: DataSourceLayerJson[];
    /**
     * Whether the data source is hidden by user.
     */
    isHidden?: boolean;
    /**
     * Valid for widget output data source only. We don't use fields here.
     */
    originDataSources?: UseDataSource[];
    /**
     * @ignore
     * For configured data source:
     *    * If no mapping is configured, we dont' save DS schema here, the reason is: we can fetch the updated schema when schema is changed in other place, such as mapviewer, server.
     *    * After mapping is configured:
     *      * For data source, we save the mapped fields info only, which means for non-mapped fields, we can still fetch updating.
     *      * for data source set, we save the mapped layers only, which means for non-mapped layers, we can still fetch updating.
     * For output data source:
     *    * If the schema is the same with the original data source, we don't need to save it. The widgets that use this data source will be referenced to the original data source
     *    * If the schema is not the same, we must save the full schema, and use the schema mapping to find the original data source's fields.
    */
    schema?: DataSourceSchema;
    /** @ignore */
    data?: Array<Record<string, unknown>>;
    /**
     * @ignore
     * The fields used by the data source itself, such as in filter, in sort.
     */
    useFields?: string[];
    isOutputFromWidget?: boolean;
    /**
     * Indicate whether source data is saved in data source instance.
     * If data source is created from AGOL/portal item or a remote database, source data is saved in the AGOL/portal item or the remote database.
     * If data source is created from an array directly, source data is saved in data source instance (`sourceRecords`).
     */
    isDataInDataSourceInstance?: boolean;
    /** The query criteria for the data source itself. */
    query?: DataViewJson;
    dataViews?: {
        [dvId: string]: DataViewJson;
    };
    childDataSourceJsons?: {
        [jimuChildId: string]: DataSourceJson;
    };
    geometryType?: GeometryType;
    /**
     * Whether to disable export data.
     * For subscriber data, do not allow to export data by default.
     * For other data, allow to export data by default.
     */
    disableExport?: boolean;
}
export declare type IMDataSourceJson = ImmutableObject<DataSourceJson>;
export declare enum SupportedUtilityType {
    GeoEnrichment = "GEOENRICH",
    Geometry = "GEOMETRY",
    GeoCoding = "GEOCODING",
    Printing = "PRINTING",
    Routing = "ROUTING"
}
export interface OrgGeocodeSetting {
    name: string;
    placeholder: string;
    batch?: boolean;
    geosearch?: boolean;
}
export interface OrgPrintSetting {
    templates: any;
}
export interface UtilityJson {
    id: string;
    source: 'custom' | 'org';
    type: SupportedUtilityType;
    /**
     * If user renamed the utility, will save the new name here.
     */
    label?: string;
    /** The title of the item */
    sourceLabel?: string;
    /** Service name if it is from org utility */
    name?: string;
    /** name of a utility if it is in a org utility group */
    taskName?: string;
    /** Sequence of a utility if it is in a org utility group */
    index?: number;
    url?: string;
    itemId?: string;
    portalUrl?: string;
    orgSetting?: OrgGeocodeSetting | OrgPrintSetting;
}
export declare type IMUtilityJson = ImmutableObject<UtilityJson>;
export interface DataSourcesJson {
    [dsId: string]: DataSourceJson;
}
export interface UtilitiesJson {
    [utilityId: string]: UtilityJson;
}
export declare type IMDataSourcesJson = ImmutableObject<DataSourcesJson>;
export declare type IMUtilitiesJson = ImmutableObject<UtilitiesJson>;
export interface DataViewJson {
    /**
     * "selection" and "no_selection" are special data views.
     * For "selection" data view, we'll not create a JSON for it, its instance will be created in runtime.
     * If user configure a view for "when no selection", the view id should be "no_selection".
     */
    id: string;
    label: string;
    /**
     * By default, data view will use its data source type, but can override it.
     */
    type?: string;
    where?: SqlExpression;
    orderBy?: OrderByOption[];
    /** If return all fields, please don't set this property. */
    outFields?: string[];
    /** The page size used to do query. */
    pageSize?: number;
    /** Maximum number of records, records exceeds this number will not be returned. */
    maximum?: number;
    /**
     * Seconds.
     * null or undefined means honor layer's setting.
     * 0 means does not enable auto refresh.
     * > 0 means use custom refresh interval setting.
     */
    refreshInterval?: number;
}
export declare type IMDataViewJson = ImmutableObject<DataViewJson>;
export interface DataSourceLayerJson {
    id: string;
    title: string;
    url: string;
}
export declare type IMDataSourceLayerJson = ImmutableObject<DataSourceLayerJson>;
export interface MessageActionJson {
    actionId: string;
    description: string;
    widgetId: string;
    messageWidgetId: string;
    actionName: string;
    config: any;
    /**
     * Data sources used in the action are saved here.
     */
    useDataSources?: UseDataSource[];
    version: string;
}
export declare type IMMessageActionJson = ImmutableObject<MessageActionJson>;
export interface DataActionJson {
    actionId: string;
    widgetId: string;
    config?: any;
    enabled: boolean;
}
export declare type IMDataActionJson = ImmutableObject<DataActionJson>;
export interface MessageJson {
    id: string;
    widgetId: string;
    messageType: MessageType;
    actions: MessageActionJson[];
}
export declare type IMMessageJson = ImmutableObject<MessageJson>;
export interface MessagesJson {
    [messageConfigId: string]: MessageJson;
}
export declare type IMMessagesJson = ImmutableObject<MessagesJson>;
export interface AttributesJson {
    /**
     * These properties will be set when app is downloaded.
     */
    title?: string;
    description?: string;
    tags?: string[];
    thumbnail?: string;
    /** The portal an experience connects to. */
    portalUrl?: string;
    /** The oauth2 client id. */
    clientId?: string;
    /** Indicate if the portal is webTier or not. */
    isWebTier?: boolean;
    /** @ignore */
    geometryService?: string;
}
export declare type IMAttributesJson = ImmutableObject<AttributesJson>;
/**
 * @ignore
 */
export interface HubJson {
    community: {
        portalUrl: string;
        orgId?: string;
    };
    initiative?: string;
}
/**
 * @ignore
 */
export declare type IMHubJson = ImmutableObject<HubJson>;
export declare type CustomThemeJson = Partial<ThemeVariables>;
export declare type IMCustomThemeJson = ImmutableObject<Partial<CustomThemeJson>>;
export interface ForBuilderAttributes {
    viewPortSize: {
        [browserSizeMode: string]: Size;
    };
    lockLayout: boolean;
}
export declare type IMForBuilderAttributes = ImmutableObject<ForBuilderAttributes>;
export interface ProxyJson {
    id: string;
    sourceUrl: string;
    proxyUrl: string;
    proxyId: string;
    hitsPerInterval?: number;
    intervalSeconds?: number;
}
export declare type IMProxyJson = ImmutableObject<ProxyJson>;
export interface HistoryLabels {
    pages?: {
        [pageId: string]: string[];
    };
    views?: {
        [viewId: string]: string[];
    };
    dialogs?: {
        [dlgId: string]: string[];
    };
}
export declare type IMHistoryLabels = ImmutableObject<HistoryLabels>;
export interface ProxiesJson {
    [proxyId: string]: ProxyJson;
}
export declare type IMProxiesJson = ImmutableObject<ProxiesJson>;
export interface Connection {
    type?: 'portal';
    portalUrl: string;
    clientId: string;
    portalVersion: number;
}
export declare type IMConnection = ImmutableObject<Connection>;
/**
 * This interface defines the experience config structure.
 */
export interface AppConfig {
    /** The template that an experience created from. */
    template: string;
    /** User can configure an experience for multiple size modes, and the default size mode is saved here. The config user interface is not available yet. */
    mainSizeMode: BrowserSizeMode;
    /** Pages within an experience */
    pages: PagesJson;
    /** The structure of pages */
    pageStructure: Array<{
        [pageId: string]: string[];
    }>;
    /** Windows (dialogs) within an experience */
    dialogs: DialogsJson;
    /** Layouts within an experience */
    layouts: LayoutsJson;
    /** Sections within an experience */
    sections?: SectionsJson;
    /** Views within an experience */
    views?: ViewsJson;
    /** Widgets within an experience */
    widgets: WidgetsJson;
    /** Screen groups within an experience */
    screenGroups: ScreenGroupsJson;
    /** Screens within an experience */
    screens: ScreensJson;
    /** The header of an experience */
    header: HeaderJson;
    /** The footer of an experience */
    footer: FooterJson;
    /** The theme uri, should end with "/". */
    theme: string;
    sharedThemeVariables?: SharedThemeVariables;
    customTheme?: CustomThemeJson;
    /** Data sources within an experience */
    dataSources?: DataSourcesJson;
    utilities?: UtilitiesJson;
    appProxies?: ProxiesJson;
    /** The message configs of an experience */
    messageConfigs?: MessagesJson;
    attributes: AttributesJson;
    /** @ignore */
    analytics: Analytics;
    /**
     * If true, will read widget's manifest from `widgetsManifest`.
     * This value is false by default
     */
    useCachedManifest?: boolean;
    /**
     * The manifest here are raw manifest, need to be processed before use.
     * We save raw manifest here to save some network requests.
     *
     * When add a widget in builder, the manifest is not saved here because we need to fetch the latest manifest to check version info.
     * However, we can do this manually.
     */
    widgetsManifest: {
        [widgetUri: string]: WidgetManifest;
    };
    themeManifest?: ThemeManifest;
    /** The widgets uri in this array will be loaded when the app loads, rather than dynamically loading the widget. */
    preloadWidgets?: string[];
    /**
     * The framework version when the experience is created/updated.
     *
     * When an old experience is opened in a new version code, this version will be set as the new code version.
     * */
    exbVersion: string;
    /**
     * As the `exbVersion` will be replaced with the code version when app is launched, we save the origin version
     * in config here.
     */
    originExbVersion: string;
    /** Only newly created experience (unpublished) configurations have this property. */
    __not_publish: boolean;
    /** These attributes are used by builder only. */
    forBuilderAttributes: ForBuilderAttributes;
    /** UTC timestamp for specific app config version. It's used for app's update. */
    timestamp: string;
    /**
     * History labels are saved here because the labels may be used in URL.
     * This can avoid link broken.
     * This is done while publishing, which means all labels in the published app will be saved here.
     */
    historyLabels: HistoryLabels;
    /** Configure multiple portal connection information */
    connections?: Connection[];
}
export declare type IMAppConfig = ImmutableObject<AppConfig>;
