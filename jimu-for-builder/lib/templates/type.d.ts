import { AppConfig } from 'jimu-core';
export declare enum TemplateType {
    Block = "block",
    Header = "header",
    Footer = "footer",
    FullScreenPage = "full-screen-page",
    ScrollingPage = "scrolling-page",
    Window = "window",
    ScreenGroup = "screen-group",
    Screen = "screen",
    App = "app"
}
export declare type TemplateTagType = 'Blank' | 'WAB classic' | 'Map centric' | 'Dashboard' | 'Web page' | 'Website';
export interface Template {
    name: string;
    type: TemplateType;
    /**
     * A template config is a sub-set of app config.
     * For example, a page template must have one page only, and a header template must have header config only.
     */
    config?: Partial<AppConfig>;
    configUrl: string;
    /** the thumbnail file name  */
    thumbnail: string;
    gifThumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    flipThumbnail: boolean;
    label?: string;
    description?: string;
    i18nLabel: {
        [locale: string]: string;
    };
    i18nDescription: {
        [locale: string]: string;
    };
    isMultiplePage: boolean;
    isMapAware: boolean;
    tags: TemplateTagType[];
    widgetId?: string;
    sectionId?: string;
    pageId?: string;
    screenGroupId?: string;
    isNewTemplate?: boolean;
}
export declare type TemplatesInfo = {
    [templateType in TemplateType]: Template[];
};
