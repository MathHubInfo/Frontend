import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IImprintProps } from "./IImprintProps";

let PageLegalImprint: React.ComponentClass<IImprintProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageLegalImprint = dynamic(import("../../../themes/classic/Pages/Legal/Imprint"));
        break;
    default:
        PageLegalImprint = dynamic(import("../../../themes/plain/Pages/Legal/Imprint"));
}

export default PageLegalImprint;
