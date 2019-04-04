import { IActionHeaderProps } from "../../Layout/IActionHeaderProps";

import { IGroup } from "../../../context/LibraryClient/objects";

import { IArchiveRefProps } from "./IArchiveRefProps";

export interface IGroupProps {
    // the general information about this library page
    header: React.ReactElement<IActionHeaderProps>;

    // the group being rederned
    item: IGroup;

    // all the groups that are known in the library
    children: Array<React.ReactElement<IArchiveRefProps>>;
}
