import { WidgetInitResizeCallback, WidgetInitDragCallback } from 'jimu-core';
import { PopperProps } from 'jimu-ui';
export interface SettingPopperProps extends PopperProps {
    /**
     * Callback function for registering and listening to resize for widget, which can be retrieved from props of the widget.
     */
    onInitResizeHandler?: WidgetInitResizeCallback;
    /**
     * Callback function for registering and listening to drag for widget, which can be retrieved from props of the widget.
     */
    onInitDragHandler?: WidgetInitDragCallback;
}
export declare const SettingPopper: (props: SettingPopperProps) => JSX.Element;
