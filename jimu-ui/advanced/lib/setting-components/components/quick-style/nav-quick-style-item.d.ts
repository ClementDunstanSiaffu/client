/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
interface NavQuickStyleItemProps {
    title?: string;
    children: any;
    selected?: boolean;
    onClick?: (evt?: React.MouseEvent<HTMLDivElement>) => void;
}
export declare const NavQuickStyleItem: (props: NavQuickStyleItemProps) => jsx.JSX.Element;
export {};
