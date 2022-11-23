import { BaseAnimation } from './base';
import { AnimationProps, AnimationDirection } from '../types';
export declare class WipeIn extends BaseAnimation {
    direction: AnimationDirection;
    constructor(option?: any);
    getClipProp(): "clipTop" | "clipRight" | "clipLeft" | "clipBottom";
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
