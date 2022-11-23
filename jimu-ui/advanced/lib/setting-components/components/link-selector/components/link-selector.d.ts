/// <reference types="react" />
import { React, IntlShape, ThemeVariables } from 'jimu-core';
import { LinkSelectorSidePopperProps } from './link-selector-side-popper';
import { IMLinkParam } from '../types';
/**
 * The LinkSelector props
 */
export interface LinkSelectorProps extends Omit<LinkSelectorSidePopperProps, 'isOpen' | 'trigger' | 'position'> {
    /**
     * Label of the button which can trigger link selector popup.
     *
     * @default Set link
     */
    buttonLabel?: string;
}
interface ExtraProps {
    /**
     * @ignore
     */
    theme?: ThemeVariables;
    /**
     * @ignore
     */
    intl: IntlShape;
}
interface State {
    isOpen: boolean;
}
/**
 * The `LinkSelector` component allows users to configure a link using a popup.
 *
 * ```ts
 * import { LinkSelector } from 'jimu-ui/advanced/setting-components'
 * ```
 */
export declare class _LinkSelector extends React.PureComponent<LinkSelectorProps & ExtraProps, State> {
    linkSelectorTrigger: React.RefObject<HTMLButtonElement>;
    constructor(props: any);
    toggle: () => void;
    onCancel: () => void;
    onConfirm: (linkParam: IMLinkParam) => void;
    render(): JSX.Element;
}
/**
 * A component to set link, such as link to a view, a page or url
 */
export declare const LinkSelector: React.ForwardRefExoticComponent<Pick<Omit<LinkSelectorProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, "children" | "forwardedRef" | keyof LinkSelectorProps> & {
    theme?: import("jimu-core").IMThemeVariables;
}>;
export {};
