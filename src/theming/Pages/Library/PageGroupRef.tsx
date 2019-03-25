import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IGroupRefProps } from "./IGroupRefProps";

let PageGroupRef: React.ComponentClass<IGroupRefProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageGroupRef = dynamic(import("../../../themes/classic/Pages/Library/GroupRef"));
        break;
    default:
        PageGroupRef = dynamic(import("../../../themes/plain/Pages/Library/GroupRef"));
}

export default PageGroupRef;
