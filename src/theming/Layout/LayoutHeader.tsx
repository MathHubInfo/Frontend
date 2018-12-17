import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILayoutHeaderProps } from "./ILayoutHeaderProps";

let LayoutHeader: React.ComponentClass<ILayoutHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        LayoutHeader = dynamic(import("../../themes/plain/Layout/LayoutHeader"));
}

export default LayoutHeader;
