/// <reference types="react" />
import { React, IntlShape } from 'jimu-core';
import { PaginationProps as BSPaginationProps } from 'reactstrap/lib/Pagination';
/** Type for the `size` prop of the Pagination component. */
export declare type PaginationSize = 'default' | 'sm' | 'lg';
export interface PaginationProps extends BSPaginationProps {
    /**
     * Defines the size of the Pagination.
     * @default default
    */
    size?: PaginationSize;
    /**
     * Total page number
     */
    totalPage: number;
    /**
     * Current page number
     */
    current: number;
    /**
     * If `true`, the Pagination will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fires when the page is changed.
     */
    onChangePage?: (current: number) => void;
}
interface ExtraProps {
    /**
     * @ignore
     */
    intl: IntlShape;
}
/**
 * The `Pagination` component is a set of presentational components for building pagination UI.
 *
 * ```ts
 * import { Pagination } from 'jimu-ui'
 * ```
 */
export declare class _Pagination extends React.PureComponent<PaginationProps & ExtraProps> {
    handleSwitchPage: (current: number) => void;
    handleSwitchToPrePage: (evt: any) => void;
    handleSwitchToNextPage: (evt: any) => void;
    formatMessage: (id: string, values?: {
        [key: string]: any;
    }) => string;
    renderPaginationItems(current: number, totalPage: number): any[];
    render(): JSX.Element;
}
export declare const Pagination: import("@emotion/styled").StyledComponent<Pick<Omit<PaginationProps & ExtraProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, keyof PaginationProps> & {
    theme?: import("jimu-core").IMThemeVariables;
}, {}, {}>;
export {};
