import dynamic from "next/dynamic";

import { INoticesProps } from "./INoticesProps";

const PageLegalNotices: React.ComponentType<INoticesProps> =
    dynamic(import("../../../themes/classic/Pages/Legal/Notices"));
export default PageLegalNotices;
