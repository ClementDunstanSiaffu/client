/// <reference types="react" />
import { React } from 'jimu-core';
/**
 * The Badge component props
 */
export interface BadgeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default danger
     */
    color?: 'primary' | 'secondary' | 'light' | 'dark' | 'success' | 'info' | 'warning' | 'danger';
    /**
     * Whether to display a dot instead of `badgeContent`.
     * @default false
     */
    dot?: boolean;
    /**
     * The badge will be added relative to this node.
     */
    children?: React.ReactElement | React.ReactNode;
    /**
     * Defines the style added to the badge element.
     */
    badgeStyle?: React.CSSProperties;
    /**
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactElement | React.ReactNode;
    /**
     * If true, the badge will be invisible.
     * @default false
     */
    hideBadge?: boolean;
}
/**
 * The `Badge` component generates a small badge to the top-right of its child(ren).
 *
 * ```ts
 * import { Badge } from 'jimu-ui'
 * ```
 */
export declare const _Badge: (props: BadgeProps) => JSX.Element;
/**
 * The `Badge` component generates a small badge to the top-right of its child(ren).
 *
 * ```ts
 * import { Badge } from 'jimu-ui'
 * ```
 */
export declare const Badge: import("@emotion/styled").StyledComponent<BadgeProps, {}, {}>;
