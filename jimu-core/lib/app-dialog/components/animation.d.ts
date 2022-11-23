import { jsx } from '@emotion/react';
import { IMDialogJson } from '../../types/app-config';
interface DialogAnimationPros {
    dialogJson: IMDialogJson;
    isOpen: boolean;
    jimuUI: any;
    jimuLayout: any;
    loadingCallBack: (isLoading: boolean) => void;
    messages?: any;
    cbxAnimation?: boolean;
    setCbxState?: (checked: boolean) => void;
    isChecked?: boolean;
    closeDialog?: () => void;
}
declare function DialogAnimation({ dialogJson, isOpen, jimuUI, jimuLayout, loadingCallBack, messages, cbxAnimation, isChecked, setCbxState, closeDialog }: DialogAnimationPros): jsx.JSX.Element;
export default DialogAnimation;
