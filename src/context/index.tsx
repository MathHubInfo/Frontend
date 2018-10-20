import * as React from "react";

import { ReactComponent } from "../types/types";

import { Client, MockClient, RestClient } from "../api";
import { MHTitle } from "../utils/title";
import { IMathHubConfig } from "./config";

/** Represents a global context for MathHub */
export interface IMathHubContext {
    config: IMathHubConfig;
    client: Client;
}

/** a configuration for MathHub is global */
export const Context = React.createContext<IMathHubContext>(null!);

/** Creates a new config from a configuration */
export function makeContext(config: IMathHubConfig): IMathHubContext {
    const clientConfig = config.client;
    return {
        client: clientConfig.MOCK_MMT ? new MockClient() : new RestClient(clientConfig.MMT_URL),
        config,
    };
}

interface ITitledWithContextProps {
    title?: string;
    children: (context: IMathHubContext) => React.ReactNode;
}

/** Combines the MHTitle and Context.Consumer elements */
export class TitledWithContext extends React.PureComponent<ITitledWithContextProps> {
    public render() {
        const { title, children } = this.props;
        return (
            <MHTitle title={title}>
                <Context.Consumer>{children}</Context.Consumer>
            </MHTitle>
        );
    }
}

/**  Creates a new Element that takes MathHubContext as Parameter */
export function WithContext<P>(makeComponent: (context: IMathHubContext) => ReactComponent<P>): ReactComponent<P> {
    // TODO: This function should not be used anymore
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
