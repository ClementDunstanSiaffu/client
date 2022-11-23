/// <reference types="react" />
import { React } from 'jimu-core';
import { PopperCoreProps } from './core';
import { TargetType } from './utils';
import { PopperChildrenProps } from './children';
import { ArrowStyle } from 'jimu-theme';
export declare const DefaultArrowSize = 12;
/** */
export interface _PopperProps extends Omit<PopperChildrenProps, 'onMouseDown' | 'onDrag' | 'children'> {
    /**
     * Reference node used to set the position of popper
     */
    reference: TargetType;
    /**
     * Whether to show arrow of popper
     *
     * Notice:  Will ignore the arrow in modifiers
     * @default false
     */
    showArrow?: boolean;
    /**
     * Define the style of the arrow.
     * @ignore
     */
    arrowStyle?: ArrowStyle;
    /**
     * If `true`, the popper is visible.
     */
    open: boolean;
    /**
     * A ref that points to the used popper instance.
     */
    children: React.ReactNode;
    /**
     * The offset modifier can shift your popper on both its axis.
     * To learn how to use offset, [modifiers.offset documentation](https://popper.js.org/docs/v2/modifiers/popper-offsets/).
     *
     * Notice: If you set the specified offset, we will ignore the offset in modifiers
     */
    offset?: number[];
    /**
     * Callback fired when you click on an area outside popper
     * @event
     */
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any>) => any;
    /**
     * @ignore
     *
     * Whether to flip placement (Only valid for RTL)
     */
    flipPlacement?: boolean;
    /**
     * @ignore
     *
     * When this value changes, will recalculate the position.
     * If floating is true, will reuse the latest calculated position of Popper as the position of floating panel
     */
    version?: number;
    /**
     * @ignore
     * If `true`, hide popper instead of uninstall it
     */
    keepMount?: boolean;
    /**
     * By default, clicking into a nested `Popper` will not trigger the toggle method of the current Popper.
     * If you want to trigger the toggle method of the current Popper, you can set `avoidNestedToggle` to `false`.
     * @default true
     * @ignore
     */
    avoidNestedToggle?: boolean;
    /**
     * By default, the toggle method will be triggered when the user trigger mousedown event on the element outside the popper.
     * If you want to delay triggering the toggle method, set delay time of `toggle` by `delayToggle` (millisecond).
     *
     * Usage scenarios: If user click the element of the nested popper, the toggle method of current popper will be triggered when the mousedown event is triggered.
     * General toggle callbacks will unmount the current Popper, which will cause the nested Popper to be unmount,
     * and the event of clicking on the element in the nested Popper is not triggered. Delay triggering the toggle method can solve this problem.
     *
     * @default 0
     * @ignore
     */
    delayToggle?: number;
    /**
     * A ref to get the root node of the popper.
     * @ignore
     */
    popperNodeRef?: React.Ref<HTMLDivElement>;
    /**
     * Listen the popper version changes of `PopperVersionContext`.
     * @default false
     * @ignore
     */
    listenContextPopperVersion?: boolean;
}
/**
 * The Popper component props.
 */
export declare type PopperProps = _PopperProps & Omit<PopperCoreProps, 'reference' | 'children' | 'version'>;
/**
 * The `Popper` component is used to display some content adjacent to, but connected with, another component.
 *
 * ```ts
 * import { Popper } from 'jimu-ui'
 * ```
 */
export declare const _Popper: React.MemoExoticComponent<React.ForwardRefExoticComponent<_PopperProps & Omit<PopperCoreProps, "version" | "children" | "reference"> & React.RefAttributes<import("@popperjs/core").Instance>>>;
/**
 * The `Popper` component is used to display some content adjacent to, but connected with, another component.
 *
 * ```ts
 * import { Popper } from 'jimu-ui'
 * ```
 */
export declare const Popper: import("@emotion/styled").StyledComponent<_PopperProps & Omit<PopperCoreProps, "version" | "children" | "reference"> & React.RefAttributes<import("@popperjs/core").Instance>, {}, {}>;
