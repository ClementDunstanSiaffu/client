import { IMLayoutJson, LayoutItemJson, LayoutInfo } from 'jimu-core';
import { GridItemType } from 'jimu-layouts/layout-runtime';
import { SideType } from './types';
export declare function createEmptyGridItem(layout: IMLayoutJson, type: GridItemType): {
    outLayout: IMLayoutJson;
    outItem: LayoutItemJson;
};
export declare function attachToGridItem(layout: IMLayoutJson, source: string, target: string, side: SideType): IMLayoutJson;
export declare function duplicateItem(layoutInfo: LayoutInfo): void;
export declare function pendLayoutItem(layoutInfo: LayoutInfo): void;
