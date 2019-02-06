import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IModuleProps } from "./IModuleProps";

let PageModule: React.ComponentClass<IModuleProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageModule = dynamic(import("../../../themes/classic/Pages/Library/Module"));
        break;
    default:
        PageModule = dynamic(import("../../../themes/plain/Pages/Library/Module"));
}

export default PageModule;
