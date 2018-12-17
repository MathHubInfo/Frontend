import { RouteComponentProps } from "react-router";

import { IApiObject } from "../../../Clients/LibraryClient/objects";
import { IMathHubContext } from "../../../Context";
export type ILibraryRouteProps = RouteComponentProps<{id: string}> & {context: IMathHubContext};
export type IGlossaryProps = RouteComponentProps<{language: string}>;


export function makeReactLibraryRoute(kind?: string) {
    return makeLibraryRoute(kind, ".*");
}

export function makeExpressLibraryRoute(kind?: string) {
    return makeLibraryRoute(kind, "*");
}

// generates a route for the library page
function makeLibraryRoute(kind: string | undefined, pattern: string) {
    if (!kind)
        return "";
    if (kind === "library")
        return "/library";

    return `/library/${kind}/:id(${pattern})`;
}

// encodes a link to an API Object
export function encodeLibraryLink(to?: IApiObject): string {
    if (!to)
        return "/library";

    // const target = encodeURIComponent(to.id);
    const target = to.id;

    let kind: string = to.kind;
    if (kind === "theory" || kind === "view")
        kind = "module";

    return `/library/${kind}/${target}`;
}

// decodes the link parameter given to a library route
export function decodeLibraryLinkID(props: ILibraryRouteProps): string {
    // return decodeURIComponent(props.match.params.id);
    return props.match.params.id;
}
