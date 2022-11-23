/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape } from 'jimu-core';
import { BoxShadowStyle } from 'jimu-ui';
/**
 * The `BoxShadowSetting` component props.
 */
export interface ThemeBoxShadowSettingProps {
    /**
     * The value of this component, including the color, offset, etc.
     */
    value?: BoxShadowStyle;
    /**
     * Invoked when the box shadow value changes.
     */
    onChange?: (value: BoxShadowStyle) => void;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
}
interface ExtraProps {
    intl?: IntlShape;
}
interface State {
    isDropdownOpen: boolean;
}
/**
 * The `BoxShadowSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { BoxShadowSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare class _ThemeBoxShadowSetting extends React.PureComponent<ThemeBoxShadowSettingProps & ExtraProps, State> {
    static defaultProps: Partial<ThemeBoxShadowSettingProps & ExtraProps>;
    constructor(props: any);
    translate: (id: string) => string;
    toggleDropdown: () => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    createItem: (mode: any) => jsx.JSX.Element;
    render(): jsx.JSX.Element;
}
/**
 * The `BoxShadowSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { BoxShadowSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const ThemeBoxShadowSetting: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
export {};
