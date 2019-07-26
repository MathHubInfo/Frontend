import dynamic from "next/dynamic";

import { ILayoutRoutingIndicatorProps } from "./ILayoutRoutingIndicatorProps";

const LayoutRoutingIndicator: React.ComponentType<ILayoutRoutingIndicatorProps> = dynamic(
    import("../../themes/classic/Layout/LayoutRoutingIndicator"),
);
export default LayoutRoutingIndicator;
