/// <reference types="react" />
import { React, DataSource, IMFieldSchema, CodedValue, ClauseValueOptions, ClauseValuePair } from 'jimu-core';
interface Props {
    'aria-label?': string;
    'aria-describedby'?: string;
    value: ClauseValueOptions;
    dataSource: DataSource;
    runtime: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    isSmallSize?: boolean;
    isMultiple?: boolean;
    codedValues?: CodedValue[];
    fieldObj?: IMFieldSchema;
    sql?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare class _VIAdvancedSelect extends React.PureComponent<Props> {
    onValueChange: (valuePairs: ClauseValuePair[]) => void;
    useDynamicValues: () => boolean;
    render(): JSX.Element;
}
declare const VIAdvancedSelect: typeof _VIAdvancedSelect;
export default VIAdvancedSelect;
