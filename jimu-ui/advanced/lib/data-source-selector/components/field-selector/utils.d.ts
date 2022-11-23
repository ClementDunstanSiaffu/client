import { JimuFieldType, ThemeVariables, IntlShape } from 'jimu-core';
export declare const NO_SELECTION_ID = "CLICK_ME_TO_CLEAR_SELECTION";
export declare function getIconFromFieldType(type: JimuFieldType, theme: ThemeVariables, intl?: IntlShape): {
    icon: any;
    color: string;
    title: string;
};
