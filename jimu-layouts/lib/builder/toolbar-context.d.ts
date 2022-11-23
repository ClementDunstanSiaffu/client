/// <reference types="react" />
import { React, ThemeVariables, IMLayoutItemJson } from 'jimu-core';
export declare const ToolbarContext: React.Context<{}>;
export interface ToolbarContextProps {
    activeItem?: string;
    toggleOn?: boolean;
    layoutId: string;
    layoutItem: IMLayoutItemJson;
    parentRef: HTMLElement;
    theme: ThemeVariables;
    isLockLayout: boolean;
    onItemClick: (value: string, toggleOn?: boolean) => void;
    onItemUnSelected: (value: string) => void;
    formatMessage: (id: string) => string;
}
