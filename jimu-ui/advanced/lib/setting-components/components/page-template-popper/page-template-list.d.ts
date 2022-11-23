/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core';
interface Props {
    theme: ThemeVariables;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    tabId: string;
    onTabSelect: (tabId: string) => void;
    onItemSelect: (pageJson: any) => void;
}
export declare class PageTemplateList extends React.PureComponent<Props> {
    tabsRef: any;
    onTabSelect: (tabId: any) => void;
    render(): jsx.JSX.Element;
}
export {};
