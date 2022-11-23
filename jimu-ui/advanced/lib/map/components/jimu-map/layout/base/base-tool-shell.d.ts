/** @jsx jsx */
import { jsx, IntlShape } from 'jimu-core';
import { UIComponent, UIComponentProps } from './ui-component';
import { ToolConfig } from '../../config';
import { LayoutJson } from '../config';
interface ToolShellProps extends UIComponentProps {
    layoutConfig: LayoutJson;
    toolConfig: ToolConfig;
    toolName: string;
    isMobile?: boolean;
    isHidden?: boolean;
    intl?: IntlShape;
    isLastElement?: boolean;
    className?: string;
    activeToolName: string;
    onActiveToolNameChange: (activeToolName: string) => void;
}
export default class BaseToolShell extends UIComponent<ToolShellProps, unknown> {
    render(): jsx.JSX.Element;
}
export {};
