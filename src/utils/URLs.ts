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

export interface ITGViewData {
    type: string;
    graphdata: string;
}

export function TGViewURL(obj: IReferencable): ITGViewData | undefined {
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
    } else if (!source.path) {
        if (ARCHIVE_URL_TEMPLATE === undefined) return undefined;

        return ARCHIVE_URL_TEMPLATE.replace("${archive}", source.parent.id)
            .replace("${branch}", source.version || "master")
            .replace("${path}", "");
    } else {
        if (FILE_URL_TEMPLATE === undefined) return undefined;

        return FILE_URL_TEMPLATE.replace("${archive}", source.parent.id)
            .replace("${branch}", source.version || "master")
            .replace("${path}", source.path || "");
    }
}
