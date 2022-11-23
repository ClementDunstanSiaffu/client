/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, IntlShape, UseDataSource, Expression } from 'jimu-core';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression;
    /**
     * Use widget id to get widget context, e.g. whether widget is in repeated data source context.
     */
    widgetId?: string;
    autoFocus?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onChange: (expression: Expression) => void;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
declare const ExpressionEditor: React.ForwardRefExoticComponent<Pick<Omit<Props & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof Props> & {
    theme?: import("jimu-core").IMThemeVariables;
}>;
export default ExpressionEditor;
