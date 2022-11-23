import { IMAppConfig, BrowserSizeMode, LayoutInfo, ImmutableObject } from 'jimu-core';
import { ParentType } from '../types';
export interface LayoutStructure {
    layouts?: {
        [layoutId: string]: {
            id: string;
            parent: string;
            parentType: ParentType;
        };
    };
    widgets?: {
        [widgetId: string]: {
            id: string;
            parent: string;
        };
    };
    sections?: {
        [sectionId: string]: {
            id: string;
            parent: string;
        };
    };
    views?: {
        [viewId: string]: {
            id: string;
            parent: string;
        };
    };
    screenGroups?: {
        [screenGroupId: string]: {
            id: string;
            parent: string;
        };
    };
    screens?: {
        [screenId: string]: {
            id: string;
            parent: string;
        };
    };
}
export declare function findParentLayoutIdInstructure(structure: ImmutableObject<LayoutStructure>, layoutId: string): string;
export declare function buildLayoutStructure(appConfig: IMAppConfig, layoutId: string, parentId: string, parentType: ParentType, sizemode: BrowserSizeMode, structure?: ImmutableObject<LayoutStructure>): ImmutableObject<LayoutStructure>;
/**
 * Find parent layout item in current page.
 * @param layoutInfo
 */
export declare function findParentLayoutItem(layoutInfo: LayoutInfo, appConfig: IMAppConfig, rootLayoutId: string, browserSizeMode: BrowserSizeMode): LayoutInfo;
