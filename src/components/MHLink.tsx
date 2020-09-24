import Link from "next/link";
type LinkProps = React.ComponentProps<typeof Link>;
import { stringify } from "querystring";
import * as React from "react";

import { WithContextProps } from "../utils/WithExtraContext";
import MHAppContext, { IMHAppContext } from "../types/MHAppContext";

type IMHLinkProps = Omit<LinkProps, "href"> & IMHLinkable;

export interface IMHLinkable {
    // the url of the page to link to
    href: string;

    // the query to append to the url (if any)
    query?: {[key: string]: string};
}

/**
 * Rewrites a URL to a human-friendly url used with the webserver
 * @param url URL to rewrite
 */
export function rewrite(url: string): string {
    // in case of an external url, return it as is
    if (!url.startsWith("/")) return url;

    // else do the actual rewriting
    return url;
}

/**
 * A link between different MathHub Pages. Takes care to carry the current language along with any parameters.
 */
export class MHLink extends React.Component<IMHLinkProps & IMHAppContext, {href: string}> {
    state = {href: ""};
    static getDerivedStateFromProps(props: IMHLinkProps & IMHAppContext): { href: string } {
        const {href, query} = props;

        const sHref = href.length === 1 ? href : href.replace(/\/$/, "");
        const pHref = `${sHref}?${stringify({lang: props.activeLanguage, ...(query || {})})}`;

        return {href: rewrite(pHref)};
    }

    render() {
        const {prefetch, shallow, scroll, replace, as, passHref, children} = this.props;
        const props = {prefetch, shallow, scroll, replace, as, passHref, children};

        return <Link {...props} href={this.state.href} />;
    }
}

// tslint:disable-next-line:export-name
export default WithContextProps(MHLink, MHAppContext);
