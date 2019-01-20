import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILayoutFooterProps } from "./ILayoutFooterProps";

let LayoutFooter: React.ComponentClass<ILayoutFooterProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        LayoutFooter = dynamic(import("../../themes/classic/Layout/Header"));
        break;
    default:
        LayoutFooter = dynamic(import("../../themes/plain/Layout/Header"));
}

export default LayoutFooter;
