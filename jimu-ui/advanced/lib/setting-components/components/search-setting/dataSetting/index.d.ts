/** @jsx jsx */
import { jsx, UseDataSource, ImmutableArray, DataSourceJson } from 'jimu-core';
import { SearchDataConfig, SearchDataType } from '../type/type';
interface SearchDataSettingProps {
    /**
     * Widget id
    */
    id: string;
    datasourceConfig?: ImmutableArray<SearchDataConfig>;
    useDataSources?: ImmutableArray<UseDataSource>;
    /**
     * Portal url of current app
    */
    portalUrl?: string;
    /**
     * The type of data service
     * @param Both Display all data setting
     * @param GeocodeService Only display data setting of geocode service
     * @param FeatureService Only display data setting of feature service
    */
    searchDataSettingType?: SearchDataType;
    /**
     * Whether to create outputds by geocode service
    */
    createOutputDs?: boolean;
    /**
     * Whether to hide icon settings
     */
    hideIconSetting?: boolean;
    /**
     * Callback fired when datasourceConfig change.
     * @event
    */
    onSettingChange?: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    /**
     * The method of create output datasources
     * @event
    */
    onOutputDsSettingChange?: (dataSourceJson: DataSourceJson[], datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
}
export declare const SearchDataSetting: (props: SearchDataSettingProps) => jsx.JSX.Element;
export {};
