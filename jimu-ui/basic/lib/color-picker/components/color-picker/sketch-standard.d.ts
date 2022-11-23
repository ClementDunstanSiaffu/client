import { SketchProps } from './sketch';
import { ColorItem } from '../color-components';
/**
 * The SketchStandard component props
 */
export interface SketchStandardProps extends SketchProps {
    presetColors?: ColorItem[];
}
export declare const SketchStandard: import("@emotion/styled").StyledComponent<SketchStandardProps, {}, {}>;
