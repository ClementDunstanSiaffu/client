/// <reference types="react" />
import { React, IntlShape, ClauseOperator } from 'jimu-core';
interface Props {
    value: string;
    list: ClauseOperator[];
    onChange: (operator: string) => void;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _OperatorSelector extends React.PureComponent<Props & IntlProps> {
    i18nMessage: (id: string) => string;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
export declare const OperatorSelector: React.FC<import("react-intl").WithIntlProps<Props & IntlProps>> & {
    WrappedComponent: React.ComponentType<Props & IntlProps>;
};
export {};
