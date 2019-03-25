import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILayoutFailureProps } from "./ILayoutFailureProps";

let LayoutFailure: React.ComponentClass<ILayoutFailureProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        LayoutFailure = dynamic(import("../../themes/classic/Layout/LayoutFailure"));
        break;
    default:
        LayoutFailure = dynamic(import("../../themes/plain/Layout/LayoutFailure"));
}

export default LayoutFailure;
