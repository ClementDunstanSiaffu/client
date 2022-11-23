import { Expression as ExpressionValue } from 'jimu-core';
declare const Embed: any;
export interface ExpressionFormatValue {
    uniqueid: string;
    dsid: string;
    name: string;
    expression?: ExpressionValue;
}
export declare const EXPRESSION_ATTRIBUTES: string[];
export declare class RichExpression extends Embed {
    static blotName: string;
    static tagName: string;
    domNode: any;
    declareClass: 'Expression';
    static create(value?: ExpressionFormatValue): void;
    static formats(domNode: any): any;
    static value(domNode: any): string;
    format(name: string, value: any): void;
}
export {};
