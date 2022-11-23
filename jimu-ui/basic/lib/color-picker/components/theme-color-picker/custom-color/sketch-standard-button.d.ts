import { React } from 'jimu-core';
import { SketchStandardProps } from '../../color-picker/sketch-standard';
export interface SketchStandardButtonProps extends SketchStandardProps {
    onAccept?: (color: string) => void;
    onCancel?: () => void;
}
export declare const SketchStandardButton: import("@emotion/styled").StyledComponent<Omit<import("react-intl").WrappedComponentProps<"intl">, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
