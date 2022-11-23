/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuSymbolType } from 'jimu-ui/advanced/map';
import { JimuSymbol } from '../symbols';
import { MeasurementsRuntimeInfo } from './constraints';
import type { MeasurementsUnitsInfo, MeasurementsPropsInfo } from './constraints';
import { useMeasurementsUnitsInfos } from './utils/measurements-units-infos-hooks';
export { MeasurementsPropsInfo, MeasurementsUnitsInfo, useMeasurementsUnitsInfos };
export interface Props {
    symbol: JimuSymbol;
    jimuSymbolType: JimuSymbolType;
    measurementsRuntimeInfo: MeasurementsRuntimeInfo;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
    onMeasurementsInfoChanged: (measurementsRuntimeInfo: MeasurementsRuntimeInfo) => void;
}
export declare const Measurements: React.MemoExoticComponent<(props: Props) => jsx.JSX.Element>;
