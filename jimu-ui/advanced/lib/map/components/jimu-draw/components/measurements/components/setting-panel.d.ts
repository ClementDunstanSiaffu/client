/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuSymbolType } from 'jimu-ui/advanced/map';
import { MeasurementsRuntimeInfo, MeasurementsUnitsInfo } from '../constraints';
export interface MeasurementsSettingProps {
    predefinedJimuSymbolType: JimuSymbolType;
    currentJimuSymbolType: JimuSymbolType;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
    onMInfoSingletonChanged: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => void;
}
export declare enum UnitsSettingMode {
    Coord = "coord",
    Linear = "linear",
    Areal = "areal",
    Perimeter = "perimeter"
}
export declare const SettingPanel: React.MemoExoticComponent<(props: (MeasurementsSettingProps)) => jsx.JSX.Element>;
