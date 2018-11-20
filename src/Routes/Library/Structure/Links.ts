import { RouteComponentProps } from "react-router";

import { IApiObject } from "../../../Clients/LibraryClient/objects";
import { IMathHubContext } from "../../../Context";
export type ILibraryRouteProps = RouteComponentProps<{id: string}> & {context: IMathHubContext};
export type IGlossaryProps = RouteComponentProps<{language: string}>;

// generates a route for a library page
export function makeLibraryRouteSpec(kind?: string) {
    if (!kind)
        return "/library";

    return `/library/${kind}/:id(.*)`;
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
