export declare class WebAppSettings {
    static getBusinessAnalystOrganizationalSettings(): Promise<unknown>;
    static getDisabledReports(): Promise<unknown>;
    /**
     * Gets ids of infographic templates that user added to "My Templates" from "Gallery"
     * (uses new version of user settings)
     *
     * @returns {*}
     */
    static getUserGalleryInfographicReportIds(): Promise<unknown>;
    static _searchGalleryInfographicPreferencesItem(): Promise<unknown>;
    static _searchUserItem(typekeywords: any): Promise<unknown>;
}
