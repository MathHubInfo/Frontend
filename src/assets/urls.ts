// configuration for external urls used by mathHub
export interface IMathHubURLConfig {
    help: {
        // url to show to the doc page
        documentation: string;
        // url to show content sources under
        browseSources: string;
        // url to contact humans under
        contactAHuman: string;
        // information about the beta version of mathhub
        beta: string;
        // url to report an issue
        report: string;
    };

    external: {
        // url to gitlab group urls
        gitlabGroup: string;
        // url to gitlab archive urls
        gitlabArchive: string;
        // url to open jupyter notebooks in
        jupyter: string;
    };

    // url to show to the administration page
    admin: string;
    // about url
    about: string;
}

// the default MathHub Url configuration
export const urls: IMathHubURLConfig = {
    help: {
        documentation: "https://github.com/MathHubInfo/Documentation/wiki",
        browseSources: "https://gl.mathhub.info/",
        // Uni Erlangen: FIX THIS PLEASE

        contactAHuman: "http://lists.informatik.uni-erlangen.de/mailman/listinfo/mathhub",
        beta: "https://github.com/MathHubInfo/Documentation/wiki/beta.mathhub.info",
        report: "https://github.com/MathHubInfo/Frontend/issues/new",
    },
    external: {
        gitlabGroup: "https://gl.mathhub.info/${group}",

        gitlabArchive: "https://gl.mathhub.info/${archive}/tree/${branch}/${path}",

        jupyter:
            "https://jupyter.mathhub.info/user-redirect/upload?url=https://gl.mathhub.info/${archive}/raw/${branch}/${path}?inline=false",
    },
    admin: "/admin/",
    about: "https://docs.mathhub.info/legacy/about",
};
