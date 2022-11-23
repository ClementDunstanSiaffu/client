/** @jsx jsx */
import { jsx } from 'jimu-core';
import { IMSearchSuggestionConfig } from './type/type';
interface SearchSuggestionSettingProps {
    id: string;
    settingConfig?: IMSearchSuggestionConfig;
    hideRecentSearchSetting?: boolean;
    onSettingChange?: (settingConfig: IMSearchSuggestionConfig) => void;
}
export declare const SearchSuggestionSetting: (props: SearchSuggestionSettingProps) => jsx.JSX.Element;
export {};
