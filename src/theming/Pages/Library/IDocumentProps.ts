import { ILibraryItemHeaderProps } from "../../Layout/ILibraryItemHeaderProps";

import { IDocument } from "../../../context/LibraryClient/objects";

import { INarrativeElementProps } from "../../../lib/library/INarrativeElementProps";

export interface IDocumentProps {
    // the general information about this library page
    header: React.ReactElement<ILibraryItemHeaderProps>;

    // the group being rederned
    item: IDocument;

    // all the groups that are known in the library
    children: Array<React.ReactElement<INarrativeElementProps>>;
}
