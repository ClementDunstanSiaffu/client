/// <reference types="react" />
import { ThemeModule } from '../type';
interface GlobalStyleProps {
    isRTL?: boolean;
    module: ThemeModule;
}
export declare const GlobalStyle: (props: GlobalStyleProps) => JSX.Element;
export {};
