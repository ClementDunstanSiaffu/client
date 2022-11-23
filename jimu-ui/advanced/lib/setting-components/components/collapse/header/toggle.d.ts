/// <reference types="react" />
import { React } from 'jimu-core';
import { CollapsableBaseHeaderProps } from './base';
export interface CollapsableToggleHeaderProps extends CollapsableBaseHeaderProps {
    /**
     * The left icon displayed before the label.
     */
    leftIcon?: any;
    /**
     * The label displayed in the header of the component.
     */
    label?: React.ReactNode;
    /**
     * Whether to wrap label.
     * @default false
     */
    wrapLabel?: boolean;
}
declare const CollapsableToggleHeader: (props: CollapsableToggleHeaderProps) => JSX.Element;
export default CollapsableToggleHeader;
