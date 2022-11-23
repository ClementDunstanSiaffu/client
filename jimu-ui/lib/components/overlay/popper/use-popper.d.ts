import { React } from 'jimu-core';
import { Options as PopperOptions, Instance, VirtualElement } from '@popperjs/core';
import { PopperInstance } from './core';
/**
 * Simple ponyfill for Object.fromEntries
 */
export declare const fromEntries: (entries: Array<[
    string,
    any
]>) => any;
export declare const usePopper: (ref?: React.MutableRefObject<Instance> | ((ref: PopperInstance) => void), referenceElement?: Element | VirtualElement, popperElement?: HTMLElement, options?: PopperOptions) => any;
