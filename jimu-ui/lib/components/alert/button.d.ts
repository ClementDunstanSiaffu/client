/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { AlertButtonSize, AlertButtonType, AlertType } from './type';
/**
 * The AlertButton component props.
 */
export interface AlertButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * The type of `AlertButton`, which will represent different meanings, such as 'warning' and 'error'.
     * @default warning
     */
    type?: AlertType;
    /**
     * Display type of alert button, `tertiary` type represents no background.
     * @default default
     */
    buttonType?: AlertButtonType;
    /**
     * Defines the size of the button.
     * @default medium
     */
    size?: AlertButtonSize;
}
/**
 * A component for the icon button used as an anchor for warning messages.
 */
export declare const AlertButton: React.ForwardRefExoticComponent<AlertButtonProps & React.RefAttributes<HTMLButtonElement>>;
