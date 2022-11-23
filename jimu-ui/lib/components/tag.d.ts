/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
/**
 * The Tag component props.
 */
export interface TagProps {
    /**
     * Tag list data.
     */
    data: string[];
    /**
     * Callback fired when the tag list is changed.
     */
    onChange?: (data: string[], index?: number) => void;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
}
/**
 * A component used to display tags.
 */
export declare class _Tag extends React.PureComponent<TagProps> {
    static defaultProps: Partial<TagProps>;
    deleteLabel: (e: any, index: number) => void;
    render(): jsx.JSX.Element;
}
/**
 * A component used to display tags.
 */
export declare const Tag: import("@emotion/styled").StyledComponent<TagProps, {}, {}>;
