import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
import { Container, Divider } from "semantic-ui-react";
import { IReferencable } from "../context/LibraryClient/objects";
import { ObjectParents } from "../context/LibraryClient/objects/utils";
import ActionHeader, { IActionHeaderProps } from "./ActionHeader";
import { IBreadcrumb } from "./Props";

type ILayoutBodyProps = ILayoutBodyState & {
    /**
     * The description of the body. Might contain html.
     */
    description?: string;

    /**
     * The breadcrumbs to the current page.
     * Each Component is a pair of (title, url) to be used as arguments for creating a link.
     */
    crumbs: IBreadcrumb[];

    /* object being referenced in the header and appended to the breadcrumbs */
    obj?: IReferencable;
} & (WithHeaderProps | NoHeaderProps);

/** include an IActionHeader */
interface WithHeaderProps {
    /* title of the current page */
    title: string[];

    /* do include a header */
    header: true;
}

/* do not include an IActionHeader, but still use obj for breadcrumbs */
interface NoHeaderProps {
    /** title of the current page, consisting of different components */
    title?: string[]; // TODO: Do we use more than one component anywhere?

    /* don't include a header */
    header?: false;
}

interface ILayoutBodyState {
    crumbs: IBreadcrumb[];

    /** when set create an Action header based on the props */
    actionHeader?: IActionHeaderProps;
}

const Header = dynamic(() => import("./Header"));
const LayoutFooter = dynamic(() => import("./LayoutFooter"));

export default class LayoutBody extends React.Component<ILayoutBodyProps, ILayoutBodyState> {
    state: ILayoutBodyState = { crumbs: this.props.crumbs };
    static getDerivedStateFromProps({ title, description, obj, crumbs, header }: ILayoutBodyProps): ILayoutBodyState {
        // if we have an object, extrat the parent and add them to the crumbs
        if (obj) {
            // get the parents of this element, excluding itself
            const parents = ObjectParents(obj);
            parents.splice(-1, 1);

            // and add them to the crumbs array (creating a new one)
            crumbs = crumbs.concat(
                parents.map(({ kind, name, id }) => {
                    if (kind !== "document" && kind !== "archive" && kind !== "group") {
                        return { href: "", title: name };
                    }

                    return {
                        href: { kind, id },
                        title: name,
                    };
                }),
            );
        }

        let actionHeader: ILayoutBodyState["actionHeader"] = undefined;
        if (header) {
            // TODO: Can we check this better?
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const name = title![title!.length - 1];
            actionHeader = { obj, title: name, description };
        }

        return { crumbs, actionHeader };
    }

    render() {
        const { title, description, children } = this.props;
        const { crumbs, actionHeader } = this.state;

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
                {actionHeader && <ActionHeader {...actionHeader} />}
                <main>{children}</main>
                <Divider />
                <LayoutFooter />
            </Container>
        );
    }
}
