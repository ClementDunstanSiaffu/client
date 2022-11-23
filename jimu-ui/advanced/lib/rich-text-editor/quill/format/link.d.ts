import { LinkParam } from 'jimu-ui/advanced/setting-components';
import { LinkTarget } from 'jimu-ui';
declare const Inline: any;
export interface LinkFormatValue {
    uniqueid: string;
    dsid: string;
    href: string;
    target: LinkTarget;
    link?: LinkParam;
}
export declare class Link extends Inline {
    static SANITIZED_URL: any;
    statics: any;
    domNode: HTMLLinkElement;
    static blotName: string;
    static tagName: string;
    static PROTOCOL_WHITELIST: string[];
    static create(value: LinkFormatValue | string): void;
    static formats(domNode: any): any;
    static sanitize(url: any): string;
    format(name: any, value: LinkFormatValue | string): void;
}
export {};
