/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
import { JimuDrawUIOptions, Arrangement } from './constraints';
export type { JimuDrawUIOptions };
export { Arrangement };
export interface LayoutProps {
    jimuMapView: JimuMapView;
    uiOptions: JimuDrawUIOptions;
}
export declare const Layout: React.MemoExoticComponent<(props: LayoutProps) => jsx.JSX.Element>;
