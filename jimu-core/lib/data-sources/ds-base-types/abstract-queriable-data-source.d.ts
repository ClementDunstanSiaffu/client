import { IMDataViewJson } from 'jimu-core';
import { AbstractDataSource } from './abstract-data-source';
import { QueriableDataSource, DataSourceConstructorOptions, QueryOptions, QueryResult, DataRecord, QueryParams, IMQueryParams, WidgetDataSourcePair } from '../data-source-interface';
export declare abstract class AbstractQueriableDataSource extends AbstractDataSource implements QueriableDataSource {
    lastUpdateTime: Date;
    private lastQueryId;
    private lastQueryParams;
    private lastCountQueryParams;
    private lastRefreshTime;
    /**
     * Data will be cached here, not this.records.
     *
     * When selectRecordById, some selected records may be put in this.records, so they are not in the pages.
     */
    private pages;
    private pagePromises;
    /**
     * Promises to load missing fields for every page.
     * The promises contain a specail page (its id is variable SELECTION_DATA_VIEW_ID), it is the promise to load missing fields for source records of selection view.
     */
    private loadMissingFieldsByPagePromises;
    private loadMissingFieldsForAllPagePromise;
    private countPromise;
    private byIdPromise;
    private autoRefreshHandle;
    private _count;
    /**
     * Will call this function after the first time widget/components call `setSourceRecords`.
     */
    private onceSetSourceRecords;
    private readonly throttleQueryRecordsByIdWithCurrentQueryParams;
    /**
     * Pending promise which is used to query selected records preset before data source is ready.
     * E.g. selected record id in URL.
     */
    private pendingPromiseToQuerySelectedRecordsPresetBeforeDsReady;
    constructor(options: DataSourceConstructorOptions);
    ready(): Promise<any>;
    getCurrentQueryParams(excludeOption?: WidgetDataSourcePair): any;
    getRuntimeQueryParams(excludeWidgetId?: string): QueryParams;
    private getCurrentQueryParamsByQuery;
    private getMergedWidgetQueries;
    getCurrentQueryId(): string;
    getRealQueryParams(query: QueryParams, flag: 'query' | 'load', options?: QueryOptions): QueryParams;
    /**
     * the data source's query is a data view config as well.
     *  */
    protected getDataViewConfig(): IMDataViewJson;
    private mergeQueryWithConfigQuery;
    updateQueryParams(query: QueryParams, widgetId: string): void;
    getQueryPageSize(): number;
    getMaxRecordCount(): number;
    private getQueryWithoutPage;
    private checkClearLocalCache;
    getRecordsByPage(page: number, pageSize: number): DataRecord[];
    getRecordsByPageWithSelection(page: number, pageSize: number): DataRecord[];
    getPagesData(): {
        [page: number]: DataRecord[];
    };
    setPagesData(pages: {
        [page: number]: DataRecord[];
    }): void;
    clearRecordsNotAddVersion(): void;
    /**
     * get continuious page records
     */
    getRecords(): DataRecord[];
    setRecords(records: DataRecord[]): void;
    setSourceRecords(records: DataRecord[]): void;
    get count(): number;
    set count(c: number);
    getRealQueryPages(page: number, pageSize: number): number[];
    /**
     * the page/pageSize in query will not be used in the actual query
     */
    load(query: QueryParams, options?: QueryOptions): Promise<DataRecord[]>;
    /**
     * Check and load missing fields for loaded records.
     */
    private loadMissingFields;
    /**
     * Keep selection after data source or data view is loaded.
     */
    private handleSelectionAfterLoad;
    /**
     * the resolved boolean means whether the query result is used (only the last query update records)
     * @param realQuery
     * @param page
     */
    private loadByPage;
    private loadMissingFieldsByPage;
    private missingSomeFields;
    /**
     * Compare usedFields with loadedFields, find out the fields which are in usedFields but are not in loadedFields.
     */
    private findMissingFields;
    loadCount(query: QueryParams, options?: QueryOptions): Promise<number>;
    query(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;
    queryCount(query: QueryParams, options?: QueryOptions): Promise<QueryResult>;
    loadById(id: string, refresh?: boolean): Promise<DataRecord>;
    queryById(id: string): Promise<DataRecord>;
    getAutoRefreshInterval(): number;
    getLastRefreshTime(): Date;
    startAutoRefresh(): void;
    stopAutoRefresh(): void;
    setNeedRefresh(needRefresh: boolean): void;
    getMainDataSource(): QueriableDataSource;
    getDataViews(): QueriableDataSource[];
    getDataView(dataViewId: string): QueriableDataSource;
    updateSelectionInfo(ids: string[], triggerDataSource: QueriableDataSource, forceCheck?: boolean): void;
    private changeSelectedRecordIdsOfDsInfo;
    private queryRecordsByIdWithCurrentQueryParams;
    protected deleteOneLoadedRecordById(ds: QueriableDataSource, id: string): void;
    setOnceSetSourceRecords(func: () => void): void;
    abstract getConfigQueryParams(): QueryParams;
    abstract getRemoteQueryParams(): QueryParams;
    abstract mergeQueryParams(...queries: QueryParams[]): QueryParams;
    abstract allowToExportData(): Promise<boolean>;
    /**
     * Apply used fields to query params to only load the fields which are used by widgets/components.
     */
    abstract applyUsedFields(query: QueryParams, usedFields: string[] | '*'): QueryParams;
    /**
     * Origin query is the query params which is passed to `query` / `load` method.
     * Real query is the result of merging origin query and other configured queries.
     * In the merging process, some query params may be removed due to the service capability.
     *
     * Use real query to send the query request, use origin query to get the removed query params and enhance the query result.
     */
    protected abstract doQuery(realQuery: IMQueryParams, originQuery: IMQueryParams): Promise<QueryResult>;
    protected abstract doQueryCount(realQuery: IMQueryParams): Promise<QueryResult>;
    protected abstract doQueryById(id: string): Promise<DataRecord>;
}
