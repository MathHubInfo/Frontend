import Link, { LinkProps } from "next/link";
import { stringify } from "querystring";
import * as React from "react";

import { Omit } from "../../types/lib";

type IMHLinkProps = Omit<LinkProps, "href"> & IMHLinkable;

export interface IMHLinkable {
    // the url of the page to link to
    href: string;

    // the query to append to the url (if any)
    query?: {[key: string]: string};
}

/**
 * A link between different MathHub Pages
 */
export default class MHLink extends React.Component<IMHLinkProps, {href: string}> {
    state = {href: ""};
    static getDerivedStateFromProps(props: IMHLinkProps): { href: string } {
        const {href, query} = props;
        const sHref = href.length === 1 ? href : href.replace(/\/$/, "");
        const pHref = query ? `${sHref}?${stringify(query)}` : sHref;

        return {href: MHLink.rewrite(pHref)};
    }
    /**
     * Rewrites a URL to a human-friendly url used with the webserver
     * @param url URL to rewrite
     */
    static rewrite(url: string): string {
        // in case of an external url, return it as is
        if (!url.startsWith("/")) return url;

        // else do the actual rewriting
        return url;
    }
    render() {
        const {prefetch, shallow, scroll, replace, as, passHref, children} = this.props;
        const props = {prefetch, shallow, scroll, replace, as, passHref, children};

        return <Link {...props} href={this.state.href} />;
    }
}
