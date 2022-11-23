/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
/**
 * The `WidgetPlaceholder` component props.
 *
 * Inherits properties from the `HTMLDivElement`.
 *
 * See [additional props available from HTMLDivElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement).
 */
export interface WidgetPlaceholderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * The size of the icon displayed in the component
     * Default: `small`
     */
    iconSize?: 'small' | 'large';
    /**
     * The id of the widget that this placeholder is filling.
     * @ignore
     */
    widgetId?: string;
    /**
     * The svg icon object. For example: `require('path.to.icon.svg')`.
     */
    icon: string;
    /**
     * The text message shown in the placeholder. Only shown in builder mode when the `iconSize` is `small`.
     */
    message?: string;
    /**
     * Flip the icon automatically if the locale is following right-to-left (RTL).
     * @default false
     */
    autoFlip?: boolean;
}
/**
 * The `WidgetPlaceholder` component is applied in widgets prior to all settings have been chosen by the experience author.
 *
 * ```ts
 * import { WidgetPlaceholder } from 'jimu-ui'
 * ```
 */
export declare const WidgetPlaceholder: (props: WidgetPlaceholderProps) => jsx.JSX.Element;
