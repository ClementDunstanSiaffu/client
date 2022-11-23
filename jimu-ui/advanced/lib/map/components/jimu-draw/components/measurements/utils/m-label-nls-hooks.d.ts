import { MeasurementsRuntimeInfo } from '../constraints';
export interface MeasurementsNls {
    location: string;
    length: string;
    area: string;
    coordUnit: string;
    linearUnit: string;
    arealUnit: string;
    perimeterUnit: string;
}
export declare const useMeasurementsLabelNls: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => MeasurementsNls;
