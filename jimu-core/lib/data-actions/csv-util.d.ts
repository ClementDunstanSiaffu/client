import { DataSource, DataRecord } from '../data-sources/data-source-interface';
export declare function removeLinebreaks(content: string): string;
export declare function getUniqueAttr(attribute: string, fieldNames: string[], aliasNames: string[]): string;
export declare function toCSV(dataSource: DataSource, records: DataRecord[]): Blob;
