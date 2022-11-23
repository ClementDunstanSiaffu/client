export declare class SettingsHelper {
    static environment: string;
    static getEnvironment(): Promise<unknown>;
    static setEnvironment(environment: string): void;
    static getPortalBaseUrl(): Promise<string>;
    static isTrueString(value: any): boolean;
}
