import dynamic from "next/dynamic";

import { INewsPageRefProps } from "./INewsPageRefProps";

const PageNewsPageRef: React.ComponentType<INewsPageRefProps> =
    dynamic(import("../../../themes/classic/Pages/News/NewsPageRef"));
export default PageNewsPageRef;
