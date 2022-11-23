import { DataRecordSet } from '../data-sources/data-source-interface';
import { ExportSelectedBase } from './export-selected-base';
import { DataActionOptions } from '../base-data-action';
export default class ExportSelectedCSV extends ExportSelectedBase {
    onExecute(dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean>;
}
