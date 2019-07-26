import dynamic from "next/dynamic";

import { IImprintProps } from "./IImprintProps";

const PageLegalImprint: React.ComponentType<IImprintProps> =
    dynamic(import("../../../themes/classic/Pages/Legal/Imprint"));
export default PageLegalImprint;
