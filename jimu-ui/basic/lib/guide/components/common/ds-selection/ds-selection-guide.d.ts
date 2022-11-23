import { ReactRedux, ImmutableObject, ImmutableArray, DataSourceInfo, UseDataSource } from 'jimu-core';
import { GuideProps } from '../../core/guide';
interface StateToProps {
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: DataSourceInfo;
    }>;
    widgetDs: ImmutableArray<UseDataSource>;
}
export declare const DataSourceSelectionGuide: ReactRedux.ConnectedComponent<(props: GuideProps & StateToProps) => JSX.Element, ReactRedux.Omit<GuideProps & StateToProps, "dataSourcesInfo" | "widgetDs"> & GuideProps>;
export {};
