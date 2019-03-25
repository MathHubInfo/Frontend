import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INewsProps } from "./INewsProps";

let PageNews: React.ComponentClass<INewsProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    case "classic":
        PageNews = dynamic(import("../../../themes/classic/Pages/News/News"));
        break;
    default:
        PageNews = dynamic(import("../../../themes/plain/Pages/News/News"));
}

export default PageNews;
