import dynamic from "next/dynamic";

import { IKeysProps } from "./IKeysProps";

const PageApplicationsKeys: React.ComponentType<IKeysProps> =
    dynamic(import("../../../themes/classic/Pages/Applications/Keys"));
export default PageApplicationsKeys;
