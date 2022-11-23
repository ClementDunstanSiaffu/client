import { AbstractDataSource } from './abstract-data-source';
import { LoadableDataSource, DataRecord } from '../data-source-interface';
/** @ignore */
export declare abstract class AbstractLoadableDataSource extends AbstractDataSource implements LoadableDataSource {
    load(): Promise<DataRecord[]>;
    abstract doLoad(): Promise<DataRecord[]>;
}
