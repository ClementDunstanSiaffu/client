/** @jsx jsx */
import { jsx, UseDataSource, ImmutableArray } from 'jimu-core';
import { SearchDataConfig } from '../type/type';
interface LayerSourceSidePopperProps {
    id: string;
    datasourceConfig: ImmutableArray<SearchDataConfig>;
    toggle: () => void;
    onSettingChange: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    updateConfigForLayerOptions: (datasourceConfig?: ImmutableArray<SearchDataConfig>) => void;
    trigger: HTMLElement;
    isOpen: boolean;
    dsConfigItemIndex: number;
    useDataSources: ImmutableArray<UseDataSource>;
    popperFocusNode: HTMLElement;
    hideIconSetting: boolean;
    createOutputDs?: boolean;
}
declare const LocatorSourceSidePopper: (props: LayerSourceSidePopperProps) => jsx.JSX.Element;
export default LocatorSourceSidePopper;
