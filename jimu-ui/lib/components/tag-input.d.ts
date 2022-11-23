/** @jsx jsx */
import { jsx } from 'jimu-core';
import { DropdownMenuProps } from './dropdown-menu';
/**
 * The TagInput component props.
 */
export interface TagInputProps {
    /**
     * tag list data.
     */
    data: string[];
    /**
     * The input placeholder is Add ${name}.
     */
    name: string;
    /**
     * The select list data.
     */
    selectListData?: string[];
    /**
     * If `false`, the select dropdown list will hide.
     * @default true
     */
    isShowSelectList?: boolean;
    /**
     * Callback fired when the tag value is changed.
     */
    onChange?: (data: string[]) => void;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Applies to the internal DropdownMenu component.
     * See {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
}
/**
 * A component used to generate tags by inputting text.
 */
export declare const _TagInput: (props: TagInputProps) => jsx.JSX.Element;
/**
 * A component used to generate tags by inputting text.
 */
export declare const TagInput: import("@emotion/styled").StyledComponent<TagInputProps, {}, {}>;
