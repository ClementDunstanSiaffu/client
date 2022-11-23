/// <reference types="react" />
import { React, ImmutableArray, Expression, IntlShape, ImmutableObject, UseDataSource } from 'jimu-core';
import { FormatNumberOptions } from 'react-intl';
interface Props {
    useDataSources: ImmutableArray<UseDataSource>;
    expression: Expression | ImmutableObject<Expression>;
    intl: IntlShape;
    widgetId?: string;
    onChange: (expression: Expression) => void;
}
/**
 * Save parts (in expression), name and numberFormat in different states to avoid unnecessary rendering.
 */
interface State {
    expression: Expression;
    name: string;
    numberFormat: FormatNumberOptions;
    isNumberFormatSettingOpen: boolean;
}
export default class ExpressionTab extends React.PureComponent<Props, State> {
    static count: number;
    numberFormatBtnRef: React.RefObject<HTMLButtonElement>;
    expressionCountAdded: boolean;
    insertCount: number;
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    getMutableExpression: (expression: Expression | ImmutableObject<Expression>) => Expression;
    onExpChange: (e: Expression) => void;
    onChange: () => void;
    onNameChange: (e: any) => void;
    getDefaultName: () => string;
    getWhetherDisableInsert: () => boolean;
    onNumberFormatClick: () => void;
    toggleNumberFormatSettingPopper: () => void;
    onToggleNumberFormatSetting: (e: any, checked: boolean) => void;
    onMinDigitsChange: (v: number) => void;
    onMaxDigitsChange: (v: number) => void;
    onUseGroupChange: (e: any, checked: boolean) => void;
    onNotationChange: (e: any, checked: boolean) => void;
    render(): JSX.Element;
}
export {};
