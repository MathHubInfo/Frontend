import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IKeysProps } from "./IKeysProps";


let PageApplicationsKeys: React.ComponentClass<IKeysProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageApplicationsKeys = dynamic(import("../../../themes/plain/Pages/Applications/Keys"));
}

export default PageApplicationsKeys;
