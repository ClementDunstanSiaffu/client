/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray, UseDataSource } from 'jimu-core';
import { RichExpressionBuilderProps } from './expression-builder';
import { PanelHeaderProps, PopperProps } from 'jimu-ui';
import { RichPluginInjectedProps } from './plugin';
import { Sources } from '../../type';
export interface ExpressionPluginProps extends RichExpressionBuilderProps, RichPluginInjectedProps, Omit<PopperProps, 'reference' | 'children'> {
    widgetId: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    header?: PanelHeaderProps;
    source?: Sources;
}
export declare const _Expression: React.ForwardRefExoticComponent<ExpressionPluginProps & React.RefAttributes<HTMLDivElement>>;
export declare const Expression: import("@emotion/styled").StyledComponent<ExpressionPluginProps & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
