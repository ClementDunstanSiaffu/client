/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IMThemeVariables } from 'jimu-core';
import type { Template } from 'jimu-for-builder/templates';
export interface TemplateSelectorProps {
    title?: string;
    theme?: IMThemeVariables;
    templateContentStyle?: React.CSSProperties;
    templates: Template[];
    referenceElement: HTMLElement;
    onItemSelect: (item: Template) => void;
    onClose: () => void;
}
export declare function TemplateSelector(props: TemplateSelectorProps): jsx.JSX.Element;
