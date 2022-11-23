/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, ImmutableArray } from 'jimu-core';
import { IMJimuLayerViewInfo } from 'jimu-arcgis';
/**
 * The JimuLayerViewSelector component props
 */
export interface JimuLayerViewSelectorProps {
    /**
     * The array of Map widget IDs. It is returned by selecting from the MapWidgetSelector component.
     */
    useMapWidgetIds: ImmutableArray<string>;
    /**
     * The jimuLayerViewInfo of the layer selected by the onSelect function.
     */
    jimuLayerViewInfo?: IMJimuLayerViewInfo;
    /** @ignore */
    className?: string;
    /**
     * The function will be called when a layer is selected.
     */
    onSelect?: (jimuLayerViewInfo: IMJimuLayerViewInfo) => void;
    /**
     * @ignore
     */
    intl: IntlShape;
}
/**
 * A react component for selecting layers in a map. It is usually used on the settings page of a widget,
 * and works with JimuLayerViewComponent to get the jimulayerview instance.
 */
export declare const JimuLayerViewSelector: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>; /**
     * The jimuLayerViewInfo of the layer selected by the onSelect function.
     */
};
