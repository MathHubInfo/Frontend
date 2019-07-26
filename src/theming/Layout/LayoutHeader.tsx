import dynamic from "next/dynamic";

import { ILayoutHeaderProps } from "./ILayoutHeaderProps";

const LayoutHeader: React.ComponentType<ILayoutHeaderProps> =
    dynamic(import("../../themes/classic/Layout/LayoutHeader"));
export default LayoutHeader;
