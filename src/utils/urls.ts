// tslint:disable:export-name no-invalid-template-strings
import { ISourceReference } from "../context/LibraryClient/objects";

/**
 * Builds a URL for a source reference
 * @param source Source Reference to build URL for
 */
export function sourceURL(source: ISourceReference) {
    return makeURL(source, sourceURL.GROUP_TEMPLATE, sourceURL.ARCHIVE_TEMPLATE);
}
sourceURL.GROUP_TEMPLATE = "https://gl.mathhub.info/${group}";
sourceURL.ARCHIVE_TEMPLATE = "https://gl.mathhub.info/${archive}/tree/${branch}/${path}";

/**
 * Builds a URL for a jupyter reference
 * @param source Jupyter Reference to build URL for
 */
export function jupyterURL(source: ISourceReference) {
    return makeURL(source, jupyterURL.GROUP_TEMPLATE, jupyterURL.ARCHIVE_TEMPLATE);
}
jupyterURL.GROUP_TEMPLATE = "";
// tslint:disable-next-line:max-line-length
jupyterURL.ARCHIVE_TEMPLATE = "https://jupyter.mathhub.info/user-redirect/upload?url=https://gl.mathhub.info/${archive}/raw/${branch}/${path}?inline=false";

/**
 * Builds a generic URL
 * @param source Source reference to build URL for
 * @param GROUP_URL_TEMPLATE Template for group urls
 * @param ARCHIVE_URL_TEMPLATE Template for archive urls
 */
function makeURL(source: ISourceReference, GROUP_URL_TEMPLATE: string, ARCHIVE_URL_TEMPLATE: string): string {
    return (source.parent.kind === "group") ?
        GROUP_URL_TEMPLATE.replace("${group}", source.parent.name) :
        ARCHIVE_URL_TEMPLATE
            .replace("${archive}", source.parent.id)
            .replace("${branch}", source.version || "master")
            .replace("${path}", source.path || "");
}
