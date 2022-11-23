/// <reference types="react" />
import { React, ReactRedux, JimuMapViewInfo, ImmutableObject } from 'jimu-core';
import { JimuMapView } from '../views/jimu-map-view';
import { MapViewManager } from '../mapview-manager';
import { JimuMapViewGroup } from '../views/jimu-map-view-group';
/** @ignore */
declare type ViewRenderFunction = (views: {
    [viewId: string]: JimuMapView;
}) => React.ReactNode;
/** @ignore */
interface ExtraProps {
    viewInfos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>;
}
/**
 * `JimuMapViewComponentProps` provides information about the `JimuMapViewComponent`.
 */
export interface JimuMapViewComponentProps {
    /**
     * The map widget id selected within the `MapWidgetSelector` component.
     */
    useMapWidgetId: string;
    /** @ignore */
    children?: ViewRenderFunction | React.ReactNode;
    /**
     * The `JimuMapViewGroup` is created once the first view is added. Views in the groups may be still not loaded after a group is created.
     */
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
    /**
     * This function is called once all of the `JimuMapView` instances have a `JimuMapViewStatus` of `"LOADED"`.
     */
    onViewsCreate?: (views: {
        [viewId: string]: JimuMapView;
    }) => void;
    /**
     * This function is called when the current active view of the map widget is changed.
     * For example, it is called when clicking on the switch-map tool for multi-source maps or changing the `DataSource` for the map widget.
     */
    onActiveViewChange?: (activeView: JimuMapView, previousActiveViewId: string) => void;
}
declare class _JimuMapViewComponent extends React.PureComponent<JimuMapViewComponentProps & ExtraProps, {}> {
    viewManager: MapViewManager;
    componentDidMount(): void;
    componentDidUpdate(prevProps: JimuMapViewComponentProps & ExtraProps): void;
    onViewsCreate: (views: {
        [viewId: string]: JimuMapView;
    }) => void;
    onViewGroupCreate: () => void;
    onActiveViewChange: (previousActiveViewId: string) => void;
    getActiveViewId: (mapWidgetId: string, infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>) => string;
    getWhetherAllViewsCreated: (viewIds: string[], infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>) => boolean;
    getWhetherViewCreated: (viewId: any, infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>) => boolean;
    getViewIdsFromMapWidgetId: (mapWidgetId: string, infos: ImmutableObject<{
        [jimuMapViewId: string]: JimuMapViewInfo;
    }>) => string[];
    getViews: (viewIds: string[]) => {
        [viewId: string]: JimuMapView;
    };
    render(): React.ReactNode;
}
/**
 * A React component that makes it easy to use the `JimuMapView` instance from the map widget.
 * In most cases, you can pass in `useMapWidgetIds`, and use `onViewsCreate`, `onActiveViewChange` to get callback from the `JimuMapViewComponent`.
 */
export declare const JimuMapViewComponent: ReactRedux.ConnectedComponent<typeof _JimuMapViewComponent, ReactRedux.Omit<React.ClassAttributes<_JimuMapViewComponent> & JimuMapViewComponentProps & ExtraProps, "viewInfos"> & JimuMapViewComponentProps>;
export {};
