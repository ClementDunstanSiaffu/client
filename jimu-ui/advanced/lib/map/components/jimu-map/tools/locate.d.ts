/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class Locate extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    getTitle(): string;
    getIcon(): IconType;
    getExpandPanel(): JSX.Element;
}
