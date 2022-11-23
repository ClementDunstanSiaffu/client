/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * Props for the `SettingSection` component.
 */
export interface SettingSectionProps {
    /**
     * To provide a role for section
     */
    role?: string;
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * If lacking, provide an aria-label.
     */
    'aria-label'?: string;
    /**
     * Defines the title text for the setting section.
     */
    title?: string | JSX.Element;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Defines the style added to the element.
     */
    style?: any;
}
/**
 * The unstyled version of the SettingSection component.
 * Please use {@link SettingSection} instead.
 */
export declare class _SettingSection extends React.PureComponent<SettingSectionProps> {
    render(): JSX.Element;
}
/**
 * A layout component used to display setting content as a section.
 * Use this component to wrap SettingRow component(s).
 *
 * #### Example:
 * ```typescript
 * import { TextInput } from 'jimu-ui';
 * import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
 * <SettingSection title="General Info">
 *  <SettingRow label="Widget Name" flow="no-wrap">
 *    <TextInput/>
 *  </SettingRow>
 *  <SettingRow label="Widget Description" flow="wrap">
 *    <TextInput type="textarea"/>
 *  </SettingRow>
 * </SettingSection>
 * ```
 * #### Props:
 * See {@link SettingSectionProps} for more details.
 */
export declare const SettingSection: import("@emotion/styled").StyledComponent<SettingSectionProps, {}, {}>;
