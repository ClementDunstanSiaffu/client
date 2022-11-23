/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuMapView } from 'jimu-arcgis';
export interface LayoutProps {
    jimuMapView: JimuMapView;
    disableSymbolSelector: boolean;
}
export declare const PanelLayout: React.MemoExoticComponent<(props: LayoutProps) => jsx.JSX.Element>;
