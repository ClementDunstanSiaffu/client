/// <reference types="react" />
import { React, IMThemeVariables } from 'jimu-core';
import { DistributiveOmit, PropsOf } from '../emotion';
declare type ThemedComponent<C extends React.ComponentType<React.ComponentProps<C>>> = React.ForwardRefExoticComponent<DistributiveOmit<PropsOf<C>, 'theme'> & {
    theme?: IMThemeVariables;
}>;
/**
 * A higher-order component that provides the current theme as a prop to the wrapped child and listens for changes.
 * If the theme is updated, the child component will be re-rendered accordingly.
 */
export declare function withTheme<C extends React.ComponentType<React.ComponentProps<C>>>(Component: C, multiTheme?: boolean): ThemedComponent<C>;
/**
* A higher-order component that provides the theme2 as a prop to the
* wrapped child and listens for changes.
* @param Component
*/
export declare function withTheme2<C extends React.ComponentType<React.ComponentProps<C>>>(Component: C): ThemedComponent<C>;
/**
 * A higher-order component that provides the builder theme as a prop to the
 * wrapped child and listens for changes.
 * @param Component
 */
export declare const withBuilderTheme: typeof withTheme2;
export {};
