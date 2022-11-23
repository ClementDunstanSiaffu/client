/// <reference types="react" />
/** @jsx jsx */
import { React, LayoutItemConstructorProps, IMThemeVariables } from 'jimu-core';
import { Placement } from 'jimu-ui';
import { SerializedStyles } from 'jimu-theme';
export interface WidgetListPopperProps {
    referenceElement: HTMLElement;
    isPlaceholder?: boolean;
    isAccepted: (item: LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onSelect: (item: LayoutItemConstructorProps) => void;
    onClose: (evt?: React.MouseEvent<any>) => void;
    placement?: Placement;
    css?: SerializedStyles;
}
export declare const WidgetListPopper: React.ForwardRefExoticComponent<Pick<Omit<WidgetListPopperProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof WidgetListPopperProps> & {
    theme?: IMThemeVariables;
}>;
