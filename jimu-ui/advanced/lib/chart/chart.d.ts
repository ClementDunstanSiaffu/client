/// <reference types="react" />
import { React, ImmutableObject } from 'jimu-core';
import { ChartCoreProps } from './core';
import { ActionModes, BarAndLineDataLabelFormatCallback, BarAndLineTooltipFormatCallback, ChartElementLimit, ChartInstance, HistogramLabelFormatCallback, InlineData, PieChartLabelFormatCallback, ScatterPlotLabelFormatCallback, SelectionData, SelectionTheme, WebChartDataSources, WebChartDataTypes, WebMapWebChart } from 'arcgis-charts';
import FeatureLayer from 'esri/layers/FeatureLayer';
export interface ChartProps extends Omit<ChartCoreProps, 'config'> {
    /**
     * Used by `@arcgis/charts-js` package, both mutable and immutable are supported.
     */
    webMapWebChart: WebMapWebChart | ImmutableObject<WebMapWebChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
    /**
     * A property representing the selection to apply on the chart.
     * The properties are considered in the following order:
     * - selectionData.selectionOIDs: an array of Object Ids (for Feature Layer) representing a selection to apply to the chart.
     * - selectionData.selectionItems: an array of data items representing a selection to apply to the chart.
     */
    selectionData?: SelectionData;
    /**
    * Used to provide a customized theme for the selected and non selected elements.
    * If no style is provided for the selected elements, a default selection is applied.
    * If no style is provided for the non selected elements, the chart's style is applied.
    */
    selectionTheme?: SelectionTheme;
    /**
     * Used to customize the chart's limits, especially the maximum number of bars to be displayed.
     */
    chartLimits?: Partial<ChartElementLimit>;
    /**
     * Used to build/update inline data source of the chart
     */
    inlineData?: InlineData<WebChartDataTypes>;
    /**
     * used to perform queries or client-side queries (if the view is provided)
     */
    featureLayer?: FeatureLayer;
    /**
     * Set the chart's mode (zoom, selection, none)
     * - zoom: allows to zoom on the chart. All selection is disabled
     * - mono-selection: the selection is enabled but only one element can be selected. Zoom is disabled
     * - multi-selection: the selection is enabled and allows selecting multiple elements. Zoom is disabled
     * - multi-selection-with-ctrl-key: the selection is enabled and allows selecting multiple elements when the ctrl/cmd key is pressed. Zoom is disabled
     * - none: the zoom and selection features are disabled
     */
    actionMode?: ActionModes;
    /**
     * optional create message to be displayed in the chart container.
     */
    placeholder?: string;
    /**
     * Can be used when creating or updating a chart compatible with time binning. If this option is `true`, the series properties
     * `timeIntervalUnits` and `timeIntervalSize` become optional and will be automatically set to values that fit the data set.
     * @default false
     */
    setTimeBinningInfoWhenNotProvided?: boolean;
    /**
     * Used to customize the way the tooltips are rendered. The callback function can return an HTML string and the tags will
     * be interpreted properly.
     */
    tooltipFormatter?: PieChartLabelFormatCallback | HistogramLabelFormatCallback | ScatterPlotLabelFormatCallback | BarAndLineTooltipFormatCallback;
    dataLabelFormatter?: PieChartLabelFormatCallback | HistogramLabelFormatCallback | ScatterPlotLabelFormatCallback | BarAndLineDataLabelFormatCallback;
    /**
     * enable filter by selection
     */
    filterBySelection?: boolean;
    /**
      * used to disable all interactions on the chart (legend hit, selection, zoom...)
      */
    disableInteractions?: boolean;
}
declare const Chart: React.MemoExoticComponent<React.ForwardRefExoticComponent<ChartProps & React.RefAttributes<ChartInstance>>>;
export { Chart };
