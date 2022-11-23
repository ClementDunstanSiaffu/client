/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, IMThemeVariables } from 'jimu-core';
import { BackgroundStyle } from 'jimu-ui';
/**
 * The `ThemeBackgroundSetting` component props.
 */
export interface ThemeBackgroundSettingProps {
    /**
     * The value of this component, including the background color, background image, and the fill type of background image
     */
    background?: BackgroundStyle;
    /**
     * Invoked when the background value changes.
     */
    onChange?: (background: BackgroundStyle) => void;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
}
interface ExtraProps {
    intl?: IntlShape;
    theme2?: IMThemeVariables;
}
interface State {
    isDropdownOpen: boolean;
}
/**
 * The `ThemeBackgroundSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { ThemeBackgroundSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare class _ThemeBackgroundSetting extends React.PureComponent<ThemeBackgroundSettingProps & ExtraProps, State> {
    static defaultProps: Partial<ThemeBackgroundSettingProps & ExtraProps>;
    constructor(props: any);
    toggleDropdown: () => void;
    getStyle: (color: any) => import("jimu-core").SerializedStyles;
    createItem: (color: any) => jsx.JSX.Element;
    translate: (id: string) => string;
    render(): jsx.JSX.Element;
}
/**
 * The `ThemeBackgroundSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { ThemeBackgroundSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const ThemeBackgroundSetting: React.ForwardRefExoticComponent<Pick<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, string | number | symbol> & {
    theme?: IMThemeVariables;
}>;
export {};
