/** @file Contains utility type definitions used in MathHub */

import * as React from "react";
/**
 * Represents an object which can be instatiated to become a React Component
 */
export type ReactComponent<P = {}, S = any> = React.ComponentClass<P, S> | React.SFC<P>;

/**
 * Represents an ESNext Module of a given type
 */
export type Module<P> = {default: P} | P;

/**
 * The type of the props of a given component
 */
export type PropsOfComponent<T> = T extends React.Component<any, any> ? ClassPropType<T> : SFCPropType<T>;
type ClassPropType<T> = T extends React.Component<infer TProps, any> ? TProps : null;
type SFCPropType<T> = T extends React.SFC<infer TProps> ? TProps : null;

/** checks if an element is a valid ReactNode */
export function isReactNode(c: any): c is React.ReactNode {
  return React.isValidElement(c) ? typeof c !== "function" : false;
}
