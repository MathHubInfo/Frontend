import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IHeaderProps } from "./IHeaderProps";

let Header: React.ComponentClass<IHeaderProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        Header = dynamic(import("../../themes/classic/Layout/Header"));
        break;
    default:
        Header = dynamic(import("../../themes/plain/Layout/Header"));
}

export default Header;
