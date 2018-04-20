/** @file Contains utility type definitions used in MathHub */

import {ComponentClass, SFC} from 'react';
/**
 * Represents an object which can be instatiated to become a React Component
 */
export type ReactComponent<P> = ComponentClass<P> | SFC<P>;

/**
 * Represents an ESNext Module of a given type
 */
export type Module<P> = {default: P} | P;