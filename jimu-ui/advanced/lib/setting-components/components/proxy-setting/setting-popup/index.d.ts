/** @jsx jsx */
import { React, IntlShape, ThemeVariables, ReactRedux } from 'jimu-core';
export interface ProxySettingPopupProps {
    isOpen: boolean;
    className?: string;
    onFinish: () => Promise<void>;
    onCancel: () => void;
    onToggle: () => void;
}
interface ExtraProps {
    intl: IntlShape;
    theme: ThemeVariables;
}
export declare const ProxySettingPopup: ReactRedux.ConnectedComponent<import("@emotion/styled").StyledComponent<Pick<Omit<ProxySettingPopupProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof ProxySettingPopupProps> & {
    theme?: import("jimu-core").IMThemeVariables;
}, {}, {}>, ReactRedux.Omit<Pick<Omit<ProxySettingPopupProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof ProxySettingPopupProps> & {
    theme?: import("jimu-core").IMThemeVariables;
} & {
    children?: React.ReactNode;
}, never> & ProxySettingPopupProps>;
export {};
