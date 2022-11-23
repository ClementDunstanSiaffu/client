import { ActiveToolTypes } from '../index';
export declare const getStyles: () => import("jimu-core").SerializedStyles;
export declare const getSelectionToolClass: (selectionTools: any, updateOnGraphicClick: boolean) => string;
export declare const insertCustomDom: (container: HTMLElement, btnContainer: HTMLElement, collapseBtnContainer: HTMLElement, isDisableSymbolSelector: boolean) => void;
export declare const getCurrentActiveBtn: (newActiveTool: ActiveToolTypes, toolbarContainer: HTMLElement) => Element;
export declare const initResizeObserver: (container: any, updateFun: any) => ResizeObserver;
export declare const uninstallResizeObserver: (resizeObserver: any, container: any) => void;
