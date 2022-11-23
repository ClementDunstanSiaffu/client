/// <reference types="react" />
import { React, IMAppConfig, IntlShape } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    linkParam: IMLinkParam;
    originLinkParam: IMLinkParam;
    onLinkParamChange: any;
    appConfig: IMAppConfig;
    intl: IntlShape;
}
export default class DialogLinkContent extends React.PureComponent<Props, unknown> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    getInitLinkParam: () => IMLinkParam;
    getDialogData: () => Array<{
        id: string;
        name: string;
    }>;
    setLinkParam: (newSelectItem: any) => void;
    render(): JSX.Element;
}
export {};
