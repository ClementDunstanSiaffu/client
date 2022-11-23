/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, CodedValue, DataSource } from 'jimu-core';
import { ClauseInputEditor } from 'jimu-ui/basic/sql-expression-runtime';
interface Props {
    inputEditorType: ClauseInputEditor;
    list: ClauseInputEditor[];
    fieldName: string;
    codedValues: CodedValue[];
    dataSource: DataSource;
    onSelect: (inputEditorType: ClauseInputEditor) => void;
    className?: string;
}
interface IntlProps {
    intl: IntlShape;
}
interface State {
    isOpen: boolean;
    isWarningShown: boolean;
    inputEditorType: string;
}
export declare class _InputEditorTypeSelector extends React.PureComponent<Props & IntlProps, State> {
    styleBtnRef: any;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    componentDidUpdate(prevProps: Props, prevState: State): void;
    onTypeSelect: (evt: any, inputEditorType: ClauseInputEditor) => void;
    changeValueOptionByInputType: (inputEditorType: ClauseInputEditor, count?: any) => void;
    toggle: () => void;
    render(): jsx.JSX.Element;
}
declare const InputEditorTypeSelector: import("@emotion/styled").StyledComponent<Omit<Props & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default InputEditorTypeSelector;
