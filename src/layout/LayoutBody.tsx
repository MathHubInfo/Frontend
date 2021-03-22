import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
import { Container, Divider } from "semantic-ui-react";
import { IApiObject } from "../context/LibraryClient/objects";
import { ObjectParents } from "../context/LibraryClient/objects/utils";
import { IBreadcrumb } from "./Props";

interface ILayoutBodyProps extends ILayoutBodyState {
    /**
     * The title of the current page, consisting out of differenct components
     */
    title?: string[];

    /**
     * The description of the body. Might contain html.
     */
    description?: string;

    /**
     * Like breadcrumbs, but will be appended to the end of the existing crumbs pointing to an object.
     */
    obj?: IApiObject;
}

interface ILayoutBodyState {
    /**
     * The breadcrumbs to the current page.
     * Each Component is a pair of (title, url) to be used as arguments for creating a link.
     */
    crumbs: IBreadcrumb[];
}

const Header = dynamic(() => import("./Header"));
const LayoutFooter = dynamic(() => import("./LayoutFooter"));

export default class LayoutBody extends React.Component<ILayoutBodyProps, ILayoutBodyState> {
    state = { crumbs: this.props.crumbs };
    static getDerivedStateFromProps({ obj, crumbs }: ILayoutBodyProps): ILayoutBodyState {
        if (!obj) return { crumbs }; // if we don't have an object, we are done!

        // get the parents of this element, excluding itself
        const parents = ObjectParents(obj);
        parents.splice(-1, 1);

        // and add them to the crumbs array (creating a new one)
        return {
            crumbs: crumbs.concat(
                parents.map(({ kind, name, id }) => {
                    if (kind !== "document" && kind !== "archive" && kind !== "group") {
                        return { href: "", title: name };
                    }

                    return {
                        href: { kind, id },
                        title: name,
                    };
                }),
            ),
        };
    }

    render() {
        const { title, description, children } = this.props;
        const { crumbs } = this.state;

        // generate the title
        const titleStr = (title || []).join(" | ");
        const theTitle = title ? `${titleStr} | MathHub` : "MathHub";

        return (
            <Container>
                <Head>
                    <title>{theTitle}</title>
                    {description && <meta name="description" content={description} />}
                </Head>
                <Header title={title} crumbs={crumbs} />
                <Divider />
                <main>{children}</main>
                <Divider />
                <LayoutFooter />
            </Container>
        );
    }
}
