import dynamic from "next/dynamic";

import { IGroupRefProps } from "./IGroupRefProps";

const PageGroupRef: React.ComponentType<IGroupRefProps> =
    dynamic(import("../../../themes/classic/Pages/Library/GroupRef"));
export default PageGroupRef;
