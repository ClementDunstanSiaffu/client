/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, ImmutableObject, JimuMapViewInfo, ImmutableArray } from 'jimu-core';
import { JimuLayerView } from '../views';
/**
 * @ignore
 * The JimuLayerViewInfo
 */
export interface JimuLayerViewInfo {
    jimuMapViewId?: string;
    jimuLayerId?: string;
    rootJimuLayerId?: string;
    dataSourceId?: string;
    rootDataSourceId?: string;
}
export declare type IMJimuLayerViewInfo = ImmutableObject<JimuLayerViewInfo>;
/**
 * @ignore
 * The JimuLayerViewComponent component props
 */
export interface JimuLayerViewComponentProps {
    /**
     * The array of the map widget id selected from the MapWidgetSelector component
     */
    useMapWidgetIds: ImmutableArray<string>;
    /**
     * The jimuLayerViewInfo selected from the JimuLayerViewSelector component
     */
    jimuLayerViewInfo: IMJimuLayerViewInfo;
    /**
     * The function will be called when the JimuLayerView instance is created.
     */
    onLayerViewCreated?: (jimuLayerView: JimuLayerView) => void;
    /**
     * The function will be called when the JimuLayerView instance creation fails.
     */
    onLayerViewFailed?: (err: any) => void;
}
interface ExtraProps {
    viewInfos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>;
}
declare class _JimuLayerViewComponent extends React.PureComponent<JimuLayerViewComponentProps & ExtraProps, unknown> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: JimuLayerViewComponentProps & ExtraProps, prevState: unknown): void;
    getJimuMapViewIdsFromUseMapWidgetIds: (useMapWidgetIds: ImmutableArray<string>, infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>, rootDataSourceId: string) => string[];
    getJimuMapViewIdsFromMapWidgetId: (mapWidgetId: string, infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>, rootDataSourceId: string) => string[];
    render(): any;
}
/**
 * A react component that makes it easy to use JimuLayerView from the map widget.
 * In most cases, you can pass in `useMapWidgetIds` & `jimuLayerViewInfo`, and use `onLayerViewCreated` & `onLayerViewFailed` to get a callback from the JimuLayerViewComponent.
 */
export declare const JimuLayerViewComponent: ReactRedux.ConnectedComponent<typeof _JimuLayerViewComponent, ReactRedux.Omit<React.ClassAttributes<_JimuLayerViewComponent> & JimuLayerViewComponentProps & ExtraProps, "viewInfos"> & JimuLayerViewComponentProps>;
export {};
