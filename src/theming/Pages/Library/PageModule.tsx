import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IModuleProps } from "./IModuleProps";

let PageModule: React.ComponentClass<IModuleProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageModule = dynamic(import("../../../themes/plain/Pages/Library/Module"));
}

export default PageModule;
