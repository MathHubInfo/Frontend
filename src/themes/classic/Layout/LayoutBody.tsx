import Head from "next/head";
import * as React from "react";
import { Divider } from "semantic-ui-react";

// tslint:disable-next-line: no-submodule-imports
import "semantic-ui-css/semantic.min.css";

import { ILayoutBodyProps } from "../../../theming/Layout/ILayoutBodyProps";

import { Header } from "./Header";
import { LayoutFooter } from "./LayoutFooter";


export default class LayoutBody extends React.Component<ILayoutBodyProps> {
    render() {
        const { title, crumbs, version, description } = this.props;

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
                <main>
                    {this.props.children}
                </main>
                <Divider />
                <LayoutFooter version={version} />
            </>
        );
    }
}
