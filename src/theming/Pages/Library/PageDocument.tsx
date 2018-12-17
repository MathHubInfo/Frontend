import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDocumentProps } from "./IDocumentProps";

let PageDocument: React.ComponentClass<IDocumentProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageDocument = dynamic(import("../../../themes/plain/Pages/Library/Document"));
}

export default PageDocument;
