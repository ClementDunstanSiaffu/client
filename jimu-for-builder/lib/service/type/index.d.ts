import { IItem } from '@esri/arcgis-rest-types';
import { IItemAdd } from '@esri/arcgis-rest-portal';
export interface requestMethodProvider {
    requestMethodProvider: (restPortalRequestName: string, localRequestName?: string, appInfo?: AppInfo) => any;
}
export declare enum SearchType {
    AGOL = "AGOL",
    Portal = "Portal",
    Other = "Other"
}
export declare enum AppType {
    TemplateType = "Web Experience Template",
    ExperienceType = "Web Experience"
}
export declare enum PublishStatus {
    Published = "Published",
    Draft = "Draft",
    Changed = "Changed"
}
export interface AppInfo extends IItem {
    id: string;
    type: AppType;
    name?: string;
    text?: any;
    username?: string;
    thumbnail?: string;
    isLocalApp?: boolean;
    portalUrl?: string;
}
export interface ImportAppOption extends IItemAdd {
    appZip: any;
}
