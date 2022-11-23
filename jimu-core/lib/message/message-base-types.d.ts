import { DataRecord, DataRecordSet } from '../data-sources/data-source-interface';
import { IntlShape } from 'react-intl';
import { BaseVersionManager } from '../version-manager';
import { AppConfig } from '../types/app-config';
import { IPoint } from '@esri/arcgis-rest-types';
/**
 * This enum defines all supported messages in the framework.
 */
export declare enum MessageType {
    /** @ignore */
    StringSelectionChange = "STRING_SELECTION_CHANGE",
    ExtentChange = "EXTENT_CHANGE",
    DataRecordsSelectionChange = "DATA_RECORDS_SELECTION_CHANGE",
    DataSourceFilterChange = "DATA_SOURCE_FILTER_CHANGE",
    DataRecordSetChange = "DATA_RECORD_SET_CHANGE",
    LocationChange = "LOCATION_CHANGE",
    /** @ignore */
    SelectDataRecord = "SELECT_DATA_RECORD"
}
/**
 * Some messages carry data, use this property to declare where the data comes from,
 * which helps constrain the trigger data source selection in config.
 */
export declare enum MessageCarryData {
    UseDataSource = "USE_DATA_SOURCE",
    OutputDataSource = "OUTPUT_DATA_SOURCE",
    BothDataSource = "BOTH_DATA_SOURCE"
}
/**
 * The message description. This description helps filter available actions in builder.
 * Widget can use this interface to declare the published message in manifest.
 */
export interface MessageDescription {
    messageType: MessageType;
    /**
     * If this property is not set, it means the message may carry use data source
     */
    messageCarryData?: MessageCarryData;
    /**
     * The widget id from which the message is sourced. If a widget id is not provided, the message is provided by the Jimu framework.
     */
    widgetId?: string;
}
/** @ignore */
export declare function getMessageTypeLabel(messageType: MessageType, intl: IntlShape): string;
/**
 * The interface for all message types `MessageType`.
 */
export interface Message {
    /** The message type.  */
    type: MessageType;
    /**
     * The widget id from which the message is sourced. If a widget id is not provided, the message is provided by the Jimu framework.
     */
    widgetId?: string;
}
/** @ignore */
export declare class StringSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    str: string;
    constructor(widgetId: string, str: string);
}
/**
 * The `DataRecordsSelectionChangeMessage` uses the `widgetId` and the `MessageType` and the provides
 * the selected records when the `MessageType` is 'DATA_RECORD_SET_CHANGE'. This message is used when
 * implementing a workflow on a change of selected records. Other widgets
 * within an experience may subscribe to this message and implement an update workflow when the message
 * is received.
 */
export declare class DataRecordsSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    /** The selected records. To cancel selection, use an empty array. */
    records: DataRecord[];
    constructor(widgetId: string, records: DataRecord[]);
}
/**
 * The `ExtentChangeMessage` uses the `widgetId` and the `MessageType` and the provides
 * the [`Extent`](https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html)
 * when the `MessageType` is 'EXTENT_CHANGE'. This message is used when needing to implement a workflow
 * upon a change of extent. Other widgets within an experience may subscribe to this message and implement
 * an update workflow when the message is received.
 */
export declare class ExtentChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    /** The extent, which is the main content of the extent change message. */
    extent: __esri.Extent;
    private relatedWidgetIds?;
    constructor(widgetId: string, extent: __esri.Extent);
    setRelatedWidgetIds(widgetIds: string[]): void;
    getRelatedWidgetIds(): string[];
    addRelatedWidgetId(widgetId: string): void;
}
/**
 * The `DataSourceFilterChangeMessage` uses the `widgetId` and `MessageType` when `MessageType` is 'DATA_SOURCE_FILTER_CHANGE'.
 * This message is used when a widget needs to announce its changes on data source filter to other widgets.
 * For example: Map widget is triggered by Filter widget to zoomTo current features.
 */
export declare class DataSourceFilterChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    /** The id of the data source. */
    dataSourceId: string;
    constructor(widgetId: string, dataSourceId: string);
}
/**
 * The `RecordSetChangeType` provides three types of a record set change: `CREATE`, `UPDATE` and `REMOVE`.
 * This can be used whenever a workflow involves reliance on a change to record set(s). It is also used in
 * the `DataRecordSetChangeMessage`.
*/
export declare enum RecordSetChangeType {
    Create = "CREATE",
    Update = "UPDATE",
    Remove = "REMOVE"
}
/**
 * The `DataRecordSetChangeMessage` uses the widget's id `widgetId`, the `MessageType` `DATA_RECORD_SET_CHANGE` message,
 * the id of the record set `dataRecordSetId`, the record set's change type `RecordSetChangeType` (`CREATE`,
 * `UPDATE` or `REMOVE`), and, optionally, the record set `DataRecordSet`. This message is used when
 * needing to implement a workflow upon the creation, update or removal of a record set. Other widgets may
 * need to subscribe to this message whenever a workflow involves reliance on a change to record set(s).
 */
export declare class DataRecordSetChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    /** The id of the record set. */
    dataRecordSetId: string;
    /** The record set change type. */
    changeType: RecordSetChangeType;
    /** The optional record set. */
    dataRecordSet?: DataRecordSet;
    constructor(widgetId: string, featureSetId: string, changeType: RecordSetChangeType, featureSet?: DataRecordSet);
}
/**
 * The `LocationChangeMessage` uses the widget's id `widgetId`, the `MessageType` `LOCATION_CHANGE` message,
 * the location `point`. This message is used when a widget needs to announce its changes on location to other widgets.
 * For example: Map widget publishes this message when user click on the map.
 * Note: When user clicks on features, the map widget publishes both LocationChangeMessage and DataRecordsSelectionChangeMessage.
 *    If use does not click on feature, the map widget publishes the LocationChangeMessage only.
 */
export declare class LocationChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    point: IPoint;
    constructor(widgetId: string, point: IPoint);
}
/** @ignore */
export declare class SelectDataRecordMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataSourceId: string;
    recordId: string;
    constructor(widgetId: string, dataSourceId: string, recordId: string);
}
/**
 * The interface for all message actions. Message action executes when a matched message is received.
 */
export interface MessageAction {
    /**
     * The unique id of the action. For actions provided by a widget, the id is: widgetId + actionName.
     */
    id: string;
    /** The action name. */
    name?: string;
    /** The action label. To support i18n, use `_action_${actionName}` as the string key. */
    label: string;
    /**
     * The widget id that provides the action. If a widget id is not provided, the action is provided by the Jimu framework.
  
     */
    widgetId?: string;
    /**
     * This indicates whether or not the type of message can trigger the filter message action.
     * This method is used in builder to filter the available actions.
     * @param messageDescription
     */
    filterMessageDescription: (messageDescription: MessageDescription) => boolean;
    /**
     * This indicates whether a specific message can trigger the filter message action.
     * This method is used to filter messages in the message manager.
     */
    filterMessage: (message: Message) => boolean;
    /**
     * The execution of the action when the message is matched.
     * @param message
     * @param actionConfig
     */
    onExecute: (message: Message, actionConfig?: any) => Promise<boolean> | boolean;
    /**
     * This returns the action setting component uri. The returned value should match the
     * `settingUri` from the widget manifest. If no setting is required, `null` is returned.
     *
     * This method is required for framework actions but optional for widget actions.
     *
     * This setting component is used to configure the action according to the message.
     */
    getSettingComponentUri?: (messageType: MessageType, messageWidgetId?: string) => string;
    /**
     * When a widget is removed, actions provided by this widget will be destroyed.
     */
    destroy: () => void;
    /**
     * When an action is removed from a message's listener, this function will be invoked.
     */
    onRemoveListen: (messageType: MessageType, messageWidgetId?: string) => void;
}
/** @ignore */
export interface ActionSettingProps<T> {
    actionId: string;
    widgetId: string;
    messageWidgetId: string;
    config?: T;
    messageType: MessageType;
    intl?: IntlShape;
    onSettingChange: ActionSettingChangeFunction;
    onDisableDoneBtn?: (isDisable: boolean) => void;
}
/** @ignore */
export declare type ActionSettingChangeFunction = (settingOptions: ActionSettingOptions) => void;
/** @ignore */
export interface ActionSettingOptions {
    actionId: string;
    config: any;
}
/** @ignore */
export interface MessageActionConstructorOptions {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
}
/** @ignore */
export interface RegisterMessageActionOptions {
    id: string;
    name?: string;
    uri?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummyMessageAction;
    appConfig?: AppConfig;
}
/**
 * The abstract base class for `MessageAction`. To create a custom message action, extend from this class.
 */
export declare abstract class AbstractMessageAction implements MessageAction {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
    static versionManager: BaseVersionManager;
    constructor(options: MessageActionConstructorOptions);
    destroy(): void;
    onRemoveListen(messageType: MessageType, messageWidgetId?: string): void;
    abstract filterMessageDescription(messageDescription: MessageDescription): boolean;
    abstract filterMessage(message: Message): boolean;
    abstract onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
/**
 * This class is used for type check.
 */
/** @ignore */
export declare class DummyMessageAction extends AbstractMessageAction {
    filterMessageDescription(messageDescription: MessageDescription): boolean;
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
