/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, IntlShape, DataSource, SqlExpressionMode, SqlClause, ClauseLogic, IMSqlExpression, SqlClauseSet, QueryScope, ImmutableArray, IMSqlClause, IMSqlClauseSet } from 'jimu-core';
import { SqlExpressionSizeMode } from 'jimu-ui/basic/sql-expression-runtime';
/**
 * The SqlExpressionBuilder component props
 */
export interface SqlExpressionBuilderProps {
    /**
     * Imutable sql expression.
     * default value
     */
    expression: IMSqlExpression;
    /**
     * Selected data source.
     * Feature layers, feature layers used in web maps, and feature service URLs are supported.
     */
    dataSource: DataSource;
    /**
     * Will call the function when SQL expression is changed.
     */
    onChange: (sqlExprObj: IMSqlExpression) => void;
    /**
     * Sql expression mode, includes `ALL` and `SIMPLE` mode.
     * Default value is `ALL`.
     */
    mode?: SqlExpressionMode;
    /**
     * Decide the data sourece's filters when source type is unique or multiple.
     * Default value is `IN_CONFIG_VIEW`.
     */
    queryScope?: QueryScope;
    /**
     * Valid when queryScope is `InRuntimeView`.
     * It is used to exclude filters of the current widget, for the custom filter at runtime in the future.
     * @ignore
     */
    widgetId?: string;
    /**
     * @ignore
     */
    noScrollForList?: boolean;
    style?: React.CSSProperties;
    className?: string;
    /**
     * Whether to update expression forcibly
     * @default false
     * @ignore
     */
    forceUpdateExpression?: boolean;
}
interface ExtraProps {
    theme: ThemeVariables;
}
/**
 * @ignore
 */
interface IntlProps {
    intl: IntlShape;
}
interface State {
    sizeMode: SqlExpressionSizeMode;
    isOpen: boolean;
    partsArray: ImmutableArray<SqlClause | SqlClauseSet>;
}
export declare class _SqlExpressionBuilder extends React.PureComponent<SqlExpressionBuilderProps & ExtraProps & IntlProps, State> {
    isHosted: boolean;
    constructor(props: any);
    componentDidUpdate(prevProps: SqlExpressionBuilderProps & ExtraProps & IntlProps): void;
    getDataSource: () => DataSource;
    i18nMessage: (id: string) => string;
    addClauseByType: (isSingle?: boolean, clause?: any) => void;
    changeAndOR: (logicalOperator: ClauseLogic) => void;
    onClauseChange: (clause: SqlClause | SqlClauseSet, id: string, isDuplicated: boolean) => void;
    onChange: (options: any) => void;
    /**
     * Handler ids for partsArray (clause, clause set)
     * Add:    add stable ids for every clause and clauseSet for state to render
     * Update: update ids for duplicated items.
     * Remove: remove all ids of every clause and clauseSet for saving config
     */
    getPartsArray: (partsArray: ImmutableArray<SqlClause | SqlClauseSet>, type: 'add' | 'update' | 'remove') => ImmutableArray<SqlClause | SqlClauseSet>;
    _getNewClauseOrClauseSet: (clause: IMSqlClause | IMSqlClauseSet, type: 'add' | 'update' | 'remove') => {
        clause: IMSqlClause | IMSqlClauseSet;
        isUpdated: boolean;
    };
    onResize: (width: any) => void;
    toggle: () => void;
    render(): jsx.JSX.Element;
}
/**
 * A component allowing users to get `sql` and `displaySQL` to query and display a certain data source, respectively.
 * The user can configure multiple clauses and clause sets with the AND/OR logic operator.
 * Every clause includes:
 *   field selector, operator selector, (data) source type selector with the default input style.
 *   Additional options: case sensitive and more input settings, with the latter including no user input, display label and ask for values options.
 */
export declare const SqlExpressionBuilder: import("@emotion/styled").StyledComponent<Omit<SqlExpressionBuilderProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default SqlExpressionBuilder;
