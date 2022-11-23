import { DataSource, DataSourceConstructorOptions } from './data-sources/data-source-interface';
import { IMDataSourceJson, IMDataSourceSchema, IMUseDataSource } from './types/app-config';
import { ImmutableObject } from 'seamless-immutable';
/**
 * The `DataSourceManager` is used to manage data source, including create/get/destroy data source instance.
 * Please always use `DataSourceManager.getInstance()` to use this class. For example, to get a data source, you can use `DataSourceManager.getInstance().getDataSource(dsId)`.
 * For widget developer, `DataSourceManager.getInstance()` return the same instance for both widget and widget's settings.
 *
 * To use data source, the recommended way is to use `DataSourceComponent`, which is more handy.
 */
export declare class DataSourceManager {
    private static instance;
    static getInstance(): DataSourceManager;
    constructor();
    private dataSources;
    private dataSourcesCreatePromise;
    private dataSourceFactories;
    getDataSource(dsId: string): DataSource;
    getDataViewDataSource(mainDsId: string, dataViewId: string): DataSource;
    getDataSources(): {
        [dsId: string]: DataSource;
    };
    getDataSourcesAsArray(): DataSource[];
    setDataSource(dsId: string, ds: DataSource): void;
    destroyAllDataSources(): void;
    destroyDataSource(dsId: string): void;
    /**
     * @ignore
     * Return the data sources that are configured in ds setting.
     */
    getConfiguredDataSources(): DataSource[];
    /** @ignore */
    getWidgetGeneratedDataSources(): {
        [widgetId: string]: DataSource[];
    };
    /**
     * Return the successfully created data sources only.
     * For the failed created data sources, return null.
     */
    createAllDataSources(): Promise<DataSource[]>;
    /** Create all data views in the data source. */
    private createDataViews;
    /**
     * This method is used to create data source instance. Main data source, data view or local data source are created as data source instance.
     *
     * The parameter can be a data source id, data source config JSON or `DataSourceConstructorOptions`.
     *
     * If pass in `dataViewId`, this method will create a data view.
     * If pass in `dataViewId` and `localId`, this method will create a local data view.
     * If pass in `localId`, this method will create a local data source.
  
     * To create a main data source instance, this method do the followings:
     *   * Create the data source object.
     *   * Call the object's `ready()` method.
     *   * Call the object's `fetchSchema()` method.
     *
     * When start to create the data source instance, this method will set the data source instanceStatus as `NotCreated` at first.
     * The instanceStatus will be set as `Created` when the creation process is done. The instanceStatus will be set as `CreateError` if an error occurs.
     */
    createDataSource(mainDataSourceId: string, dataViewId?: string, localId?: string): Promise<DataSource>;
    createDataSource(dsJson: IMDataSourceJson, dataViewId?: string, localId?: string): Promise<DataSource>;
    createDataSource(options: DataSourceConstructorOptions): Promise<DataSource>;
    createDataView(mainDataSource: DataSource, dataViewId: string): DataSource;
    createLocalDataSource(belongToDataSource: DataSource, localId: string): DataSource;
    /**
     *
     * @param ds can be data source or data view.
     */
    private afterCreate;
    getDataViewDataSourceId(mainDataSourceId: string, dataViewId: string): string;
    getLocalDataSourceId(belongToDataSourceId: string, localId: string): string;
    /**
     * Create data source according to the used data source info, and will create a local data source if localId is passed in.
     */
    createDataSourceByUseDataSource(useDs: IMUseDataSource, localId?: string): Promise<DataSource>;
    /** @ignore */
    createOriginDataSources(dataSourceJson: IMDataSourceJson): Promise<void>;
    /** @ignore */
    initSchema(dataSource: DataSource, fetchedSchema: IMDataSourceSchema): void;
    /** @ignore */
    mergeSchema(dataSource: DataSource, configedSchema: IMDataSourceSchema, fetchedSchema: IMDataSourceSchema): IMDataSourceSchema;
    private mergeOneSchema;
    private getDataSourceFactory;
    private getDataSourceFactoryUri;
    private getDataSourceFactorySync;
    private createDataSourceObj;
    private createDataViewObj;
    private createLocalDataSourceObj;
    protected getAppConfig(): ImmutableObject<import("./types/app-config").AppConfig>;
    private onStoreChange;
    /**
     * @ignore
     * This method updates data source instance by data source json.
     * It is used in two ways,
     * 1. DataSourceManager listens store changes and uses this method to update data source instance by data source json of app config.
     * 2. Some components (e.g. DataViewSettingPopup) may use this method to update local data source instance by custom data source json.
     *
     * Now, the method is only used in builder, we do not recommend change data source json in app (runtime).
     */
    updateDataSourceByDataSourceJson(dsObj: DataSource, dsJson: IMDataSourceJson): void;
}
/**
 * @ignore
 */
export default DataSourceManager;
