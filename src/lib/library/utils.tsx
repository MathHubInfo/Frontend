// tslint:disable:export-name
import { IApiObject, IReferencable } from "../../context/LibraryClient/objects";
import { IBreadcrumb } from "../../theming/Layout/ILayoutBodyProps";

import { ObjectParents, ObjectSource } from "../../context/LibraryClient/objects/utils";
import { IActionHeaderProps } from "../../theming/Layout/IActionHeaderProps";
import { Omit } from "../../types/lib";

/**
 * Extracts common header properties from an object
 */
export function headerProps(
    obj: IReferencable,
    other?: Omit<IActionHeaderProps, "source" | "statistics" | "responsible">,
): IActionHeaderProps {
    let responsible;
    if (obj.kind === "archive" || obj.kind === "group")
        responsible = obj.responsible;

    return {
        ...(other || {}),
        responsible,
        statistics: obj.statistics,
        source: ObjectSource(obj),
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

    return parents.map(({kind, name, id}) => ({
        href: `/library/${kind}`,
        title: name,
        query: { id },
    }));
}
