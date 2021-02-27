import * as React from "react";

export interface IMHAppContext {
    // indicates if we are currently routing
    routing: boolean;

    // the current local language of the the page
    activeLanguage: string;

    // all possible languages
    knownLanguages: string[];

    // a function to change the local language
    changeLanguage(language: string): Promise<void>;
}

// TODO: Move away from this context

/**
 * Represents a Context Containing the current state of the Routing Component
 * You should not have to use this.
 */
const MHAppContext = React.createContext<IMHAppContext>({
    routing: false,
    activeLanguage: "",
    knownLanguages: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changeLanguage: async () => {},
});
export default MHAppContext;
