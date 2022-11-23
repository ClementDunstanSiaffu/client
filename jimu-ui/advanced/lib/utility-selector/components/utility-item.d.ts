/** @jsx jsx */
import { jsx, UtilityJson } from 'jimu-core';
interface Props {
    utility: UtilityJson;
    onRemove: (utility: UtilityJson) => void;
}
export declare function UtilityItem(props: Props): jsx.JSX.Element;
export {};
