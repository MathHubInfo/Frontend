import { IDeclaration, IDeclarationRef } from "../../../context/LibraryClient/objects";

import { IComponentProps } from "./IComponentProps";
import { IDocumentProps } from "./IDocumentProps";

export interface IDeclarationProps {
    item: IDeclaration | IDeclarationRef;

    // the declarations within this module
    // and the components of this declaration
    children: [
        IDocumentProps["children"],
        Array<React.ReactElement<IComponentProps>>
    ];

    // is this item expanded?
    expanded: boolean;

    // ref to toggle the expansion of this element
    toggleExpansion(): void;
}
