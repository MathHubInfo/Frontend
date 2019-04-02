import CompilationPhase from "../context/CompilationPhase";

/**
 * Configuration known to both the server and client side
 */
export interface IMathHubPublicConfig {
    // the phase during which this configuration was compiled
    compilationPhase: CompilationPhase;

    // the base url for the library client
    libraryURL?: string;

    // the runtime config url to fetch data from (if any)
    configURL?: string;

    // the url for the news client
    newsURL?: string;

    // the url for the glossary client
    glossaryURL?: string;

    // the url for the admin client
    adminURL?: string;

    // the url for the translation client
    translationURL?: string;

    // the name of the theme to use
    theme?: string;

    // the current version of MathHub
    version: IMathHubVersion;
}

/**
 * Version information about MathHub
 */
export interface IMathHubVersion {
    // the version as found in package.json
    semantic: string;

    // the time at which the configuration for this
    // mathhub version was generated. Unix Epoch. 
    configTime: number;

    // the git version (if available)
    git?: {
        // hash of the git commit this was built from
        hash: string;

        // the branch this was built from (if available)
        branch?: string;

        // boolean indicating if the working directory was dirty
        // at the time of building
        dirty?: boolean;

        // the time at which this commit was built (if available)
        // Unix Epoch. 
        time?: number;
    }
}

/**
 * Configuration known to the server side
 */
export interface IMathHubServerConfig {
    // the base for upstream urls
    upstreamRequestBase: string;
}

/**
 * Configuration loaded lazily at runtime
 */
export interface IMathHubRuntimeConfig {
    SHOW_RIBBON?: string;
}
