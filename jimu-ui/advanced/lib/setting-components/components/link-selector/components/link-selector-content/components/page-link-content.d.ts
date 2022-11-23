/// <reference types="react" />
import { React, IMAppConfig, IntlShape, ImmutableArray } from 'jimu-core';
import { IMLinkParam, OpenTypes } from '../../../types';
interface Props {
    linkParam: IMLinkParam;
    originLinkParam: IMLinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    intl: IntlShape;
    openTypes: ImmutableArray<OpenTypes>;
}
export default class PageLinkContent extends React.PureComponent<Props, unknown> {
    currentPage: {
        id: string;
        name: string;
    };
    componentDidMount(): void;
    getInitLinkParam: () => IMLinkParam;
    getPageData: () => Array<{
        id: string;
        name: string;
    }>;
    setLinkParam: (newSelectItem: any) => void;
    render(): JSX.Element;
}
export {};
