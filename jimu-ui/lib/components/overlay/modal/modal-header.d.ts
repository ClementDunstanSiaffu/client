/// <reference types="react" />
import { React } from 'jimu-core';
import { ModalHeaderProps as BSModalHeaderProps } from 'reactstrap/lib/ModalHeader';
/**
 * The ModalHeader component props.
 */
export interface ModalHeaderProps extends BSModalHeaderProps {
    closeIcon?: JSX.Element | string | number;
}
export declare class ModalHeader extends React.PureComponent<ModalHeaderProps> {
    static defaultProps: {
        closeIcon: JSX.Element;
    };
    render(): JSX.Element;
}
