import * as React from "react"

import { ReactComponent } from "utils/types"

import {MathHubConfig} from "./config.d"
import {MMTAPIClient} from "./api/client"

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
        client: new MMTAPIClient(config)
    }
}


/**  Creates a new Element that takes MathHubContext as Parameter */
export function WithContext<P = {}>(Component: ReactComponent<P & {context: MathHubContext}>) : ReactComponent<P> {
    return class WithConfigComponent extends React.Component<P> {
        render() {
            return <Context.Consumer>{ctx => <Component {...this.props} context={ctx} />}</Context.Consumer>;
        }
    }
}