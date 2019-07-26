import dynamic from "next/dynamic";

import { IOpaqueProps } from "./IOpaqueProps";

const PageOpaque: React.ComponentType<IOpaqueProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Opaque"));
export default PageOpaque;
