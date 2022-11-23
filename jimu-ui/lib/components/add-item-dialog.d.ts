/// <reference types="react" />
/**
 * The AddItemDialog component props.
 */
export interface AddItemDialogProps {
    /**
     * Be invoked when clicking the cancel button.
     */
    onClose: () => void;
    /**
     * Be invoked when clicking the ok button.
     */
    onConfirm: (name: string, folderId: string) => void;
}
/**
 * The `AddItemDialog` component let users to set item's title and folder.
 *
 * ```ts
 * import { AddItemDialog } from 'jimu-ui'
 * ```
 */
export declare function AddItemDialog(props: AddItemDialogProps): JSX.Element;
