import * as React from 'react';
import { ExportBase } from './export-base';
import { DataSource, DataRecordSet } from '../data-sources/data-source-interface';
import { DataActionOptions } from '../base-data-action';
export default class ExportJson extends ExportBase {
    onExecute(dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean | React.ReactElement>;
    doExport(dataSource: DataSource, fields?: string[]): Promise<boolean>;
}
