import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INewsPageRefProps } from "./INewsPageRefProps";

let PageNewsPageRef: React.ComponentClass<INewsPageRefProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageNewsPageRef = dynamic(import("../../../themes/classic/Pages/News/NewsPageRef"));
        break;
    default:
        PageNewsPageRef = dynamic(import("../../../themes/plain/Pages/News/NewsPageRef"));
}

export default PageNewsPageRef;
