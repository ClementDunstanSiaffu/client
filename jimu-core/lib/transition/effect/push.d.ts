import { AnimationProps } from '../../animation';
import { TransitionHandler, TransitionDirection } from '../types';
export declare class PushTransition implements TransitionHandler {
    private readonly isRTL;
    private readonly direction;
    constructor(isRTL?: boolean, direction?: TransitionDirection);
    getInitProps(isActive: Boolean): {
        x: string;
        y: string;
        opacity: number;
        display: string;
    };
    initOffset(progress: number, i: number, currentIndex: number, previousIndex: number): number;
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    getDiscreteTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean): AnimationProps;
    getContinuousTransitionProps(i: number, currentIndex: number, previousIndex: number, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): any;
}
