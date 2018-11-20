import * as React from "react";

import { IApiObject, IReference, ISourceReference } from "../../Clients/LibraryClient/objects";
import { AnyToRef } from "../../Clients/LibraryClient/objects/utils";

import { encodeLibraryLink } from "../../Routes/Library/Structure/Links";

import flatten from "../../Utils/flatten";

import { Breadcrumbs } from "../Common";
import { BreadCrumbsFill } from "../MathHubLayout";

import { PropsOfComponent } from "../../Types/react";
import { MemberType } from "../../Types/utils";

type IBreadcrumbsProps = PropsOfComponent<Breadcrumbs>;
type IBreadCrumbPart = MemberType<IBreadcrumbsProps["crumbs"]>;

// Any kind of bread crumbs
export default function MHBreadCrumbs(props: IBreadcrumbsProps) {
    const crumbs = [{ text: "Home", url: "" }, ...props.crumbs]; // prepend a link to home
    crumbs[crumbs.length - 1].url = undefined; // the last item is currently active

    return <BreadCrumbsFill children={crumbs} />;
}

// renders a full list of BreadCrumbs by iterating over the reference
export function MHRefBreadCrumbs(props: {to?: IApiObject | ISourceReference}) {
    return <MHBreadCrumbs crumbs={refToCrumbs(props.to)} />;
}

function refToCrumbs(to?: IApiObject | ISourceReference): IBreadCrumbPart[] {
    const toRef = to && to.kind !== "source" ? AnyToRef(to) : to;

    // create an array of locations
    const locations: Array<IReference | ISourceReference | undefined> = [toRef];

    // and keep adding the parents of each element
    while (locations[0]) {
        // tslint:disable-next-line:no-non-null-assertion
        locations.unshift(locations[0]!.parent || undefined);
        // if we have an archive, the next lower level is a document which *is* the achives content
        // so if it exists, the next level should be removed
        // tslint:disable-next-line:no-non-null-assertion
        if (locations[0] && locations[1] && locations[1]!.kind !== "source" && locations[0]!.kind === "archive")
            locations.splice(1, 1);
    }

    return flatten(locations.map((loc: IApiObject | ISourceReference | undefined) => {
        if (loc && loc.kind === "source") {
            if (!loc.path) return [];

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
