/// <reference types="react" />
import { React, IMFieldSchema, IntlShape, ClauseValueOptions } from 'jimu-core';
interface Props {
    'aria-label'?: string;
    'aria-describedby'?: string;
    value: ClauseValueOptions;
    fieldObj: IMFieldSchema;
    runtime: boolean;
    onChange: (valueObj: ClauseValueOptions) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    DatePicker: any;
    displayUI: string;
}
export declare class _VIDoubleDateTimePicker extends React.PureComponent<Props & IntlProps, State> {
    value1: ClauseValueOptions;
    value2: ClauseValueOptions;
    i18nMessage: (id: string) => string;
    onChange: () => void;
    render(): JSX.Element;
}
declare const VIDoubleDateTimePicker: import("@emotion/styled").StyledComponent<Omit<Props & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default VIDoubleDateTimePicker;
