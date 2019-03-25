import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILayoutRoutingIndicatorProps } from "./ILayoutRoutingIndicatorProps";

let LayoutRoutingIndicator: React.ComponentClass<ILayoutRoutingIndicatorProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        LayoutRoutingIndicator = dynamic(import("../../themes/plain/Layout/LayoutRoutingIndicator"));
}

export default LayoutRoutingIndicator;
