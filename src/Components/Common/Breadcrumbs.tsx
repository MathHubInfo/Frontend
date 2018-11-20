import * as React from "react";

import { Link } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";

// a component of the bread crumb
interface IBreadCrumbPart {
    // text
    text: string;
    // url this component links to (if any)
    url?: string;
    // is this component external (if any)
    external?: boolean;
}

interface IBreadcrumbsProps {
    crumbs: IBreadCrumbPart[];
}

/**
 * A list of breadcrumbs
 */
export default class Breadcrumbs extends React.Component<IBreadcrumbsProps> {
    render() {
        const { crumbs } = this.props;

        return (
            <Breadcrumb style={{margin: "0em 0em 1em"}}>{
                crumbs.map((c, index, ary) =>
                    <BreadcrumbsPart key={index} part={c} last={index === ary.length - 1} />)}
            </Breadcrumb>
        );
    }
}

function BreadcrumbsPart(props: {part: IBreadCrumbPart; last?: boolean}) {
    const { url, text, external } = props.part;

    let theSection;
    if (typeof url === "string")
        // tslint:disable-next-line:prefer-conditional-expression
        if (external)
            theSection = <Breadcrumb.Section as={"a"} href={url}>{text}</Breadcrumb.Section>;
        else
            theSection = <Breadcrumb.Section as={Link} to={url}>{text}</Breadcrumb.Section>;
    else
        theSection = <Breadcrumb.Section>{text}</Breadcrumb.Section>;

    if (props.last)
        return theSection;
    else
        return <>{theSection}<Breadcrumb.Divider /></>;
}
