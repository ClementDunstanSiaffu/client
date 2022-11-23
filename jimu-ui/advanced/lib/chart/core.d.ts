/// <reference types="react" />
import { React } from 'jimu-core';
import { WebChart, ChartInstance, ChartEvents, ChartOptions, WebChartDataSources, WebChartDataTypes, LegendItemVisibility, ValidationStatus, CalculatedMinMaxBoundsPayload, SelectionData } from 'arcgis-charts';
import { GlobalOptions } from './type';
export interface ChartCoreEvents {
    [ChartEvents.DataProcessComplete]?: (event: CustomEventInit<WebChartDataTypes>) => void;
    [ChartEvents.LegendItemVisibilityChange]?: (event: CustomEventInit<LegendItemVisibility>) => void;
    [ChartEvents.UpdateComplete]?: (event: CustomEventInit<ValidationStatus>) => void;
    [ChartEvents.RenderingComplete]?: (event: CustomEventInit) => void;
    [ChartEvents.SelectionChange]?: (event: CustomEventInit) => void;
    [ChartEvents.SeriesColorsChange]?: (event: CustomEventInit) => void;
    [ChartEvents.AxesMinMaxChange]?: (event: CustomEventInit<CalculatedMinMaxBoundsPayload[]>) => void;
    [ChartEvents.SelectionComplete]?: (event: CustomEventInit<SelectionData>) => void;
    [ChartEvents.TooManySelectedElements]?: (event: CustomEventInit) => void;
    [ChartEvents.BadDataWarningRaise]?: (event: CustomEventInit) => void;
}
export declare type ChartCoreProps = React.HtmlHTMLAttributes<HTMLDivElement> & ChartCoreEvents & {
    /**
     * Gives a JSON representation of the Chart object. Used by `@arcgis/charts-js` package.
     */
    config: WebChart;
    /**
     * The data version of the inline data source, chart will re-update data if data version changed.
     */
    dataVersion: number;
    /**
     * JSON representation of the chart options for the update or initialization.
     */
    options?: ChartOptions;
    /**
     * Detailed options to customize chart experience.
     */
    globalOptions?: GlobalOptions;
};
/**
 * Checks whether the information necessary to use the inline data is provided
 */
export declare function isDataDefined(dataSource: WebChartDataSources, options: ChartOptions): boolean;
declare const ChartCore: React.ForwardRefExoticComponent<React.HtmlHTMLAttributes<HTMLDivElement> & ChartCoreEvents & {
    /**
     * Gives a JSON representation of the Chart object. Used by `@arcgis/charts-js` package.
     */
    config: WebChart;
    /**
     * The data version of the inline data source, chart will re-update data if data version changed.
     */
    dataVersion: number;
    /**
     * JSON representation of the chart options for the update or initialization.
     */
    options?: ChartOptions;
    /**
     * Detailed options to customize chart experience.
     */
    globalOptions?: GlobalOptions;
} & React.RefAttributes<ChartInstance>>;
export { ChartCore };
