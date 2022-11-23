/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
export interface PanelHeaderAction {
    name: string;
    label?: string;
    icon: any;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    ref?: React.RefObject<HTMLButtonElement>;
}
export interface PanelHeaderProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * If `true`, Set the cursor as `move`
     */
    moveable?: boolean;
    /**
     * The text that this component displays
     */
    title?: React.ReactNode;
    /**
     * if `false`, hide close button
     */
    showClose?: boolean;
    /**
     * @ignore
     */
    closeButtonRef?: React.RefObject<HTMLButtonElement>;
    /**
     * Be invoked when clicking the close button
     */
    onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * @ignore
     *
     * Customize some actions
     *
     * Note: `actions` and `showClose` are mutually exclusive,
     * `actions` have higher priority, and up to 3 actions are allowed
     */
    actions?: PanelHeaderAction[];
    /**
     * @ignore
     */
    level?: 1 | 2;
}
export declare const PanelHeader: React.NamedExoticComponent<PanelHeaderProps>;
