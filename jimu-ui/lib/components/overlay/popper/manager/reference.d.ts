/// <reference types="react" />
import { React } from 'jimu-core';
export declare type ReactRef = (ref?: HTMLElement) => any | {
    current?: HTMLElement;
};
export interface ReferenceChildrenProps {
    ref: ReactRef;
}
export interface ReferenceProps {
    children: (ReferenceChildrenProps: any) => React.ReactElement;
    innerRef?: ReactRef;
}
export declare function Reference({ children, innerRef }: ReferenceProps): React.ReactElement;
