/** @jsx jsx */
import { jsx, UseDataSource, ImmutableArray } from 'jimu-core';
import { SearchDataConfig } from '../type/type';
interface LayerSourceSidePopperProps {
    id: string;
    trigger: HTMLElement;
    isOpen: boolean;
    datasourceConfig: ImmutableArray<SearchDataConfig>;
    dsConfigItemIndex: number;
    toggle: () => void;
    updateConfigForLayerOptions: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    onSettingChange: (datasourceConfig: ImmutableArray<SearchDataConfig>) => void;
    useDataSources: ImmutableArray<UseDataSource>;
    popperFocusNode: HTMLElement;
    hideIconSetting: boolean;
}
declare const LayerSourceSidePopper: (props: LayerSourceSidePopperProps) => jsx.JSX.Element;
export default LayerSourceSidePopper;
