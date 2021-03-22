import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
import { Divider } from "semantic-ui-react";
import { IBreadcrumb } from "./Props";

interface ILayoutBodyProps {
    /**
     * The title of the current page, consisting out of differenct components
     */
    title?: string[];

    /**
     * The description of the body. Might contain html.
     */
    description?: string;

    /**
     * The breadcrumbs to the current page.
     * Each Component is a pair of (title, url) to be used as arguments for creating a link.
     */
    crumbs: IBreadcrumb[];

    /**
     * Current page being rendered
     */
    children: React.ReactElement<unknown>;
}

const Header = dynamic(() => import("./Header"));
const LayoutFooter = dynamic(() => import("./LayoutFooter"));

export default class LayoutBody extends React.Component<ILayoutBodyProps> {
    render() {
        const { title, crumbs, description } = this.props;

        // generate the title
        const titleStr = (title || []).join(" | ");
        const theTitle = title ? `${titleStr} | MathHub` : "MathHub";

        return (
            <>
                <Head>
                    <title>{theTitle}</title>
                    {description && <meta name="description" content={description} />}
                </Head>
                <Header title={title} crumbs={crumbs} />
                <Divider />
                <main>{this.props.children}</main>
                <Divider />
                <LayoutFooter />
            </>
        );
    }
}
