import { CropParam, ImageParam } from './index';
import { Size, ImageDisplayQualityMode, ImageDisplayQualityValue } from 'jimu-core';
export declare function getCropedImgPositionInWidget(cropParam: CropParam, widgetWidth: number, widgetHeight: number, imageWidth: number, imageHeight: number): any;
export declare function getImgFillSizeInWidget(widgetWidth: number, widgetHeight: number, imageWidth: number, imageHeight: number): any;
export declare function getImgFitSizeInWidget(widgetWidth: number, widgetHeight: number, imageWidth: number, imageHeight: number): any;
export declare function getDefalutIconLength(widgetWidth: number, widgetHeight: number): number;
export declare function isIllegalUrl(url: string): boolean;
/**
 * Get image original size by link that is like url or dataURL.
 * @param imgLink url or dataURL, because sometimes image data is from cacha
 * @returns Promise<{ width: number, height: number }>
 */
export declare function getImageOriginalSizeByUrl(imgLink: string): Promise<Size>;
export declare const cutWidthRangeList: number[];
export declare function getImageDisplayQualityModeWidthMap(naturalWidth: number): {
    ORIGINAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
    FUZZY: number;
};
export declare function getImageDisplayQualityWidthByMode(naturalWidth: number, mode: ImageDisplayQualityMode): number;
export declare function getImageDisplayQualityModeByValue(value: ImageDisplayQualityValue): ImageDisplayQualityMode;
export declare function getImageDisplayQualityValueByMode(mode: ImageDisplayQualityMode): ImageDisplayQualityValue;
export declare function canvasToBlob(canvas: any, mimeType?: string): Promise<Blob>;
export declare function canvasToObjectURL(canvas: any, mimeType?: string): Promise<string>;
export declare function imageToCanvas(image: any, destWidth?: number, destHeight?: number): HTMLCanvasElement;
export declare function imageToBlob(image: HTMLImageElement, mimeType: string, destWidth?: number, destHeight?: number): Promise<Blob>;
export declare function imageToObjectURL(image: HTMLImageElement, mimeType: string, destWidth?: number, destHeight?: number): Promise<string>;
export declare function uriToObjectURL(uri: string, mimeType?: string): Promise<string>;
export declare function compressImageByWidth(objectURL: string, destWidth?: number, mimeType?: string): Promise<string>;
export interface UpdateUrlByDisplayQualityModeOption {
    originalUrl: string;
    originalWidth?: number;
    displayUrl: string;
    cropWidth?: number;
    mode: ImageDisplayQualityMode;
    mimeType?: string;
}
export declare function getFuzzyImageWidth(): number;
export declare function updateUrlByDisplayQualityMode(option: UpdateUrlByDisplayQualityModeOption): Promise<string>;
export declare function canUseImageDisplayQualityByMimeType(mimeType: string): boolean;
export declare function canUseImageFuzzyByMimeType(mimeType: string): boolean;
export declare function canCutImage(imageParam: ImageParam): boolean;
export declare function canUseImageDisplayQuality(imageParam: ImageParam): boolean;
export declare function canLoadFuzzyImage(imageParam: ImageParam): boolean;
