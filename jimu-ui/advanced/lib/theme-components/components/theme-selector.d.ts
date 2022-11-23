import { ThemeInfo, ImmutableArray } from 'jimu-core';
interface ThemeSelectorProps {
    className?: string;
    selectedTheme?: string;
    themeListInfo: ImmutableArray<ThemeInfo>;
    onChange?: (name: string) => void;
}
export declare const ThemeSelector: import("@emotion/styled").StyledComponent<ThemeSelectorProps, {}, {}>;
export {};
