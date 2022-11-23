import { AppInfo } from '../types/app-info';
export declare function initPortalSelf(portalUrl: string): Promise<any>;
export declare function clearPortalSelf(): void;
export declare function getAppInfo(appId?: string): Promise<AppInfo>;
export declare function removeAppInfo(appId: string): void;
