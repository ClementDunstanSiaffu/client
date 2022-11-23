/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, IntlShape, dateUtils, EsriDateFormats } from 'jimu-core';
import { PositioningStrategy } from 'jimu-ui';
import 'react-datepicker/dist/react-datepicker.css';
/**
 * The DatePicker component props
 */
export interface DatePickerProps {
    /**
     * To provide a label for interactive components for accessibility purposes.
     */
    'aria-label'?: string;
    /**
     * `aria-describedby` is used to indicate the IDs of the elements that describe the component.
     * It is for accessibility purposes.
     */
    'aria-describedby'?: string;
    /**
     * Selected date by default
     */
    selectedDate: Date | dateUtils.VirtualDateType;
    /**
     * whether a UTC date.
     * @deprecated The selectedDate should be a local date object.
     * @ignore
     */
    isUTCDate?: boolean;
    /**
     * @ignore
     */
    format?: EsriDateFormats | string;
    /**
     * Min Date
     * @ignore
     */
    minDate?: Date;
    /**
     * Max Date
     * @ignore
     */
    maxDate?: Date;
    /**
     * Different design for setting and runtime.
     * true: two months shown, has today button,
     * false: one month shown, no today button.
     */
    runtime: boolean;
    /**
     * Displayed virtual dates at runtime.
     * Renamed to virtualDateListForRuntime
     * @deprecated
     * @ignore
     */
    dateRangeList?: dateUtils.VirtualDateType[];
    /**
     * Displayed virtual date list at runtime.
     * Only support today by now.
     * @default VIRTUAL_DATE_FOR_RUNTIME
     * @ignore
     */
    virtualDateListForRuntime?: dateUtils.VirtualDateType[];
    /**
     * Displayed virtual date list shown for setting.
     * @default VIRTUAL_DATE_FOR_SETTING
     */
    virtualDateListForSetting?: dateUtils.VirtualDateType[];
    /**
     * Hide empty button for setting.
     * @default false
     */
    hideEmpty?: boolean;
    onChange: (value: number | dateUtils.VirtualDateType, label: string) => void;
    /**
    * Whether display time input on datepicker component
    */
    showTimeInput?: boolean;
    /**
    * Whether display a long time format.
    */
    isTimeLong?: boolean;
    /**
     * Whether to support virtual date list for setting.
     * See virtualDateListForSetting instead.
     * @deprecated
     * @ignore
     */
    supportVirtualDateList?: boolean;
    /**
    * Whether display a Done button.
    */
    showDoneButton?: boolean;
    /**
     * Disable the portal behavior. The children stay within it's parent DOM hierarchy
     * if `false`, The children will be put to document.body
     * @default false
     */
    disablePortal?: boolean;
    /**
     * Describes the positioning strategy to use. By default, it is absolute,
     * which in the simplest cases does not require repositioning of the popper
     * If your reference element is in a fixed container, use the fixed strategy
     * @default 'absolute'
     */
    strategy?: PositioningStrategy;
    className?: string;
    style?: React.CSSProperties;
}
interface ExtraProps {
    /**
     * @ignore
     */
    theme: ThemeVariables;
}
interface IntlProps {
    /**
     * @ignore
     */
    intl: IntlShape;
}
interface State {
    isRender: boolean;
    updateInput: boolean;
    currentDate: Date | dateUtils.VirtualDateType;
    localeChanged: boolean;
    isOpen: boolean;
    isVirtualDateListOpen: boolean;
}
/**
 * The `DatePicker` component for users to pick a date/time.
 *
 * ```ts
 * import { DatePicker } from 'jimu-ui/basic/date-picker'
 * ```
*/
export declare class _DatePicker extends React.PureComponent<DatePickerProps & ExtraProps & IntlProps, State> {
    __unmount: boolean;
    datePickerContainer: any;
    datePicker: any;
    datePickerBtn: any;
    datePickerInput: any;
    isDateEmpty: boolean;
    fromCustomOption: boolean;
    isCustomDate: boolean;
    constructor(props: any);
    i18nMessage: (id: string) => string;
    _getLocalDate: (date: any) => any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: DatePickerProps, prevState: State): void;
    popperClick: (evt: any, dateClick: any) => void;
    popperToggle: (evt: any) => void;
    onDateChange: (date: Date) => void;
    onTimeChange: (label: string, hour: number, minute: number, second: number) => void;
    onDateTimeChange: (date: Date) => void;
    onDateApply: (_date?: Date, isPopperTriggered?: boolean) => void;
    getVirtualDateLabel: (label: any) => any;
    _getDateLabel: (date: any) => string;
    dateIconClick: () => void;
    onVirtualDateSelect: (virtualDate: string, label?: string) => void;
    dateInputClick: (evt?: React.MouseEvent<HTMLDivElement>) => void;
    dateInputIconClick: (evt?: any) => void;
    virtualDateListToggle: (evt?: React.MouseEvent<HTMLDivElement>) => void;
    getVirtualDateListForSetting: (supportVirtualDateList: any) => dateUtils.VirtualDateType[];
    render(): jsx.JSX.Element;
}
/**
 * The `DatePicker` component for users to pick a date/time.
 *
 * ```ts
 * import { DatePicker } from 'jimu-ui/basic/date-picker'
 * ```
*/
export declare const DatePicker: import("@emotion/styled").StyledComponent<Omit<DatePickerProps & IntlProps, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export {};
