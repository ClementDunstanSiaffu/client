import { JimuSymbolType, JimuSymbol } from 'jimu-ui/advanced/map';
import { CreatToolActions } from '..';
import { JimuSymbolsGroup } from '../..';
export declare const setCurrentSymbolToSketch: (currentActiveTool: CreatToolActions, newActiveTool: CreatToolActions, sketch: __esri.Sketch, currentSymbols: JimuSymbolsGroup) => void;
export declare const getCurrentSymbol: (newActiveTool: CreatToolActions, currentSymbols: JimuSymbolsGroup, jsonUtils: any) => JimuSymbol;
export declare const getSymbolTypeByActiveTool: (newActiveTool: any) => JimuSymbolType;
