/** @jsx jsx */
import { React, jsx, IMThemeVariables } from 'jimu-core';
import { TooltipRenderProps } from 'react-joyride';
interface ExtraProps {
    theme?: IMThemeVariables;
    disabled?: boolean;
    isStepInjected?: boolean;
}
export declare const _StepDialog: (props: TooltipRenderProps & ExtraProps) => jsx.JSX.Element;
export declare const StepDialog: React.ForwardRefExoticComponent<Pick<TooltipRenderProps & ExtraProps, "disabled" | "isStepInjected" | keyof TooltipRenderProps> & {
    theme?: IMThemeVariables;
}>;
export {};
