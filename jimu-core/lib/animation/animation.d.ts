import * as React from 'react';
import { AnimationType, AnimationDirection, AnimationEffectType } from './types';
export interface AnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Animation type, includes:
     * AnimationType.FadeIn
     * AnimationType.FlyIn
     * AnimationType.ZoomIn
     * AnimationType.WipeIn
     * AnimationType.SpinIn
     * AnimationType.FloatIn
     */
    type: AnimationType;
    children: React.ReactElement | React.ReactNode;
    /**
     * AnimationTriggerType
     */
    trigger?: string;
    /**
     * If it is `true`, the component will be transparent. Combined with manual trigger
     */
    revert?: boolean;
    style?: any;
    /**
     * Is playing one by one animation
     */
    isParentPlaying?: boolean;
    isParentRevert?: boolean;
    isParentEnableScroll?: boolean;
    parentAnimationStyle?: any;
    /**
     * If provided and its value is different from previous one, animation will play automatically
     */
    parentPlayId?: symbol;
    className?: string;
    /**
     * Set animation effects. Inclues:
     * AnimationEffectType.Default
     * AnimationEffectType.Gentle
     * AnimationEffectType.Wobbly
     * AnimationEffectType.Stiff
     * AnimationEffectType.Slow
     * AnimationEffectType.Molasses
     */
    configType?: AnimationEffectType;
    /**
     * Direction of the animation. Only some of the animation types support direction.
     */
    direction?: AnimationDirection;
    /**
     * If provided and its value is different from previous one, animation will play automatically
     */
    playId?: symbol;
    onAnimationStart?: () => void;
    /**
     * Callback function when the animation is end
     */
    onAnimationEnd?: () => void;
}
/**
 * AnimationComponent is supported in Experience Builder to customize how your widgets appear. With provided effects and options, you can build the following experiences:
 *
 * - A window spins in as you load the app.
 * - Widgets fly in as you scroll down the page.
 * - The later view pushes the former one as you navigate a Section.
 * - The descriptions fade in as you hover over a Card widget.
 *
 * ```ts
 * import { Animation, OneByOneAnimation, AnimationContext } from 'jimu-core'
 * ```
 */
export declare const AnimationComponent: React.ForwardRefExoticComponent<AnimationProps & React.RefAttributes<HTMLDivElement>>;
