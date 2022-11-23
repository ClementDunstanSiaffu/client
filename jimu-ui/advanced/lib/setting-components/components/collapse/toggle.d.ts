import { BaseSettingCollapseProps } from './base';
import { CollapsableToggleHeaderProps } from './header';
/**
 * The `CollapsableToggle` component props.
 */
export interface CollapsableToggleProps extends Omit<BaseSettingCollapseProps, 'header'>, CollapsableToggleHeaderProps {
}
/**
 * The `CollapsableToggle` component allows users to show the collapsible panel.
 *
 * ```ts
 * import { CollapsableToggle } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare const CollapsableToggle: (props: CollapsableToggleProps) => JSX.Element;
