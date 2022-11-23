/// <reference types="react" />
/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { JimuSketchProps } from '../index';
import { CreatToolActions, SelectToolActions, JimuDrawCreatedDescriptor } from '../constraints';
import type { DrawingUpdatedDescriptor } from '../constraints';
export { CreatToolActions, SelectToolActions };
export type { DrawingUpdatedDescriptor, JimuDrawCreatedDescriptor };
export declare const SketchAdapter: React.MemoExoticComponent<(props: (JimuSketchProps)) => jsx.JSX.Element>;
