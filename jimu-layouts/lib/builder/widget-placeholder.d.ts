/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IMSizeModeLayoutJson, LayoutItemConstructorProps, IMThemeVariables, IntlShape } from 'jimu-core';
import { PageContextProps, LayoutItemProps, LayoutContextProps } from 'jimu-layouts/layout-runtime';
interface IntlProps {
    intl: IntlShape;
}
interface State {
    showModal: boolean;
    isBusy: boolean;
}
export declare class _WidgetPlaceholder extends React.PureComponent<LayoutItemProps & IntlProps, State> {
    ref: HTMLElement;
    btnRef: HTMLElement;
    pageContext: PageContextProps;
    layoutContext: LayoutContextProps;
    fakeLayouts: IMSizeModeLayoutJson;
    constructor(props: any);
    getStyle(builderTheme: IMThemeVariables): import("jimu-core").SerializedStyles;
    toggleModal: (e: any) => void;
    closeModal: () => void;
    canDrop(draggingItem: LayoutItemConstructorProps): boolean;
    toggleDragoverEffect: (isDragover: boolean, draggingItem: LayoutItemConstructorProps) => void;
    onDrop: (draggingItem: LayoutItemConstructorProps, containerRect: ClientRect, itemRect: ClientRect) => void;
    newWidget(uri: string): Promise<void>;
    setWidget: (item: LayoutItemConstructorProps) => void;
    getPopupStyle(): import("jimu-core").SerializedStyles;
    getModalStyle(): import("jimu-core").SerializedStyles;
    isItemAccepted: (item: LayoutItemConstructorProps) => boolean;
    render(): jsx.JSX.Element;
}
export declare const WidgetPlaceholder: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
export {};
