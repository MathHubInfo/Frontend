import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INoticesProps } from "./INoticesProps";

let PageLegalNotices: React.ComponentClass<INoticesProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageLegalNotices = dynamic(import("../../../themes/plain/Pages/Legal/Notices"));
}

export default PageLegalNotices;
