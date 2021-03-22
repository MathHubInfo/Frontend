import { IMHLinkable } from "../components/MHLink";

/**
 * A breadcrumb to anything
 */
export interface IBreadcrumb extends IMHLinkable {
    // the title of the breadcrumb
    title: string;
}
