/// <reference types="react" />
import { React, UseDataSource, ImmutableArray, AppMode, ReactRedux, IntlShape } from 'jimu-core';
import MultiSourceMap from './components/multisourcemap';
import { JimuMapView, JimuMapViewGroup, JimuMapClass } from 'jimu-arcgis';
import type { InitialMapState, ToolConfig, IMJimuMapConfig } from './config';
export { InitialMapState, ToolConfig, IMJimuMapConfig };
export interface JimuMapProps {
    className?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    jimuMapConfig?: IMJimuMapConfig;
    id: string;
    appMode?: AppMode;
    intl?: IntlShape;
    onViewPointChanged?: (viewPoint: __esri.Viewpoint) => void;
    onExtentChanged?: (extent: __esri.Extent) => void;
    onActiveViewChange?: (activeView: JimuMapView) => void;
    onViewGroupCreate?: (viewGroup: JimuMapViewGroup) => void;
    onJimuMapViewCreated?: (jimuMapView: JimuMapView) => void;
}
interface States {
    startLoadModules: boolean;
}
export declare class __JimuMap extends React.PureComponent<JimuMapProps, States> implements JimuMapClass {
    parentContainer: HTMLElement;
    container: HTMLElement;
    containerClientRect: ClientRect | DOMRect;
    multiSourceMapInstance: MultiSourceMap;
    constructor(props: any);
    startRenderMap: () => void;
    componentDidMount(): void;
    getPlaceHolderImage: () => string;
    fullScreenMap: () => void;
    handleViewGroupCreate: (viewGroup: JimuMapViewGroup) => void;
    handleJimuMapViewCreated: (jimuMapView: JimuMapView) => void;
    switchMap: () => Promise<any>;
    setMultiSourceMapInstance: (instance: MultiSourceMap) => void;
    render(): JSX.Element;
}
export declare const JimuMap: import("@emotion/styled").StyledComponent<ReactRedux.Omit<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "appMode" | "dispatch"> & JimuMapProps, {}, {}>;
