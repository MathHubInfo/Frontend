import { IActionHeaderProps } from "../../Layout/IActionHeaderProps";

import { IGroupRefProps } from "./IGroupRefProps";

export interface ILibraryProps {
    // the general information about this library page
    header: React.ReactElement<IActionHeaderProps>;

    // all the groups that are known in the library
    children: Array<React.ReactElement<IGroupRefProps>>;
}
