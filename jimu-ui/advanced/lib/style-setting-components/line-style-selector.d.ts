import { LineType } from 'jimu-ui';
export interface LineStyleProps {
    /**
     * To provide a label for interactive components for accessibility purposes.
     * By default, the accessible name is computed from any text content inside the element.
     * With this prop, a sr-only DOM would be created with this label before value DOM.
     */
    'aria-label'?: string;
    /**
     * Two supported types, `normal` represents common line types, including `solid`, `dashed`, `dotted`, and `double`;
     * `symbol` indicates the line type supported by esri symbol, including `esriSLSSolid`, `esriSLSDash`, etc.
     */
    type?: 'normal' | 'symbol';
    /**
     * The value of this component.
     */
    value: LineType;
    /**
     * Invoked when the value is changed.
     */
    onChange?: (value: string) => void;
    /**
     * Defines the class name for the container of the component.
     */
    className?: string;
    /**
     * Defines the style for the container of the component.
     */
    style?: any;
}
export declare const LineStyleTranstions: {
    dashed: string;
    dotted: string;
    double: string;
    solid: string;
    esriSLSDash: string;
    esriSLSDot: string;
    esriSLSSolid: string;
    esriSLSDashDot: string;
    esriSLSDashDotDot: string;
};
export declare const LineStyleSelector: (props: LineStyleProps) => JSX.Element;
