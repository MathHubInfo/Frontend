/**
 * Represents a static configuration of MathHub
 */
export interface IMathHubConfig {
    client: IMathHubClientConfig;
    urls: IMathHubURLConfig;
}

export interface IMathHubClientConfig {
    /** url of the MMT client, if any */
    MMT_URL: string;
    /** if set to true, use a mocked MMT client instead of a real one */
    MOCK_MMT: boolean;
}

/** configuration for external urls used by mathHub */
export interface IMathHubURLConfig {
    help: {
        /** url to show to the doc page */
        documentation: string;
        /** url to show content sources under */
        browseSources: string;
        /** url to contact humans under  */
        contactAHuman: string;
    };

    /** url to show to the administration page */
    admin: string;
    /** about url */
    about: string;
}

/** the default MathHub Url configuration */
export const urls = {
    help: {
        documentation: "https://github.com/MathHubInfo/Documentation/wiki",
        browseSources: "https://gl.mathhub.info/",
        contactAHuman: "http://lists.informatik.uni-erlangen.de/mailman/listinfo/mathhub",
    },
    admin: "/admin/",
    about: "https://github.com/MathHubInfo/Documentation/wiki/about",
};
