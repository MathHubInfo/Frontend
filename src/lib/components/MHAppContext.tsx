import * as React from "react";

import { IMathHubRuntimeConfig } from "../../types/config";

export interface IMHAppContext {
    // indicates if we are currently routing
    routing: boolean;

    // initial runtime config, may be loaded at a later point
    runtimeConfig?: IMathHubRuntimeConfig;

    // the current local language of the the page
    activeLanguage?: string;

    // all possible languages
    knownLanguages?: string[];

    // a function to change the local language
    changeLanguage(language: string): void;
}

/**
 * Represents a Context Containing the current state of the Routing Component
 * You should not have to use this.
 */
const MHAppContext = React.createContext<IMHAppContext>({ routing: false, changeLanguage: () => ({}) });
export default MHAppContext;
