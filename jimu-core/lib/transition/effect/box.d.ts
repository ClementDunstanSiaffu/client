import { AnimationProps } from '../../animation';
import { TransitionHandler, TransitionDirection } from '../types';
export declare class BoxTransition implements TransitionHandler {
    private readonly isRTL;
    private readonly direction;
    constructor(isRTL?: boolean, direction?: TransitionDirection);
    getInitProps(isActive: boolean): {
        display: string;
        rotateX: number;
        rotateY: number;
        opacity: number;
        x: string;
        y: string;
        transformOrigin: string;
    };
    initRotate(): string;
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    getDiscreteTransitionProps(i: number, currentIndex: number, previousIndex: number, loop: boolean): AnimationProps;
    getContinuousTransitionProps(i: number, currentIndex: number, previousIndex: number, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    getOrigin(i: number, currentIndex: number, previousIndex: number): string;
    getDiscreteOrigin(i: number, currentIndex: number, previousIndex: number, loop: boolean): string;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
