import { Expression, IMExpression } from '../types/expression';
import { groupPartsByFunction } from './utils';
import { RepeatedDataSource } from '../repeat-data-source-context';
export { groupPartsByFunction as groupExpressionPartsByFunction };
export * from './types';
export declare function resolveExpression(expression: Expression | IMExpression, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<string>;
