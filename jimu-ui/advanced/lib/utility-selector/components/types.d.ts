import { SupportedUtilityType, OrgGeocodeSetting, OrgPrintSetting } from 'jimu-core';
export interface UtilityTreeItem {
    id: string;
    label: string;
    type: SupportedUtilityType;
    name?: string;
    index?: number;
    url?: string;
    rootId?: string;
    task?: string;
    children?: UtilityTreeItem[];
    setting?: OrgGeocodeSetting | OrgPrintSetting;
}
export declare const predefinedOrgUtilities: ({
    name: string;
    label: string;
    type: SupportedUtilityType;
    dynamic?: undefined;
} | {
    name: string;
    label: string;
    dynamic: boolean;
    type: SupportedUtilityType;
})[];
