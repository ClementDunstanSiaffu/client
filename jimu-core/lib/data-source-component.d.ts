import * as React from 'react';
import { IMDataSourceInfo } from './types/state';
import { DataSource, QueryParams, QueryScope } from './data-sources/data-source-interface';
import DataSourceManager from './data-source-manager';
import { IMDataSourceJson, IMDataSourceSchema, IMUseDataSource } from './types/app-config';
import { AppMode } from './types/common';
export declare type DataRenderFunction = (ds: DataSource, info: IMDataSourceInfo, query: QueryParams) => React.ReactNode;
/**
 * For `needRefresh`, require query only when the changed data source is the directly used data source.
 * If `needRefresh` of belong-to data source changes, won't require query.
 */
declare const RequireQueryDataSourceInfoChange: readonly ["widgetQueries", "sourceVersion", "gdbVersion", "needRefresh"];
/**
 * Data source info which requires widgets to do query to refresh themselves.
 */
export interface QueryRequiredInfo {
    [dataSourceId: string]: Pick<IMDataSourceInfo, typeof RequireQueryDataSourceInfoChange[number]>;
}
/**
 * The DataSourceComponent component props.
 */
export interface DataSourceComponentProps {
    /**
     * Data source used by widget.
     */
    useDataSource: IMUseDataSource;
    /**
     * Pass widgetId/localId if need to execute the query.
     *
     * For main data source or data view, please use widgetId.
     * For local data source, please use localId. The recommended localId is: widgetId + ???
     */
    widgetId?: string;
    localId?: string;
    /**
     * Whether query record count when query data records.
     */
    queryCount?: boolean;
    /**
     * Increment `forceRefreshVersion` to force data source to load even if the query parameter does not change.
     * Please note, all widgets using the data source will refresh, too.
     */
    forceRefreshVersion?: number;
    /**
     * Query parameters of queriable data source.
     * The component does not execute a query without query property.
     * To execute a query without adding new filter, please use an empty object: {}.
     */
    query?: QueryParams;
    queryScope?: QueryScope;
    /**
     * If one of your children component's render depends on data source, please use this render function.
     * Otherwise, even if the data record in the data source is changed, your children will not be re-rendered
     * unless you connect the data source info in the children owner component to re-render the owner component.
     *
     * See here for the difference between parent and owner context: https://gist.github.com/jimfb/0eb6e61f300a8c1b2ce7.
     */
    children?: DataRenderFunction | React.ReactNode;
    /**
     * Data source info changing will call the function.
     */
    onDataSourceInfoChange?: (info: IMDataSourceInfo, preInfo?: IMDataSourceInfo) => void;
    /**
     * Widgets may not pass in `query` props to load records into data source instance.
     * In this case, widgets still need to listen to data source changes to refresh themselves.
     * This callback is triggered whenever the data source properties such as filters or gdbVersion change.
     * For example, adding a filter to data source will trigger the callback and selecting a record won't.
     *
     * Please note this callback will be valid only when the `query` prop is not used.
     */
    onQueryRequired?: (queryRequiredInfo: QueryRequiredInfo, preQueryRequiredInfo?: QueryRequiredInfo) => void;
    /**
     * If data source schema is changed, will call the function.
     */
    onDataSourceSchemaChange?: (schema: IMDataSourceSchema, prevSchema?: IMDataSourceSchema) => void;
    /**
     * If one data source is used by mutiple widgets, every widget will receive the onDataSourceCreated callback.
     */
    onDataSourceCreated?: (ds: DataSource) => void;
    /**
     * Failing to create data source will call the function.
     */
    onCreateDataSourceFailed?: (err: any) => void;
}
interface DataSourceComponentStateProps {
    dataSource: DataSource;
    dataSourceInfo: IMDataSourceInfo;
    dataSourceJson: IMDataSourceJson;
    dataSourceSchema: IMDataSourceSchema;
    rootDataSourceJson?: IMDataSourceJson;
    dataSourceManager: DataSourceManager;
    belongToDataSourceInfo?: IMDataSourceInfo;
    belongToBelongToDataSourceInfo?: IMDataSourceInfo;
    appMode: AppMode;
}
declare type AllProps = DataSourceComponentProps & DataSourceComponentStateProps;
declare class DataSourceComponentInner extends React.PureComponent<AllProps, unknown, unknown> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: AllProps): void;
    render(): React.ReactNode;
    doQuery(): void;
    handleAutoRefresh(): void;
    createDataSource(): void;
    private getChangedQueryRequiredInfo;
    private setChangedInfoToResult;
    private getChangedInfo;
    private getDsAndBelongToDsIds;
}
/**
 * A react component that makes data source easy to use.
 * In most cases, you can pass in `useDataSource` and `query`, and render the query result by using
 * a render function as a child component. The query result records are put into data source `records` property
 * (Internally, it calls `load()` method).
 */
export declare const DataSourceComponent: import("react-redux").ConnectedComponent<typeof DataSourceComponentInner, import("react-redux").Omit<React.ClassAttributes<DataSourceComponentInner> & DataSourceComponentProps & DataSourceComponentStateProps, "dataSource" | "appMode" | "dataSourceJson" | "dataSourceManager" | "dataSourceInfo" | "dataSourceSchema" | "rootDataSourceJson" | "belongToDataSourceInfo" | "belongToBelongToDataSourceInfo"> & DataSourceComponentProps>;
export default DataSourceComponent;
