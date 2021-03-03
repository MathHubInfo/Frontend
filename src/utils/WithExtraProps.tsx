import hoistNonReactStatic from "hoist-non-react-statics";
import * as React from "react";

/**
 * Adds some extra props to a component
 * @param Component Component to add props to
 * @param extra function to get props with
 */
export function WithExtraProps<M, P extends M>(
    Component: React.ComponentType<P>,
    extra: ((props: Omit<P, keyof M>) => M) | M,
): React.ComponentType<Omit<P, keyof M>> {
    return wrapping(
        class extends React.Component<Omit<P, keyof M>> {
            render() {
                const newProps =
                    typeof extra === "function"
                        ? // we need an extra cast here, since M could be a function type
                          (extra as (props: Omit<P, keyof M>) => M)(this.props)
                        : extra;

                const compProps = { ...this.props, ...newProps } as P;

                return <Component {...compProps} />;
            }
        },
        "WithExtraProps",
        Component,
    );
}

export function wrapping<WP, OP>(
    wrapper: React.ComponentType<WP>,
    decorator: string,
    original: React.ComponentType<OP>,
): React.ComponentType<WP> {
    wrapper.displayName = `${decorator}(${original.displayName || original.name || "Component"})`;
    hoistNonReactStatic(wrapper, original);
    return wrapper;
}
