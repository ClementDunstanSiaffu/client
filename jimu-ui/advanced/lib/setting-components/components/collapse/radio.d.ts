import { CollapsableRadioHeaderProps } from './header';
import { BaseSettingCollapseProps } from './base';
/**
 * The `CollapsableRadio` component props.
 */
export interface CollapsableRadioProps extends Omit<BaseSettingCollapseProps, 'header'>, CollapsableRadioHeaderProps {
    /**
     * The default open state of the component.
     */
    defaultIsOpen?: boolean;
}
/**
 * The `CollapsableRadio` component allows users to show the collapsible panel.
 *
 * ```ts
 * import { CollapsableRadio } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare const CollapsableRadio: (props: CollapsableRadioProps) => JSX.Element;
