import { Animation, AnimationProps, AnimationType } from '../types';
export declare const DEFAULT_ANIMATION_PROPS: Partial<AnimationProps>;
export declare abstract class BaseAnimation implements Animation {
    option: any;
    type: AnimationType;
    constructor(type: AnimationType, option?: any);
    abstract initProps(): AnimationProps;
    abstract animateProps(): AnimationProps;
    abstract endProps(): AnimationProps;
    generateProps(props: AnimationProps): AnimationProps;
    getConfigType(): any;
    propsOnXY(_x: number, _y: number): AnimationProps;
    hasMoveEffect(): boolean;
}
