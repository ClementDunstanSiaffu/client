/// <reference types="react" />
import { React, IntlShape, ClauseValueOptions } from 'jimu-core';
interface Props {
    'aria-label'?: string;
    'aria-describedby'?: string;
    value: ClauseValueOptions;
    runtime: boolean;
    isSmallSize?: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _VIDateRangeSelector extends React.PureComponent<Props & IntlProps> {
    onValueChange: (e: any, item: any) => void;
    stopPropagation: (evt: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
declare const VIDateRangeSelector: React.FC<import("react-intl").WithIntlProps<Props & IntlProps>> & {
    WrappedComponent: React.ComponentType<Props & IntlProps>;
};
export default VIDateRangeSelector;
