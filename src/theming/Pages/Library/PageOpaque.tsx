import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IOpaqueProps } from "./IOpaqueProps";

let PageOpaque: React.ComponentClass<IOpaqueProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageOpaque = dynamic(import("../../../themes/plain/Pages/Library/Opaque"));
}

export default PageOpaque;
