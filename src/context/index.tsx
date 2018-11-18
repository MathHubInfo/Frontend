import * as React from "react";

import { ReactComponent } from "../types/react";

import GlossaryClient from "../clients/glossary";
import createMMTClient, { MMTClient } from "../clients/mmt";
import NewsClient from "../clients/news";

import { IMathHubConfig } from "./config";

import { Without } from "../types/utils";

/** Represents a global context for MathHub */
export interface IMathHubContext {
    config: IMathHubConfig;
    mmtClient: MMTClient;
    newsClient: NewsClient;
    glossaryClient: GlossaryClient;
}

/** a configuration for MathHub is global */
export const Context = React.createContext<IMathHubContext>(null!);

/** Creates a new config from a configuration */
export function makeContext(config: IMathHubConfig): IMathHubContext {
    const clientConfig = config.client;
    return {
        mmtClient: createMMTClient(clientConfig.MMT_URL),
        newsClient: new NewsClient(clientConfig.NEWS_URL),
        glossaryClient: new GlossaryClient(clientConfig.GLOSSARY_URL), // TODO: Implement URL
        config,
    };
}

export type WithoutContext<P extends {context: IMathHubContext}> = Without<P, "context">;

/**
 * Creates a new component that takes an additional context parameter
 * @param WrappedComponent component to wrap
 */
export function withContext
    <P extends {context: IMathHubContext}>(WrappedComponent: ReactComponent<P>): ReactComponent<WithoutContext<P>> {
    return class WithContextComponent extends React.Component<WithoutContext<P>> {
        public static displayName = `withContext(${WrappedComponent.displayName})`;
        public static contextType = Context;
        public context!: IMathHubContext;
        public render() {
            return (
                <WrappedComponent context={this.context} {...this.props} />
            );
        }
    };
}
