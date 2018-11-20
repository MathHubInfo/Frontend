import * as React from "react";

import GlossaryClient from "../Clients/GlossaryClient";
import { default as createMMTClient, MMTClient } from "../Clients/MMTClient";
import NewsClient from "../Clients/NewsClient";
import { Without } from "../Types/utils";

import { IMathHubConfig } from "./config";

// Represents a global context for MathHub
export interface IMathHubContext {
    config: IMathHubConfig;
    mmtClient: MMTClient;
    newsClient: NewsClient;
    glossaryClient: GlossaryClient;
}

// a configuration for MathHub is global
// tslint:disable-next-line:no-non-null-assertion
export const Context = React.createContext<IMathHubContext>(null!);

// Creates a new config from a configuration
export function makeContext(config: IMathHubConfig): IMathHubContext {
    const clientConfig = config.client;

    return {
        mmtClient: createMMTClient(clientConfig.MMT_URL),
        newsClient: new NewsClient(clientConfig.NEWS_URL),
        glossaryClient: new GlossaryClient(clientConfig.GLOSSARY_URL),
        config,
    };
}

export type WithoutContext<P extends {context: IMathHubContext}> = Without<P, "context">;

/**
 * Creates a new component that takes an additional context parameter
 * @param WrappedComponent component to wrap
 */
export function withContext<P extends {context: IMathHubContext}>(WrappedComponent: React.ComponentClass<P>):
    React.ComponentClass<WithoutContext<P>> {
    return class WithContextComponent extends React.Component<WithoutContext<P>> {
        static displayName = `withContext(${WrappedComponent.displayName})`;
        static contextType = Context;
        context!: IMathHubContext;
        render() {
            // tslint:disable-next-line:prefer-object-spread
            const theProps = Object.assign({context: this.context}, this.props) as {} as Readonly<P>;

            return (
                <WrappedComponent {...theProps} />
            );
        }
    };
}
