/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IMThemeVariables, IntlShape, IMSqlExpression, DataSource, SqlExpressionMode } from 'jimu-core';
/**
 * The SqlExpressionBuilderPopup component props
 */
export interface SqlExpressionBuilderPopupProps {
    /**
     * Sql expression mode, includes `ALL` and `SIMPLE` mode.
     * Default value is `ALL`.
     */
    mode?: SqlExpressionMode;
    /**
     * Immutable sql expression.
     */
    expression: IMSqlExpression;
    /**
     * Selected data source.
     * Feature layers, feature layers used in web maps, and feature service URLs are supported.
     */
    dataSource: DataSource;
    /**
     * Whether the popup is open.
     */
    isOpen: boolean;
    /**
     * Will call the function when toggling the popup.
     */
    toggle: (isOpen?: boolean) => void;
    /**
     * Will call the function when the popup is closed and SQL expression is changed.
     */
    onChange: (expression: IMSqlExpression) => void;
    /**
     * @ignore
     */
    className?: string;
}
interface State {
    isValid: boolean;
    isOpen: boolean;
    expression: IMSqlExpression;
}
/**
 * @ignore
 */
interface ExtraProps {
    theme: IMThemeVariables;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _SqlExpressionBuilderPopup extends React.PureComponent<SqlExpressionBuilderPopupProps & ExtraProps & IntlProps, State, {
    isOpen: boolean;
}> {
    headerRef: any;
    externalDsStyle: {
        maxWidth: string;
    };
    constructor(props: any);
    componentDidUpdate(prevProps: SqlExpressionBuilderPopupProps, prevState: State): void;
    handleToggle: (isDisplay: boolean | undefined) => void;
    handleOkBtn: () => void;
    handleCancelBtn: () => void;
    onModalClose: () => void;
    i18nMessage: (id: string) => string;
    onChange: (expression: IMSqlExpression) => void;
    render(): jsx.JSX.Element;
}
/**
 * A component that provides a modal to get `sql` and `displaySQL` to query and display a certain data source, respectively.
 * The user can configure multiple clauses and clause sets with the AND/OR logic operator.
 * Every clause includes:
 *   field selector, operator selector, (data) source type selector with the default input style.
 *   Additional options: case sensitive and more input settings, with the latter including no user input, display label and ask for values options.
 */
export declare const SqlExpressionBuilderPopup: React.ForwardRefExoticComponent<Pick<Omit<SqlExpressionBuilderPopupProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof SqlExpressionBuilderPopupProps> & {
    theme?: IMThemeVariables;
}>;
export default SqlExpressionBuilderPopup;
