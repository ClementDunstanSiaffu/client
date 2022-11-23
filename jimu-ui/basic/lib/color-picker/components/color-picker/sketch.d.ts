import { SketchProps as SketchComponentProps } from '../color-components/sketch';
/**
 * The Sketch component props
 */
export interface SketchProps extends Omit<SketchComponentProps, 'onChange'> {
    color?: string;
    onChange?: (color: string) => void;
}
export declare const Sketch: import("@emotion/styled").StyledComponent<SketchProps, {}, {}>;
