/** @jsx jsx */
import { jsx, UtilityJson, IMUtilitiesJson, ImmutableArray } from 'jimu-core';
interface Props {
    utilities: IMUtilitiesJson;
    onChange: (utilities: IMUtilitiesJson) => void;
    onBatchDone?: () => void;
    onBatchUpdate?: (utilityJsons: ImmutableArray<UtilityJson>) => void;
    immediate?: boolean;
    batchUtilityJsons?: ImmutableArray<UtilityJson>;
    isMultiple?: boolean;
}
export declare function AddUtilityTabs(props: Props): jsx.JSX.Element;
export {};
