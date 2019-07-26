import dynamic from "next/dynamic";

import { ILoggerProps } from "./ILoggerProps";

const PageApplicationsLogger: React.ComponentType<ILoggerProps> =
    dynamic(import("../../../themes/classic/Pages/Applications/Logger"));
export default PageApplicationsLogger;
