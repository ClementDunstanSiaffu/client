/** @jsx jsx */
import { jsx, ImmutableArray, UseDataSource } from 'jimu-core';
import { SearchDataConfig } from '../type/type';
interface SearchOptionsProps {
    id: string;
    showSourcePanel: boolean;
    showNewSourceItem: boolean;
    dsConfigItemIndex: number;
    datasourceConfig: ImmutableArray<SearchDataConfig>;
    useDataSources: ImmutableArray<UseDataSource>;
    createOutputDs: boolean;
    className?: string;
    onDsConfigIdChange: (configItemIndex: number, isGeocodeSource?: boolean) => void;
    updateConfigForLayerOptions: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    hideSidePopper: () => void;
}
declare const DatasourceList: (props: SearchOptionsProps) => jsx.JSX.Element;
export default DatasourceList;
