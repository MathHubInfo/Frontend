import * as React from "react";

import { IApiObject, IFileReference, IReference } from "../api";
import { AnyToRef } from "../api/utils";

import { Breadcrumb } from "semantic-ui-react";
import { Nav } from "../components/common/nav";
import { encodeLibraryLink } from "../routes/library/structure/links";

/** renders a full list of BreadCrumbs by iterating over the reference */
export function MHRefBreadCrumbs(props: {to?: IApiObject | IFileReference}) {
    const toRef = props.to && props.to.kind !== "file" ? AnyToRef(props.to) : props.to;

    // create an array of locations
    const locations: Array<IReference | IFileReference | undefined> = [toRef];

    // and keep adding the parents of each element
    while (locations[0]) {
        locations.unshift(locations[0]!.parent || undefined);
        // if we have an archive, the next lower level is a document which *is* the achives content
        // so if it exists, the next level should be removed
        if (locations[0] && locations[1] && locations[1]!.kind !== "file" && locations[0]!.kind === "archive") {
            locations.splice(1, 1);
        }
    }

    return (
        <Breadcrumb style={{margin: "0em 0em 1em"}}>{
            locations.map((loc, index, ary) =>
                <MHBreadCrumb key={index} to={loc} last={index === ary.length - 1}/>)}
        </Breadcrumb>
    );
}

/** a single item of the bread crumbs */
function MHBreadCrumb(props: {to: IReference | IFileReference | undefined, last?: boolean}) {

    // if we have a file reference, we split '/'s into dividers
    // and render each element as a string
    if (props.to && props.to.kind === "file") {
        return (
            <>
            {props.to.path.split("/").map((t, i, a) => {
                return (
                    <React.Fragment key={i}>
                        <Breadcrumb.Section>{t}</Breadcrumb.Section>
                        {(!props.last || i < a.length - 1) && <Breadcrumb.Divider />}
                    </React.Fragment>
                );
            })}
            </>
        );
    }

    // if not, render a single iotem
    return (
        <>
            <Breadcrumb.Section as={Nav} to={encodeLibraryLink(props.to)}>
                {(props.to && props.to.name) || "Library"}
            </Breadcrumb.Section>
            {!props.last && <Breadcrumb.Divider />}
        </>
    );
}
