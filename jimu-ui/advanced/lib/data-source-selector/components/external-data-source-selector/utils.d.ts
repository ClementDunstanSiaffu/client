import { IMDataSourceJson, IntlShape, DataSource } from 'jimu-core';
export declare enum AddDataErrorCode {
    DataTypeIsNotSupported = "DATA_TYPE_IS_NOT_SUPPORTED_YET",
    ItemInaccessible = "ITEM_INACCESSIBLE",
    SceneLayerWithoutAssociatedLayer = "SCENE_LAYER_WITHOUT_ASSOCIATED_LAYER"
}
export declare function getErrorTextFromErrorCode(errorCode: AddDataErrorCode, intl: IntlShape): string;
export declare function getDsJsonFromService(url: string, dsId: string, portalUrl?: string, itemId?: string): Promise<{
    dsJson: IMDataSourceJson;
    label: string;
}>;
export declare function traverseHideChildDs(dataSource: DataSource): IMDataSourceJson;
export declare function traverseUnhideParentDs(dataSource: DataSource): IMDataSourceJson;
