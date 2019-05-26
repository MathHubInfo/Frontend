
import { IMHLinkable } from "../../lib/components/MHLink";

export interface IHeaderProps {
    /**
     * The title of the current page, consisting out of differenct components
     */
    title?: string[];


    /**
     * The breadcrumbs to the current page.
     * Each Component is a pair of (title, url) to be used as arguments for creating a link.
     */
    crumbs: IBreadcrumb[];
}

/**
 * A breadcrumb to anything
 */
export interface IBreadcrumb extends IMHLinkable {
    // the title of the breadcrumb
    title: string;
}
