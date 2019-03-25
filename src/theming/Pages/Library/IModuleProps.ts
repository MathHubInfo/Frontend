import { IModule, IModuleRef } from "../../../context/LibraryClient/objects";

import { IDocumentProps } from "./IDocumentProps";

export interface IModuleProps {
    item: IModule | IModuleRef;

    // all the children of this module (if any)
    children?: IDocumentProps["children"];

    // is this item expanded?
    expanded: boolean;

    // ref to toggle the expansion of this element
    toggleExpansion(): void;
}
