import * as React from "react";

import { IApiObject, IReference } from "../context/api";
import { AnyToRef } from "../context/api/utils";

import { Breadcrumb } from "semantic-ui-react";
import { Nav } from "../components/common/nav";
import { encodeLibraryLink } from "../routes/library";

/** renders a full list of BreadCrumbs by iterating over the reference */
export class MHRefBreadCrumbs extends React.PureComponent<{to?: IApiObject}> {
    public render() {
        const toRef = this.props.to ? AnyToRef(this.props.to!) : undefined;

        // create an array of locations
        const locations: Array<IReference | undefined> = [toRef];

        // and keep adding the parents of each element
        while (locations[0]) {
            locations.unshift(locations[0]!.parent || undefined);
            // if we have an archive, the next lower level is a document which *is* the achives content
            // so if it exists, the next level should be removed
            if (locations[0] && locations[1] && locations[0]!.kind === "archive") {
                locations.splice(1, 1);
            }
        }

        return (
            <Breadcrumb style={{margin: "0em 0em 1em"}}>{
                locations.map((loc, index) => <MHBreadCrumb key={index} to={loc} />)}
            </Breadcrumb>
        );
    }
}

/** renderder a current reference */
function MHBreadCrumb(props: {to?: IReference}) {

    const text = props.to ? props.to!.name : "Library";

    return (
        <>
            <Breadcrumb.Section as={Nav} to={encodeLibraryLink(props.to)}>
                {text}
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
        </>
    );
}
