import * as React from 'react';
/** Any React Component */
export type ReactComponent<P> = React.ComponentClass<P> | React.SFC<P>;

/** a module of type P, potentially with default export */
export type Module<P> = {default: P} | P;