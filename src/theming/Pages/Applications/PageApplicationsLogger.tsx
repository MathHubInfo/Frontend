import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILoggerProps } from "./ILoggerProps";

let PageApplicationsLogger: React.ComponentClass<ILoggerProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageApplicationsLogger = dynamic(import("../../../themes/classic/Pages/Applications/Logger"));
        break;
    default:
        PageApplicationsLogger = dynamic(import("../../../themes/plain/Pages/Applications/Logger"));
}

export default PageApplicationsLogger;
