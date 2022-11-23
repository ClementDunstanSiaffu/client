/// <reference types="react" />
import { React } from 'jimu-core';
import { IMLinkParam } from '../../../types';
interface Props {
    datas: any[];
    linkParam: IMLinkParam;
    onClick: any;
    'aria-label': string;
}
export default class LinkSelectorList extends React.PureComponent<Props, unknown> {
    itemOnClick: (newSelectItem: any) => void;
    getListContent(): JSX.Element[];
    render(): JSX.Element;
}
export {};
