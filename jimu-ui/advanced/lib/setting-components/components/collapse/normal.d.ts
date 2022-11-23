import { CollapsableHeaderProps } from './header';
import { BaseSettingCollapseProps } from './base';
/**
 * The `SettingCollapse` component props.
 */
export interface SettingCollapseProps extends Omit<BaseSettingCollapseProps, 'header'>, CollapsableHeaderProps {
}
/**
 * The `SettingCollapse` component allows users to show the collapsible panel.
 *
 * ```ts
 * import { SettingCollapse } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare const SettingCollapse: (props: SettingCollapseProps) => JSX.Element;
/**
 * The `UnControlledSettingCollapse` component props.
 */
export declare type UnControlledSettingCollapseProps = SettingCollapseProps;
/**
 * The `UnControlledSettingCollapse` is an uncontrolled component which allows users to show the collapsible panel.
 *
 * ```ts
 * import { UnControlledSettingCollapse } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare const UnControlledSettingCollapse: (props: SettingCollapseProps) => JSX.Element;
