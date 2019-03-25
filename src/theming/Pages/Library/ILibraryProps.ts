import { ILibraryItemHeaderProps } from "../../Layout/ILibraryItemHeaderProps";

import { IGroupRefProps } from "./IGroupRefProps";

export interface ILibraryProps {
    // the general information about this library page
    header: React.ReactElement<ILibraryItemHeaderProps>;

    // all the groups that are known in the library
    children: Array<React.ReactElement<IGroupRefProps>>;
}
