/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ReactRedux, IMSelection, jsx } from 'jimu-core';
import { PopperCoreProps } from 'jimu-ui';
export interface SidePopperProps extends Omit<PopperCoreProps, 'open' | 'reference' | 'position' | 'toggle' | 'children'> {
    /**
     * If `left`, the side popper is next to left sidebar of builder.
     * If `right`, the side popper is next to right sidebar of builder.
     */
    position: 'left' | 'right';
    /**
     * If `true`, the side popper is visible.
     */
    isOpen: boolean;
    /**
     * Toggle to open/close the side popper.
     */
    toggle: () => void;
    /**
     * Element which triggers side popper.
     *
     * By default, clicking left/right sidebar of builder will close the side poppper automatically.
     * Clicking `trigger` won't close the side popper.
     */
    trigger: HTMLElement | HTMLElement[];
    /**
     * An element to focus after the side popper is closed.
     * `backToFocusNode` is for accessibility purposes.
     *
     * If don't pass in `backToFocusNode`, will focus `trigger` after side popper is closed.
     */
    backToFocusNode?: HTMLElement;
    /**
     * If current selected widget is not the widget, will close the side popper.
     */
    widgetId?: string;
    /**
     * Provide a uniform header.
     */
    title?: React.ReactNode;
    /**
     * @ignore
     */
    className?: string;
    /**
     * A ref that points to the used popper instance.
     */
    children?: React.ReactNode;
    /**
     * To provide a label for the side popper for accessibility purposes.
     */
    'aria-label'?: string;
}
interface ExtroProps {
    leftSidebarCollapse: boolean;
    rightSidebarCollapse: boolean;
    dispatch: any;
    isTemplatePage: boolean;
    theme?: ThemeVariables;
    layoutSelection?: IMSelection;
}
/**
 * The `SidePopper` component is a popper which reference node is left/right side panel of builder.
 *
 * ```ts
 * import { SidePopper } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare class _SidePopper extends React.PureComponent<SidePopperProps & ExtroProps, unknown> {
    closeBtnRef: React.RefObject<HTMLButtonElement>;
    popperRef: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: SidePopperProps & ExtroProps): void;
    componentWillUnmount(): void;
    handleDocumentMousedown: (evt: MouseEvent) => void;
    getReference(position: 'left' | 'right'): HTMLElement;
    getPlacement(position: 'left' | 'right'): "right-start" | "left-start";
    toggle: () => void;
    onKeyDown: (e: any) => void;
    render(): jsx.JSX.Element;
}
export declare const SidePopper: ReactRedux.ConnectedComponent<import("@emotion/styled").StyledComponent<SidePopperProps & ExtroProps, {}, {}>, ReactRedux.Omit<SidePopperProps & ExtroProps & {
    children?: React.ReactNode;
}, "dispatch" | "leftSidebarCollapse" | "rightSidebarCollapse" | "layoutSelection" | "isTemplatePage"> & SidePopperProps>;
export {};
