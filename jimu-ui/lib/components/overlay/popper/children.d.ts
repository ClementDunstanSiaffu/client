/// <reference types="react" />
import { React } from 'jimu-core';
import { FloatingPanelProps, OverlayManagerProps } from '../../floating-panel';
interface _PopperChildrenProps extends Omit<FloatingPanelProps, 'onMouseDown'> {
    /**
     *
     * Whether to use floating panel as container
     * @default false
     */
    floating?: boolean;
}
export declare type PopperChildrenProps = _PopperChildrenProps & OverlayManagerProps;
export declare const PopperChildren: React.ForwardRefExoticComponent<_PopperChildrenProps & OverlayManagerProps & React.RefAttributes<HTMLDivElement>>;
export {};
