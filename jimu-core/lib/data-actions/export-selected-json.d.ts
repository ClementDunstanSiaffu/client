import { ExportSelectedBase } from './export-selected-base';
import { DataRecordSet } from '../data-sources/data-source-interface';
import { DataActionOptions } from '../base-data-action';
export default class ExportSelectedJson extends ExportSelectedBase {
    onExecute(dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean>;
}
