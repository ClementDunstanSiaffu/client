import { React } from 'jimu-core';
export declare const getCachedFocusableElements: (container: HTMLElement, cachedFocusEleRef: React.MutableRefObject<NodeListOf<HTMLElement>>, force?: boolean) => NodeListOf<HTMLElement>;
/**
 * Loop within the focusable elements inside a container when the Tab key is pressed.
 *
 * @ignore
 * @param trapFocus
 * Whether to enable trap focus.
 * @param autoFocus
 * Whether to automatically focus on the first focussable element.
 * @param forceLatestFocusElements
 * Whether to query focusable elements every time you when the `Tab` key is pressed.
 */
export declare const useTrapFocusLoop: (containerRef: React.MutableRefObject<HTMLDivElement>, trapFocus?: boolean, autoFocus?: boolean, forceLatestFocusElements?: boolean, enable?: boolean) => void;
/**
 * Trigger callback when the escape key is pressed
 */
export declare const useCallbackForEscape: (containerRef: React.MutableRefObject<HTMLElement>, callback: (evt: any) => void, enable?: boolean) => void;
