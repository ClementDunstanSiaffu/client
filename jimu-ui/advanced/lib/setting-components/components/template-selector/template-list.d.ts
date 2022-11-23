/** @jsx jsx */
import { jsx } from 'jimu-core';
import type { Template } from 'jimu-for-builder/templates';
export interface TemplateListProps {
    className?: string;
    templates: Template[];
    onItemSelect: (item: Template) => void;
}
export declare function TemplateList(props: TemplateListProps): jsx.JSX.Element;
