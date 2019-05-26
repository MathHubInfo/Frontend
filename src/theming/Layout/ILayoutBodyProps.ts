import * as React from "react";

import { IMHAppContext } from "../../lib/components/MHAppContext";
import { IMHLinkable } from "../../lib/components/MHLink";
import { IMathHubVersion } from "../../types/config";

export interface ILayoutBodyPureProps {
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
    children: React.ReactElement<{}>;
}

/**
 * A breadcrumb to anything
 */
export interface IBreadcrumb extends IMHLinkable {
    // the title of the breadcrumb
    title: string;
}

export interface IBodyDerivedProps {
    /**
     * The version of MathHub that is running
     */
    version: IMathHubVersion;

    /**
     * Same as description, but with stripped html tags.
     */
    descriptionText?: string;
}

export type ILayoutBodyProps = IMHAppContext & ILayoutBodyPureProps & IBodyDerivedProps;
