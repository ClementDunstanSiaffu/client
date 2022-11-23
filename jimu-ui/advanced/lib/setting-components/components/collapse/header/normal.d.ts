/// <reference types="react" />
import { React } from 'jimu-core';
import { CollapsableBaseHeaderProps } from './base';
export interface CollapsableHeaderProps extends CollapsableBaseHeaderProps {
    /**
     * The right icon displayed after the label.
     */
    rightIcon?: any;
    /**
     * The actived icon displayed after the label.
     */
    rightActiveIcon?: any;
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
declare const CollapsableHeader: (props: CollapsableHeaderProps) => JSX.Element;
export default CollapsableHeader;
