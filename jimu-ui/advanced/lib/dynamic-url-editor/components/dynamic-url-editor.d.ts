/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, UseDataSource, Immutable, WidgetJson } from 'jimu-core';
import { Editor, Formats, RichSelection } from 'jimu-ui/advanced/rich-text-editor';
import { ExpressionBuilderType as ExpBuilderType } from 'jimu-ui/advanced/expression-builder';
export interface DynamicUrlEditorProps {
    className?: string;
    editorRef?: React.MutableRefObject<Editor> | ((Editor: any) => void);
    useDataSourcesEnabled: boolean;
    useDataSources: Immutable.ImmutableArray<UseDataSource>;
    widgetId: string;
    value: string;
    selectWidgets?: WidgetJson[];
    onChange: (e: string) => void;
}
export declare type DynamicUrlEditorWrapperProps = DynamicUrlEditorProps & {
    RichExpressionBuilder: (props: any) => React.ReactElement;
    useEditorSelectionFormats: (editor: any, useAllSection?: boolean) => [Formats, RichSelection];
    richTextEditorUtils: any;
    RichEditorCore: any;
    ExpressionBuilderType: typeof ExpBuilderType;
    Delta: any;
    useMixinKeyboardEnterModules: any;
};
export declare const _DynamicUrlEditor: (props: DynamicUrlEditorWrapperProps) => React.ReactElement;
export declare const DynamicUrlEditor: import("@emotion/styled").StyledComponent<DynamicUrlEditorProps, {}, {}>;
