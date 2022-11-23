/// <reference types="react" />
import { React } from 'jimu-core';
import { MeasurementsUnitsInfo, MeasurementsRuntimeInfo } from '../constraints';
export interface MeasurementsContextStates {
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
}
interface MeasurementsContexAction {
    type: string;
    payload: any;
}
export declare const actionType: {
    MeasurementsRuntimeInfoChanged: string;
    MeasurementsUnitsInfosChanged: string;
};
export declare const MeasurementsRuntimeInfoChangedAction: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => {
    type: string;
    payload: MeasurementsRuntimeInfo;
};
export declare const MeasurementsUnitsInfosChangedAction: (measurementsUnitsInfos: MeasurementsUnitsInfo[]) => {
    type: string;
    payload: MeasurementsUnitsInfo[];
};
export declare const init: (MeasurementsUnitsInfos: MeasurementsUnitsInfo[]) => MeasurementsContextStates;
export declare const reducer: (state: MeasurementsContextStates, action: MeasurementsContexAction) => {
    measurementsRuntimeInfo: any;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
} | {
    measurementsUnitsInfos: any;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
};
export declare const MeasurementsContext: React.Context<{
    measurementsContextStates: MeasurementsContextStates;
    dispatchMeasurementsActions: React.Dispatch<MeasurementsContexAction>;
}>;
export declare const MeasurementsContextProvider: (props: any) => JSX.Element;
export {};
