/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
export interface SizeColorSettingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    color?: string;
    size?: string;
    onChange?: (key: string, value: string) => void;
}
export declare const SizeColorSetting: (props: SizeColorSettingProps) => jsx.JSX.Element;
