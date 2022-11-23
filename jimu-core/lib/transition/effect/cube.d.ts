import { AnimationProps } from '../../animation';
import { TransitionHandler, TransitionDirection } from '../types';
export declare class CubeTransition implements TransitionHandler {
    private readonly isRTL;
    private readonly direction;
    constructor(isRTL?: boolean, direction?: TransitionDirection);
    getInitProps(isActive: boolean): {
        rotateX: number;
        rotateY: number;
        x: string;
        y: string;
        opacity: number;
        display: string;
        zIndex: number;
        transformOrigin: string;
    };
    initState(progress: number, i: number, currentIndex: number, previousIndex: number): [number, number];
    getContinuousOrigin(i: number, currentIndex: number, previousIndex: number): string;
    getDiscreteOrigin(i: number, currentIndex: number, previousIndex: number, loop: boolean): string;
    getTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    getDiscreteTransitionProps(i: number, currentIndex: number, previousIndex: number, loop?: boolean): AnimationProps;
    getContinuousTransitionProps(i: number, currentIndex: number, previousIndex: number, progress?: number, isInitTransitionStyle?: boolean): AnimationProps;
    transform(props: AnimationProps, i: number, currentIndex: number, previousIndex: number, progress: number): string;
}
