import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDictionaryProps } from "./IDictionaryProps";

let PageApplicationsDictionary: React.ComponentClass<IDictionaryProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageApplicationsDictionary = dynamic(import("../../../themes/plain/Pages/Applications/Dictionary"));
}

export default PageApplicationsDictionary;
