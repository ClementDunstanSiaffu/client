import { CollapsableCheckboxHeaderProps } from './header';
import { BaseSettingCollapseProps } from './base';
/**
 * The `CollapsableCheckbox` component props.
 */
export interface CollapsableCheckboxProps extends Omit<BaseSettingCollapseProps, 'header'>, CollapsableCheckboxHeaderProps {
    /**
     * The default open state of the component.
     */
    defaultIsOpen?: boolean;
    /**
     * The default check state of the component.
     */
    defaultChecked?: boolean;
    /**
     * Whether to close in unchecked state.
     * @default false
     */
    openForCheck?: boolean;
    /**
     * Whether to close in unchecked state.
     * @default false
     */
    closeForUncheck?: boolean;
}
/**
 * The `CollapsableCheckbox` component allows users to show the collapsible panel.
 *
 * ```ts
 * import { CollapsableCheckbox } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare const CollapsableCheckbox: (props: CollapsableCheckboxProps) => JSX.Element;
