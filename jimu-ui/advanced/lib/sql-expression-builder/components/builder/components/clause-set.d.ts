/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, DataSource, SqlClause, ClauseLogic, SqlClauseSet, SqlExpressionMode, IMSqlClause } from 'jimu-core';
import { SqlExpressionSizeMode } from 'jimu-ui/basic/sql-expression-runtime';
interface SqlExprClauseSet {
    mode: SqlExpressionMode;
    sizeMode: SqlExpressionSizeMode;
    clauseSet: SqlClauseSet;
    dataSource: DataSource;
    isHosted?: boolean;
    onChange: (clauseSet: SqlClauseSet, isDuplicated?: boolean) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _SqlExprClauseSet extends React.PureComponent<SqlExprClauseSet & IntlProps, unknown> {
    LogicalOperator: ClauseLogic;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    addClause: (clause: SqlClause | IMSqlClause) => void;
    duplicateClauseSet: () => void;
    deleteClauseSet: () => void;
    changeAndOR: (logicalOperator: ClauseLogic) => void;
    onClauseChange: (clause: SqlClause, id: string, isDuplicated: boolean) => void;
    onChange: (options: any) => void;
    render(): jsx.JSX.Element;
}
declare const SqlExpressionClauseSet: import("@emotion/styled").StyledComponent<Omit<SqlExprClauseSet & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default SqlExpressionClauseSet;
