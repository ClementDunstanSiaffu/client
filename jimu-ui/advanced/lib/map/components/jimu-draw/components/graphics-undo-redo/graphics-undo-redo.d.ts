/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
export interface GraphicsUndoRedoProps {
    sketchContextStates: any;
    dispatchSketchActions: any;
    graphicsUndoRedoContextStates: any;
    dispatchGraphicsUndoRedoActions: any;
}
export declare const GraphicsUndoRedo: React.MemoExoticComponent<(props: GraphicsUndoRedoProps) => jsx.JSX.Element>;
