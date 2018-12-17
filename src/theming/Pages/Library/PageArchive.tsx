import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IArchiveProps } from "./IArchiveProps";

let PageArchive: React.ComponentClass<IArchiveProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageArchive = dynamic(import("../../../themes/plain/Pages/Library/Archive"));
}

export default PageArchive;
