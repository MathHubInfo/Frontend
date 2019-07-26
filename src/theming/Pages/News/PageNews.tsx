import dynamic from "next/dynamic";

import { INewsProps } from "./INewsProps";

const PageNews: React.ComponentType<INewsProps> =
    dynamic(import("../../../themes/classic/Pages/News/News"));
export default PageNews;
