/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IMThemeVariables } from 'jimu-core';
export interface PageTemplatePopperProps {
    theme: IMThemeVariables;
    referenceElement: HTMLElement;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    onItemSelect: (item: any) => void;
    onClose: () => void;
}
interface State {
    open: boolean;
    tabId: string;
}
export declare class PageTemplatePopper extends React.PureComponent<PageTemplatePopperProps, State> {
    constructor(props: any);
    togglePopper: () => void;
    tabSelect: (tabId: string) => void;
    onItemSelect: (templateJson: any) => void;
    render(): jsx.JSX.Element;
}
export {};
