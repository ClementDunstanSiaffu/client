/**@jsx jsx */
import { jsx } from 'jimu-core';
import { ButtonProps } from 'jimu-ui';
interface CornerProps extends ButtonProps {
    detached?: boolean;
    activated?: -1 | 0 | 1 | 2 | 3;
}
export declare const Corner: (props: CornerProps) => jsx.JSX.Element;
export {};
