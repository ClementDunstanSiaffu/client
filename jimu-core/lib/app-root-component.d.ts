/** @jsx jsx */
import * as React from 'react';
import { ImmutableObject, ImmutableArray } from 'seamless-immutable';
import { IMCustomThemeJson, PageJson, IMDialogJson } from './types/app-config';
import { PortalNeedToRegisterClinetId } from './types/state';
import { UrlParameters } from './types/url-parameters';
import { IntlShape } from 'react-intl';
import { LoadingType } from './types/common';
interface StateProps {
    dispatch?: any;
    appConfigLoaded: boolean;
    customTheme: IMCustomThemeJson;
    appPath: string;
    queryObject: UrlParameters;
    pages: ImmutableObject<{
        [pageId: string]: PageJson;
    }>;
    isRTL: boolean;
    isBusy: boolean;
    loadingType: LoadingType;
    dialogJson: IMDialogJson;
    currentDialogId: string;
    hasNewVersion: boolean;
    userLocaleChanged: boolean;
    hasPrivilege: boolean;
    privilegeError: string;
    loadAppConfigError: string;
    portalsNeedToRegisterClinetId: ImmutableArray<PortalNeedToRegisterClinetId>;
}
interface IntlProps {
    intl: IntlShape;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<import("react-redux").Omit<StateProps & IntlProps, "isRTL" | "hasNewVersion" | "appPath" | "queryObject" | "userLocaleChanged" | "hasPrivilege" | "privilegeError" | "loadAppConfigError" | "portalsNeedToRegisterClinetId" | "pages" | "customTheme" | "currentDialogId" | "isBusy" | "loadingType" | "dispatch" | "dialogJson" | "appConfigLoaded"> & IntlProps>> & {
    WrappedComponent: React.ComponentType<import("react-redux").Omit<StateProps & IntlProps, "isRTL" | "hasNewVersion" | "appPath" | "queryObject" | "userLocaleChanged" | "hasPrivilege" | "privilegeError" | "loadAppConfigError" | "portalsNeedToRegisterClinetId" | "pages" | "customTheme" | "currentDialogId" | "isBusy" | "loadingType" | "dispatch" | "dialogJson" | "appConfigLoaded"> & IntlProps>;
};
export default _default;
