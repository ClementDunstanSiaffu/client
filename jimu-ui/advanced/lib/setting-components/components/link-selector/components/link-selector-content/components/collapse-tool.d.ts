/// <reference types="react" />
import { React } from 'jimu-core';
interface State {
    collapse: boolean;
}
interface Prop {
    title: string;
    isOpen?: boolean;
    className?: string;
}
export default class CollapseTool extends React.PureComponent<Prop, State> {
    componentWillMount(): void;
    onCollapseClick: (e: any) => void;
    render(): JSX.Element;
}
export {};
