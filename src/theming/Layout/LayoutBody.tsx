import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
import { Divider } from "semantic-ui-react";
import getMathHubConfig from "../../context";
import { IMathHubVersion } from "../../types/config";
import { WithExtraProps } from "../../utils/WithExtraProps";
import { IBreadcrumb } from "./Props";

interface ILayoutBodyPureProps {
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

interface IBodyDerivedProps {
    /**
     * The version of MathHub that is running
     */
    version: IMathHubVersion;

    /**
     * Same as description, but with stripped html tags.
     */
    descriptionText?: string;
}

type ILayoutBodyProps = ILayoutBodyPureProps & IBodyDerivedProps;

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
                <Header title={title} crumbs={crumbs} />
                <Divider />
                <main>{this.props.children}</main>
                <Divider />
                <LayoutFooter version={version} />
            </>
        );
    }
}

export default WithExtraProps<IBodyDerivedProps, ILayoutBodyProps>(LayoutBody, ({ description }) => {
    const descriptionText = description || undefined;
    const version: IMathHubVersion = getMathHubConfig().config.MATHHUB_VERSION;

    return { descriptionText, version };
});
