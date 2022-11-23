import { SceneLayerDataSource, FeatureLayerDataSource, UseDataSource, IMWidgetJson, JimuFieldType, ImmutableArray, DataSourceSchema, DataSourceJson, FieldSchema } from 'jimu-core';
import { SearchDataConfig, AddressFields } from '../type/type';
interface AddressFieldSchameResult {
    addressFieldsSchema: FieldSchema[];
    defaultAddressFieldName: string;
}
export declare const ObjectIdSchema: {
    jimuName: string;
    alias: string;
    type: JimuFieldType;
    name: string;
};
/**
 * Get outputDs default schema
*/
export declare const getInitSchema: (label?: string, addressFields?: FieldSchema[]) => DataSourceSchema;
export declare const getNameOfDefaultAddressField: (fields: FieldSchema[], nameIndex?: number) => string;
export declare const getAddressFieldsSchemaAndDefaultFieldName: (addressFields?: AddressFields[]) => AddressFieldSchameResult;
/**
 * Get outputDs json
*/
export declare const getInitOutDataSource: (widgetId: string, configId: string, geocodeUrl: string, label?: string) => DataSourceJson;
export declare const getOutputJsonOriginDs: (ds: SceneLayerDataSource | FeatureLayerDataSource) => FeatureLayerDataSource;
export declare const getWhetherDsInUseDataSources: (ds: UseDataSource, useDataSources: ImmutableArray<UseDataSource>) => boolean;
export declare const isDsInDatasources: (datasource: UseDataSource, datasources: UseDataSource[]) => boolean;
export declare const checkIsUseDsChenged: (datasource: UseDataSource[], preDatasources: UseDataSource[]) => boolean;
/**
 * Check is useDatasource or outputDatasource chenged in widgeJson
*/
export declare const checkIsWidgetJsonDsChanged: (widgetJson: IMWidgetJson, useDataSource: UseDataSource[], outputDatasource: string[]) => boolean;
/**
 * Get congfig id list
*/
export declare const getConfigIdList: (datasourceConfig: SearchDataConfig[]) => string[];
/**
 * Get new datasource config id
*/
export declare const getNewConfigId: (configIdList: string[]) => string;
export declare const getOutputDataSourceId: (configId: string, widgetId: string) => string;
export {};
