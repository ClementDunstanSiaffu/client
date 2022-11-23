import { DataAction, RegisterDataActionOptions } from './base-data-action';
import { DataSource, DataRecord } from './data-sources/data-source-interface';
import { IMWidgetJson } from './types/app-config';
import { ImmutableArray } from 'seamless-immutable';
export default class DataActionManager {
    static instance: DataActionManager;
    static getInstance(): DataActionManager;
    private actions;
    private actionClassPromises;
    getActions(): DataAction[];
    getSupportedActions(widgetId: string, dataSource: DataSource, records?: DataRecord[]): Promise<{
        [key: string]: DataAction[];
    }>;
    /**
     *
     * @param actionIdentify format is `${widgetName}.${actionName}`
     * @param excludedActions
     */
    isActionExcluded(actionIdentify: string, excludedActions?: string[] | ImmutableArray<string>): boolean;
    registerWidgetActions(widgetJson: IMWidgetJson): Promise<DataAction[]>;
    registerAction(options: RegisterDataActionOptions): Promise<DataAction>;
    destroyWidgetActions(widgetId: string): void;
    getActionsByWidgetId(widgetId: string): DataAction[];
    private loadActionClass;
    private testActionSupportData;
}
