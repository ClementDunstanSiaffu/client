import { React, IconResult, IMIconResult, IMThemeVariables, IntlShape } from 'jimu-core';
import { PublicIconGroupType, ConfigurableOption, PreviewOptions } from '../types';
interface IconViewerProps {
    icon?: IconResult;
    isOpen?: boolean;
    configurableOption?: ConfigurableOption;
    previewOptions?: PreviewOptions;
    groups?: PublicIconGroupType | PublicIconGroupType[] | 'none';
    customIcons?: IconResult[];
    className?: string;
    onButtonClick?: (e: any) => void;
    onChange?: (result: IMIconResult) => void;
    onIconUploadError?: () => void;
}
interface ExtraProps {
    theme?: IMThemeVariables;
    theme2?: IMThemeVariables;
    intl?: IntlShape;
}
export declare const IconViewer: import("@emotion/styled").StyledComponent<Omit<IconViewerProps & ExtraProps & {
    intl: IntlShape;
}, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export {};
