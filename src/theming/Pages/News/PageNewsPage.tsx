import dynamic from "next/dynamic";

import { INewsPageProps } from "./INewsPageProps";

const PageNewsPage: React.ComponentType<INewsPageProps> =
    dynamic(import("../../../themes/classic/Pages/News/NewsPage"));
export default PageNewsPage;
