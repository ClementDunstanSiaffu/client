/** @jsx jsx */
import { jsx } from 'jimu-core';
interface SearchGeneralSettingProps {
    id: string;
    hint?: string;
    onSettingChange?: (newHint: string) => void;
}
export declare const SearchGeneralSetting: (props: SearchGeneralSettingProps) => jsx.JSX.Element;
export {};
