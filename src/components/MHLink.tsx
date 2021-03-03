import Link from "next/link";
type LinkProps = React.ComponentProps<typeof Link>;
import { stringify } from "querystring";
import * as React from "react";
import { LocaleContextProps, LocaleContext } from "../locales/WithTranslate";

type IMHLinkProps = Omit<LinkProps, "href"> & IMHLinkable;

export interface IMHLinkable {
    href: string; // url of the page to link to
    query?: Record<string, string>; // optional query parameters to append
    locale?: string; // when set, replace the current language
}

/** compute url computes the url for a specific page */
function computeURL({ href, query }: IMHLinkable): string {
    // external links are not mapped to anything!
    if (href !== "" && !href.startsWith("/")) return href;

    const pathname = href.replace(/\/$/, "");
    const search = `?${stringify(query || {})}`;

    return `${pathname !== "" ? pathname : "/"}${search !== "?" ? search : ""}`;
}

/**
 * A link between different MathHub Pages. Takes care to carry the current language along with any parameters.
 */
export default class MHLink extends React.Component<IMHLinkProps> {
    static contextType = LocaleContext;
    context!: LocaleContextProps;

    render() {
        const { href, query, locale, prefetch, shallow, scroll, replace, as, passHref, children } = this.props;
        const linkProps = { prefetch, shallow, scroll, replace, as, passHref, locale, children };

        return <Link {...linkProps} href={computeURL({ href, query })} />;
    }
}
