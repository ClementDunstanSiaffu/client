import { AbstractDataSource } from '../ds-base-types';
import { DataRecord, SimpleLocalDataSource, DataSourceTypes } from '../data-source-interface';
/**
 * @ignore
 */
export declare class SimpleLocalDataSourceImpl extends AbstractDataSource implements SimpleLocalDataSource {
    type: DataSourceTypes.SimpleLocal;
    updateRecoreds(records: DataRecord[]): void;
    addRecord(record: DataRecord): Promise<DataRecord>;
    updateRecord(record: DataRecord): Promise<boolean>;
    deleteRecord(index: number): Promise<boolean>;
}
