/// <reference types="react" />
/** @jsx jsx */
import { React, IMAppConfig, LinkType, ImmutableArray, jsx, ThemeVariables, UseDataSource, BrowserSizeMode, ReactRedux, IntlShape } from 'jimu-core';
import { IMLinkParam, OpenTypes, LinkParam } from '../../types';
/**
 * The LinkSelectorContent props
 */
export interface LinkSelectorContentProps {
    /**
     * @ignore
     * Only used by theme.
     */
    className?: string;
    /**
     * The setting result.
     * `IMLinkParam` is an interface.
     *
     * ```ts
     * import { IMLinkParam } from 'jimu-ui/advanced/setting-components'
     * ```
     */
    linkParam?: IMLinkParam;
    /**
     * Callback when setting result is changed.
     */
    onSettingConfirm?: (linkParam: IMLinkParam) => void;
    /**
     * Use widget id to get widget context, e.g. whether widget is in repeated data source context.
     */
    widgetId?: string;
    /**
     * @ignore
     */
    isLinkPageSetting?: boolean;
    /**
     * Widget's `useDataSources`, which means data sources that widget is using.
     * If pass `useDataSources`, link can use these data sources to build `Expression` **(see `jimu-core` API documentation)**.
     *
     * ```ts
     * import { UseDataSource } from 'jimu-core'
     * ```
     */
    useDataSources?: ImmutableArray<UseDataSource>;
    /**
     * Hide some types of link.
     *
     * ```ts
     * import { LinkType } from 'jimu-core'
     * ```
     */
    hiddenLinks?: ImmutableArray<LinkType>;
    /**
     * Link targets can be set.
     * `OpenTypes` is similar with HTML `<a>` target attribute.
     *
     * ```ts
     * import { OpenTypes } from 'jimu-ui/advanced/setting-components'
     * ```
     */
    openTypes?: ImmutableArray<OpenTypes>;
}
interface States {
    originLinkParam: IMLinkParam;
    linkParam: IMLinkParam;
}
interface StateExtraProps {
    /**
     * @ignore
     */
    appConfig: IMAppConfig;
    /**
     * @ignore
     */
    browserSizeMode: BrowserSizeMode;
}
interface ExtraProps {
    /**
     * @ignore
     */
    theme?: ThemeVariables;
    /**
     * @ignore
     */
    intl?: IntlShape;
}
/**
 * The `LinkSelectorContent` component allows users to configure a link.
 *
 * ```ts
 * import { LinkSelectorContent } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare class _LinkSelectorContent extends React.PureComponent<LinkSelectorContentProps & ExtraProps & StateExtraProps, States> {
    constructor(props: any);
    needOpenIn(linkParam: IMLinkParam | LinkParam): boolean;
    render(): jsx.JSX.Element;
    getLinkTypeContent: () => jsx.JSX.Element;
    getHiddenLinks: () => ImmutableArray<LinkType>;
    componentDidMount(): void;
    getLinkContent: (linkType: string) => jsx.JSX.Element;
    linkTypeChange: (e: any) => void;
    radioOpenTypeChange: (openType: OpenTypes) => void;
    linkParamChange: (changedParam: IMLinkParam, isTypeSame?: boolean) => void;
    fixLinkParam: (linkParam: IMLinkParam) => IMLinkParam;
    settingConfirm: () => void;
    isLinkParamOk: (linkParam: IMLinkParam) => boolean;
}
export declare const LinkSelectorContent: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<LinkSelectorContentProps>> & {
    WrappedComponent: React.ComponentType<LinkSelectorContentProps>;
}, ReactRedux.Omit<Omit<LinkSelectorContentProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, never> & LinkSelectorContentProps>;
/**
 * @deprecated
 */
export declare const LinkSetting: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<LinkSelectorContentProps>> & {
    WrappedComponent: React.ComponentType<LinkSelectorContentProps>;
}, ReactRedux.Omit<Omit<LinkSelectorContentProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, never> & LinkSelectorContentProps>;
/**
 * @deprecated
 */
export declare type LinkSettingProps = LinkSelectorContentProps;
export {};
