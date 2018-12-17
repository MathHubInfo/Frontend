import getConfig from "next/config";
import dynamic from "next/dynamic";

import { INewsProps } from "./INewsProps";

let PageNews: React.ComponentClass<INewsProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageNews = dynamic(import("../../../themes/plain/Pages/News/News"));
}

export default PageNews;
