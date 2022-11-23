import { React, ImmutableArray, UseDataSource } from 'jimu-core';
import { Sources } from '../../type';
import { RichPluginInjectedProps } from './plugin';
import { ExpressionBuilderType } from 'jimu-ui/advanced/expression-builder';
export interface RichExpressionBuilderProps extends RichPluginInjectedProps {
    className?: string;
    widgetId: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    source?: Sources;
    types?: ImmutableArray<ExpressionBuilderType>;
    editable?: boolean;
    autoInsertSpace?: boolean;
}
export declare const RichExpressionBuilder: (props: RichExpressionBuilderProps) => React.ReactElement;
