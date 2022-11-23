import { IRequestOptions, IParams } from '@esri/arcgis-rest-request';
import { AppCreationInfo, AppConfig, IMAppConfig } from 'jimu-core';
import { ISearchOptions, ISharingResponse, IMoveItemOptions, IMoveItemResponse, IGetUserTagsResponse, IGroup, SearchQueryBuilder, ISearchResult, IItemResourceOptions, IItemResourceResponse, IGetItemResourceOptions } from '@esri/arcgis-rest-portal';
import { AppInfo, SearchType, ImportAppOption } from '../type';
import { IItemUpdate } from '@esri/arcgis-rest-types';
/**
 * Create app by portal template/AGOL template/local template
 * folderId: If the folderId has a value, the app will be created in the folder corresponding to the folderId
*/
export declare function createAppByItemTemplate(appInfo: AppInfo, folderId?: string): Promise<string>;
/**
 * Create app with template id, such as: xxx.com/builder/?template=id
*/
export declare function createAppByTemplateId(templateId: string): Promise<string>;
/**
 *Create app by default template defined in the code
 *title: The translated string of 'Untitled experience'
 *lable: The default template's name
 *folderId: If the folderId has a value, the app will be created in the folder corresponding to the folderId
 */
export declare function createAppByDefaultTemplate(title: string, templateName: string, folderId?: string, webmapId?: string, websceneId?: string): Promise<AppInfo>;
/**
 * folderId: If the folderId has a value, the template will be created in the folder corresponding to the folderId
*/
export declare function createTemplateByApp(appInfo: AppInfo, folderId?: string): Promise<string>;
export declare function importItem(importAppOption: ImportAppOption): Promise<import("@esri/arcgis-rest-portal").IUpdateItemResponse>;
export declare function importAppFromPortal(portalAppInfo: AppInfo): Promise<any>;
/**
 * folderId: If the folderId has a value, the app will be created in the folder corresponding to the folderId
*/
export declare function duplicateApp(appInfo: AppInfo, folderId?: string, isNotUpdateNewAppTitle?: boolean): Promise<string>;
/**
 * folderId: If the folderId has a value, the app will be created in the folder corresponding to the folderId
*/
export declare function saveAsApp(originAppInfo: AppInfo, newAppUpdateInfo: AppInfo, folderId?: string, thumbnailFiles?: any): Promise<string>;
export declare function getAppConfig(appInfo: AppInfo): Promise<any>;
export declare function searchApp(searchOption: ISearchOptions, searchType: SearchType): Promise<ISearchResult<AppInfo>>;
export declare function getAppInfo(appInfo: AppInfo): Promise<AppInfo>;
export declare function updateAppInfo(itemParam: IItemUpdate): Promise<void>;
export declare function updateAppThumbnail(itemParam: IItemUpdate, owner?: string): Promise<void>;
export declare function deleteApp(appId: string): Promise<{
    itemId: string;
    success: boolean;
}>;
export declare function saveApp(appInfo: AppInfo, appConfig: IMAppConfig): Promise<void>;
export declare function publishApp(appInfo: AppInfo): Promise<void>;
export declare function getFolders(requestOption: IParams): Promise<any>;
export declare function addToFavorites(params: IParams): Promise<ISharingResponse>;
export declare function removeFromFavorites(params: IParams): Promise<ISharingResponse>;
export declare function getAppGroups(params: IParams): Promise<ISharingResponse>;
export declare function changeAppFolder(params: IMoveItemOptions): Promise<IMoveItemResponse>;
export declare function getUserTags(username: string): Promise<IGetUserTagsResponse>;
export declare function searchGroups(requestOptions: ISearchOptions | SearchQueryBuilder): Promise<ISearchResult<IGroup>>;
export declare function getDefaultTemplateConfig(appInfo: AppCreationInfo): Promise<AppConfig>;
export declare function removeAppResource(requestOptions: IItemResourceOptions): Promise<{
    success: boolean;
}>;
export declare function addAppResource(requestOptions: IItemResourceOptions): Promise<IItemResourceResponse>;
export declare function getAppResources(appInfo: AppInfo, requestOptions?: IRequestOptions): Promise<any>;
export declare function getAppResource(appInfo: AppInfo, requestOptions?: IGetItemResourceOptions): Promise<any>;
export declare function updateAppResource(requestOptions: IItemResourceOptions): Promise<IItemResourceResponse>;
