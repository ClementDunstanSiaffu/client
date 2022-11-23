interface CollapsableActionProps {
    disabled?: boolean;
    activated?: boolean;
    icon?: any;
    activatedIcon?: any;
    onActivationChange?: (activated: boolean) => void;
}
declare const CollapsableAction: (props: CollapsableActionProps) => JSX.Element;
export default CollapsableAction;
