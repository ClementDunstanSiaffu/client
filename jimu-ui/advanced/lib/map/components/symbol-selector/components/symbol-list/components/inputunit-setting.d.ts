/// <reference types="react" />
import { React } from 'jimu-core';
import { JimuSymbol } from '../index';
export interface InputUnitSettingProps {
    symbol: JimuSymbol;
    opacityPercentage: string;
    onSymbolChanged: (symbol: JimuSymbol) => void;
}
export declare const InputUnitSetting: React.MemoExoticComponent<(props: InputUnitSettingProps) => JSX.Element>;
