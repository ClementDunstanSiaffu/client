/** @jsx jsx */
import { jsx, IMThemeVariables } from 'jimu-core';
import { Props } from '../common/screen-side-panel';
interface ExtraProps {
    builderTheme: IMThemeVariables;
    viewOnly: boolean;
    isDesignMode: boolean;
    useAnimation?: boolean;
    formatMessage: (id: string) => string;
}
export declare function ScreenSidePanel(props: Props & ExtraProps): jsx.JSX.Element;
export {};
