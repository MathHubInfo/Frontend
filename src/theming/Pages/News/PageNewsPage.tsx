import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INewsPageProps } from "./INewsPageProps";

let PageNewsPage: React.ComponentClass<INewsPageProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageNewsPage = dynamic(import("../../../themes/classic/Pages/News/NewsPage"));
        break;
    default:
        PageNewsPage = dynamic(import("../../../themes/plain/Pages/News/NewsPage"));
}

export default PageNewsPage;
