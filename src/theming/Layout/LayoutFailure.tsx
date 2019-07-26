import dynamic from "next/dynamic";

import { ILayoutFailureProps } from "./ILayoutFailureProps";

const LayoutFailure: React.ComponentType<ILayoutFailureProps> =
    dynamic(import("../../themes/classic/Layout/LayoutFailure"));
export default LayoutFailure;
