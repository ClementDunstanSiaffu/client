/// <reference types="react" />
import { React } from 'jimu-core';
import { ModalProps as _ModalProps } from 'reactstrap/lib/Modal';
/**
 * The Modal component props.
 */
export interface ModalProps extends _ModalProps {
    /**
     * When `true`, the modal will show itself.
     */
    isOpen?: boolean;
    /**
     * When `true`, the modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * @default true
     */
    autoFocus?: boolean;
    /**
     * Callback fired when you click on an area outside modal content.
     * @event
     */
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>;
    /**
     * Close the modal when escape key is pressed.
     * @default true
     */
    keyboard?: boolean;
    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     * @default true
     */
    backdrop?: boolean | 'static';
    /**
     * Allows scrolling the `<Modal.Body>` instead of the entire modal when overflowing.
     */
    scrollable?: boolean;
    /**
     * Callback fired before the modal transitions in.
     * @event
     */
    onEnter?: () => void;
    /**
     * Callback fired right before the modal transitions out.
     * @event
     */
    onExit?: () => void;
    /**
     * Callback fired after the modal has finished opening.
     * @event
     */
    onOpened?: () => void;
    /**
     * Callback fired after the modal is closed.
     * @event
     */
    onClosed?: () => void;
    /**
     * Add an optional extra class name to .modal-backdrop It could end up looking like class="modal-backdrop foo-modal-backdrop in".
     */
    backdropClassName?: string;
    /**
     * Add an optional extra class name to .modal-content
     */
    contentClassName?: string;
    /**
     * Vertically center the Dialog in the window.
     */
    centered?: boolean;
    /**
     * Default: false
     *
     * if `true`, do not change activate overlay when clicking modal.
     */
    disableActivateOverlay?: boolean;
}
/**
 * The `Modal` component adds dialogs to your site for lightboxes, user notifications, or completely custom content.
 *
 * ```ts
 * import { Modal } from 'jimu-ui'
 * ```
 */
export declare const _Modal: React.MemoExoticComponent<(props: ModalProps) => JSX.Element>;
/**
 * The `Modal` component adds dialogs to your site for lightboxes, user notifications, or completely custom content.
 *
 * ```ts
 * import { Modal, ModalHeader, ModalBody, ModalFooter } from 'jimu-ui'
 * ```
 */
export declare const Modal: import("@emotion/styled").StyledComponent<ModalProps, {}, {}>;
