/// <reference types="react" />
import { React } from 'jimu-core';
export interface CollapsableBaseHeaderProps {
    /**
    * Defines the class name of the component.
    */
    className?: string;
    /**
     * The type of this component.
     * @default default
     */
    type?: 'default' | 'primary';
    /**
     * Defines the label size of the component.
     * @default 0
     * @ignore
     */
    level?: 0 | 1;
    /**
     * Whether the collapse panel is open.
     */
    isOpen?: boolean;
    /**
   * Invoked when opening the component.
   */
    onRequestOpen?: () => void;
    /**
     * Invoked when closing the component.
     */
    onRequestClose?: () => void;
    /**
     * The children of this component.
     */
    children?: React.ReactNode;
}
declare const CollapsableBaseHeader: (props: CollapsableBaseHeaderProps) => JSX.Element;
export default CollapsableBaseHeader;
