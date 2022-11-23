import { WebMapWebChart } from 'arcgis-charts';
import { ThemeVariables } from 'jimu-core';
declare type TraverseConvertColorInentifier = string | ((key: string) => void);
/**
 * Traverses and converts all string colors to symbol colors.
 * @param input
 * @param theme
 *
 * [symbol color](https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-Symbol.html#color)
 */
export declare const traverseConvertColor: <T>(input: T, theme: ThemeVariables, identifier?: TraverseConvertColorInentifier) => T;
export declare const traverseConvertWebChartColor: (input: WebMapWebChart, theme: ThemeVariables) => WebMapWebChart;
declare type TraverseCallbackHandle = (key: string, value: any) => any;
/**
 * Traverse an object and execute a callback function on the [primitive] value
 * @param input
 * @param callback
 * @param key
 * @returns input
 */
export declare const traverse: (input: any, callback: TraverseCallbackHandle, key?: string) => any;
export {};
