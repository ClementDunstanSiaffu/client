export default class TransportUtil {
    fixForLint: string;
    constructor();
    static setToken(username: string, token: string): void;
    /**
     * Makes GE call to generate drivetime or walktime buffers
     * @param mode = 'drivetime' or 'walktime'
     * @param sourceCountry
     * @param units = 'minutes, 'miles' or 'kilometers'
     * @param bufferValues  = 1,3,5
     * @param longitude
     * @param latitude
     */
    static getBuffers(mode: string, sourceCountry: string, units: string, bufferValues: string, longitude: number, latitude: number): Promise<{
        value: any;
        units: any;
        rings: any;
    }[] | null | undefined>;
    static parseRings(response: any): {
        value: any;
        units: any;
        rings: any;
    }[] | undefined;
    private static hasText;
    private static getParams;
}
