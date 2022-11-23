import { AbstractDataAction } from '../base-data-action';
import { DataSource, DataRecordSet } from '../data-sources/data-source-interface';
import { IItemAdd, ICreateItemOptions, ICreateItemResponse } from '@esri/arcgis-rest-portal';
export declare abstract class ExportToItemBase extends AbstractDataAction {
    isSupported(dataSet: DataRecordSet): Promise<boolean>;
    addItem(item: IItemAdd, auth: any, option?: Partial<ICreateItemOptions>, folderId?: string): Promise<ICreateItemResponse>;
    createItem(item: IItemAdd, dataSource: DataSource, name: string, folderId: string): Promise<string>;
    createServiceItem(dataSource: DataSource, name: string, folderId: string): Promise<string>;
    createFeacureCollectionItem(dataSet: DataRecordSet, name: string, folderId: string, useSelection?: boolean, returnGeometry?: boolean): Promise<string>;
    checkPrivilege(): Promise<boolean>;
    private checkRenderPrivilege;
    private getAllFeatureCollection;
    private query;
}
