import { AbstractMessageAction, MessageType, Message, MessageDescription } from '../message/message-base-types';
import { UseDataSource } from '../../lib/types/app-config';
import { ImmutableObject } from '../../index';
interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: any;
    enabledDataRelationShip?: boolean;
    enableQueryWithCurrentExtent?: boolean;
}
export declare type IMConfig = ImmutableObject<Config>;
export default class Action extends AbstractMessageAction {
    name: string;
    private lastMessage;
    private lastActionConfig;
    private readonly actionQuerySQLRecord;
    filterMessageDescription(messageDescription: MessageDescription): boolean;
    filterMessage(message: Message): boolean;
    getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string;
    onRemoveListen(messageType: MessageType, messageWidgetId?: string): void;
    concatQuerySQLOfSameAction: (message: Message, actionUseDataSourceId: string) => string;
    getQuerySQLWidthOtherQuerySQL: (message: Message, actionUseDataSourceId: string, SQL: string) => string;
    onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean>;
}
export {};
