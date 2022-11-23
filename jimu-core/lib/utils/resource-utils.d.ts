import { AppConfig } from '../types/app-config';
export interface ReplaceOperator {
    matchFunction: any;
    matchHandle: any;
}
export declare function getRealAppResourceUrl(): string;
/**
 * Remove portal info to resource, append for the main portal only.
 */
export declare function appendPortalInfoToResource(appConfig: AppConfig, token: string): AppConfig;
/**
 * Remove portal info from resource, remove for the main portal only.
 */
export declare function cleanPortalInfoFromResource(appConfig: AppConfig): AppConfig;
