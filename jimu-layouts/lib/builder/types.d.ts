import { LayoutItemConstructorProps, LayoutInfo, LayoutItemJson, BoundingBox } from 'jimu-core';
export interface DropHandlers {
    handleDragEnter?: (draggingItem: LayoutItemConstructorProps) => void;
    handleDragOver?: (draggingItem: LayoutItemConstructorProps, draggingElement: HTMLElement, containerRect: ClientRect, itemRect: ClientRect, clientX: number, clientY: number, speed?: number) => void;
    handleDragLeave?: (draggingItem: LayoutItemConstructorProps) => void;
    handleDrop?: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
    onPaste?: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
}
export interface LayoutItemSettingProps {
    layoutId: string;
    layoutItem: LayoutItemJson;
    additionalInfo?: any;
    style: any;
    isLockLayout: boolean;
    supportAutoSize?: boolean;
    formatMessage: (id: string) => string;
    onSettingChange: (layoutInfo: LayoutInfo, setting: any) => void;
    onStyleChange: (layoutInfo: LayoutInfo, style: any) => void;
    onPosChange: (layoutInfo: LayoutInfo, bbox: BoundingBox) => void;
}
