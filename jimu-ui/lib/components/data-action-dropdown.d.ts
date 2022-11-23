/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, DataSource, DataRecord, DataAction, IMWidgetJson, ThemeButtonType } from 'jimu-core';
import { ButtonSize } from './button';
interface Props {
    widgetId: string;
    dataSource: DataSource;
    records: DataRecord[];
    outFields?: string[];
    dataName?: string;
    type?: ThemeButtonType;
    size?: ButtonSize;
}
interface ThemeProps {
    theme: ThemeVariables;
}
interface State {
    isOpen: boolean;
    loading: boolean;
    actionGroups: {
        [key: string]: DataAction[];
    };
    actionElement?: React.ReactElement;
}
export declare class _DataActionDropDown extends React.PureComponent<Props & ThemeProps, State> {
    constructor(props: any);
    onDropDownToggle: () => void;
    onActionItemClick: (evt: any, action: DataAction) => Promise<void>;
    getWidget(widgetId: string): IMWidgetJson;
    getActionLabel(actionName: string, firstAction: DataAction): string;
    createAction(actionName: string): JSX.Element;
    getLoadingStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export declare const DataActionDropDown: React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}>;
export {};
