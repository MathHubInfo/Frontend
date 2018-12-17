import * as React from "react";

import { IMathHubRuntimeConfig } from "../../types/config";

export interface IMHAppContext {
    // indicates if we are currently routing
    routing: boolean;

    // initial runtime config, may be loaded at a later point
    runtimeConfig?: IMathHubRuntimeConfig;
}

/**
 * Represents a Context Containing the current state of the Routing Component
 * You should not have to use this.
 */
const MHAppContext = React.createContext<IMHAppContext>({routing: false});
export default MHAppContext;
