import { AbstractDataAction } from '../base-data-action';
import { DataSource, QueriableDataSource, DataRecord, DataRecordSet } from '../data-sources/data-source-interface';
export declare abstract class ExportBase extends AbstractDataAction {
    isSupported(dataSet: DataRecordSet): Promise<boolean>;
    checkPrivilege(): Promise<boolean>;
    confirm(dataSource: DataSource, records: DataRecord[]): Promise<{
        needed: boolean;
        content?: {
            title: string;
            content: string;
            okLabel: string;
            cancelLabel: string;
        };
    }>;
    getRecords(dataSource: DataSource, fields?: string[], returnGeometry?: boolean): Promise<DataRecord[]>;
    tryCreateReplica(dataSource: QueriableDataSource, format: string): Promise<string>;
    private query;
}
