/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ImmutableArray } from 'jimu-core';
import { DropdownMenuProps } from './dropdown-menu';
import { DropdownItemProps } from './dropdown-item';
import { DropdownButtonProps } from './dropdown-button';
/**
 * The MultiSelectItem object.
 */
export interface MultiSelectItem {
    /**
     * Identity value of the item
     */
    value: string | number;
    /**
     * Label assigned for the item
     */
    label: string;
    /**
     * Customize the content using the callback function
     */
    render?: (item: MultiSelectItem, values?: ImmutableArray<string | number>) => any;
}
/**
 * The MultiSelect component props.
 */
export interface MultiSelectProps {
    /**
     * See {@link DropdownButtonProps} for details.
     */
    'aria-label'?: string;
    /**
     * See {@link DropdownButtonProps} for details.
     */
    'a11y-description'?: string;
    /**
     * Options for selecting. and the contents of each option
     * can be customized by rendering method
     */
    items: ImmutableArray<MultiSelectItem>;
    /**
     * Selected values array
     */
    values?: ImmutableArray<string | number>;
    /**
     * The values of the items selected by default
     */
    defaultValues?: ImmutableArray<string | number>;
    /**
     * add a class name for multi-select
     */
    className?: string;
    /**
     * The hint text displayed when the input is empty
     */
    placeholder?: string;
    /**
     * Whether to put the selected items to body
     */
    appendToBody?: boolean;
    /**
     * Defines the size of the dropdown button. The value will be 'default' when it is undefined.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * if it is `true`, the dropdown will fill the width of its parent container.
     */
    fluid?: boolean;
    /**
     * See {@link DropdownProps} for details.
     */
    autoWidth?: boolean;
    /**
     * Control multi-select's z-index,
     * but if the value of appendTo is "body", it'll be invalid
     */
    zIndex?: number;
    /**
     * Exploiting properties from the internal DropdownMenu component.
     * See {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     * The DropdownItem component props.
     * See {@link DropdownItemProps} for details.
     */
    menuItemProps?: DropdownItemProps;
    /**
     * Exploiting properties from the internal DropdownButton component.
     * Remove the property `size`
     * Add the property `showDynamicTitle` to show the current dropdown value as title.
     * Property `title` has a higher priority over `showDynamicTitle`
     * See {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'> & {
        /**
         * Whether to show dynamic title.
         * @default false
         */
        showDynamicTitle?: boolean;
    };
    /**
     *  Display the result text in the input box. Examples of the result texts are as "label1, label2, label3..."
     * */
    displayByValues?: (values: Array<string | number>) => string;
    /**
     * Callback fired when the item is clicked.
     * @event
     */
    onClickItem?: (evt: React.MouseEvent, value: string | number, selectedValues: Array<string | number>) => void;
}
interface Stats {
    isOpen: boolean;
    valueLabels: any;
    values: ImmutableArray<string | number>;
}
/**
 * The `MultiSelect` component is used to select multiple options from a `DropdownMenu`.
 *
 * ```ts
 * import { MultiSelect } from 'jimu-ui'
 * ```
 */
export declare class _MultiSelect extends React.PureComponent<MultiSelectProps, Stats> {
    divRef: HTMLDivElement;
    static defaultProps: Partial<MultiSelectProps>;
    constructor(props: any);
    componentDidUpdate(preProps: any): void;
    getValueLabels: () => {};
    onDropDownToggle: (evt: any) => void;
    handleMenuClick: (evt: any) => void;
    onItemClick: (evt: any, value: any) => void;
    getValueLabel: (value: any) => string | number;
    getShowText: () => string;
    getDropdownMenuStyle: () => import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
/**
 * The `MultiSelect` component is used to select multiple options from a `DropdownMenu`.
 *
 * ```ts
 * import { MultiSelect } from 'jimu-ui'
 * ```
 */
export declare const MultiSelect: import("@emotion/styled").StyledComponent<any, {}, {}>;
export {};
