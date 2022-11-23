/** @jsx jsx */
import { jsx, UseUtility, ImmutableArray, SupportedUtilityType } from 'jimu-core';
interface Props {
    keyword: string;
    serviceType: SupportedUtilityType;
    isMultiple: boolean;
    pattern?: RegExp;
    useUtilities?: ImmutableArray<UseUtility>;
    onChange?: (utilities: ImmutableArray<UseUtility>) => void;
}
export declare function OrgUtilityTree(props: Props): jsx.JSX.Element;
export {};
