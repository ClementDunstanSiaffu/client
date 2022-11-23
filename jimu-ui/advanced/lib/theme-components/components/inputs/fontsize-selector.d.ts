import { IMThemeVariables, ThemeSize, IntlShape } from 'jimu-core';
interface FontSizeSelectorProps {
    fontSize?: ThemeSize;
    options?: ThemeSize[];
    theme?: IMThemeVariables;
    intl?: IntlShape;
    className?: string;
    onChange?: (fontSize: ThemeSize) => void;
}
export declare const FontSizeSelector: import("@emotion/styled").StyledComponent<FontSizeSelectorProps, {}, {}>;
export {};
