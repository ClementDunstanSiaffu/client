import { IMDialogJson, IMDialogSizeMode } from '../../types/app-config';
import { BrowserSizeMode } from 'jimu-core/lib/types/common';
export declare const RESIZE_HANDLER_SIZE = "16px";
export declare function getResizeHandlers(isDesignMode: any, dialogSizeMode: IMDialogSizeMode, Icon: any): any[];
export declare function bindResizeHandler(interact: any, resizeRef: HTMLDivElement, dialogJson: IMDialogJson, browserSizeMode: BrowserSizeMode, getAppConfigAction: any, setResizeEnd: any): Interact.Interactable;
