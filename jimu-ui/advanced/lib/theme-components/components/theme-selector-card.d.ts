/** @jsx jsx */
import { jsx, ImmutableObject, ThemeInfo } from 'jimu-core';
interface ThemeSelectorCardProps {
    className?: string;
    themeInfo: ImmutableObject<ThemeInfo>;
    selectedTheme?: string;
    onSelect?: (uri?: string) => void;
}
export declare const ThemeSelectorCard: (props: ThemeSelectorCardProps) => jsx.JSX.Element;
export {};
