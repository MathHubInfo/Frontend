import { ISourceReference, IReferencable } from "../context/LibraryClient/objects";

// TODO: Read the template URLS from the configuration

/**
 * Builds a URL for a source reference
 * @param source Source Reference to build URL for
 */
export function SourceURL(source: ISourceReference): string | undefined {
    return makeURL(source, SourceURL.GROUP_TEMPLATE, SourceURL.ARCHIVE_TEMPLATE, SourceURL.ARCHIVE_TEMPLATE);
}
SourceURL.GROUP_TEMPLATE = "https://gl.mathhub.info/${group}";
SourceURL.ARCHIVE_TEMPLATE = "https://gl.mathhub.info/${archive}/tree/${branch}/${path}";

export function IssueURL(source: ISourceReference): string | undefined {
    return makeURL(source, IssueURL.GROUP_TEMPLATE, IssueURL.ARCHIVE_TEMPLATE, IssueURL.ARCHIVE_TEMPLATE);
}
IssueURL.GROUP_TEMPLATE = "https://gl.mathhub.info/groups/${group}/-/issues";
IssueURL.ARCHIVE_TEMPLATE = "https://gl.mathhub.info/${archive}/issues";

interface ITGViewData {
    type: string;
    graphdata: string;
}

export function TGViewData(obj: IReferencable): ITGViewData | undefined {
    let type: string | undefined;
    switch (obj.kind) {
        case "archive":
        case "group":
            type = "archivegraph";
            break;
        case "document":
            type = "docgraph";
            break;
        case "module":
            type = "thgraph";
            break;
        default:
            return undefined;
    }

    return { type, graphdata: obj.id };
}

export function TGViewURL(data: ITGViewData, href: string): string {
    const { hostname } = new URL(href);

    // HACK HACK HACK
    // Until TGVIEW3D is ready, we hard-code the URLs to use here
    // These are based on the MathHub base URL
    switch (hostname.toLowerCase()) {
        case "mathhub.info":
        case "www.mathhub.info":
            return tgViewLegacyURL("https://mmt.mathhub.info", data);
        case "beta.mathhub.info":
            return tgViewLegacyURL("https://mmt.beta.mathhub.info", data);
        case "localhost":
            return tgViewLegacyURL("http://localhost:8080", data);
        default:
            return tgViewDefaultURL(data);
    }
}

export function TGView3DURL(data: ITGViewData, href: string): string {
    let url = TGViewURL(data, href);

    // remove the prefix
    if (url.startsWith("http://")) url = url.substring(7);
    else if (url.startsWith("https://")) url = url.substring(8);

    // prepend TGView3D URL
    return `https://tgview3d.mathhub.info/?${url}`;
}

function tgViewDefaultURL({ type, graphdata }: ITGViewData) {
    return `/applications/tgview?type=${type}&graphdata=${escape(graphdata)}`;
}
function tgViewLegacyURL(base: string, { type, graphdata }: ITGViewData) {
    return `${base}/graphs/tgview.html?type=${type}&graphdata=${escape(graphdata)}`;
}

/**
 * Builds a URL for a jupyter reference
 * @param source Jupyter Reference to build URL for
 */
export function JupyterURL(source: ISourceReference): string | undefined {
    return makeURL(source, JupyterURL.GROUP_TEMPLATE, JupyterURL.ARCHIVE_TEMPLATE, JupyterURL.ARCHIVE_TEMPLATE);
}
JupyterURL.GROUP_TEMPLATE = "";
JupyterURL.ARCHIVE_TEMPLATE =
    "https://jupyter.mathhub.info/user-redirect/upload?url=https://gl.mathhub.info/${archive}/raw/${branch}/${path}?inline=false";

/**
 * Builds a generic URL
 * @param source Source reference to build URL for
 * @param GROUP_URL_TEMPLATE Template for group urls
 * @param ARCHIVE_URL_TEMPLATE Template for archive urls
 */
function makeURL(
    source: ISourceReference,
    GROUP_URL_TEMPLATE?: string,
    ARCHIVE_URL_TEMPLATE?: string,
    FILE_URL_TEMPLATE?: string,
): string | undefined {
    if (source.parent.kind === "group") {
        if (GROUP_URL_TEMPLATE === undefined) return undefined;

        return GROUP_URL_TEMPLATE.replace("${group}", source.parent.name);
    } else if (!("path" in source)) {
        if (ARCHIVE_URL_TEMPLATE === undefined) return undefined;

        return ARCHIVE_URL_TEMPLATE.replace("${archive}", source.parent.id)
            .replace("${branch}", "version" in source ? source.version : "master")
            .replace("${path}", "");
    } else {
        if (FILE_URL_TEMPLATE === undefined) return undefined;

        return FILE_URL_TEMPLATE.replace("${archive}", source.parent.id)
            .replace("${branch}", "version" in source ? source.version : "master")
            .replace("${path}", source.path || "");
    }
}
