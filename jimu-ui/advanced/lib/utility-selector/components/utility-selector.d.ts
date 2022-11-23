/** @jsx jsx */
import { jsx, UseUtility, ImmutableArray, SupportedUtilityType } from 'jimu-core';
export interface UtilitySelectorProps {
    pattern?: RegExp;
    type?: SupportedUtilityType;
    isMultiple?: boolean;
    showRemove?: boolean;
    closePopupOnSelect?: boolean;
    useUtilities?: ImmutableArray<UseUtility>;
    onChange?: (utilities: ImmutableArray<UseUtility>) => void;
}
export declare function UtilitySelector(props: UtilitySelectorProps): jsx.JSX.Element;
