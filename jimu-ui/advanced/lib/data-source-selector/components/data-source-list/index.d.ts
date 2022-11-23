/** @jsx jsx */
import { React, IntlShape, ReactRedux } from 'jimu-core';
import { DataSourceListProps } from '../../types';
interface ExtraProps {
    intl: IntlShape;
}
export declare const DataSourceList: import("@emotion/styled").StyledComponent<ReactRedux.Omit<Omit<DataSourceListProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, never> & DataSourceListProps, {}, {}>;
export {};
