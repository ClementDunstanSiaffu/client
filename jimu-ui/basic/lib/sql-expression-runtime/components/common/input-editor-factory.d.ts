/// <reference types="react" />
import { JimuFieldType, DataSource, CodedValue, ClauseOperator, SqlExpressionMode, SqlClause, ClauseSourceType, ClauseValueOptions, ClauseValuePair, SqlClauseSet, IMFieldSchema } from 'jimu-core';
import { ClauseInputEditor } from './default';
import { InputEditorProps } from './input-editor-render';
export declare function getInputEditor(props: InputEditorProps): JSX.Element;
export declare function getDefaultClauseValObj(sourceType?: ClauseSourceType, inputEditor?: string, value?: ClauseValuePair[], isValid?: boolean): ClauseValueOptions;
export declare function getDefaultSingleClause(): SqlClause;
export declare function getDefaultClauseSet(): SqlClauseSet;
export declare function isCaseSensitiveSupportedByOperatorAndSourceType(operator: ClauseOperator, sourceType: ClauseSourceType): boolean;
export declare function isAskForValueSupportedByOperatorAndSourceType(operator: ClauseOperator, sourceType: ClauseSourceType): boolean;
export declare function getCodedValueInputEditorsByOperatorAndSourceType(operator: ClauseOperator, sourceType: ClauseSourceType): ClauseInputEditor[];
export declare function getClauseValObjByOperator(operator: ClauseOperator, dataSource?: DataSource, jimuFieldName?: string): ClauseValueOptions;
export declare type ClauseDisplayFormat = {
    [sourceType in ClauseSourceType]?: ClauseInputEditor[];
};
export interface ClauseDisplayTypesAndCodedValues {
    ['displayTypes']: ClauseDisplayFormat;
    ['codedValues']: CodedValue[];
    ['defaultSourceType']: ClauseSourceType;
    ['defaultInputEditorType']: ClauseInputEditor;
}
export declare function getDisplayTypes(mode: SqlExpressionMode, field: IMFieldSchema, operator: ClauseOperator, dataSource: DataSource, jimuFieldName: string): ClauseDisplayTypesAndCodedValues;
export interface InputEditorTypesAndCodedValues {
    inputEditorTypes: ClauseInputEditor[];
    codedValues: CodedValue[];
}
export declare function getInputEditorListByOperatorAndSourceType(operator: ClauseOperator, sourceType?: ClauseSourceType, dataSource?: DataSource, jimuFieldName?: string): InputEditorTypesAndCodedValues;
export declare function getJimuFieldTypeByEsriType(esriFieldType: any): JimuFieldType;
export declare function getOperatorsByEsriType(esriFieldType: any, isHosted: any): ClauseOperator[];
