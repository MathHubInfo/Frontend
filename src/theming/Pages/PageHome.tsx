import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IHomeProps } from "./IHomeProps";

let PageHome: React.ComponentClass<IHomeProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageHome = dynamic(import("../../themes/plain/Pages/Home"));
}

export default PageHome;
