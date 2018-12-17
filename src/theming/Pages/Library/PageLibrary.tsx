import getConfig from "next/config";
import dynamic from "next/dynamic";

import { ILibraryProps } from "./ILibraryProps";

let PageLibrary: React.ComponentClass<ILibraryProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageLibrary = dynamic(import("../../../themes/plain/Pages/Library/Library"));
}

export default PageLibrary;
