/// <reference types="react" />
import { React } from 'jimu-core';
export interface TabContentProps {
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
}
export declare const TabContent: (props: TabContentProps) => JSX.Element;
