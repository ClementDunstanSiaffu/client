/// <reference types="react" />
import { AlertPanelProps } from './panel';
import { AlertTooltipProps } from './tooltip';
import { AlertForm } from './type';
/**
 * The Alert component props.
 */
export declare type AlertProps = AlertTooltipProps & AlertPanelProps & {
    /**
       * Display form of warning message.
       * @default basic
       */
    form?: AlertForm;
};
/**
 * The `Alert` component displays a short, important message in a way that attracts the user's attention without interrupting the user's task.
 *
 * ```ts
 * import { Alert } from 'jimu-ui'
 * ```
 */
export declare function Alert(props: AlertProps): JSX.Element;
export * from './button';
export * from './panel';
