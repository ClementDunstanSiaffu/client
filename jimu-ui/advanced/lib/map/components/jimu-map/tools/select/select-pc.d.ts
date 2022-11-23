/// <reference types="react" />
/** @jsx jsx */
import { jsx, React, IMThemeVariables, FeatureLayerQueryParams, IntlShape } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
interface Props {
    theme?: IMThemeVariables;
    intl?: IntlShape;
    jimuMapView?: JimuMapView;
    availableTools?: SketchToolType[];
    availableSelectionMode?: boolean;
    onClearSelect?: (event: __esri.SketchViewModelCreateEvent, options: any) => void;
    onSelectStart?: (event: __esri.SketchViewModelCreateEvent, options: any) => void;
    onSelectComplete?: (event: __esri.SketchViewModelCreateEvent, options: any) => void;
}
export declare enum SketchToolType {
    Point = "point",
    Polyline = "polyline",
    Polygon = "polygon",
    Circle = "circle",
    Rectangle = "rectangle"
}
interface States {
    sketcheInitialized: boolean;
    isShowSelectTypePopup: boolean;
    isShowResultPopup: boolean;
    isQuerying: boolean;
    currentSelectType: 'Point' | 'Rectangle' | 'Lasso' | 'Circle' | 'Line';
    isActive: boolean;
    spatialRelationship: 'intersects' | 'contains';
    resultGraphics: __esri.Graphic[];
}
export declare class SelectPCTool extends React.PureComponent<Props, States> {
    btnContainer: HTMLElement;
    selectResultContainer: HTMLElement;
    SketchViewModel: typeof __esri.SketchViewModel;
    GraphicsLayer: typeof __esri.GraphicsLayer;
    Query: typeof __esri.Query;
    sketchViewModel: __esri.SketchViewModel;
    currentActiveTool: string;
    query: FeatureLayerQueryParams;
    jsonUtils: typeof __esri.jsonUtils;
    geometryEngine: typeof __esri.geometryEngine;
    resultGraphics: __esri.Graphic[];
    removeEvents: Array<() => void>;
    constructor(props: Props);
    getCSSStyle(): import("jimu-core").SerializedStyles;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: States): void;
    componentWillUnmount(): void;
    removeSketchViewModel(): void;
    toggleIsSelectActive: () => void;
    getSelectToolIcon: () => any;
    toggleSelectTypePopup: () => void;
    toggleResultPopup: () => void;
    setCurrentSelectType: (currentSelectType: any) => void;
    initializeSketchTool(): void;
    clearSelect: () => void;
    render(): jsx.JSX.Element;
}
export {};
