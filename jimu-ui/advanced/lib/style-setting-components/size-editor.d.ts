/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, IntlShape } from 'jimu-core';
import { DistanceUnits, LinearUnit } from 'jimu-ui';
import { LayoutItemSizeModes } from 'jimu-layouts/layout-runtime';
interface Props {
    label: string;
    mode: LayoutItemSizeModes;
    disableModeSelect?: boolean;
    value?: LinearUnit | string;
    availableUnits?: DistanceUnits[];
    sizeModes?: LayoutItemSizeModes[];
    disabled?: boolean;
    onModeChange: (mode: LayoutItemSizeModes) => void;
    onChange: (value: LinearUnit) => void;
}
interface ExtraProps {
    intl?: IntlShape;
}
export declare class _SizeEditor extends React.PureComponent<Props & ExtraProps> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    handleChange: (value: LayoutItemSizeModes) => void;
    nls: (id: string) => string;
    getPopperStyle: () => import("jimu-core").SerializedStyles;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
export declare const SizeEditor: React.FC<import("react-intl").WithIntlProps<any>> & {
    WrappedComponent: React.ComponentType<any>;
};
export {};
