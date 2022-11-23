/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape, IMThemeVariables } from 'jimu-core';
import { BackgroundStyle, FillType, ImageParam } from 'jimu-ui';
/**
 * The `BackgroundSetting` component props.
 */
export interface BackgroundSettingProps {
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
    /**
     * Defines the inline CSS style properties.
     */
    style?: any;
}
interface ExtraProps {
    intl?: IntlShape;
    theme?: IMThemeVariables;
    theme2?: IMThemeVariables;
}
/**
 * The `BackgroundSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { BackgroundSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare class _BackgroundSetting extends React.PureComponent<BackgroundSettingProps & ExtraProps> {
    fileInput: React.RefObject<any>;
    static defaultProps: Partial<BackgroundSettingProps & ExtraProps>;
    constructor(props: any);
    openBrowseImage: (imageParam: ImageParam) => void;
    _onPositionChange: (e: any) => void;
    _onColorChange: (color: string) => void;
    translate: (id: string, values?: {
        [key: string]: any;
    }) => string;
    getFillType: () => {
        value: FillType;
        label: string;
    }[];
    render(): jsx.JSX.Element;
}
/**
 * The `BackgroundSetting` component allows users to set the backgrpund of the box.
 *
 * ```ts
 * import { BackgroundSetting } from 'jimu-ui/advanced/style-setting-components'
 * ```
 */
export declare const BackgroundSetting: import("@emotion/styled").StyledComponent<Pick<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, string | number | symbol> & {
    theme?: IMThemeVariables;
}, {}, {}>;
export {};
