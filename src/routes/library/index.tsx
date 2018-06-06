import { IApiObject } from "../../context/api";

/** properties for a library route */
export interface ILibraryRouteProps {
    match: {
        params: {
            id: string,
        },
    };
}

/** generates a route for a library page */
export function makeLibraryRouteSpec(kind?: string) {
    if (!kind) {
        return `/library`;
    }
    return `/library/${kind}/:id(.*)`;
}

/** encodes a link to an API Object */
export function encodeLink(to?: IApiObject): string {
    if (!to) {
        return `/library`;
    }

    const target = encodeURIComponent(to.id);

    let kind: string = to.kind;
    if (kind === "theory" || kind === "view") {
        kind = "module";
    }

    return `/library/${kind}/${target}`;
}

/** decodes the link parameter given to a library route */
export function decodeLinkID(id: string): string {
    return decodeURIComponent(id);
}
