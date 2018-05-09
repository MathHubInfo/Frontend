import * as React from "react";

import { ReactComponent } from "../types/types";

import { MMTAPIClient, MockAPIClient, RestAPIClient } from "./api/client";
import { IMathHubConfig } from "./config.d";

/** Represents a global context for MathHub */
export interface IMathHubContext {
    config: IMathHubConfig;
    client: MMTAPIClient;
}

/** a configuration for MathHub is global */
export const Context = React.createContext<IMathHubContext>(makeContext({mmtURL: "(null)", mockMMT: true}));

/** Creates a new config from a configuration */
export function makeContext(config: IMathHubConfig): IMathHubContext {
    return {
        client: config.mockMMT ? new MockAPIClient(config) : new RestAPIClient(config),
        config,
    };
}

/**  Creates a new Element that takes MathHubContext as Parameter */
export function WithContext<P>(makeComponent: (context: IMathHubContext) => ReactComponent<P>): ReactComponent<P> {
    return class WithContextComponent extends React.Component<P> {
        public render() {
            return (
                <Context.Consumer>{
                    (ctx) => {
                        const Component = makeComponent(ctx);
                        return <Component {...this.props} />;
                    }
                }</Context.Consumer>
            );
        }
    };
}
