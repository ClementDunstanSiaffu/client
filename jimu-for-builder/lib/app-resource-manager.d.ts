import { AppConfig, ResourceType, AjaxState, IconResult } from 'jimu-core';
import { IRequestOptions } from '@esri/arcgis-rest-request';
import { IGetItemResourceOptions } from '@esri/arcgis-rest-portal';
export interface ResourceItemInfo {
    /**
     * The image resource url. We can use this url fetch image file.
     * Callback url when developer used resource-component to upload file
     * eg:
     * // When fetch from server or upload to server, the url is like this:
     * '${appResourceUrl}/images/widget_1/1641535897496.png'
     *
     * // When the resource is cache in draft, the url is like this:
     * 'https://www.arcgis.com/sharing/rest/content/items/alskdhfoaug/resources/images/widget_1/1641535897496.png?token=...' or
     *
     * // When upload image and cache image resource in the local storage, the url is like this, it is blobUrl:
     * 'blob:https://......'
     */
    url?: string;
    created?: number;
    fileFormat?: string;
    fileName?: string;
    originalName?: string;
    resourcesPrefix?: string;
    size?: number;
    id?: string;
    appId?: string;
    file?: Blob | string;
    blobUrl?: string;
    resourceUrl?: string;
    type?: ResourceType;
    status?: AjaxState;
    widgetId?: string;
    owner?: string;
    promise?: Promise<any>;
    originalWidth?: number;
    originalHeight?: number;
}
export interface ImageResourceItemInfo extends ResourceItemInfo {
    width?: number;
    height?: number;
    referedIds?: string[];
    originId?: string;
    isUseCompress?: boolean;
}
export declare enum AppResourceFilePath {
    Config = "config/config.json",
    Image = "images/image-resources-list.json",
    Icon = "images/icon-resources-list.json"
}
export interface AppResourceInfo {
    access: string;
    created: number;
    resource: string;
    size: number;
}
export interface AppResourceInfoList {
    resources: AppResourceInfo[];
    nextStart?: number;
    num?: number;
    start?: number;
    total?: number;
}
export interface ImageResourceList {
    [id: string]: ImageResourceItemInfo;
}
export interface IconResource extends IconResult {
}
export interface IconResourceList {
    [id: string]: IconResource;
}
export interface ResourcesInDraft {
    imageResources?: ImageResourceList;
    iconResources?: IconResourceList;
}
/**
 * This manager is used to process the resources in the application.
 * It includes functions such as resourc processing, obtaining resources from the service, uploading resources to the
 * server, etc.
 *
 * Fetch resources api, we can get resource info list that is the name of the resource file.
 * If you want get the resource it self, you also need to use the name of the resource file to request from the server.
 * Response is like:
 * {
 *    resources: [
 *        { resource: 'config/config.json' , ...}, // This file is stored appConfig
 *        { resource: 'images/image-resources-list.json' , ...}, // This file is stored imageResources.
 *        { resource: 'images/icon-resources-list.json' , ...}, // This file is stored iconResources.
 *        { resource: 'images/widget_1/123456.jpg' , ...}, // This file is stored image itself.
 *        ...
 *    ]
 * }
 */
export declare class AppResourceManager {
    static _instance: AppResourceManager;
    static getInstance(): any;
    private resourceMap;
    private blobToResourceMap;
    private resourcesInDraft;
    static assignBlobUrlToResourceItem(resourceItemInfo: ResourceItemInfo): Promise<ResourceItemInfo>;
    static getBlobByBlobUrl(blobUrl: string): Promise<Blob>;
    static getResourcePrefix({ resourcesPrefix, widgetId, type }: {
        resourcesPrefix: any;
        widgetId: any;
        type: any;
    }): string;
    getResourcesInDraft: () => ResourcesInDraft;
    setResourcesInDraft: (resources: ResourcesInDraft) => void;
    getImageResourceListFromDraft: (appId: string) => Promise<ImageResourceList>;
    getIconResourceListFromDraft: () => Promise<IconResourceList>;
    /**
     * Filter out the image resources being used by the widget or components in the app from the image resource collection.
     * And the URL in the image resource collection can be a network link, which is the same as this.resourcesInDraft.imageResources.
     */
    getInUseImageResources: (imageResourceList: ImageResourceList) => ImageResourceItemInfo[];
    getInUseIconResources: (iconResourceList: IconResourceList) => IconResult[];
    upLoadAppConfig: (appId: string, config: AppConfig, owner: string) => Promise<AppConfig>;
    upLoadImageResourceList: (resourceList: ImageResourceList) => Promise<ImageResourceList>;
    upLoadIconResourceList: (resourceList: IconResourceList) => Promise<IconResourceList>;
    /**
     * Use this method to send a request to the server for uploading resources file.
     * Like config/config.json, images/image-resources-list.json, the blob data of images in widget and
     * the blob data of icon in icon picker.
     */
    upLoadAppResource: (resourceItemInfo: ResourceItemInfo) => Promise<any>;
    upLoadLocalResource: (config: any) => Promise<any>;
    fetchAppResourceInfoList: (appId: string, option?: IRequestOptions) => Promise<AppResourceInfoList>;
    fetchAppResource: (appId: string, option?: IGetItemResourceOptions) => Promise<any>;
    clearResources: (appId: string) => void;
    updateImageResourceItemInfo: (imageResourceItemInfo: ImageResourceItemInfo) => void;
    private addAppResource;
    private updateAppResource;
    private removeAppResource;
    private getAppId;
    private getSession;
    private getPortalUrlWithTemplate;
    private getPortalUrlWithFull;
    private setResourceMap;
    private setResourceItemInfoStatus;
    private clearResourceMap;
    /**
     * Clean resourceUrl list item without in imageResourcesInDraft. And return the remaining list.
     * @param appId May be not equal with current app id.
     * @param resourceUrlList For example: [images/widget_1/123456.jpg, ...]. Include resource url such as images' or icons'.
     * @returns
     */
    private clearValueWithoutInResourcesInDraft;
    private clearResourcesWithoutSaved;
    private formatRelatedImageResources;
    private checkResourcesUploadStatus;
    private upLoadResourceList;
}
