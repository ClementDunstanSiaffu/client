/// <reference types="react" />
import { React, IMThemeVariables, CustomThemeJson, IntlShape } from 'jimu-core';
interface FontsetConfiguratorProps {
    themeVariables?: IMThemeVariables;
    intl: IntlShape;
    className?: string;
    onChange?: (customVariables: CustomThemeJson) => void;
}
export declare const FontsetConfigurator: React.FC<import("react-intl").WithIntlProps<FontsetConfiguratorProps>> & {
    WrappedComponent: React.ComponentType<FontsetConfiguratorProps>;
};
export {};
