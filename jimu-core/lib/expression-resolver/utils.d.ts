import { ExpressionPart, ExpressionFunctions, ExpressionPartGroup } from '../types/expression';
import { FeatureLayerQueryParams } from '../data-sources/data-source-interface';
import { RepeatedDataSource } from '../repeat-data-source-context';
import { ImmutableArray } from 'seamless-immutable';
import { FormatNumberOptions } from 'react-intl';
export declare function calculatePostfixExpressionWithoutFunction(parts: ExpressionPart[], repeatedDataSource: RepeatedDataSource | RepeatedDataSource[], numberFormat: FormatNumberOptions): string;
export declare function resolveFunction(part: ExpressionPartGroup, repeatedDataSource: RepeatedDataSource | RepeatedDataSource[]): Promise<number>;
export declare function getQueryParams(part: ExpressionPart, func: ExpressionFunctions): FeatureLayerQueryParams;
/**
 * Put parameter field parts into function parts.
 * For example, if the input is.
 * [{
 *  "type": "FUNCTION",
 *  "exp": "AVERAGE"
 * },
 * {
 *  "type": "OPERATOR",
 *  "exp": "("
 * },
 * {
 *  "type": "FIELD",
 *  "exp": "{OBJECTID}",
 *  "dataSourceId": "dataSource_1",
 *  "jimuFieldName": "OBJECTID"
 * },
 * {
 *  "type": "OPERATOR",
 *  "exp": ")"
 * }]
 *
 * The output will be.
 * [{
 *   "type": "FUNCTION",
 *   "exp": "AVERAGE",
 *   "parts": [{
 *     "type": "FIELD",
 *     "exp": "{OBJECTID}",
 *     "dataSourceId": "dataSource_1",
 *     "jimuFieldName": "OBJECTID"
 *   }]
 * }]
 */
export declare function groupPartsByFunction(parts: ExpressionPart[] | ImmutableArray<ExpressionPart>): ExpressionPartGroup[];
export declare function getPostfixParts(parts: ExpressionPartGroup[]): ExpressionPartGroup[];
export declare function getStringOrNumberPartFromExp(e: string | number): ExpressionPart;
