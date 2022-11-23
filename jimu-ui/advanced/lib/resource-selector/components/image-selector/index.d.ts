/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { ButtonSize, ImageParam } from 'jimu-ui';
/**
 * The ImageSelector component props
 */
export interface ImageSelectorProps {
    /**
     * The ID of the widget using this component.
     */
    widgetId: string;
    /** @ignore */
    className?: string;
    /** @ignore */
    buttonClassName?: string;
    /** @ignore */
    buttonStyle?: React.CSSProperties;
    /**
     * The color for this component.
     */
    buttonColor?: string;
    /**
     * The size for this component.
     */
    buttonSize?: ButtonSize;
    /**
     * The label for this component.
     */
    buttonLabel?: string;
    /**
     * The function will be called when the used image has been changed.
     */
    onChange?: (imageParam: ImageParam) => void;
    /** @ignore */
    disabled?: boolean;
    /**
     * The parameter defined in the ImageWithParam component in jimu-ui.
     */
    imageParam?: ImageParam;
    /** @ignore */
    isSupportCrop?: boolean;
    /** @ignore */
    intl: IntlShape;
    /** @ignore */
    'aria-describedby'?: string;
    /** @ignore */
    'aria-label'?: string;
    /** This attribute is not required, most of the time we won't use it.
     *  And this is a temporary solution for SidePopper.
     *  Please see trigger props describe of SidePopper, they are the same.
     */
    trigger?: HTMLElement | HTMLElement[];
}
/**
 * The ImageSelector component is used to select an image from a file or a URL.
 */
export declare const ImageSelector: import("@emotion/styled").StyledComponent<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
