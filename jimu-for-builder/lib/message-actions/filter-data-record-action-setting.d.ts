/// <reference types="react" />
/** @jsx jsx */
import { React, ActionSettingProps, ReactRedux } from 'jimu-core';
import { IMConfig } from './type';
declare const _default: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}>, ReactRedux.Omit<Pick<any, string | number | symbol> & {
    theme?: import("jimu-core").IMThemeVariables;
}, "dataSourcesInfo" | "dataSources" | "dispatch"> & ActionSettingProps<IMConfig>>;
export default _default;
