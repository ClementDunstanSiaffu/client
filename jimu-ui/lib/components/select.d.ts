/// <reference types="react" />
import { React } from 'jimu-core';
import { DropdownProps } from './dropdown';
import { DropdownButtonProps } from './dropdown-button';
import { DropdownMenuProps } from './dropdown-menu';
import { DropdownItemProps } from './dropdown-item';
/**
 * The Select component props.
 */
export interface SelectProps extends Omit<DropdownProps, 'value' | 'defaultValue' | 'menuRole'> {
    /**
     * See {@link DropdownButtonProps} for details.
     */
    'aria-label'?: string;
    /**
     * See {@link DropdownButtonProps} for details.
      */
    'a11y-description'?: string;
    /**
     * Default input element value. It is used when the component is not controlled.
     */
    defaultValue?: string | number;
    /**
     * Input element value. It is used to display value when the component is controlled.
     */
    value?: string | number;
    /**
     * HTML attribute passed to the `button` node.
     */
    name?: string;
    /**
     * Indicates the placeholder text.
     */
    placeholder?: string;
    /**
     * If it is `true`, the first option will be selected by default.
     */
    useFirstOption?: boolean;
    /**
     *  Exploiting properties from the internal DropdownButton component, except the property 'size'.
     * See {@link DropdownButtonProps} for details.
     */
    buttonProps?: Omit<DropdownButtonProps, 'size'>;
    /**
     * The role of select menu: `listbox`, or `menu`
     * @default listbox
     */
    menuRole?: 'listbox' | 'menu';
    /**
     * Exploiting properties from the internal DropdownMenu component.
     * See {@link DropdownMenuProps} for details.
     */
    menuProps?: DropdownMenuProps;
    /**
     * Callback fired when the value is changed.
     */
    onChange?: (evt: any, item?: React.ReactElement<DropdownItemProps>) => void;
}
/**
 * The `Select` component is used to provide the user the ability to choose an option from a list.
 *
 * ```ts
 * import { Select } from 'jimu-ui'
 * ```
 */
export declare const _Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLInputElement>>;
/**
 * The SelectOption component props.
 */
export interface SelectOptionProps extends DropdownItemProps {
    /**
     * The option value.
     */
    value?: string | number;
}
/**
 * The options of the `DropdownMenu` in the Select component.
 *
 * ```ts
 * import { Option } from 'jimu-ui'
 * ```
 */
export declare const _Option: React.ForwardRefExoticComponent<Pick<SelectOptionProps, keyof SelectOptionProps> & React.RefAttributes<HTMLElement>>;
/**
 * The `Select` component is used to provide the user the ability to choose an option from a list.
 *
 * ```ts
 * import { Select } from 'jimu-ui'
 * ```
 */
export declare const Select: import("@emotion/styled").StyledComponent<SelectProps & React.RefAttributes<HTMLInputElement>, {}, {}>;
/**
 * The options of the `DropdownMenu` in the Select component.
 *
 * ```ts
 * import { Option } from 'jimu-ui'
 * ```
 */
export declare const Option: import("@emotion/styled").StyledComponent<Pick<SelectOptionProps, keyof SelectOptionProps> & React.RefAttributes<HTMLElement>, {}, {}>;
