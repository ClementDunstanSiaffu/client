import { UrlInfo as UrlInfoValue } from 'jimu-core';
declare const Embed: any;
export interface UrlInfoFormatValue {
    uniqueid: string;
    name: string;
    urlInfo?: UrlInfoValue;
}
export declare const URLINFO_ATTRIBUTES: string[];
export declare class RichUrlInfo extends Embed {
    static blotName: string;
    static tagName: string;
    domNode: any;
    declareClass: 'UrlInfo';
    static create(value?: UrlInfoFormatValue): void;
    static formats(domNode: any): any;
    static value(domNode: any): string;
    format(name: string, value: any): void;
}
export {};
