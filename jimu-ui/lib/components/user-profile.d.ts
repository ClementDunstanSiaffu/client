/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, SerializedStyles, IntlShape, IMUser } from 'jimu-core';
export interface UserProfileProps {
    /** The user */
    user: IMUser;
    /** The portal */
    portalUrl: string;
    /** The CSS class */
    className?: string;
    /** Whether the app is saved. If the app is not saved, when user click signOut, an alert will be poped*/
    isAppSaved?: boolean;
    helpUrl: string;
}
interface ThemeProp {
    theme: ThemeVariables;
}
interface IntlProp {
    intl: IntlShape;
}
interface State {
    accountPopoverOpen: boolean;
    isShowWindowLeaveAlert: boolean;
    isShowLeaveAlertPopup: boolean;
}
export declare class _UserProfile extends React.PureComponent<UserProfileProps & ThemeProp & IntlProp, State> {
    dropdownMenuCon: HTMLElement;
    __unmount: boolean;
    constructor(props: any);
    nls: (id: string) => string;
    signInOut: () => void;
    signOut: () => void;
    signIn: () => void;
    toggleAccount: () => void;
    getMenuInnerStyle: (theme: ThemeVariables) => SerializedStyles;
    getTrainingUrl: () => string;
    handleToggleForLeaveAlertPopup: (isOk: any) => void;
    doSignInOut: () => void;
    render(): jsx.JSX.Element;
}
export declare const UserProfile: import("@emotion/styled").StyledComponent<Pick<Omit<UserProfileProps & ThemeProp & IntlProp, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof UserProfileProps> & {
    theme?: import("jimu-core").IMThemeVariables;
}, {}, {}>;
export {};
