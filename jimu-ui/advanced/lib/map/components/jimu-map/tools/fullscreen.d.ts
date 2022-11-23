/// <reference types="react" />
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool';
export default class Fullscreen extends BaseTool<BaseToolProps, unknown> {
    toolName: string;
    getTitle(): string;
    getIcon(): IconType;
    fullScreenMap: () => void;
    getExpandPanel(): JSX.Element;
    getContent: (fullScreenMap: any) => import("jimu-core").jsx.JSX.Element;
    render(): JSX.Element;
}
