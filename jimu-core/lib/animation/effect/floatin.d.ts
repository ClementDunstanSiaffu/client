import { BaseAnimation } from './base';
import { AnimationProps, AnimationDirection } from '../types';
export declare class FloatIn extends BaseAnimation {
    direction: AnimationDirection;
    constructor(option?: any);
    from(): {
        x: number;
        y: number;
    };
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
