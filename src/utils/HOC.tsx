import hoistNonReactStatic from "hoist-non-react-statics";
import * as React from "react";

/**
 * HOC marks wrapper as a higher order compontent that wraps original.
 *
 * @param wrapper the instantiated higher order component
 * @param hocName The name of the higher order component
 * @param original The original component being wrapped
 */
export default function annotateHOC<WP, OP>(
    wrapper: React.ComponentType<WP>,
    hocName: string,
    original: React.ComponentType<OP>,
): React.ComponentType<WP> {
    wrapper.displayName = `${hocName}(${original.displayName || original.name || "Component"})`;
    hoistNonReactStatic(wrapper, original);
    return wrapper;
}
