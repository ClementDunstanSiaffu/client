/// <reference types="react" />
import { React, ResourceType } from 'jimu-core';
import { ResourceItemInfo } from 'jimu-for-builder';
import { ButtonType } from 'jimu-ui';
interface Props {
    widgetId: string;
    className?: string;
    style?: React.CSSProperties;
    color?: ButtonType;
    label?: string | JSX.Element;
    title?: string;
    ariaLabel?: string;
    ariaDescribedby?: string;
    onChange?: (resourceInfo: ResourceItemInfo) => void;
    onResourceNotSupported?: () => void;
    onClick?: () => void;
    disabled?: boolean;
    type?: ResourceType;
    resourceName?: string;
}
export default class ResourceComponent extends React.PureComponent<Props, unknown> {
    fileInput: any;
    supportedResourceSuffix: {
        IMAGE: string[];
    };
    static defaultProps: {
        type: ResourceType;
        style: {};
    };
    constructor(props: any);
    getFileFromBrowse: () => Promise<void>;
    getAccept: (type: ResourceType) => any;
    render(): JSX.Element;
}
export {};
