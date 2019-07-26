import dynamic from "next/dynamic";

import { IDictionaryProps } from "./IDictionaryProps";

const PageApplicationsDictionary: React.ComponentType<IDictionaryProps> =
    dynamic(import("../../../themes/classic/Pages/Applications/Dictionary"));
export default PageApplicationsDictionary;
