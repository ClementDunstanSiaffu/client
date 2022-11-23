/// <reference types="react" />
import { React, ImmutableArray } from 'jimu-core';
export interface SelectedDsJson {
    rootDataSourceId: string;
    dataSourceId: string;
}
interface DsListForSelectorProps {
    fromRootDsIds: ImmutableArray<string>;
    selectedDsIds: ImmutableArray<string>;
    onSelect?: (selectedDsJson: SelectedDsJson) => void;
}
export declare class DsListForSelector extends React.PureComponent<DsListForSelectorProps, unknown> {
    getContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
