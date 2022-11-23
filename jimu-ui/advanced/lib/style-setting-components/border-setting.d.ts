import { BorderStyle } from 'jimu-ui';
interface BorderStyleProps {
    className?: string;
    style?: any;
    /**
     * Border style, including type, color, and width
     */
    value?: BorderStyle;
    onChange?: (param: BorderStyle) => void;
}
export declare const _BorderSetting: (props: BorderStyleProps) => JSX.Element;
/**
 * A react component for setting border style (border-style, border-color, border-width)
 */
export declare const BorderSetting: import("@emotion/styled").StyledComponent<BorderStyleProps, {}, {}>;
export {};
