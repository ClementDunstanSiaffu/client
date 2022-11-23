export declare class GEClient {
    static getInfographicTemplatesList(countryCode: string, full?: boolean): Promise<unknown>;
    static getClassicReportsTemplatesList(countryCode: string, full?: boolean): Promise<unknown>;
    static getDefaultHierarchy(countryCode: string): Promise<unknown>;
    static execute(geParameters: any): Promise<unknown>;
    static enrich: (enrichRequestParams: any) => Promise<unknown>;
    static createReport(createReportParams: any): Promise<unknown>;
}
