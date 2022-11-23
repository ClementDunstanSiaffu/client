import { AbstractDataAction, DataActionOptions } from '../base-data-action';
import { DataRecord, DataRecordSet } from '../data-sources/data-source-interface';
export declare abstract class ExportSelectedBase extends AbstractDataAction {
    isSupported(dataSet: DataRecordSet): Promise<boolean>;
    getRecords(dataSet: DataRecordSet, options?: DataActionOptions): Promise<DataRecord[]>;
}
