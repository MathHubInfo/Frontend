/** @file Contains react utility type definitions used in MathHub */

import * as React from "react";
/**
 * Represents an object which can be instatiated to become a React Component
 * @deprecated Use React.ComponentClass<P, S> instead
 */
export type ReactComponent<P = {}, S = any> = React.ComponentClass<P, S> | React.SFC<P>;

/**
 * Represents an ESNext Module of a given type
 */
export type Module<P> = {default: P} | P;

/**
 * The type of the props of a given component
 */
export type PropsOfComponent<T> = 
    T extends React.Component<infer TProps, any> ? TProps : (
    T extends React.SFC<infer SProps> ? SProps : never
);
