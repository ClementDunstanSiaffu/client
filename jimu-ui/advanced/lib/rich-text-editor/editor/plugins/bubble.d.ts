/** @jsx jsx */
import { React } from 'jimu-core';
import { Sources } from '../../type';
import { PopperProps } from 'jimu-ui';
import { RichPluginInjectedProps } from './plugin';
export interface BubblePluginProps extends RichPluginInjectedProps, Omit<PopperProps, 'children' | 'reference' | 'open' | 'version'> {
    source?: Sources;
    /**
     * `Bubble` will be hidden when version changes.
     */
    version?: number;
}
export declare const _Bubble: (props: BubblePluginProps) => React.ReactElement;
export declare const Bubble: import("@emotion/styled").StyledComponent<BubblePluginProps & {
    children?: React.ReactNode;
}, {}, {}>;
