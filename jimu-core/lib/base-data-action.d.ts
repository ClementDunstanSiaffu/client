import React from 'react';
import { IntlShape } from 'react-intl';
import { DataRecordSet } from './data-sources/data-source-interface';
import type { IconResult } from './types/app-config';
export interface DataActionOptions {
    dataName?: string;
    actionConfig?: any;
}
export interface DataAction {
    /**
     * the unique id
     */
    id: string;
    index?: number;
    name?: string;
    label?: string;
    icon?: IconResult | string;
    /**
     * The widget id that provides the action.  No widget id means the actions is provide by jimu.
     */
    widgetId?: string;
    destroy: () => void;
    isSupported: (dataSet: DataRecordSet) => Promise<boolean>;
    onExecute: (dataSet: DataRecordSet, options?: DataActionOptions) => Promise<boolean | React.ReactElement>;
}
export interface DataActionConstructorOptions {
    id: string;
    name?: string;
    label?: string;
    icon?: string;
    index?: number;
    widgetId?: string;
}
export interface RegisterDataActionOptions {
    id: string;
    name?: string;
    uri?: string;
    icon?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummnyDataAction;
}
export interface DataActionSettingProps<T> {
    widgetId: string;
    actionName: string;
    config?: T;
    intl?: IntlShape;
    onSettingChange: (confit: T) => void;
}
export declare abstract class AbstractDataAction implements DataAction {
    /**
     * The unique id
     */
    id: string;
    name: string;
    label: string;
    index: number;
    /**
     * The widget id that provides the action
     */
    widgetId: string;
    icon?: IconResult | string;
    constructor(options: DataActionConstructorOptions);
    destroy(): void;
    abstract isSupported(dataSet: DataRecordSet): Promise<boolean>;
    abstract onExecute(dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean | React.ReactElement>;
}
export declare class DummnyDataAction extends AbstractDataAction {
    isSupported(dataSet: DataRecordSet): Promise<boolean>;
    onExecute(dataSet: DataRecordSet): Promise<boolean | React.ReactElement>;
}
