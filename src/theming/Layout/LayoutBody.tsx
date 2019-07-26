// tslint:disable export-name
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
// tslint:disable-next-line: no-submodule-imports
import "semantic-ui-css/semantic.min.css";
import { Divider } from "semantic-ui-react";
import getMathHubConfig from "../../context";
import MHAppContext, { IMHAppContext } from "../../lib/components/MHAppContext";
import { IMathHubVersion } from "../../types/config";
import stripTags from "../../utils/stripTags";
import WithExtraContext from "../../utils/WithExtraContext";
import { IBodyDerivedProps, ILayoutBodyProps } from "./ILayoutBodyProps";

const Header = dynamic(() => import("./Header"));
const LayoutFooter = dynamic(() => import("./LayoutFooter"));

class LayoutBody extends React.Component<ILayoutBodyProps> {
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
                <Header
                    title={title}
                    crumbs={crumbs}
                />
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


export default WithExtraContext<IMHAppContext, IBodyDerivedProps, ILayoutBodyProps>(
    LayoutBody, MHAppContext, ({ description }) => {
        const descriptionText = description ? stripTags(description) : undefined;
        const version: IMathHubVersion = getMathHubConfig().config.MATHHUB_VERSION;

        return {descriptionText, version};
    },
);
