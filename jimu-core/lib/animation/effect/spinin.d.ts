import { BaseAnimation } from './base';
import { AnimationProps } from '../types';
export declare class SpinIn extends BaseAnimation {
    constructor(option?: any);
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
