import Link from "next/link";
type LinkProps = React.ComponentProps<typeof Link>;
import * as React from "react";
import { IArchive, IArchiveRef, IDocument, IDocumentRef, IGroup, IGroupRef } from "../context/LibraryClient/objects";
import { LocaleContextProps, LocaleContext } from "../locales/WithTranslate";
import { encode } from "../utils/base64";
import { interpolate } from "../utils/interpolate";

/** a linkable item can be represented by an href or an id to something on MathHub */
export interface IMHLinkable {
    href: string | LinkableItem;
    params?: Record<string, string>;
}
type LinkableItem = Pick<IGroup | IGroupRef | IArchive | IArchiveRef | IDocumentRef | IDocument, "kind" | "id">;

/* toHref turns a linkable into an href */
function toHref(link: string | LinkableItem, params?: Record<string, string>): string {
    // determine the actual href to link to
    let href: string;
    if (typeof link === "string") {
        href = interpolate(/\[([^\s\]]+)\]/g, link, params ?? {});
    } else {
        const { kind, id } = link;
        href = `/library/${kind}/${encode(id)}`;
    }

    if (href !== "" && !href.startsWith("/")) return href;

    // replace trailing slashes for non-external URL
    href = href.replace(/\/$/, "");
    href = href !== "" ? href : "/";

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
