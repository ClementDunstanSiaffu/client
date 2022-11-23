import { ButtonProps } from 'jimu-ui';
interface EdgesBlockProps extends Omit<ButtonProps, 'type' | 'onChange'> {
    type: 'edge' | 'corner';
    activated?: -1 | 0 | 1 | 2 | 3;
    detached: boolean;
    onDetachedChange: (detached: boolean) => void;
}
export declare const EdgesBlock: (props: EdgesBlockProps) => JSX.Element;
export {};
