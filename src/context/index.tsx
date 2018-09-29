import * as React from "react";

import { ReactComponent } from "../types/types";

import { MMTAPIClient, RestAPIClient } from "./api/client";
import { MockAPIClient } from "./api/mock";
import { IMathHubConfig } from "./config";

/** Represents a global context for MathHub */
export interface IMathHubContext {
    config: IMathHubConfig;
    client: MMTAPIClient;
}

/** a configuration for MathHub is global */
export const Context = React.createContext<IMathHubContext>(null!);

/** Creates a new config from a configuration */
export function makeContext(config: IMathHubConfig): IMathHubContext {
    const clientConfig = config.client;
    return {
        client: clientConfig.MOCK_MMT ? new MockAPIClient(clientConfig) : new RestAPIClient(clientConfig),
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
