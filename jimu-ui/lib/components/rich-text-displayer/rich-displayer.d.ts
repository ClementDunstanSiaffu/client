/// <reference types="react" />
import { React } from 'jimu-core';
import { Sanitizer } from '@esri/arcgis-html-sanitizer';
export interface RichDisplayerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Rich text to display.
     */
    value?: string;
    /**
     * @default: `defaultSanitizer`
     * @ignore
     *
     * For sanitizing rich text.
     */
    sanitizer?: Sanitizer;
}
export declare const RichDisplayer: import("@emotion/styled").StyledComponent<RichDisplayerProps & React.RefAttributes<HTMLDivElement>, {}, {}>;
