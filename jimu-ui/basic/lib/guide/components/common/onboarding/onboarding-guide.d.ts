/// <reference types="react" />
/** @jsx jsx */
import { React, ReactRedux, jsx, PageMode, ImmutableObject, UrlParameters } from 'jimu-core';
import { GuideProps } from '../../core/guide';
import { Steps, ConditionalStepIndexes } from '../../../types';
interface StateToProps {
    queryObject: ImmutableObject<UrlParameters>;
    pageMode: PageMode;
}
interface State {
    stepIndex: number;
    steps: Steps;
    conditionalStepIndexes: ConditionalStepIndexes;
    run: boolean;
}
export declare class _OnboardingGuide extends React.PureComponent<GuideProps & StateToProps, State> {
    private readonly currentStep;
    constructor(props: any);
    componentDidUpdate(prevProps: GuideProps & StateToProps): void;
    private readonly handleChange;
    private readonly handleClick;
    render(): jsx.JSX.Element;
}
export declare const OnboardingGuide: ReactRedux.ConnectedComponent<typeof _OnboardingGuide, ReactRedux.Omit<any, "queryObject" | "dispatch" | "pageMode"> & GuideProps>;
export {};
