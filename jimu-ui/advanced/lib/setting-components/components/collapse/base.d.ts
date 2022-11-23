/// <reference types="react" />
import { React } from 'jimu-core';
import { CollapseProps } from 'jimu-ui';
export interface BaseSettingCollapseProps extends Omit<CollapseProps, 'ref'> {
    /**
     * Whether to show the bottom line.
     * @default false
     */
    bottomLine?: boolean;
    /**
     * The header of the component.
     */
    header: React.ReactNode;
}
export declare const BaseSettingCollapse: (props: BaseSettingCollapseProps) => JSX.Element;
