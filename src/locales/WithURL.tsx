import React from "react";

import annotateHOC from "../utils/HOC";

export interface URLProps {
    url: string;
}

export function WithURL<P extends URLProps>(
    Component: React.ComponentType<P>,
): React.ComponentType<Omit<P, keyof URLProps>> {
    return annotateHOC(
        class extends React.Component<Omit<P, keyof URLProps>> {
            static contextType = URLContext;
            context!: string;
            render() {
                const props = {
                    ...this.props,
                    url: this.context,
                } as P;

                return <Component {...props} />;
            }
        },
        "WithURL",
        Component,
    );
}

export const URLContext = React.createContext<string>("");
