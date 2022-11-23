/// <reference types="react" />
import { React, IMDataSourceJson, IntlShape } from 'jimu-core';
import { AddDataErrorCode } from '../utils';
interface DataSourceUrlType {
    label: string;
}
interface Props {
    intl: IntlShape;
    getDsId: () => string;
    toggleLoadStatus: (loaded: boolean) => void;
    toggleToastStatus: (isOpen: boolean, addDataErrorCode: AddDataErrorCode) => void;
    onAdded: (dsJson: IMDataSourceJson, label: string) => void;
}
interface State {
    url: string;
    selectedDataSourceUrlType: DataSourceUrlType;
    selectDataHelpUrl: string;
}
export default class extends React.PureComponent<Props, State> {
    __unmounted: boolean;
    dataSourceUrlTypes: DataSourceUrlType[];
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onUrlTypesClicked: (e: any) => void;
    onInputUrl: (e: any) => void;
    onAdded: () => Promise<void>;
    checkServiceUrl: (url: string) => {
        valid: boolean;
    };
    render(): JSX.Element;
}
export {};
