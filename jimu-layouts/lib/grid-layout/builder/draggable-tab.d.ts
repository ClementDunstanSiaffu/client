/// <reference types="react" />
import { TabProps } from 'jimu-ui';
interface DraggableTabProps {
    layoutId: string;
    layoutItemId: string;
    onDragStart: (layoutItemId: string) => void;
}
export declare function DraggableTab(props: DraggableTabProps & TabProps): JSX.Element;
export {};
