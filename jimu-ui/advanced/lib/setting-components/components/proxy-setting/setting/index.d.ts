/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { NeedProxyItems, ProxySettingConfig, ProxySettingConfigs } from '../types';
interface ProxySettingProps {
    className?: string;
    proxySettingConfigs: ProxySettingConfigs;
    needProxyItems: NeedProxyItems;
    onChange: (proxySettingConfigs: ProxySettingConfigs) => void;
}
interface ExtraProps {
    intl: IntlShape;
}
export declare class _ProxySetting extends React.PureComponent<ProxySettingProps & ExtraProps, unknown> {
    columnName: {
        authorized: string;
        subscriberContent: string;
        credits: string;
        requestLimit: string;
        requestInterval: string;
    };
    onProxyChange: (sourceUrl: string, proxySettingConfig: ProxySettingConfig) => void;
    render(): JSX.Element;
}
export declare const ProxySetting: React.FC<import("react-intl").WithIntlProps<ProxySettingProps & ExtraProps>> & {
    WrappedComponent: React.ComponentType<ProxySettingProps & ExtraProps>;
};
export {};
