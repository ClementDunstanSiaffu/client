import { SettingPopperProps } from './setting-popper';
export interface QuickStylePopperProps extends Omit<SettingPopperProps, 'onHeaderClose'> {
    onClose?: () => void;
}
export declare const QuickStylePopper: (props: QuickStylePopperProps) => JSX.Element;
