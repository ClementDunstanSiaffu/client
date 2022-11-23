export declare class ReportTemplatesManager {
    static _geReportTemplatesCache: {};
    static _condenseResultsArray(data: any): any;
    static getDefaultHierarchy(countryCode: string): Promise<unknown>;
    /**
     * Gets report templates for country identified by country code. Final report
     * templates set consists of templates from GeoEnrichment and from AGOL
     *
     * @param countryCode Only 2-letter countryCode! todo: consume 3-letter also
     * @param full        Flag True=return all data, False=return Id + Title only
     * @return {Promise<unknown>}
     */
    static getReportTemplates(countryCode: any, full?: boolean): Promise<unknown>;
    static _getGEReportTemplates(countryCode: string): Promise<unknown>;
    static _getSharedCustomReportTemplateItems(username: string): Promise<unknown>;
    static _getMyCustomReportTemplateItems(username: string): Promise<unknown>;
    static _removeInfographicTemplates(reportTemplateItem: any): boolean;
    /**
     *
     * @param countryCode Only 2-letter countryCode! todo: consume 3-letter also
     * @return {Promise<unknown>}
     */
    static getInfographicReportTemplateItems(countryCode: string, full?: boolean): Promise<unknown>;
    /**
     * Gets function to filter portal items arrays by country code in its properties
     *
     * @param countryCode country code that item's 'countries' array should contain
     * @returns {function(*): boolean}
     */
    static _byCountry(countryCode: string): (item: any) => boolean;
    static _getEsriInfographicReportTemplateItems(): Promise<unknown>;
    static _getSharedInfographicReportTemplateItems(username: string, orgId: string): Promise<unknown>;
    static _getUserInfographicReportTemplateItems(username: string): Promise<unknown>;
    static _getFavoriteReportsIds(username: string, countryId: string): Promise<unknown>;
    /**
     * Gets infographic templates that user added to "My Templates" from "Gallery"
     *
     * @returns {*}
     * @private
     */
    static _getUserGalleryInfographicReportTemplateItems(): Promise<unknown>;
    static _searchItems(query: any, resultsFilter: any): Promise<unknown>;
    static _createReportTemplateInfos(portalItems: any, countryCode: string): any;
    /**
     * Function for Array.filter that removes non-infographic template items
     *
     * Left here to support filtering out some legacy infographic reports that
     * were not updated on portal for some reasons.
     * @param reportTemplateItem
     * @return {*|boolean}
     * @private
     */
    static _infographicFilter(reportTemplateItem: any): boolean;
}
