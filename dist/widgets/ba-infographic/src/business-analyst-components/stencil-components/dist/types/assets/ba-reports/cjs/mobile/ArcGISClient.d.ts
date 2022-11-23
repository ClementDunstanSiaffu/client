export declare class ArcGISClient {
    static _lastSelfToken: string;
    static _selfResult: any;
    static executeSelf(): Promise<unknown>;
    static getGeoenrichmentUrl(): Promise<unknown>;
    static getHelperServiceUrl(serviceName: string): Promise<unknown>;
    static getPortalResource(resourceName: string): Promise<unknown>;
    static getItemData(itemId: string): Promise<unknown>;
    /**
     * Searches for items by provided search query and params and extracts all search results
     * bypassing ArcGIS server limit of 100 items
     *
     * @param query
     * @param params
     * @returns {Promise<unknown>}
     */
    static searchAllItems(query: any, params: any): Promise<unknown>;
    static searchItems(query: any, params: any, context: any): Promise<unknown>;
    static portalSearch(params: any): Promise<unknown>;
    static getPortalUrl(): Promise<string>;
    static executeRequest(settings: any): Promise<unknown>;
}
