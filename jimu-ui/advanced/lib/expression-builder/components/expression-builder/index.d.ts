/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ImmutableArray, Expression, IntlShape, ImmutableObject, UseDataSource } from 'jimu-core';
import type { ExpressionBuilderProps } from '../../types';
import { ExpressionBuilderType } from '../../types';
/**
 * Props of expression builder component.
 */
export { ExpressionBuilderProps };
interface ExtraProps {
    /**
     * @ignore
     */
    intl: IntlShape;
}
interface State {
    active: ExpressionBuilderType;
}
/**
 * The `ExpressionBuilder` component allows users to build an Expression.
 *
 * ```ts
 * import { ExpressionBuilder } from 'jimu-ui/advanced/expression-builder'
 * ```
 */
export declare class _ExpressionBuilder extends React.PureComponent<ExpressionBuilderProps & ExtraProps, State> {
    expressionFrom: {
        ATTRIBUTE: string;
        STATISTICS: string;
        EXPRESSION: string;
    };
    constructor(props: any);
    componentDidUpdate(prevProps: ExpressionBuilderProps & ExtraProps, prevState: State): void;
    onChange: (e: Expression) => void;
    getActiveExpressionFrom: () => ExpressionBuilderType;
    getTab: (tab: ExpressionBuilderType, useDataSources: ImmutableArray<UseDataSource>, expression: Expression | ImmutableObject<Expression>) => jsx.JSX.Element;
    onActiveTabChange: (types: ExpressionBuilderType) => void;
    render(): jsx.JSX.Element;
}
/**
 * This component is used to build an {@link Expression}.
 */
declare const ExpressionBuilder: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
export default ExpressionBuilder;
