export declare class InfographicsHelper {
    constructor();
    static _infographicsPlayerPageUrl: string;
    static openInfographics(igItemId: string, hierarchyId: string, geometry: any, countryID: string): void;
    static _getInfographicsPlayerUrl(): Promise<unknown>;
    static _openInfographicsTab(playerPageUrl: string, infographicParameters: any): void;
    static _getInfographicsParams(igItemId: any, hierarchyId: any, geometry: any, countryID: any): string;
}
