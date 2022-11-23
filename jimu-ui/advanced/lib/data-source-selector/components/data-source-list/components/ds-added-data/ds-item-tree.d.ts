/// <reference types="react" />
import { DataSource, React, ImmutableArray, IntlShape, UseDataSource } from 'jimu-core';
interface State {
    inAllToUseDss: (dataSource: Partial<DataSource>) => boolean;
    isOpen: boolean;
}
interface Props {
    ds: DataSource;
    /**
     * All [to-use data sources](../ds-add-data.tsx).
     * Use the array to get whether a data source can be list here and select.
     */
    allToUseDss: DataSource[];
    intl: IntlShape;
    widgetId: string;
    isMultiple: boolean;
    isSearching: boolean;
    useDataSources: ImmutableArray<UseDataSource>;
    disableSelection: boolean;
    disableRemove: boolean;
    onChange: (useDataSources: UseDataSource[]) => void;
}
export default class DsItemTree extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    renderDsItem: (ds: DataSource) => JSX.Element;
    renderDsLabel: (label: string, dataSource: DataSource, isRootTree: boolean) => JSX.Element;
    getChildDataSources: (ds: DataSource) => DataSource[];
    getLabel: (ds: DataSource) => string;
    toggle: () => void;
    render(): JSX.Element;
}
export {};
