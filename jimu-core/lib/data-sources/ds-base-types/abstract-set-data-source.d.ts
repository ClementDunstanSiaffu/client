import { AbstractDataSource } from './abstract-data-source';
import { DataSource } from '../data-source-interface';
/**
 * @ignore
 */
export declare abstract class AbstractSetDataSource extends AbstractDataSource implements DataSource {
    isDataSourceSet: boolean;
    protected childDataSourcesPromise: Promise<DataSource[]>;
    protected abstract createChildDataSources(): Promise<DataSource[]>;
    ready(): Promise<DataSource[]>;
    destroy(): void;
    getChildDataSourceId(jimuChildId: string): string;
    getChildDataSources(): DataSource[];
    getAllChildDataSources(): DataSource[];
    getChildDataSource(jimuChildId: string): DataSource;
    getJimuChildId(childId: string): string[];
}
