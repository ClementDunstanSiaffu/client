/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, OrderByOption, ThemeVariables, IMUseDataSource, ImmutableArray, UseDataSource } from 'jimu-core';
interface ExtraProps {
    intl: IntlShape;
}
export interface SortSettingOption {
    ruleOptionName: string;
    rule: OrderByOption[];
    isEditOptionName?: boolean;
}
export interface SortSettingProps {
    singleRowItemOnly?: boolean;
    optionRenderFunction?: (props: SortSettingProps, createOptionElement: (useDataSources: ImmutableArray<UseDataSource>, el: any, index: number) => any) => JSX.Element;
    onChange: (sortData: SortSettingOption[], index?: number) => void;
    useDataSource: IMUseDataSource;
    value: ImmutableArray<SortSettingOption>;
    theme?: ThemeVariables;
    className?: string;
}
export interface SortSettingState {
    option: SortSettingOption;
}
export declare const SortSetting: import("@emotion/styled").StyledComponent<Omit<SortSettingProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export {};
