import { IMDialogJson } from '../types/app-config';
export interface DialogProps {
    dialogJson: IMDialogJson;
    /**
     * the followings are for fixed dialog
     */
    isOpenByPage?: boolean;
    runtime?: boolean;
    /**
     * the followings are for follow operner dialog:
     */
    opener?: any;
    isOpen?: boolean;
    toggle?: () => void;
}
