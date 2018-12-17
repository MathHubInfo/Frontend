import getConfig from "next/config";
import dynamic from "next/dynamic";

import { IDocumentRefProps } from "./IDocumentRefProps";

let PageDocumentRef: React.ComponentClass<IDocumentRefProps>;

switch (getConfig().publicRuntimeConfig.theme) {
    default:
        PageDocumentRef = dynamic(import("../../../themes/plain/Pages/Library/DocumentRef"));
}

export default PageDocumentRef;
