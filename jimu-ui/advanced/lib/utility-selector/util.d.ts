import { SupportedUtilityType } from 'jimu-core';
export declare function getLabelOfUrl(url: string): string;
export declare function isUtilityMatch(item: {
    url: string;
    label: string;
    type: SupportedUtilityType;
}, serviceType: SupportedUtilityType, keyword?: string, pattern?: RegExp): boolean;
export declare function getServiceInfo(url: string): Promise<any>;
export declare function checkServiceType(url: string): Promise<SupportedUtilityType>;
