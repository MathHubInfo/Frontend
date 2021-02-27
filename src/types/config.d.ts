/**
 * Configuration known to both the server and client side
 */
export interface IMathHubConfig {
    // the base url for the library client
    LIBRARY_URL?: string;

    // the url for the news client
    NEWS_URL?: string;

    // the url for the glossary client
    GLOSSARY_URL?: string;

    // the url for the admin client
    ADMIN_URL?: string;

    // the url for the translation client
    TRANSLATION_URL?: string;

    // the current version of MathHub
    MATHHUB_VERSION: IMathHubVersion;

    // the (server-side) base for upstream requests
    UPSTREAM_BASE_URL?: string;
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
    };
}
