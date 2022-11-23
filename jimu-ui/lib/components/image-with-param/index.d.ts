/// <reference types="react" />
/** @jsx jsx */
import { jsx, React, ReactRedux, ThemeVariables, Size, AppMode, ImageDisplayQualityMode } from 'jimu-core';
/**
 * The ImageWithParam component props.
 */
export interface ImageWithParamProps {
    /**
     * The imageParam property contains the original url.
     */
    imageParam: ImageParam;
    /**
     * The toolTip of image
     */
    toolTip?: string;
    /**
     * The altText of image
     */
    altText?: string;
    /**
     * If `true`, useFadein
     */
    useFadein?: boolean;
    /** @ignore */
    theme?: ThemeVariables;
    /** @ignore */
    size?: Size;
    /**
     * The fill mode for image.
     */
    imageFillMode?: ImageFillMode;
    /** @ignore */
    isAutoHeight?: boolean;
    /**
     * The function will be called when image resource is loaded.
     */
    onImageLoaded?: (imageWidth: number, imageHeight: number) => void;
    /** @ignore */
    children?: any;
    imageDisplayQualityMode?: ImageDisplayQualityMode;
}
/**
 * The fill mode for image.
 */
export declare enum ImageFillMode {
    Fit = "FIT",
    Fill = "FILL"
}
/** @ignore */
export declare enum ImgSourceType {
    ByURL = "BY_URL",
    ByUpload = "BY_UPLOAD"
}
/**
 * The info for ImageParam.
 */
export interface ImageParam {
    /**
     * The url for image.
     */
    url?: string;
    /** @ignore */
    originalId?: string;
    /** @ignore */
    originalUrl?: string;
    /**
     * The resource fileName for image, if it is stored as a resource.
     */
    fileName?: string;
    /**
     * The original fileName for image
     */
    originalName?: string;
    /**
     * The file format for image
     */
    fileFormat?: string;
    /** @ignore */
    imgSourceType?: ImgSourceType;
    /** @ignore */
    cropParam?: CropParam;
    /** @ignore */
    isUseCompress?: boolean;
    /** The image origial width that is from HTMLImageElement.naturalWidth. */
    originalWidth?: number;
    /** The image origial height that is from HTMLImageElement.naturalHeight. */
    originalHeight?: number;
}
declare enum ImgLoadState {
    Loading = "LOADING",
    LoadOk = "LOADOK",
    LoadError = "LOADERROR"
}
interface States {
    picLoadResult: ImgLoadState;
    imageWidth?: number;
    imageHeight?: number;
    widgetWidth?: number;
    widgetHeight?: number;
    imageSrc: string;
    isRefresh: boolean;
}
/** @ignore */
export declare enum CropType {
    Real = "REAL",
    Fake = "FAKE"
}
/** @ignore */
export interface CropPosition {
    x: number;
    y: number;
}
interface CropPixel {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
/** @ignore */
export interface CropParam {
    cropPosition?: CropPosition;
    cropZoom?: number;
    svgViewBox?: string;
    svgPath?: string;
    cropShape?: string;
    cropPixel?: CropPixel;
    cropType?: CropType;
}
interface ExtraProps {
    appPath: string;
    queryObject: any;
    appMode: AppMode;
}
/** @ignore */
export declare class _ImageWithParam extends React.PureComponent<ImageWithParamProps & ExtraProps, States> {
    maskId: string;
    __unmount: boolean;
    src: string;
    imageObject: HTMLImageElement;
    constructor(props: any);
    getStyle(): import("jimu-core").SerializedStyles;
    static defaultProps: {
        imageParam: {};
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    getAdaptiveUrlFromImageParam: (imageParam: ImageParam) => string;
    preLoadCommonImage: (imageParam: ImageParam, mode: ImageDisplayQualityMode) => Promise<void>;
    preLoadImage: (imageParam: ImageParam, mode: ImageDisplayQualityMode) => Promise<void>;
    cancelPreLoadImage: () => void;
    getSnapshotBeforeUpdate(prevProps: ImageWithParamProps): boolean;
    componentDidUpdate(prevProps: ImageWithParamProps & ExtraProps, prevState: States, snapshot: any): void;
    standardUrl: (url: string) => string;
    onResize: (width: any, height: any) => void;
    getWidgetWidth: () => number;
    getWidgetHeight: () => number;
    parseImageSrc: (imageParam: ImageParam, mode?: ImageDisplayQualityMode) => Promise<string | null>;
    render(): jsx.JSX.Element;
}
/**
 * The ImageWithParam component is used to visualize the image, it provides fill mode.
 * It can be used at runtime or in the setting page.
 * It can cooperate with ImageSelector component(jimu-ui/advanced/resource-selector).
 */
export declare const ImageWithParam: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}>, ReactRedux.Omit<Pick<any, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}, "appPath" | "queryObject" | "appMode" | "dispatch"> & ImageWithParamProps>;
export {};
