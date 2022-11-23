/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, SerializedStyles, IntlShape, ImmutableArray, IMWidgetJson, ReactRedux } from 'jimu-core';
/**
 * The MapWidgetSelector component props
 */
export interface MapWidgetSelectorProps {
    /**
     * The array of Map widget IDs. It is returned from the onSelect function.
     */
    useMapWidgetIds?: ImmutableArray<string>;
    /**
     * The function will be called when a Map widget item listed in this component is selected.
     */
    onSelect?: (useMapWidgetIds: string[]) => void;
}
interface StateExtraProps {
    mapWidgetJsons: IMWidgetJson[];
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
export declare class _MapWidgetSelector extends React.PureComponent<MapWidgetSelectorProps & StateExtraProps & ExtraProps, unknown> {
    noneMapWidget: IMWidgetJson;
    getStyle: (theme: ThemeVariables) => SerializedStyles;
    onSelect: (e: any) => void;
    getSelectedMapWidget: () => IMWidgetJson;
    render(): jsx.JSX.Element;
}
/**
 * A react component for selecting Map widgets. It is usually used on the setting page of a widget,
 * and works with JimuMapViewComponent, JimuLayerViewComponent and JimuLayerViewSelector.
 */
export declare const MapWidgetSelector: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
    theme?: import("jimu-core").IMThemeVariables;
}>> & {
    WrappedComponent: React.ComponentType<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
        theme?: import("jimu-core").IMThemeVariables;
    }>;
}, ReactRedux.Omit<Omit<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
    theme?: import("jimu-core").IMThemeVariables;
}, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "mapWidgetJsons"> & MapWidgetSelectorProps>;
/**
 * The JimuMapViewSelector has been deprecated since EXB version 1.6.0 (online9.3). Please use the MapWidgetSelector instead.
 */
export declare const JimuMapViewSelector: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
    theme?: import("jimu-core").IMThemeVariables;
}>> & {
    WrappedComponent: React.ComponentType<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
        theme?: import("jimu-core").IMThemeVariables;
    }>;
}, ReactRedux.Omit<Omit<Pick<MapWidgetSelectorProps & StateExtraProps & ExtraProps, "intl" | keyof MapWidgetSelectorProps | "mapWidgetJsons"> & {
    theme?: import("jimu-core").IMThemeVariables;
}, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "mapWidgetJsons"> & MapWidgetSelectorProps>;
/**
 * The _JimuMapViewSelector has been deprecated since EXB version 1.6.0 (online9.3). Please use the _MapWidgetSelector instead.
 */
export declare const _JimuMapViewSelector: typeof _MapWidgetSelector;
/**
 * The JimuMapViewSelectorProps has been deprecated since EXB version 1.6.0 (online9.3). Please use the MapWidgetSelectorProps instead.
 */
export declare type JimuMapViewSelectorProps = MapWidgetSelectorProps;
export {};
