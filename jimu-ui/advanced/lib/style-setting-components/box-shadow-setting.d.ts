/// <reference types="react" />
/** @jsx jsx */
import { React, IntlShape, jsx, IMThemeVariables } from 'jimu-core';
import { BoxShadowStyle } from 'jimu-ui';
export interface BoxShadowSettingProps {
    className?: string;
    /**
     * Box shadow style, including offsetX, offsetY, blur, spread and color
     */
    value?: BoxShadowStyle;
    onChange?: (value: BoxShadowStyle) => void;
}
interface ExtraProps {
    intl: IntlShape;
    theme2?: IMThemeVariables;
}
export declare class _BoxShadowSetting extends React.PureComponent<BoxShadowSettingProps & ExtraProps> {
    static defaultProps: Partial<BoxShadowSettingProps & ExtraProps>;
    _updateShadow(key: string, newValue: any): void;
    translate: (id: string) => string;
    getShadows: () => {
        name: string;
        label: string;
        min: number;
        max: number;
    }[];
    render(): jsx.JSX.Element;
}
/**
 * A react component for setting box-shadow style (offsetX, offsetY, blur, spread and color)
 */
export declare const BoxShadowSetting: import("@emotion/styled").StyledComponent<Pick<Omit<BoxShadowSettingProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | "theme2" | keyof BoxShadowSettingProps> & {
    theme?: IMThemeVariables;
}, {}, {}>;
export {};
