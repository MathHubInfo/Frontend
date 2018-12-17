import { ILibraryItemHeaderProps } from "../../Layout/ILibraryItemHeaderProps";

import { IArchive } from "../../../context/LibraryClient/objects";

import { IDocumentProps } from "./IDocumentProps";

export interface IArchiveProps {
    // the general information about this library page
    header: React.ReactElement<ILibraryItemHeaderProps>;

    // the group being rederned
    item: IArchive;

    // all the groups that are known in the library
    children: IDocumentProps["children"];
}
