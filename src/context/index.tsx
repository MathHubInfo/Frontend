import * as React from "react";

import { ReactComponent } from "../types/types";

import createMMTClient, { MMTClient } from "../clients/mmt";
import { Title } from "../components/fragments";
import { IMathHubConfig } from "./config";

import { Without } from "../types/omit";

/** Represents a global context for MathHub */
export interface IMathHubContext {
    config: IMathHubConfig;
    mmtClient: MMTClient;
}

/** a configuration for MathHub is global */
export const Context = React.createContext<IMathHubContext>(null!);

/** Creates a new config from a configuration */
export function makeContext(config: IMathHubConfig): IMathHubContext {
    const clientConfig = config.client;
    return {
        mmtClient: createMMTClient(clientConfig.MMT_URL),
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
            <Title title={title}>
                <Context.Consumer>{children}</Context.Consumer>
            </Title>
        );
    }
}

export type WithoutContext<P extends {context: IMathHubContext}> = Without<P, "context">;

/**
 * Creates a new component that takes an additional context parameter
 * @param WrappedComponent component to wrap
 */
export function withContext
    <P extends {context: IMathHubContext}>(WrappedComponent: ReactComponent<P>): ReactComponent<WithoutContext<P>> {
    return class WithContextComponent extends React.Component<WithoutContext<P>> {
        public static contextType = Context;
        public context!: IMathHubContext;
        public render() {
            return (
                <WrappedComponent context={this.context} {...this.props} />
            );
        }
    };
}
