import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDictionaryProps } from "./IDictionaryProps";

let PageApplicationsDictionary: React.ComponentClass<IDictionaryProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageApplicationsDictionary = dynamic(import("../../../themes/classic/Pages/Applications/Dictionary"));
        break;
    default:
        PageApplicationsDictionary = dynamic(import("../../../themes/plain/Pages/Applications/Dictionary"));
}

export default PageApplicationsDictionary;
