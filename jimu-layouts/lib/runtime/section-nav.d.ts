/** @jsx jsx */
import { jsx } from 'jimu-core';
interface Props {
    sectionId: string;
    currentIndex: number;
    numOfViews: number;
    onCurrentViewChange: (index: number) => void;
}
export declare function SectionNav(props: Props): jsx.JSX.Element;
export {};
