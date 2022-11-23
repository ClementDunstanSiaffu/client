export default class TransportUtil {
    fixForLint: string;
    constructor();
    static GEUrl: string;
    static getWalktime(sourceCountry: string, units: string, bufferValues: string, longitude: string, latitude: string): string;
    static getDrivetime(sourceCountry: string, units: string, bufferValues: string, longitude: string, latitude: string): string;
    static parseRings(response: any): {
        value: any;
        units: any;
        rings: any;
    }[] | undefined;
    private static hasText;
    static WalktimeParams: any;
    static DrivetimeParams: any;
}
