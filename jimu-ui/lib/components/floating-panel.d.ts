/// <reference types="react" />
import { React } from 'jimu-core';
import { Size, ResizeHandle } from './resizable';
import { ControlPosition } from './draggable';
import { DraggableBounds, DraggableEventHandler, PositionOffsetControlPosition } from 'react-draggable';
export declare const baseOverlayZindex = 1000;
export declare const useOverlayManager: (disableOverlayManager: boolean, disableActivateOverlay: boolean, propzIndex: number, onClick: (evt?: React.MouseEvent<HTMLDivElement>) => void, panelRef?: React.MutableRefObject<HTMLElement>) => [string, number, (evt?: React.MouseEvent<HTMLDivElement>) => void];
export interface OverlayManagerProps {
    /**
     * Default: false
     *
     * if `false`, The children will be put to document.body
     *
     * Disable the portal behavior. The children stay within it's parent DOM hierarchy
     */
    disablePortal?: boolean;
    /**
     * Default: false
     *
     * if `true`, do not change activate overlay when click on popper body
     */
    disableActivateOverlay?: boolean;
    /**
     * Default: false
     *
     * if `true`, do not manage z-index by state.overlays
     */
    disableOverlayManager?: boolean;
    /**
     * @ignore
     */
    zIndex?: number;
}
export interface _FloatingPanelProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'title'> {
    /**
     * The title of `PanelHeader` component
     */
    headerTitle?: React.ReactNode;
    /**
     * if `false`, hide the close button of `PanelHeader` component
     */
    showHeaderClose?: boolean;
    /**
     * Be invoked when clicking the close button of `PanelHeader` component
     */
    onHeaderClose?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * The minWidth property is used to set the minimum size of a resizable component.
     * @default { width: 50, height: 50 }
     */
    minSize?: Size;
    /**
     *
     * Specifies the width and height that the dragged item should start at.
     * `defaultSize` will be ignored when `size` set.
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
     * `defaultPosition` will be ignored when `position` set.
     * @default { left: 0, top: 0 }
     */
    defaultPosition?: ControlPosition;
    /**
     * The size position is used to set the position of the component.
     * Use position if you need to control position state by yourself.
     */
    position?: ControlPosition;
    /**
     * A position offset to start with. Useful for giving an initial position
     * to the element. Differs from `defaultPosition` in that it does not
     * affect the postiion returned in draggable callbacks, and in that it
     * accepts strings, like `{x: '10%', y: '10%'}`.
     */
    positionOffset?: PositionOffsetControlPosition;
    /**
     * If `true`, component cannot be resized
     */
    disableResize?: boolean;
    /**
     * If `true`, component cannot be dragged
     */
    disableDraggable?: boolean;
    /**
     * Specifies the x and y that resizing should snap to.
     */
    resizeGrid?: [number, number];
    /**
     * Called when resizing starts.
     */
    onResizeStart?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called while resizing.
     */
    onResize?: (size: Size, position?: ControlPosition) => void;
    /**
     * Called when resizing stops.
     */
    onResizeStop?: (size: Size, position?: ControlPosition) => void;
    /**
     * Define resizer list
     */
    resizeHandles?: ResizeHandle[];
    /**
     *
     * Specifies movement boundaries. Accepted values:
     * - `parent` restricts movement within the node's offsetParent
     *   (nearest node with position relative or absolute), or
     * - a selector, restricts movement within the targeted node
     * - An object with `left, top, right, and bottom` properties.
     *  These indicate how far in each direction the draggable
     *   can be moved.
     */
    dragBounds?: DraggableBounds | string | false;
    /**
     * Specifies the x and y that dragging should snap to.
     */
    dragGrid?: [number, number];
    /**
     * If desired, you can provide your own offsetParent for drag calculations.
     * By default, we use the Draggable's offsetParent. This can be useful for elements
     * with odd display types or floats.
     */
    dragOffsetParent?: HTMLElement;
    /**
     * Called when dragging starts.
     * @event
     */
    onDragStart?: DraggableEventHandler;
    /**
     * Called while dragging.
     * @event
     */
    onDrag?: (position: ControlPosition) => void;
    /**
     * Called when dragging stops.
     * @event
     */
    onDragStop?: DraggableEventHandler;
    /**
     * Specifies the scale of the canvas your are dragging this element on. This allows
     * you to, for example, get the correct drag deltas while you are zoomed in or out via
     * a transform or matrix in the parent of this element.
     * @default 1
     */
    dragScale?: number;
    /**
   * Loop within the focusable elements inside the `Popper` when the `Tab` key is pressed.
   * @ignore
   * @default true
   */
    trapFocus?: boolean;
    /**
     * Whether to query focusable elements every time you when the `Tab` key is pressed.
     * Note: Valid only if `trapFocus` is `true`.
     * @ignore
     * @default false
     */
    forceLatestFocusElements?: boolean;
    /**
     * Whether to automatically focus on the first focussable element when `Popper` is open.
     * @ignore
     * @default true
     */
    autoFocus?: boolean;
    /**
     * @ignore
     * If this function is provided, clicking `Escape` twice triggers it instead of `onHeaderClose`.
     * It is for accessibility purposes.
     */
    onLeave?: () => void;
    /**
     * The content of this component.
     */
    children: React.ReactElement;
}
export declare type FloatingPanelProps = _FloatingPanelProps & OverlayManagerProps;
/**
 * A component for resizing and positioning
 */
export declare const _FloatingPanel: React.ForwardRefExoticComponent<_FloatingPanelProps & OverlayManagerProps & React.RefAttributes<unknown>>;
/**
 * A component for resizing and positioning
 */
export declare const FloatingPanel: import("@emotion/styled").StyledComponent<_FloatingPanelProps & OverlayManagerProps & React.RefAttributes<unknown>, {}, {}>;
