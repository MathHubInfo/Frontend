import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IImprintProps } from "./IImprintProps";

let PageLegalImprint: React.ComponentClass<IImprintProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageLegalImprint = dynamic(import("../../../themes/plain/Pages/Legal/Imprint"));
}

export default PageLegalImprint;
