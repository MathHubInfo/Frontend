import dynamic from "next/dynamic";

import { IArchiveRefProps } from "./IArchiveRefProps";

const PageArchiveRef: React.ComponentType<IArchiveRefProps> =
    dynamic(import("../../../themes/classic/Pages/Library/ArchiveRef"));
export default PageArchiveRef;
