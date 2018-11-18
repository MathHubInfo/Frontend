import * as React from "react";

import { IApiObject, IReference, ISourceReference } from "../../clients/mmt/objects";
import { AnyToRef } from "../../clients/mmt/objects/utils";

import { encodeLibraryLink } from "../../routes/library/structure/links";

import flatten2 from "../../utils/flatten";

import { IBreadCrumbPart, IBreadcrumbsProps } from "../common";
import { BreadCrumbsFill } from "../layout";

/** Any kind of bread crumbs */
export default function MHBreadCrumbs(props: IBreadcrumbsProps) {
    const crumbs = [{ text: "Home", url: "" }, ...props.crumbs]; // prepend a link to home
    crumbs[crumbs.length - 1].url = undefined; // the last item is currently active
    return <BreadCrumbsFill children={crumbs} />;
}

/** renders a full list of BreadCrumbs by iterating over the reference */
export function MHRefBreadCrumbs(props: {to?: IApiObject | ISourceReference}) {
    return <MHBreadCrumbs crumbs={refToCrumbs(props.to)} />;
}

function refToCrumbs(to?: IApiObject | ISourceReference): IBreadCrumbPart[] {
    const toRef = to && to.kind !== "source" ? AnyToRef(to) : to;

    // create an array of locations
    const locations: Array<IReference | ISourceReference | undefined> = [toRef];

    // and keep adding the parents of each element
    while (locations[0]) {
        locations.unshift(locations[0]!.parent || undefined);
        // if we have an archive, the next lower level is a document which *is* the achives content
        // so if it exists, the next level should be removed
        if (locations[0] && locations[1] && locations[1]!.kind !== "source" && locations[0]!.kind === "archive") {
            locations.splice(1, 1);
        }
    }

    return flatten2(locations.map((loc: IApiObject | ISourceReference | undefined) => {
        if (loc && loc.kind === "source") {
            if (!loc.path) {
                return [];
            }

            return loc.path.split("/").map((p: string) => {
                return {text: p};
            });
        }

        return [{
            text: loc && loc.name || "Library",
            external: false,
            url: encodeLibraryLink(loc),
        }];
    }));
}
