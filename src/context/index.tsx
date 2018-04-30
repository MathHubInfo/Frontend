import * as React from "react"

import { ReactComponent } from "../types/types"

import {MathHubConfig} from "./config.d"
import {MMTAPIClient} from "./api/client"
import {MockMMTClient} from "./api/mock"

/** Represents a global context for MathHub */
export interface MathHubContext {
    config: MathHubConfig
    client: MMTAPIClient
}

/** a configuration for MathHub is global */
export const Context = React.createContext<MathHubContext>(makeContext({mmtURL: "(null)"}))

/** Creates a new config from a configuration */
export function makeContext(config: MathHubConfig): MathHubContext {
    return {
        config: config, 
        client: new MockMMTClient(config)
    }
}


/**  Creates a new Element that takes MathHubContext as Parameter */
export function WithContext<P>(makeComponent: (context: MathHubContext) => ReactComponent<P>) : ReactComponent<P> {
    return class WithContextComponent extends React.Component<P> {
        render() {
            return <Context.Consumer>{
                ctx => {
                    const Component = makeComponent(ctx); 
                    return <Component {...this.props} />
                }
            }</Context.Consumer>;
        }
    }
}