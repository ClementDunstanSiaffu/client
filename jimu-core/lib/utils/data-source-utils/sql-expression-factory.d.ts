import { ClauseLogic, ClauseOperator, IMSqlExpression, SqlClause, SqlClauseSet } from '../../types/sql-expression';
/**
 * Create a SQLClause.
 */
export declare function createSQLClause(fieldName: string, operator: ClauseOperator, value: string | number, caseSensitive?: boolean): SqlClause;
/**
 * Create a SQLExpression.
 */
export declare function createSQLExpression(logicalOperator: ClauseLogic, clauses: Array<SqlClause | SqlClauseSet>): IMSqlExpression;
