/// <reference types="react" />
import { React } from 'jimu-core';
import { TabProps } from './tab';
/**
 * The Tabs components props.
 */
export interface TabsProps {
    /**
     * To provide a label for interactive components for accessibility purposes.
     */
    'aria-label'?: string;
    /**
     * The id of the currently selected Tab.
     */
    value?: string;
    /**
     * The id of the default selected Tab.
     */
    defaultValue?: string;
    /**
     * If `true`, the Tabs will fill the full width of its container and its children will be equally spaced.
     * @default false
     */
    fill?: boolean;
    /**
     * Basic style of tabs.
     * @default tabs
     */
    type?: 'underline' | 'tabs' | 'pills';
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Callback fired when the tab selection changed.
     */
    onChange?: (id: string) => void;
    /**
     * Valid only closeable is true
     */
    onClose?: (id: string) => void;
    /**
     * The content of the component.
     */
    children: Array<React.ReactElement<TabProps, 'Tab'>>;
    keepMount?: boolean;
    /**
     * Whether to allow horizontal scrolling.
     * @default false
     */
    scrollable?: boolean;
}
/**
 * The `Tabs` component provides the user the ability to explore, switching between views.
 *
 * ```ts
 * import { Tabs } from 'jimu-ui'
 * ```
 */
export declare const _Tabs: (props: TabsProps) => JSX.Element;
/**
 * The `Tabs` component provides the user the ability to explore, switching between views.
 *
 * ```ts
 * import { Tabs } from 'jimu-ui'
 * ```
 */
export declare const Tabs: import("@emotion/styled").StyledComponent<TabsProps, {}, {}>;
