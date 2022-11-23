/// <reference types="react" />
import { React } from 'jimu-core';
import { ColorBlockProps } from './color-block';
export interface PickerBlockProps extends Omit<ColorBlockProps, 'role'> {
    /**
     * The type of this component.
     * @default default
     */
    type?: 'default' | 'with-icon' | 'icon-only';
    /**
     * The icon of this component.
     */
    icon?: React.ReactElement | string;
    /**
     * @ignore
     * @deprecated use `text` instead.
     * If `true`, set background to transparent
     */
    tertiary?: boolean;
    /**
     *
     * If `true`, set background to transparent.
     */
    text?: boolean;
}
export declare const PickerBlock: React.ForwardRefExoticComponent<PickerBlockProps & React.RefAttributes<HTMLDivElement>>;
