import * as React from "react";

import { ReactComponent } from "../types/types";

import { Client, createClient } from "../api";
import { Title } from "../components/fragments";
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
        client: createClient(clientConfig.MMT_URL),
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

export type TWithContext<P> = P & {context: IMathHubContext};

/**
 * Creates a new component that takes an additional context parameter
 * @param WrappedComponent component to wrap
 */
export function withContext<P = {}>(WrappedComponent: ReactComponent<TWithContext<P>>): ReactComponent<P> {
    return class WithContextComponent extends React.Component<P> {
        public render() {
            return (
                <Context.Consumer>{(ctx) => <WrappedComponent context={ctx} {...this.props} />}</Context.Consumer>
            );
        }
    };
}
