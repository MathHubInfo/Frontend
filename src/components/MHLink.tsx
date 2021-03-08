import Link from "next/link";
type LinkProps = React.ComponentProps<typeof Link>;
import { stringify } from "querystring";
import * as React from "react";
import { IArchive, IArchiveRef, IDocument, IDocumentRef, IGroup, IGroupRef } from "../context/LibraryClient/objects";
import { LocaleContextProps, LocaleContext } from "../locales/WithTranslate";

/** a linkable item can be represented by an href or an id to something on MathHub */
export interface IMHLinkable {
    href: string | LinkableItem;
    params?: Record<string, string>;
}
type LinkableItem = Pick<IGroup | IGroupRef | IArchive | IArchiveRef | IDocumentRef | IDocument, "kind" | "id">;

/* toHref turns a linkable into an href */
function toHref(link: string | LinkableItem, params?: Record<string, string>): string {
    // determine the url by using either the href or the item id
    let href: string;
    let query: Record<string, string>;
    if (typeof link === "string") {
        href = link;
        query = params ?? {};
    } else {
        const { kind, id } = link;
        href = `/library/${kind}`;
        query = { id };
    }

    if (href !== "" && !href.startsWith("/")) return href;

    // replace trailing slashes for non-external URL
    href = href.replace(/\/$/, "");
    href = href !== "" ? href : "/";

    // return the query (if any)
    const encoded = stringify(query);
    if (encoded !== "") {
        href += `?${encoded}`;
    }

    // and return the href
    return href;
}

type IMHLinkProps = Omit<LinkProps, "href"> & IMHLinkable;

/**
 * A link between different MathHub Pages. Takes care to carry the current language along with any parameters.
 */
export default class MHLink extends React.Component<IMHLinkProps> {
    static contextType = LocaleContext;
    context!: LocaleContextProps;

    render() {
        const { href, params, ...linkProps } = this.props;
        return <Link {...linkProps} href={toHref(href, params)} />;
    }
}
