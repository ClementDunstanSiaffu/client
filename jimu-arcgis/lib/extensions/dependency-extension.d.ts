import { extensionSpec, Resource } from 'jimu-core';
export declare class ArcGISDependencyDefineExtension implements extensionSpec.DependencyDefineExtension {
    id: string;
    themeLoadObserver: any;
    getDependencyKey(): string;
    getResources(): Resource[];
    postInit(): Promise<void>;
    private initModules;
    private replaceGetCredential;
    private initToRegistOAuthForMainPortalAndAGOL;
    /**
     * use after initModules for loading OAuthInfo/ServerInfo/IdentityManager
     */
    private registOAuthInfo;
    /**
     * get flow type for registering OAuth info.
     *  return 'authorization-code' if accessing AGOL or ArcGIS Enterprise version 10.9 or higher;
     *  return 'implicit' if accessing ArcGIS Enterprise version prior to 10.9.
     */
    private getFlowTypeForRegisteringOAuthInfo;
    private addCredentialToSessionManger;
    /**
     * use after initModules
     */
    private listeningJsApiSignIn;
    private syncToArcgisJSAPI;
    private onSessionChangedCallback;
    private addToTrustedServers;
    private onCurrentThemeLoad;
    private removeApiThemeStyle;
    private getAPIThemeUrl;
    private checkAPITheme;
    private checkApiUrl;
}
export declare class ArcGISDataSourceFactoryUriExtension implements extensionSpec.DataSourceFactoryUriExtension {
    id: string;
    getFactoryUri(dataSourceType: any): string;
}
