/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, IMLayoutItemJson, IntlShape, IMWidgetJson, ImmutableArray, IMSectionNavInfo, SerializedStyles } from 'jimu-core';
import { ToolbarConfig, PageContextProps } from 'jimu-layouts/layout-runtime';
interface Props {
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    forbidToolbar?: boolean;
    toolItems?: ToolbarConfig;
    showDefaultTools?: boolean;
    selected: boolean;
    autoScroll?: boolean;
    isInlineEditing: boolean;
    isFunctionalWidget: boolean;
    hasEmbeddedLayout: boolean;
    isSection: boolean;
    views?: ImmutableArray<string>;
    isBlock?: boolean;
    hasExtension?: boolean;
    widgetJson?: IMWidgetJson;
    widgetState?: any;
    rotate?: number;
}
interface StateToProps {
    lockLayout: boolean;
    isDesignMode: boolean;
    sectionNavInfo: IMSectionNavInfo;
}
interface State {
    selected: boolean;
    updateIndex: number;
}
interface IntlProps {
    intl: IntlShape;
}
export declare class SelectWrapper extends React.PureComponent<Props & IntlProps & StateToProps, State> {
    ref: HTMLElement;
    pageContext: PageContextProps;
    screenGroupInfo: string;
    keyBindings: {
        [key: string]: any;
    };
    modifiers: any;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props & StateToProps): void;
    private doScroll;
    scrollIntoView(): void;
    formatMessage: (id: string) => string;
    getStyle(): SerializedStyles;
    isMac: () => boolean;
    getKeyboardComponent(): JSX.Element;
    copyItem: () => void;
    deleteSelectedItem: () => void;
    isResizable(): boolean;
    showToolbar(): boolean;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
}, ReactRedux.Omit<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "dispatch" | "lockLayout" | "isDesignMode" | "sectionNavInfo"> & Props>;
export default _default;
