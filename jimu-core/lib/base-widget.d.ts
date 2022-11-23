import * as React from 'react';
import { AllWidgetProps, WidgetProps } from './types/props';
import { IMState } from './types/state';
import { BaseVersionManager } from './version-manager';
declare class BaseWidget<P extends AllWidgetProps<unknown> = AllWidgetProps<unknown>, S = unknown> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetInjectedProps" will be injected into widget props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    static versionManager: BaseVersionManager;
}
export interface WidgetStaticMethods {
    mapExtraStateProps?: (state: IMState, ownProps: Partial<AllWidgetProps<any>>) => any;
    versionManager?: BaseVersionManager;
}
export declare type RawWidgetType = (React.ComponentClass<AllWidgetProps<any>> | React.FunctionComponent<AllWidgetProps<any>>) & WidgetStaticMethods;
export declare type WrappedWidgetType = (React.ComponentClass<WidgetProps> | React.FunctionComponent<WidgetProps>) & WidgetStaticMethods;
export default BaseWidget;
