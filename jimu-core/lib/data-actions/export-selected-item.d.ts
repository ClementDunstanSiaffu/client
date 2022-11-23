import * as React from 'react';
import { DataActionOptions } from '../base-data-action';
import { ExportToItemBase } from './export-item-base';
import { DataRecordSet } from '../data-sources/data-source-interface';
export default class ExportSelectedToItem extends ExportToItemBase {
    isSupported(dataSet: DataRecordSet): Promise<boolean>;
    onExecute(dataSet: DataRecordSet, options?: DataActionOptions): Promise<boolean | React.ReactElement>;
    handleConfirm(name: string, folderId: string, dataSet: DataRecordSet): Promise<boolean>;
}
