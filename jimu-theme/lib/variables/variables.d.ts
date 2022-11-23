import { ThemeVariablesGenerator, IMCustomThemeJson, IMThemeVariables, IMThemeColorationVariants, ThemeSize, IMThemeAllColors, IMThemeTypography, IMThemeSizes, IMThemeBorder, IMThemeBorderRadiuses, IMThemeSurfaces, IMThemeBoxShadows, IMThemeFocusedStyles, IMThemeBody, IMThemeHeader, IMThemeFooter, IMThemeLink, ThemeColorationType, IMSharedThemeVariables } from 'jimu-core';
export declare class MainThemeVariablesGenerator implements ThemeVariablesGenerator {
    darkTheme: boolean;
    coloration: ThemeColorationType;
    colors: IMThemeAllColors;
    colorationVariants: IMThemeColorationVariants;
    typography: IMThemeTypography;
    spacer: ThemeSize;
    sizes: IMThemeSizes;
    gutters: IMThemeSizes;
    border: IMThemeBorder;
    borderRadiuses: IMThemeBorderRadiuses;
    boxShadows: IMThemeBoxShadows;
    focusedStyles: IMThemeFocusedStyles;
    surfaces: IMThemeSurfaces;
    body: IMThemeBody;
    header: IMThemeHeader;
    footer: IMThemeFooter;
    link: IMThemeLink;
    generate(overwrite: IMCustomThemeJson, customTheme?: IMCustomThemeJson, sharedThemeVariables?: IMSharedThemeVariables): IMThemeVariables;
}
export declare const createTheme: (uri?: string, overwrite?: IMThemeVariables, _customTheme?: IMThemeVariables, sharedThemeVariables?: IMSharedThemeVariables) => IMThemeVariables;
