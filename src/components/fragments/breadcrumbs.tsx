import * as React from "react";

import { IApiObject, IReference, ISourceReference } from "../../api";
import { AnyToRef } from "../../api/utils";

import { Breadcrumb } from "semantic-ui-react";
import { encodeLibraryLink } from "../../routes/library/structure/links";
import { Nav } from "../common";

import flatten2 from "../../utils/flatten";

/** a component of the bread crumb */
interface IBreadCrumbComponent {
    /** text */
    text: string;
    /** url this component links to (if any) */
    url?: string;
    /** is this component external (if any) */
    external?: boolean;
}

interface IBreadcrumbsProps<T> {
    data: T;
    crumbs: (data: T) => IBreadCrumbComponent[];
}

/**
 * A list of breadcrumbs
 */
export default class Breadcrumbs<T> extends React.Component<IBreadcrumbsProps<T>, {crumbs: IBreadCrumbComponent[]}
> {
    constructor(props: IBreadcrumbsProps<T>) {
        super(props);
        this.state = {crumbs: []};
    }

    public static getDerivedStateFromProps<T>(props: IBreadcrumbsProps<T>) {
        const { crumbs, data } = props;
        return { crumbs: crumbs(data) };
    }

    public render() {
        const { crumbs } = this.state;
        return (
            <Breadcrumb style={{margin: "0em 0em 1em"}}>{
                crumbs.map((c, index, ary) =>
                    <BreadcrumbsPart key={index} part={c} last={index === ary.length - 1}/>)}
            </Breadcrumb>
        );
    }
}

function BreadcrumbsPart(props: {part: IBreadCrumbComponent, last?: boolean}) {
    const { url, text, external } = props.part;

    let theSection;
    if (url) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (external) {
            theSection = <Breadcrumb.Section as={"a"} href={url}>{text}</Breadcrumb.Section>;
        } else {
            theSection = <Breadcrumb.Section as={Nav} to={url}>{text}</Breadcrumb.Section>;
        }
    } else {
        theSection = <Breadcrumb.Section>{text}</Breadcrumb.Section>;
    }

    if (props.last) {
        return theSection;
    } else {
        return <>{theSection}<Breadcrumb.Divider /></>;
    }
}

/** renders a full list of BreadCrumbs by iterating over the reference */
export function MHRefBreadCrumbs(props: {to?: IApiObject | ISourceReference}) {
    return <Breadcrumbs data={props.to} crumbs={refToCrumbs} />;
}

function refToCrumbs(to?: IApiObject | ISourceReference): IBreadCrumbComponent[] {
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
            text: loc && loc.name || "library",
            external: false,
            url: encodeLibraryLink(loc),
        }];
    }));
}
