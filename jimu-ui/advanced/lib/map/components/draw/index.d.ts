/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, jsx, ThemeVariables } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { JimuSymbolType } from '../symbol-selector';
import type { JimuSymbol, JimuPointSymbol, JimuPolylineSymbol, JimuPolygonSymbol } from '../symbol-selector';
export interface DrawToolClass {
    sketch: __esri.Sketch;
    graphicsLayer: __esri.GraphicsLayer;
    complete: () => Promise<void>;
}
export declare enum DrawCreationMode {
    Single = "single",
    Continuous = "continuous",
    Update = "update"
}
export declare enum ActiveToolTypes {
    Point = "point",
    Polyline = "polyline",
    Polygon = "polygon",
    Rectangle = "rectangle",
    Circle = "circle"
}
export interface Props {
    className?: string;
    jimuMapView: JimuMapView;
    layer?: __esri.GraphicsLayer | __esri.FeatureLayer;
    creationMode?: DrawCreationMode;
    disableSymbolSelector?: boolean;
    visibleElements?: __esri.SketchVisibleElements;
    updateOnGraphicClick?: boolean;
    defaultCreateOptions?: __esri.SketchViewModelDefaultCreateOptions;
    defaultUpdateOptions?: __esri.SketchViewModelDefaultUpdateOptions;
    pointSymbol?: JimuPointSymbol;
    polylineSymbol?: JimuPolylineSymbol;
    polygonSymbol?: JimuPolygonSymbol;
    onDrawToolCreated?: (drawTool: DrawToolClass) => void;
    onDrawToolsActived?: (drawingMode: string) => void;
    onDrawToolCleared?: () => void;
    onDrawStart?: () => void;
    onDrawCancel?: () => void;
    onDrawEnd?: (graphic: __esri.Graphic) => void;
    onGraphicEdited?: (result: {
        type: 'deleted' | 'modified' | 'complete' | 'aborted';
        graphics: __esri.Graphic[];
        layer: __esri.GraphicsLayer;
    }) => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
interface States {
    apiLoaded: boolean;
    currentActiveTool: any;
    currentActiveBtn: any;
    currentSymbol: JimuSymbol;
    currentSymbolType: JimuSymbolType;
    isPanelOpened: boolean;
    containerWidth: number;
    popperGeneration: number;
}
export interface CurrentSymbols {
    pointSymbol: JimuPointSymbol;
    polylineSymbol: JimuPolylineSymbol;
    polygonSymbol: JimuPolygonSymbol;
}
export declare class _Draw extends React.PureComponent<Props & ExtraProps, States> {
    container: HTMLElement;
    toolbarContainer: HTMLElement;
    btnContainer: HTMLElement;
    collapseBtnContainer: HTMLElement;
    resizeObserver: ResizeObserver;
    SketchClass: typeof __esri.Sketch;
    SketchViewModelClass: typeof __esri.SketchViewModel;
    GraphicsLayer: typeof __esri.GraphicsLayer;
    jsonUtils: typeof __esri.jsonUtils;
    sketch: __esri.Sketch;
    layer: __esri.GraphicsLayer;
    isLayerClearWhenUnmount: boolean;
    AVAILABLE_TOOLS: ActiveToolTypes[];
    _currentSymbols: CurrentSymbols;
    UPDATE_SYMBOL_FLAG: boolean;
    _onGraphicEdited: any;
    testBtnRef: any;
    constructor(props: any);
    componentDidMount(): void;
    private readonly _initSketch;
    _getDefaultVisibleElements: (visibleElements: __esri.SketchVisibleElements) => __esri.SketchVisibleElements;
    componentDidUpdate(prevProps: Props, prevState: States): void;
    componentWillUnmount(): void;
    componentDidCatch(error: any, errorInfo: any): void;
    private _removeLayer;
    complete: () => Promise<void>;
    deactivate: () => void;
    private readonly _destroySketch;
    clearGraphics: () => void;
    onDrawToolContainerCreated: (ref: any) => void;
    render(): jsx.JSX.Element;
    _isPopperOpen: () => boolean;
    handlePointSymbolChanged: (symbol: JimuPointSymbol) => void;
    handlePolylineSymbolChanged: (symbol: JimuPolylineSymbol) => void;
    handlePolygonSymbolChanged: (symbol: JimuPolygonSymbol) => void;
    handlePopperToggle: (isPopperOpen: any) => void;
}
export declare const Draw: React.ForwardRefExoticComponent<Pick<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}>;
export {};
