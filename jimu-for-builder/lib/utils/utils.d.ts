/// <reference types="react" />
import { IMPageJson, LayoutItemConstructorProps } from 'jimu-core';
export declare function getDefaultTocPageIcon(pageJson: IMPageJson): React.ComponentClass<React.SVGAttributes<SVGElement>>;
export declare function getDefaultTocDialogIcon(): React.ComponentClass<React.SVGAttributes<SVGElement>>;
export declare function getDefaultSectionIcon(): React.ComponentClass<React.SVGAttributes<SVGElement>>;
/**
 * Get related page id by dialog's id.
 */
export declare function getPageListByDialogId(pages: any, dialogId: string): any[];
export declare function fetchCommonWidgetList(): Promise<LayoutItemConstructorProps[]>;
/**
 * Fetch remote custom widgets from AGOL or portal.
 */
export declare function fetchRemoteCustomWidgetList(): Promise<LayoutItemConstructorProps[]>;
export declare function showRemoteCustomWidgets(): boolean;
export declare function showCustomWidgets(commonWidgetList: LayoutItemConstructorProps[]): boolean;
export declare const CUSTOM_GROUP = 7;
