import dynamic from "next/dynamic";

import { IArchiveProps } from "./IArchiveProps";

const PageArchive: React.ComponentType<IArchiveProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Archive"));
export default PageArchive;
