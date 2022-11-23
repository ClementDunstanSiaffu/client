/** @jsx jsx */
import { jsx, ImmutableArray, UtilityJson } from 'jimu-core';
interface Props {
    utilities: ImmutableArray<UtilityJson>;
    onChange: (utilities: ImmutableArray<UtilityJson>) => void;
    onDoneClick: () => void;
}
export declare function NewUtilityPanel(props: Props): jsx.JSX.Element;
export {};
