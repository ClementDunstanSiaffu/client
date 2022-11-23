/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, AnimationSetting, TransitionType, TransitionDirection } from 'jimu-core';
import { TransitionMetaInfo } from './transition-info';
interface OwnProps {
    transition: {
        type: TransitionType;
        direction: TransitionDirection;
    };
    transitionLabel?: string;
    showOneByOne?: boolean;
    oneByOneEffect?: AnimationSetting;
    onTransitionChange: ({ type: TransitionType, direction: TransitionDirection }: {
        type: any;
        direction: any;
    }) => void;
    onOneByOneChange?: (AnimationSetting: any) => void;
    onPreviewTransitionClicked: () => void;
    onPreviewOneByOneClicked?: () => void;
    onPreviewAsAWhoneClicked: () => void;
    formatMessage: (id: string) => string;
}
interface State {
    showSidePanel: boolean;
}
export declare class TransitionSetting extends React.PureComponent<OwnProps, State> {
    sidePopperTrigger: React.RefObject<HTMLDivElement>;
    buttonRef: React.RefObject<HTMLButtonElement>;
    static defaultProps: Partial<OwnProps>;
    modalStyle: any;
    constructor(props: any);
    toggleSidePanel: () => void;
    previewTransition: (e: any) => void;
    createTransitionCard(metaInfo: TransitionMetaInfo, index: number): jsx.JSX.Element;
    createDirectionChooser(): jsx.JSX.Element;
    getSidePopperStyle(): import("jimu-core").SerializedStyles;
    getAnimBoxStyle(): import("jimu-core").SerializedStyles;
    onTransitionTypeChanged: (value: any) => void;
    onDirectionChanged: (e: any) => void;
    previewOneByOneEffect: () => void;
    onPreviewAsAWhoneClicked: (e: any) => void;
    onOnebyOneSettingChange: (mode: any, setting: any) => void;
    render(): jsx.JSX.Element;
}
export {};
