import { BaseAnimation } from './base';
import { AnimationProps } from '../types';
export declare class FadeOut extends BaseAnimation {
    constructor(option?: any);
    initProps(): AnimationProps;
    animateProps(): AnimationProps;
    endProps(): AnimationProps;
}
