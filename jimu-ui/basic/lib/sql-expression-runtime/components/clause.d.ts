/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, DataSource, CodedValue, SqlClause, ClauseValueOptions, IMFieldSchema, IMSqlExpression } from 'jimu-core';
interface SqlExprClauseRuntimeProps {
    id: string;
    /**
     * The complete sql expression. It's used to get cascade sql for specific clause
     */
    expression: IMSqlExpression;
    clause: SqlClause;
    dataSource: DataSource;
    isHosted?: boolean;
    onChange: (clause: SqlClause, id: string) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class _SqlExprClauseRuntime extends React.PureComponent<SqlExprClauseRuntimeProps & IntlProps> {
    codedValues: CodedValue[];
    fieldObj: IMFieldSchema;
    hintId: string;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    getCodedValues: () => CodedValue[];
    onValueOptsChange: (valueOptions: ClauseValueOptions) => void;
    render(): jsx.JSX.Element;
}
declare const SqlExpressionClauseRuntime: import("@emotion/styled").StyledComponent<Omit<SqlExprClauseRuntimeProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default SqlExpressionClauseRuntime;
