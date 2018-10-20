import { IApiObject } from "../../../api";

/** properties for a library route */
import { RouteComponentProps } from "react-router";
export type ILibraryRouteProps = RouteComponentProps<{id: string}>;
export type IGlossaryProps = RouteComponentProps<{language: string}>;

/** generates a route for a library page */
export function makeLibraryRouteSpec(kind?: string) {
    if (!kind) {
        return `/library`;
    }
    return `/library/${kind}/:id(.*)`;
}

/** encodes a link to an API Object */
export function encodeLibraryLink(to?: IApiObject): string {
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
export function decodeLibraryLinkID(props: ILibraryRouteProps): string {
    return decodeURIComponent(props.match.params.id);
}
