import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IGroupProps } from "./IGroupProps";

let PageGroup: React.ComponentClass<IGroupProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageGroup = dynamic(import("../../../themes/plain/Pages/Library/Group"));
}

export default PageGroup;
