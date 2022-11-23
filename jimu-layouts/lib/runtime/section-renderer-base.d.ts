/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { LayoutItemProps, SectionProps, LayoutProps, StateToLayoutItemProps } from '../types';
interface OwnProps {
    layoutEntryComponent: React.ComponentClass<LayoutProps>;
    viewVisibilityContext: React.ComponentClass;
}
declare type Props = LayoutItemProps & StateToLayoutItemProps & SectionProps & OwnProps;
export declare function SectionRendererBase(props: Props): jsx.JSX.Element;
export {};
