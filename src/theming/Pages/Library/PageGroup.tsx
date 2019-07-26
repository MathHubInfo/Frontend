import dynamic from "next/dynamic";

import { IGroupProps } from "./IGroupProps";

const PageGroup: React.ComponentType<IGroupProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Group"));
export default PageGroup;
