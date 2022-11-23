/** @jsx jsx */
import { jsx, UtilitiesJson, UseUtility, ImmutableObject, ImmutableArray, SupportedUtilityType } from 'jimu-core';
interface Props {
    keyword: string;
    serviceType: SupportedUtilityType;
    isMultiple: boolean;
    utilities: ImmutableObject<UtilitiesJson>;
    pattern?: RegExp;
    useUtilities?: ImmutableArray<UseUtility>;
    onChange?: (utilities: ImmutableArray<UseUtility>) => void;
}
export declare function AddedUtilityTree(props: Props): jsx.JSX.Element;
export {};
