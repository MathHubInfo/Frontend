import dynamic from "next/dynamic";

import { ILayoutFooterProps } from "./ILayoutFooterProps";

const LayoutFooter: React.ComponentType<ILayoutFooterProps> =
    dynamic(import("../../themes/classic/Layout/LayoutFooter"));
export default LayoutFooter;
