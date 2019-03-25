import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INoticesProps } from "./INoticesProps";

let PageLegalNotices: React.ComponentClass<INoticesProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageLegalNotices = dynamic(import("../../../themes/classic/Pages/Legal/Notices"));
        break;

    default:
        PageLegalNotices = dynamic(import("../../../themes/plain/Pages/Legal/Notices"));
}

export default PageLegalNotices;
