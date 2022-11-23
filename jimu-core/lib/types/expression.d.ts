import { FormatNumberOptions } from 'react-intl';
import { ImmutableObject } from 'seamless-immutable';
/**
 * Single expression.
 * A single expression may contain multiple parts.
 * For exmaple,
 * ```
 * // avg({field1})
 * {
 *  name: 'exp1',
 *  parts: [
 *    { type: FUNCTION, exp: 'AVERAGE' },
 *    { type: OPERATOR, exp: '(' },
 *    { type: FIELD, exp: '{field1}', dataSourceId: ds1, jimuFieldName: field1 },
 *    { type: OPERATOR, exp: ')' }
 *   ]
 * }
 * ```
 */
export interface Expression {
    /**
     * Name of the expression.
     */
    name: string;
    /**
     * Expression parts.
     */
    parts: ExpressionPart[];
    /**
     * Format of the number results.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat for more details.
     */
    numberFormat?: FormatNumberOptions;
}
/**
 * Single immutable expression.
 */
export declare type IMExpression = ImmutableObject<Expression>;
/**
 * Multiple expressions.
 */
export interface ExpressionMap {
    /**
     * One expression.
     */
    [expressionId: string]: Expression;
}
/**
 * Multiple immutable expressions.
 */
export declare type IMExpressionMap = ImmutableObject<ExpressionMap>;
/**
 * @ignore
 */
export declare type ExpressionPartGroup = ExpressionPart & {
    parts?: ExpressionPart[];
};
/**
 * A part of one single expression.
 */
export interface ExpressionPart {
    /**
     * Expression part type.
     */
    type: ExpressionPartType;
    /**
     * The expression part shows in user interface.
     */
    exp: string;
    /**
     * Data source used by the expression part.
     */
    dataSourceId?: string;
    /**
     * Field used by the expression part.
     */
    jimuFieldName?: string;
    /**
     * We can get a feature set from one data source, even with only one feature in the set.
     * When a single feature is needed, we will use the first line of the feature set as default.
     * However, if `isFromRepeatedDataSourceContext` is `true`, we will use the feature provided by the repeated data source context.
     */
    isFromRepeatedDataSourceContext?: boolean;
}
/**
 * Types of the expression part.
 */
export declare enum ExpressionPartType {
    /**
     * The part is a string.
     */
    String = "STRING",
    /**
     * The part is a number.
     */
    Number = "NUMBER",
    /**
     * The part is a layer's field and it can be resolved to the field's value when associated with a specific record (e.g. selected record).
     */
    Field = "FIELD",
    /**
     * The part is a statistical function, e.g. average, sum.
     */
    Function = "FUNCTION",
    /**
     * The part is an operator, e.g. +, -.
     */
    Operator = "OPERATOR",
    /**
     * @ignore
     */
    Unknown = "UNKNOWN"
}
/**
 * Supported expression functions.
 */
export declare enum ExpressionFunctions {
    Average = "AVERAGE",
    Count = "COUNT",
    Sum = "SUM",
    Max = "MAX",
    Min = "MIN"
}
