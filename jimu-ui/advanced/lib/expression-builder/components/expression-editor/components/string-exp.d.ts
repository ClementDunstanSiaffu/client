/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    exp: string;
    id: string;
    isEditable: boolean;
}
export default class StringExp extends React.PureComponent<Props, unknown> {
    render(): JSX.Element;
}
export {};
