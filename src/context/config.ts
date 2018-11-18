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
    /** the url to fetch news from */
    NEWS_URL: string;
    /** the url to fetch the glossary from */
    GLOSSARY_URL: string;
    /** are we using browser router */
    BROWSER_ROUTER: string;
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

    external: {
        /** url to gitlab group urls */
        gitlabGroup: string;
        /** url to gitlab archive urls */
        gitlabArchive: string;
        /** url to open jupyter notebooks in */
        jupyter: string;
    };

    /** url to show to the administration page */
    admin: string;
    /** about url */
    about: string;
}

/** the default MathHub Url configuration */
export const urls: IMathHubURLConfig = {
    help: {
        documentation: "https://github.com/MathHubInfo/Documentation/wiki",
        browseSources: "https://gl.mathhub.info/",
        contactAHuman: "http://lists.informatik.uni-erlangen.de/mailman/listinfo/mathhub",
    },
    external: {
        // tslint:disable-next-line:no-invalid-template-strings
        gitlabGroup: "https://gl.mathhub.info/${group}",
        // tslint:disable-next-line:no-invalid-template-strings
        gitlabArchive: "https://gl.mathhub.info/${archive}/tree/${branch}/${path}",
        // tslint:disable-next-line:max-line-length no-invalid-template-strings
        jupyter: "https://jupyter.mathhub.info/user-redirect/upload?url=https://gl.mathhub.info/${archive}/raw/${branch}/${path}?inline=false",
    },
    admin: "/admin/",
    about: "https://github.com/MathHubInfo/Documentation/wiki/about",
};
