/// <reference types="react" />
import { DataSource, React, ImmutableArray, IntlShape, ImmutableObject, DataSourceJson, UseDataSource, IMDataSourceJson } from 'jimu-core';
import { AllDataSourceTypes } from '../../../../types';
import { DataSourceTab } from '../../utils';
interface State {
    toUseRootDss: DataSource[];
    toUseChildDss: {
        [rootDsId: string]: DataSource[];
    };
    hasErrorSelectedDss: boolean;
}
interface Props {
    isDataSourceInited: boolean;
    dataSources: ImmutableObject<{
        [dsId: string]: DataSourceJson;
    }>;
    types: ImmutableArray<AllDataSourceTypes>;
    selectedTypes: ImmutableArray<AllDataSourceTypes>;
    intl: IntlShape;
    searchValue: string;
    widgetId: string;
    isMultiple: boolean;
    hideTypeDropdown: boolean;
    hideAllOptionOfTypeDropdown: boolean;
    fromRootDsIds: ImmutableArray<string>;
    fromDsIds: ImmutableArray<string>;
    useDataSources: ImmutableArray<UseDataSource>;
    disableSelection: boolean;
    disableRemove: boolean;
    hideDs: (dsJson: IMDataSourceJson) => boolean;
    removeDataTab: (tab: DataSourceTab) => void;
    addDataTab: (tab: DataSourceTab) => void;
    onChange: (useDataSources: UseDataSource[]) => void;
}
/**
 * Prepare all needed data in the component, including to-use root data sources, to-use child data sources (including descendant data sources).
 * **To-use data source** means the data source meets all of the following conditions and it can be list here:
 * 1. type of the data source is in `selectedTypes` array (if there is `selectedTypes`), or, in `types` array
 * 2. label of the data source matches the `searchValue` (if there is `searchValue`)
 * 3. parent data source of the data source is in `fromRootDsIds` array (if there is `fromRootDsIds`)
 * 4. the data source is in `fromDsIds` array (if there is `fromDsIds`)
 *
 * The reasons why prepare the needed data here rather than in the component which use the data directly:
 * 1. can not know whether to show the empty icon util we get all the needed data, that is to say,
 *    the empty icon should show only when there isn't any data can be list
 * 2. there are multilple conditions (see above) to decide whether a data source can be list here,
 *    preparing data before use it can prevent from executing these logic multiple times
 */
export default class DataSourceAddedData extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    componentWillUnmount(): void;
    initData: () => void;
    setHasErrorDss: (hasErrorDss: boolean) => void;
    setToUseDataSources: (toUseTypes: ImmutableArray<AllDataSourceTypes>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, hideDs: (dsJson: IMDataSourceJson) => boolean, searchValue: string) => void;
    getRootDss: () => DataSource[];
    getToUseRootDss: (toUseTypes: ImmutableArray<string>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, hideDs: (dsJson: IMDataSourceJson) => boolean, searchValue: string) => DataSource[];
    getToUseChildDss: (toUseTypes: ImmutableArray<string>, fromRootDsIds: ImmutableArray<string>, fromDsIds: ImmutableArray<string>, hideDs: (dsJson: IMDataSourceJson) => boolean, searchValue: string) => Promise<{
        [rootDsId: string]: DataSource[];
    }>;
    isValid: (ds: DataSource, fromDsIds: ImmutableArray<string>, hideDs: (dsJson: IMDataSourceJson) => boolean, searchValue: string) => boolean;
    getWhetherShowList: () => boolean;
    getWhetherShowRootDss: () => boolean;
    getWhetherShowChildDss: () => boolean;
    render(): JSX.Element;
}
export {};
