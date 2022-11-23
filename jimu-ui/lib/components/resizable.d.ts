/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ControlPosition } from './draggable';
import { DraggableBounds } from 'react-draggable';
export declare type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface Size {
    width: number;
    height: number;
}
export interface ResizableProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onMouseDown'> {
    /**
     * Specifies movement boundaries. Accepted values:
     * - a selector, restricts movement within the targeted node
     * - An object with `left, top, right, and bottom` properties.
     *  These indicate how far in each direction the draggable
     *   can be moved.
     */
    bounds?: DraggableBounds | string | false;
    /**
     * Specifies the x and y that dragging should snap to.
     */
    grid?: [number, number];
    /**
     * If true, will not call any resize handlers.
     */
    disabled?: boolean;
    /**
     * The minWidth property is used to set the minimum size of a resizable component.
     * @default { width: 50, height: 50 }
     */
    minSize?: Size;
    /**
     * Specifies the width and height that the dragged item should start at.
     *
     * Note: defaultSize will be ignored when size set.
     * @default { width: 50, height: 50 }
     */
    defaultSize?: Size;
    /**
     * The size property is used to set the size of the component.
     * Use size if you need to control size state by yourself.
     */
    size?: Size;
    /**
     * Specifies the left and top of component
     *
     * Note: defaultPosition will be ignored when position set.
     * @default { left: 0, top: 0 }
     */
    defaultPosition?: ControlPosition;
    /**
     * The size position is used to set the position of the component.
     * Use position if you need to control position state by yourself.
     */
    position?: ControlPosition;
    /**
     * Called when resizing starts.
     */
    onStart?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called while resizing.
     */
    onResize?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called when resizing stops.
     */
    onStop?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called whenever the user mouses down. Called regardless of handle or disabled status.
     */
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Define resizer list
     */
    handles?: ResizeHandle[];
    /**
     * Render function or node.
     */
    children?: React.ReactNode | ((props: {
        size: Size;
        position?: ControlPosition;
    }) => React.ReactNode);
}
export declare const _Resizable: React.ForwardRefExoticComponent<ResizableProps & React.RefAttributes<unknown>>;
/**
 * A component for resizing
 */
export declare const Resizable: import("@emotion/styled").StyledComponent<ResizableProps & React.RefAttributes<unknown>, {}, {}>;
