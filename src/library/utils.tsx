import { IApiObject, IReferencable } from "../context/LibraryClient/objects";
import { IBreadcrumb } from "../theming/Layout/Props";

import { ObjectParents } from "../context/LibraryClient/objects/utils";
import { IActionHeaderProps } from "../theming/Layout/ActionHeader";

/**
 * Extracts common header properties from an object
 */
export function headerProps(
    obj: IReferencable,
    other?: Omit<IActionHeaderProps, "source" | "statistics" | "responsible">,
): IActionHeaderProps {
    let responsible;
    if (obj.kind === "archive" || obj.kind === "group") responsible = obj.responsible;

    return {
        ...(other || {}),
        obj,
        responsible,
        statistics: obj.statistics,
    };
}

/**
 * Generates breadcrumbs for a library item
 * @param to Item to generate crumbs for
 */
export function crumbs(to: IApiObject): IBreadcrumb[] {
    // get the parents of this element, excluding itself
    const parents = ObjectParents(to);
    parents.splice(-1, 1);

    return parents.map(({ kind, name, id }) => {
        if (kind !== "document" && kind !== "archive" && kind !== "group") {
            return { href: "", title: name };
        }

        return {
            href: { kind, id },
            title: name,
        };
    });
}
