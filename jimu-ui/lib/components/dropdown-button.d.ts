/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { ButtonProps } from './button';
/**
 * The DropdownButton component props.
 */
export interface DropdownButtonProps extends ButtonProps {
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * With this prop, a sr-only DOM would be created with this label before value DOM.
     */
    'aria-label'?: string;
    /**
      * To provide a description for interactive components for accessibility purposes.
      * `aria-describedy` has a high priority than `a11y-description`.
      */
    'a11y-description'?: string;
    /**
     * Whether to show an arrow icon at the end of the button.
     * The icon can be customized by assigning the property with an element instead.
     * @default true
     */
    arrow?: boolean | React.ReactElement;
    /**
     * Whether to show a dot icon at the right-bottom of the button.
     * Valid only when `arrow` is false and `icon` is true.
     * @default false
     */
    dot?: boolean | React.ReactElement;
    /**
     * Reference to the root html element.
     */
    innerRef?: React.Ref<HTMLElement>;
}
interface IntlProps {
    intl: IntlShape;
}
/**
 * The `DropdownButton` component is a button element in a `Dropdown` component to toggle the dropdown menu.
 *
 * Please use this component together with `Dropdown`, `DropdownMenu` and `DropdownItem`.
 *
 * ```ts
 * import { DropdownButton } from 'jimu-ui'
 * ```
 */
export declare class _DropdownButton extends React.PureComponent<DropdownButtonProps & IntlProps> {
    static contextType: React.Context<{}>;
    defaultLabel: string;
    defaultDescId: string;
    static defaultProps: Partial<DropdownButtonProps>;
    constructor(props: any);
    getDescribedByIds: (props: any) => any;
    onClick(e: any): void;
    onKeyDown: (evt: any) => void;
    onKeyUp: (evt: any) => void;
    setRef: (ref: any, node: any) => void;
    render(): JSX.Element;
}
/**
 * The `DropdownButton` component is a button element in a `Dropdown` component to toggle the dropdown menu.
 *
 * Please use this component together with `Dropdown`, `DropdownMenu` and `DropdownItem`.
 *
 * ```ts
 * import { DropdownButton } from 'jimu-ui'
 * ```
 */
export declare const DropdownButton: React.ForwardRefExoticComponent<DropdownButtonProps & React.RefAttributes<HTMLElement>>;
export {};
